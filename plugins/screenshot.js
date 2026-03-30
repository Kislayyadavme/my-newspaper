/**
 * PRESS Plugin: Screenshot + Gallery
 * Captures page screenshots and stores in localStorage gallery
 * To update: replace only this file
 */
window.PRESS_PLUGINS = window.PRESS_PLUGINS || {};
window.PRESS_PLUGINS.screenshot = {
  name: 'Screenshot',
  version: '1.0',

  async capture() {
    // Use html2canvas if available, else fallback
    if (typeof html2canvas !== 'undefined') {
      const canvas = await html2canvas(document.body, {
        scale: 1.5,
        useCORS: true,
        backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--bg').trim() || '#080808',
        ignoreElements: el => el.id === 'ss-btn-overlay'
      });
      const dataUrl = canvas.toDataURL('image/png');
      this.saveToGallery(dataUrl);
      this.download(dataUrl);
      return dataUrl;
    } else {
      // Load html2canvas dynamically
      await this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js');
      return this.capture();
    }
  },

  saveToGallery(dataUrl) {
    try {
      const gallery = JSON.parse(localStorage.getItem('press_gallery') || '[]');
      const entry = {
        id: Date.now(),
        url: dataUrl,
        date: new Date().toISOString(),
        user: localStorage.getItem('press_username') || 'Anonymous',
        theme: localStorage.getItem('press_theme') || 'dark',
        lang: localStorage.getItem('press_lang') || 'en',
      };
      gallery.unshift(entry);
      const max = window.PRESS_CONFIG?.screenshotGallery?.maxPerUser || 10;
      localStorage.setItem('press_gallery', JSON.stringify(gallery.slice(0, max)));
      window.PRESS_PLUGINS?.gallery?.refresh?.();
    } catch(e) { console.warn('Gallery save failed:', e); }
  },

  download(dataUrl) {
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `press-${Date.now()}.png`;
    a.click();
  },

  loadScript(src) {
    return new Promise((res, rej) => {
      const s = document.createElement('script');
      s.src = src; s.onload = res; s.onerror = rej;
      document.head.appendChild(s);
    });
  }
};
