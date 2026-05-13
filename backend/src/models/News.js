const mongoose = require('mongoose');
const NewsSchema = new mongoose.Schema({
  title: String,
  url: String,
  publishedAt: Date,
  tickers: [String],
  sentimentScore: Number,
  source: String,
  summary: String
});
module.exports = mongoose.model('News', NewsSchema);
