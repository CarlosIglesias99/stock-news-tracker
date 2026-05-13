const express = require('express');
const router = express.Router();
const News = require('./models/News');

// GET /api/news
router.get('/news', async (req, res) => {
  const since = new Date(Date.now() - 24*60*60*1000);
  const news = await News.find({ publishedAt: { $gte: since } }).sort({ publishedAt: -1 }).limit(100);
  res.json(news);
});

// GET /api/suggestions
router.get('/suggestions', async (req, res) => {
  const since = new Date(Date.now() - 24*60*60*1000);
  const news = await News.find({ publishedAt: { $gte: since } });
  let tickerScores = {};

  news.forEach(article => {
    article.tickers.forEach(ticker => {
      if (!tickerScores[ticker]) tickerScores[ticker] = 0;
      tickerScores[ticker] += article.sentimentScore;
    });
  });

  let suggestions = Object.entries(tickerScores)
    .sort((a, b) => b[1] - a[1])
    .slice(0,10)
    .map(([ticker, score]) => ({ ticker, score }));

  res.json(suggestions);
});

module.exports = router;
