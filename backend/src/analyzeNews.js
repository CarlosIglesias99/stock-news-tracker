const Sentiment = require('sentiment');
const sentiment = new Sentiment();

function extractTickersAndSentiment(article) {
  const tickerRegex = /\b[A-Z]{2,5}\b/g;
  const tickers = [];
  const str = `${article.title} ${article.description || ""}`;

  const tickerMatches = str.match(tickerRegex) || [];
  // Filter likely tickers (skip common words)
  const possibleTickers = tickerMatches.filter(t => t.length > 1 && t.length <= 5);
  
  // Avoid duplicates
  possibleTickers.forEach(ticker => {
    if (!tickers.includes(ticker)) tickers.push(ticker);
  });

  const sentimentScore = sentiment.analyze(str).score;
  return { ...article, tickers, sentimentScore };
}

module.exports = extractTickersAndSentiment;
