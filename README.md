# PRESS — E-Newspaper
## Setup in 3 steps

### 1. Install Python packages
```bash
pip install flask flask-cors feedparser
```

### 2. Put both files in the same folder
```
my-newspaper/
├── server.py
└── index.html
```

### 3. Run the server
```bash
python server.py
```

Then open your browser and go to:
**http://localhost:5000**

---

## Features
- 20 news sources (BBC, Guardian, Al Jazeera, Reuters, NPR, TechCrunch, Wired, The Verge, Ars Technica, NASA, ESPN and more)
- Categories: World, Politics, Business, Technology, Science, Sports, Culture
- Breaking news ticker
- Hero headline layout
- Click any card to expand summary
- Zero ads, zero tracking, no third-party proxies

## Adding more sources
Edit the `SOURCES` list in `server.py`:
```python
{"name": "My Source", "color": "#ff0000", "cat": "world", "rss": "https://example.com/rss"},
```
