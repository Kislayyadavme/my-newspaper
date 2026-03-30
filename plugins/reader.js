/**
 * PRESS Plugin: Reader Mode
 * Fetches and displays full article content within the site
 * To update: replace only this file
 */
window.PRESS_PLUGINS = window.PRESS_PLUGINS || {};
window.PRESS_PLUGINS.reader = {
  name: 'Reader Mode',
  version: '1.0',

  async open(article) {
    const modal = document.getElementById('reader-modal');
    const body  = document.getElementById('reader-body');
    const title = document.getElementById('reader-title');
    const meta  = document.getElementById('reader-meta');

    title.textContent = article.title;
    meta.textContent  = `${article.source} · ${article.date ? new Date(article.date).toLocaleString() : ''}`;
    body.innerHTML    = `<div class="reader-loading"><div class="reader-spinner"></div><p>Loading article…</p></div>`;
    modal.classList.add('open');

    try {
      // Try to fetch via CORS proxy
      const proxy = 'https://api.allorigins.win/get?url=';
      const res   = await fetch(proxy + encodeURIComponent(article.link), { signal: AbortSignal.timeout(8000) });
      const json  = await res.json();

      // Parse and extract readable content
      const parser  = new DOMParser();
      const doc     = parser.parseFromString(json.contents, 'text/html');

      // Remove clutter
      ['script','style','nav','header','footer','aside','iframe','noscript','.ad','.advertisement','.sidebar','.menu','[class*="ad-"]','[id*="ad-"]'].forEach(sel => {
        doc.querySelectorAll(sel).forEach(el => el.remove());
      });

      // Find main content
      const selectors = ['article','[role="main"]','main','.article-body','.post-content','.entry-content','.story-body','#article-body','#content','.content'];
      let content = null;
      for (const sel of selectors) {
        const el = doc.querySelector(sel);
        if (el && el.textContent.trim().length > 200) { content = el; break; }
      }

      if (!content) content = doc.body;

      // Clean and sanitize
      const text = content.innerHTML
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
        .replace(/on\w+="[^"]*"/g, '')
        .replace(/on\w+='[^']*'/g, '');

      body.innerHTML = `
        <div class="reader-content">${text}</div>
        <div class="reader-source-link">
          <a href="${article.link}" target="_blank" rel="noopener">→ View original on ${article.source}</a>
        </div>`;

      // Fix relative image URLs
      body.querySelectorAll('img').forEach(img => {
        const src = img.getAttribute('src');
        if (src && src.startsWith('/')) {
          try {
            const u = new URL(article.link);
            img.src = u.origin + src;
          } catch {}
        }
        img.style.maxWidth = '100%';
        img.style.height = 'auto';
      });

      // Remove all links that go offsite (keep text)
      body.querySelectorAll('a').forEach(a => {
        const span = document.createElement('span');
        span.innerHTML = a.innerHTML;
        a.replaceWith(span);
      });

    } catch(e) {
      body.innerHTML = `
        <div class="reader-fallback">
          <p>${article.desc || 'No preview available.'}</p>
          <br><br>
          <p style="color:var(--text3);font-style:italic;font-size:14px">Full article could not be loaded inline. Click below to read on ${article.source}.</p>
          <br>
          <a href="${article.link}" target="_blank" rel="noopener" style="color:var(--accent);font-family:monospace;font-size:12px;letter-spacing:0.1em;text-transform:uppercase;">→ Open on ${article.source}</a>
        </div>`;
    }
  },

  close() {
    document.getElementById('reader-modal')?.classList.remove('open');
  }
};
