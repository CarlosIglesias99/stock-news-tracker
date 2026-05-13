import React, { useState, useEffect } from 'react';

function App() {
  const [news, setNews] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const newsRes = await fetch('http://localhost:4000/api/news');
      setNews(await newsRes.json());
      const suggRes = await fetch('http://localhost:4000/api/suggestions');
      setSuggestions(await suggRes.json());
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", fontFamily: "Arial" }}>
      <h1>Stock Market News (Last 24 Hours)</h1>
      <h2>Top Suggested Stocks</h2>
      <ul>
        {suggestions.map((s, i) => (
          <li key={i}><strong>{s.ticker}</strong> (sentiment score: {s.score})</li>
        ))}
      </ul>
      <h2>Latest News</h2>
      {loading && <p>Loading...</p>}
      <ul>
        {news.map((item, i) => (
          <li key={i} style={{ marginBottom: 12 }}>
            <a href={item.url} target="_blank" rel="noopener noreferrer"><strong>{item.title}</strong></a><br/>
            <small>{new Date(item.publishedAt).toLocaleString()} {item.source ? ` | ${item.source}` : ""}</small><br/>
            <small>
              <em>{item.tickers.length > 0 ? `Tickers: ${item.tickers.join(', ')}` : ""} Sentiment: {item.sentimentScore}</em>
            </small>
            <p>{item.summary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
