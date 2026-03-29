"""
PRESS - E-Newspaper Backend Server
====================================
Requirements:
    pip install flask flask-cors feedparser

Run:
    python server.py

Then open http://localhost:5000 in your browser.
"""

from flask import Flask, jsonify
from flask_cors import CORS
import feedparser
import html
import re
from datetime import datetime
from concurrent.futures import ThreadPoolExecutor, as_completed

app = Flask(__name__)
CORS(app)  # Allow frontend to call this API

# ─── NEWS SOURCES ─────────────────────────────────────────────────────────────
SOURCES = [
    {"name": "BBC News",       "color": "#b5121b", "cat": "world",    "rss": "https://feeds.bbci.co.uk/news/rss.xml"},
    {"name": "BBC World",      "color": "#b5121b", "cat": "world",    "rss": "https://feeds.bbci.co.uk/news/world/rss.xml"},
    {"name": "The Guardian",   "color": "#052962", "cat": "world",    "rss": "https://www.theguardian.com/world/rss"},
    {"name": "Al Jazeera",    "color": "#007a3d", "cat": "world",    "rss": "https://www.aljazeera.com/xml/rss/all.xml"},
    {"name": "Reuters",        "color": "#ff8000", "cat": "business", "rss": "https://feeds.reuters.com/reuters/topNews"},
    {"name": "NPR News",       "color": "#1e4480", "cat": "politics", "rss": "https://feeds.npr.org/1001/rss.xml"},
    {"name": "NPR Politics",   "color": "#1e4480", "cat": "politics", "rss": "https://feeds.npr.org/1014/rss.xml"},
    {"name": "TechCrunch",    "color": "#0a8a00", "cat": "tech",     "rss": "https://techcrunch.com/feed/"},
    {"name": "The Verge",      "color": "#ff3d00", "cat": "tech",     "rss": "https://www.theverge.com/rss/index.xml"},
    {"name": "Wired",          "color": "#1a1a1a", "cat": "tech",     "rss": "https://www.wired.com/feed/rss"},
    {"name": "Ars Technica",   "color": "#ff4500", "cat": "tech",     "rss": "https://feeds.arstechnica.com/arstechnica/index"},
    {"name": "NASA",           "color": "#0b3d91", "cat": "science",  "rss": "https://www.nasa.gov/rss/dyn/breaking_news.rss"},
    {"name": "Science Daily",  "color": "#6b4c11", "cat": "science",  "rss": "https://www.sciencedaily.com/rss/all.xml"},
    {"name": "New Scientist",  "color": "#e4002b", "cat": "science",  "rss": "https://www.newscientist.com/feed/home/"},
    {"name": "ESPN",           "color": "#d00000", "cat": "sports",   "rss": "https://www.espn.com/espn/rss/news"},
    {"name": "BBC Sport",      "color": "#b5121b", "cat": "sports",   "rss": "https://feeds.bbci.co.uk/sport/rss.xml"},
    {"name": "The Atlantic",   "color": "#8b1a7a", "cat": "culture",  "rss": "https://www.theatlantic.com/feed/all/"},
    {"name": "Guardian Arts",  "color": "#052962", "cat": "culture",  "rss": "https://www.theguardian.com/culture/rss"},
    {"name": "Bloomberg",      "color": "#1e3a5f", "cat": "business", "rss": "https://feeds.bloomberg.com/markets/news.rss"},
    {"name": "FT",             "color": "#c4945a", "cat": "business", "rss": "https://www.ft.com/rss/home/uk"},
]

def clean_html(raw):
    """Strip HTML tags and clean whitespace."""
    if not raw:
        return ""
    text = re.sub(r'<[^>]+>', '', raw)
    text = html.unescape(text)
    text = re.sub(r'\s+', ' ', text).strip()
    return text[:400]

def fetch_feed(source):
    """Fetch and parse a single RSS feed."""
    articles = []
    try:
        feed = feedparser.parse(source["rss"])
        for entry in feed.entries[:10]:
            title = clean_html(getattr(entry, 'title', ''))
            desc  = clean_html(getattr(entry, 'summary', '') or getattr(entry, 'description', ''))
            link  = getattr(entry, 'link', '#')
            date  = getattr(entry, 'published', '') or getattr(entry, 'updated', '')

            if not title:
                continue

            articles.append({
                "source": source["name"],
                "color":  source["color"],
                "cat":    source["cat"],
                "title":  title,
                "desc":   desc,
                "link":   link,
                "date":   date,
            })
    except Exception as e:
        print(f"[ERROR] {source['name']}: {e}")
    return articles

# ─── ROUTES ──────────────────────────────────────────────────────────────────

@app.route("/api/news")
def get_all_news():
    """Fetch all news from all sources in parallel."""
    all_articles = []
    # Fetch all feeds concurrently for speed
    with ThreadPoolExecutor(max_workers=10) as executor:
        futures = {executor.submit(fetch_feed, src): src for src in SOURCES}
        per_source = []
        for future in as_completed(futures):
            result = future.result()
            if result:
                per_source.append(result)

    # Interleave so sources are mixed
    max_len = max((len(a) for a in per_source), default=0)
    for i in range(max_len):
        for src_articles in per_source:
            if i < len(src_articles):
                all_articles.append(src_articles[i])

    return jsonify({
        "count": len(all_articles),
        "sources": len(per_source),
        "articles": all_articles
    })

@app.route("/api/news/<category>")
def get_news_by_category(category):
    """Fetch news filtered by category."""
    all_articles = []
    sources = [s for s in SOURCES if s["cat"] == category]
    if not sources:
        return jsonify({"error": "Unknown category"}), 404

    with ThreadPoolExecutor(max_workers=6) as executor:
        futures = [executor.submit(fetch_feed, src) for src in sources]
        for future in as_completed(futures):
            all_articles.extend(future.result())

    return jsonify({
        "count": len(all_articles),
        "category": category,
        "articles": all_articles
    })

@app.route("/api/sources")
def get_sources():
    """Return list of all sources."""
    return jsonify(SOURCES)

@app.route("/")
def index():
    """Serve the frontend."""
    with open("index.html", "r", encoding="utf-8") as f:
        return f.read()

# ─── MAIN ────────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    print("=" * 50)
    print("  PRESS — E-Newspaper Server")
    print("  Running at: http://localhost:5000")
    print("=" * 50)
    app.run(debug=True, port=5000)
