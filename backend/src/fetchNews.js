require('dotenv').config();
const axios = require('axios');
const mongoose = require('mongoose');
const News = require('./models/News');
const extractTickersAndSentiment = require('./analyzeNews');

const NEWSAPI_KEY = process.env.NEWSAPI_KEY; // Put your API key in a .env file

async function fetchAndStoreNews() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {});

    // Fetch news from NewsAPI (last 24h, topic "stock market")
    const now = new Date();
    const from = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();
    const res = await axios.get(`https://newsapi.org/v2/everything`, {
      params: {
        q: 'stock market OR stocks OR investing',
        from,
        sortBy: 'publishedAt',
        language: 'en',
        apiKey: NEWSAPI_KEY,
        pageSize: 100
      }
    });

    const articles = res.data.articles.map(article =>
      extractTickersAndSentiment({
        title: article.title,
        description: article.description || '',
        url: article.url,
        publishedAt: article.publishedAt,
        source: article.source.name,
        summary: article.description || ''
      })
    );

    // Upsert articles (no duplicates by URL)
    for (const art of articles) {
      await News.updateOne(
        { url: art.url },
        { $set: art },
        { upsert: true }
      );
    }

    console.log(`Saved ${articles.length} news items.`);
    mongoose.disconnect();
  } catch (e) {
    console.error(e);
  }
}

// Export for cron use
if (require.main === module) {
  fetchAndStoreNews();
}

module.exports = fetchAndStoreNews;
