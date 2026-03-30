/**
 * PRESS Plugin: Screenshot Gallery
 * Shows all captured screenshots in a browsable gallery
 * To update: replace only this file
 */
window.PRESS_PLUGINS = window.PRESS_PLUGINS || {};
window.PRESS_PLUGINS.gallery = {
  name: 'Gallery',
  version: '1.0',

  open() {
    const modal = document.getElementById('gallery-modal');
    modal?.classList.add('open');
    this.refresh();
  },

  close() {
    document.getElementById('gallery-modal')?.classList.remove('open');
  },

  refresh() {
    const container = document.getElementById('gallery-grid');
    if (!container) return;

    try {
      const gallery = JSON.parse(localStorage.getItem('press_gallery') || '[]');
      if (!gallery.length) {
        container.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px;font-family:monospace;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:var(--text3);">No screenshots yet.<br><br>Use the ⎙ Screenshot button to capture the page.</div>`;
        return;
      }
      container.innerHTML = gallery.map((entry, i) => `
        <div class="gal-item" onclick="PRESS_PLUGINS.gallery.view(${i})">
          <img src="${entry.url}" alt="Screenshot ${i+1}" style="width:100%;display:block;aspect-ratio:9/5;object-fit:cover;">
          <div class="gal-meta">
            <span>${new Date(entry.date).toLocaleDateString()}</span>
            <span>${entry.user}</span>
          </div>
          <button class="gal-del" onclick="event.stopPropagation();PRESS_PLUGINS.gallery.delete(${entry.id})" title="Delete">✕</button>
        </div>`).join('');
    } catch(e) {
      container.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:40px;color:var(--text3);font-family:monospace;font-size:11px;">Error loading gallery.</div>`;
    }
  },

  view(index) {
    const gallery = JSON.parse(localStorage.getItem('press_gallery') || '[]');
    const entry = gallery[index];
    if (!entry) return;
    const win = window.open('', '_blank');
    win.document.write(`<html><body style="margin:0;background:#000;"><img src="${entry.url}" style="max-width:100%;display:block;margin:auto;"></body></html>`);
  },

  delete(id) {
    try {
      let gallery = JSON.parse(localStorage.getItem('press_gallery') || '[]');
      gallery = gallery.filter(e => e.id !== id);
      localStorage.setItem('press_gallery', JSON.stringify(gallery));
      this.refresh();
    } catch {}
  },

  clearAll() {
    if (confirm('Delete all screenshots?')) {
      localStorage.removeItem('press_gallery');
      this.refresh();
    }
  }
};
