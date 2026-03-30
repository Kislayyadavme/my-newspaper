/**
 * PRESS Plugin: PDF Export
 * Drop this file in /plugins/ — loads automatically
 * To update: replace only this file
 */
window.PRESS_PLUGINS = window.PRESS_PLUGINS || {};
window.PRESS_PLUGINS.pdf = {
  name: 'PDF Export',
  version: '1.0',

  printArticle(article) {
    const lang = window.PRESS_APP?.currentLang || {};
    const win = window.open('', '_blank');
    win.document.write(`<!DOCTYPE html><html><head>
      <meta charset="UTF-8">
      <title>${article.title}</title>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Crimson+Pro:wght@400;600&display=swap" rel="stylesheet">
      <style>
        @page { margin: 2.5cm; size: A4; }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Crimson Pro', Georgia, serif; font-size: 12pt; line-height: 1.7; color: #1a1612; background: white; }
        .header { border-bottom: 3px double #1a1612; padding-bottom: 16px; margin-bottom: 24px; }
        .masthead { font-family: 'Cormorant Garamond', serif; font-size: 36pt; font-weight: 600; letter-spacing: 0.05em; }
        .masthead span { color: #c0392b; }
        .meta { font-size: 9pt; color: #666; margin-top: 6px; letter-spacing: 0.1em; text-transform: uppercase; font-family: monospace; }
        .source-badge { display: inline-block; background: ${article.color}; color: white; font-size: 8pt; padding: 2px 8px; letter-spacing: 0.1em; text-transform: uppercase; font-family: monospace; margin-bottom: 14px; }
        h1 { font-family: 'Cormorant Garamond', serif; font-size: 22pt; font-weight: 600; line-height: 1.2; color: #0f0e0c; margin-bottom: 16px; }
        .pubdate { font-size: 9pt; color: #888; font-family: monospace; margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid #ddd; }
        .body { font-size: 12pt; line-height: 1.8; }
        .notice { margin-top: 32px; padding: 16px; border: 1px solid #ddd; font-size: 9pt; color: #888; font-style: italic; }
        .footer-bar { margin-top: 40px; padding-top: 12px; border-top: 1px solid #ddd; font-size: 8pt; color: #aaa; font-family: monospace; letter-spacing: 0.1em; text-transform: uppercase; }
        @media print { .no-print { display: none; } }
      </style>
    </head><body>
      <div class="header">
        <div class="masthead">PRE<span>SS</span></div>
        <div class="meta">Digital Edition · ${new Date().toLocaleDateString('en-US',{weekday:'long',year:'numeric',month:'long',day:'numeric'})}</div>
      </div>
      <div class="source-badge">${article.source}</div>
      <h1>${article.title}</h1>
      <div class="pubdate">${article.date ? new Date(article.date).toLocaleString() : 'Date unknown'}</div>
      <div class="body">${article.desc || 'No preview available.'}</div>
      <div class="notice">
        <strong>Preview only.</strong> This PDF contains the article summary from PRESS aggregator.
        To read the full article, visit: <strong>${article.link}</strong>
      </div>
      <div class="footer-bar">PRESS · No Ads · No Tracking · Generated ${new Date().toISOString()}</div>
      <script>window.onload=()=>{window.print();}<\/script>
    </body></html>`);
    win.document.close();
  },

  printPage() {
    document.title = 'PRESS — ' + new Date().toLocaleDateString();
    window.print();
  }
};
