/**
 * ╔══════════════════════════════════════════════════════╗
 * ║         PRESS — GLOBAL CONFIG FILE                  ║
 * ║  Edit THIS file only. Never touch index.html        ║
 * ║  Drop new plugin files in /plugins/ folder          ║
 * ╚══════════════════════════════════════════════════════╝
 *
 * HOW TO ADD UPDATES IN THE FUTURE:
 * ----------------------------------
 * 1. To add a news source  → add entry to PRESS_CONFIG.sources
 * 2. To add a language     → add entry to PRESS_CONFIG.languages
 * 3. To add a theme        → add entry to PRESS_CONFIG.themes
 * 4. To add a new feature  → create /plugins/myfeature.js and add to PRESS_CONFIG.plugins
 * 5. To add an animation   → add entry to PRESS_CONFIG.animations
 */

window.PRESS_CONFIG = {

  // ── API ────────────────────────────────────────────────────────────────────
  api: window.location.hostname === 'localhost'
    ? 'http://localhost:5000/api'
    : '/api',

  // ── SOURCES ────────────────────────────────────────────────────────────────
  // To add: copy any line, change name/color/cat/rss
  sources: [
    { name:'BBC News',      color:'#b5121b', cat:'world',    rss:'https://feeds.bbci.co.uk/news/rss.xml' },
    { name:'The Guardian',  color:'#052962', cat:'world',    rss:'https://www.theguardian.com/world/rss' },
    { name:'Al Jazeera',    color:'#007a3d', cat:'world',    rss:'https://www.aljazeera.com/xml/rss/all.xml' },
    { name:'Reuters',       color:'#ff8000', cat:'business', rss:'https://feeds.reuters.com/reuters/topNews' },
    { name:'NPR',           color:'#1e4480', cat:'politics', rss:'https://feeds.npr.org/1001/rss.xml' },
    { name:'TechCrunch',    color:'#0a8a00', cat:'tech',     rss:'https://techcrunch.com/feed/' },
    { name:'The Verge',     color:'#ff3d00', cat:'tech',     rss:'https://www.theverge.com/rss/index.xml' },
    { name:'Wired',         color:'#1a1a1a', cat:'tech',     rss:'https://www.wired.com/feed/rss' },
    { name:'Ars Technica',  color:'#ff4500', cat:'tech',     rss:'https://feeds.arstechnica.com/arstechnica/index' },
    { name:'NASA',          color:'#0b3d91', cat:'science',  rss:'https://www.nasa.gov/rss/dyn/breaking_news.rss' },
    { name:'Science Daily', color:'#6b4c11', cat:'science',  rss:'https://www.sciencedaily.com/rss/all.xml' },
    { name:'New Scientist', color:'#e4002b', cat:'science',  rss:'https://www.newscientist.com/feed/home/' },
    { name:'ESPN',          color:'#d00000', cat:'sports',   rss:'https://www.espn.com/espn/rss/news' },
    { name:'BBC Sport',     color:'#b5121b', cat:'sports',   rss:'https://feeds.bbci.co.uk/sport/rss.xml' },
    { name:'The Atlantic',  color:'#8b1a7a', cat:'culture',  rss:'https://www.theatlantic.com/feed/all/' },
    { name:'Bloomberg',     color:'#1e3a5f', cat:'business', rss:'https://feeds.bloomberg.com/markets/news.rss' },
  ],

  // ── LANGUAGES ──────────────────────────────────────────────────────────────
  // To add: copy a block, add translations for every key
  languages: {
    en: {
      name: 'English', flag: '🇬🇧',
      strings: {
        siteTitle: 'PRESS', tagline: "The World's Finest Journalism, Curated Daily",
        allCat: 'All', world: 'World', politics: 'Politics', business: 'Business',
        tech: 'Technology', science: 'Science', sports: 'Sports', culture: 'Culture',
        refresh: 'Refresh', search: 'Search headlines, sources…',
        topStory: 'Top Story', readFull: 'Read Full Story →', open: 'Open →',
        latestStories: 'Latest Stories', coverage: 'Coverage',
        storiesUnit: 'stories', sourcesUnit: 'sources',
        modalRead: 'Read Full Article ↗', modalClose: 'Close',
        previewNote: 'This is a preview. Click below to read the complete article on',
        loading: 'Gathering dispatches from around the globe',
        serverOffline: 'Server Offline', serverOnline: 'Server Online',
        live: 'Live Feed', breaking: 'Breaking', results: 'results',
        printPDF: '⎙ Save PDF', screenshot: '⎙ Screenshot', readHere: '📖 Read Here',
        fullArticle: 'Full Article', fontSize: 'Text Size', animation: 'Page Style',
        noAds: 'No Ads · No Tracking · No Third-Party Proxies',
        edition: 'Digital Edition',
      }
    },
    hi: {
      name: 'हिन्दी', flag: '🇮🇳',
      strings: {
        siteTitle: 'प्रेस', tagline: 'विश्व की श्रेष्ठ पत्रकारिता, प्रतिदिन',
        allCat: 'सभी', world: 'विश्व', politics: 'राजनीति', business: 'व्यापार',
        tech: 'तकनीक', science: 'विज्ञान', sports: 'खेल', culture: 'संस्कृति',
        refresh: 'रिफ्रेश', search: 'समाचार खोजें…',
        topStory: 'मुख्य समाचार', readFull: 'पूरा पढ़ें →', open: 'खोलें →',
        latestStories: 'ताज़ा समाचार', coverage: 'कवरेज',
        storiesUnit: 'समाचार', sourcesUnit: 'स्रोत',
        modalRead: 'पूरा लेख पढ़ें ↗', modalClose: 'बंद करें',
        previewNote: 'यह एक पूर्वावलोकन है। पूरा लेख पढ़ने के लिए क्लिक करें',
        loading: 'दुनिया भर से समाचार एकत्रित हो रहे हैं',
        serverOffline: 'सर्वर ऑफलाइन', serverOnline: 'सर्वर ऑनलाइन',
        live: 'लाइव', breaking: 'ब्रेकिंग', results: 'परिणाम',
        printPDF: '⎙ PDF सहेजें', screenshot: '⎙ स्क्रीनशॉट', readHere: '📖 यहाँ पढ़ें',
        fullArticle: 'पूरा लेख', fontSize: 'फ़ॉन्ट आकार', animation: 'पेज शैली',
        noAds: 'कोई विज्ञापन नहीं · कोई ट्रैकिंग नहीं',
        edition: 'डिजिटल संस्करण',
      }
    },
    ar: {
      name: 'العربية', flag: '🇸🇦', rtl: true,
      strings: {
        siteTitle: 'بريس', tagline: 'أفضل صحافة العالم، منتقاة يومياً',
        allCat: 'الكل', world: 'العالم', politics: 'سياسة', business: 'أعمال',
        tech: 'تقنية', science: 'علوم', sports: 'رياضة', culture: 'ثقافة',
        refresh: 'تحديث', search: 'ابحث في الأخبار…',
        topStory: 'الخبر الرئيسي', readFull: 'اقرأ المزيد →', open: 'فتح →',
        latestStories: 'آخر الأخبار', coverage: 'تغطية',
        storiesUnit: 'خبر', sourcesUnit: 'مصدر',
        modalRead: 'قراءة المقال الكامل ↗', modalClose: 'إغلاق',
        previewNote: 'هذا معاينة. انقر أدناه لقراءة المقال الكامل في',
        loading: 'جمع المستجدات من حول العالم',
        serverOffline: 'الخادم غير متصل', serverOnline: 'الخادم متصل',
        live: 'مباشر', breaking: 'عاجل', results: 'نتائج',
        printPDF: '⎙ حفظ PDF', screenshot: '⎙ لقطة شاشة', readHere: '📖 اقرأ هنا',
        fullArticle: 'المقال الكامل', fontSize: 'حجم الخط', animation: 'نمط الصفحة',
        noAds: 'بدون إعلانات · بدون تتبع',
        edition: 'الإصدار الرقمي',
      }
    },
    fr: {
      name: 'Français', flag: '🇫🇷',
      strings: {
        siteTitle: 'PRESS', tagline: 'Le meilleur du journalisme mondial, chaque jour',
        allCat: 'Tout', world: 'Monde', politics: 'Politique', business: 'Économie',
        tech: 'Technologie', science: 'Science', sports: 'Sports', culture: 'Culture',
        refresh: 'Actualiser', search: 'Rechercher des articles…',
        topStory: 'À la Une', readFull: 'Lire l\'article →', open: 'Ouvrir →',
        latestStories: 'Dernières nouvelles', coverage: 'Couverture',
        storiesUnit: 'articles', sourcesUnit: 'sources',
        modalRead: 'Lire l\'article complet ↗', modalClose: 'Fermer',
        previewNote: 'Ceci est un aperçu. Cliquez ci-dessous pour lire sur',
        loading: 'Collecte des dépêches du monde entier',
        serverOffline: 'Serveur hors ligne', serverOnline: 'Serveur en ligne',
        live: 'En direct', breaking: 'Flash info', results: 'résultats',
        printPDF: '⎙ Enregistrer PDF', screenshot: '⎙ Capture', readHere: '📖 Lire ici',
        fullArticle: 'Article complet', fontSize: 'Taille du texte', animation: 'Style de page',
        noAds: 'Sans publicité · Sans suivi',
        edition: 'Édition numérique',
      }
    },
    es: {
      name: 'Español', flag: '🇪🇸',
      strings: {
        siteTitle: 'PRESS', tagline: 'El mejor periodismo mundial, cada día',
        allCat: 'Todo', world: 'Mundo', politics: 'Política', business: 'Negocios',
        tech: 'Tecnología', science: 'Ciencia', sports: 'Deportes', culture: 'Cultura',
        refresh: 'Actualizar', search: 'Buscar noticias…',
        topStory: 'Historia Principal', readFull: 'Leer más →', open: 'Abrir →',
        latestStories: 'Últimas noticias', coverage: 'Cobertura',
        storiesUnit: 'historias', sourcesUnit: 'fuentes',
        modalRead: 'Leer artículo completo ↗', modalClose: 'Cerrar',
        previewNote: 'Esta es una vista previa. Haga clic abajo para leer en',
        loading: 'Recopilando noticias de todo el mundo',
        serverOffline: 'Servidor desconectado', serverOnline: 'Servidor en línea',
        live: 'En vivo', breaking: 'Urgente', results: 'resultados',
        printPDF: '⎙ Guardar PDF', screenshot: '⎙ Captura', readHere: '📖 Leer aquí',
        fullArticle: 'Artículo completo', fontSize: 'Tamaño de texto', animation: 'Estilo de página',
        noAds: 'Sin anuncios · Sin rastreo',
        edition: 'Edición digital',
      }
    },
    zh: {
      name: '中文', flag: '🇨🇳',
      strings: {
        siteTitle: '新闻', tagline: '每日精选全球最佳新闻',
        allCat: '全部', world: '世界', politics: '政治', business: '商业',
        tech: '科技', science: '科学', sports: '体育', culture: '文化',
        refresh: '刷新', search: '搜索新闻…',
        topStory: '头条新闻', readFull: '阅读全文 →', open: '打开 →',
        latestStories: '最新消息', coverage: '报道',
        storiesUnit: '条新闻', sourcesUnit: '个来源',
        modalRead: '阅读完整文章 ↗', modalClose: '关闭',
        previewNote: '这是预览。点击下方在以下网站阅读完整文章',
        loading: '正在收集全球资讯',
        serverOffline: '服务器离线', serverOnline: '服务器在线',
        live: '直播', breaking: '快讯', results: '条结果',
        printPDF: '⎙ 保存PDF', screenshot: '⎙ 截图', readHere: '📖 在此阅读',
        fullArticle: '完整文章', fontSize: '字体大小', animation: '页面样式',
        noAds: '无广告 · 无追踪',
        edition: '数字版',
      }
    },
  },

  // ── THEMES ─────────────────────────────────────────────────────────────────
  themes: {
    dark: {
      name: 'Dark Luxury', icon: '◼',
      vars: { '--bg':'#080808','--bg2':'#0f0f0f','--surface':'#1a1a1a','--border':'#2a2a2a','--border2':'#333','--text':'#e8e4dc','--text2':'#a09890','--text3':'#6a6258','--white':'#f5f0e8','--accent':'#c8a96e','--accent2':'#e8c98e' }
    },
    paper: {
      name: 'Classic Paper', icon: '📰',
      vars: { '--bg':'#f5f0e8','--bg2':'#ede8dc','--surface':'#ddd8ce','--border':'#c0b8a8','--border2':'#a8a098','--text':'#1a1612','--text2':'#4a4438','--text3':'#7a7060','--white':'#0f0e0c','--accent':'#c0392b','--accent2':'#e74c3c' }
    },
    midnight: {
      name: 'Midnight Blue', icon: '🌙',
      vars: { '--bg':'#050810','--bg2':'#0a0f1e','--surface':'#111828','--border':'#1e2a3a','--border2':'#2a3a50','--text':'#d8e8f5','--text2':'#8aaac5','--text3':'#4a6a85','--white':'#e8f4ff','--accent':'#4a9eff','--accent2':'#7ab8ff' }
    },
    forest: {
      name: 'Forest Green', icon: '🌿',
      vars: { '--bg':'#060c08','--bg2':'#0c1410','--surface':'#121e16','--border':'#1e2e22','--border2':'#2a3e2e','--text':'#d8ead8','--text2':'#88a888','--text3':'#4a684a','--white':'#e8f4e8','--accent':'#4ab84a','--accent2':'#7ad87a' }
    },
    crimson: {
      name: 'Crimson', icon: '🔴',
      vars: { '--bg':'#0a0505','--bg2':'#120808','--surface':'#1a0e0e','--border':'#2a1515','--border2':'#3a1e1e','--text':'#f0d8d8','--text2':'#c08888','--text3':'#885555','--white':'#ffe8e8','--accent':'#e83030','--accent2':'#ff5050' }
    },
    sepia: {
      name: 'Sepia Vintage', icon: '📜',
      vars: { '--bg':'#2a2018','--bg2':'#322820','--surface':'#3a3028','--border':'#4a4038','--border2':'#5a5048','--text':'#e8d8c0','--text2':'#c0a880','--text3':'#907850','--white':'#f5e8d0','--accent':'#d4a040','--accent2':'#e8b860' }
    },
  },

  // ── ANIMATIONS ─────────────────────────────────────────────────────────────
  animations: {
    fade: { name: 'Fade In', icon: '◌', description: 'Clean, elegant fade' },
    newspaper: { name: 'Newspaper Fold', icon: '📰', description: 'Classic page unfold' },
    typewriter: { name: 'Typewriter', icon: '⌨', description: 'Characters type in live' },
    slide: { name: 'Slide Up', icon: '↑', description: 'Cards slide from below' },
    flip: { name: 'Card Flip', icon: '🔄', description: '3D flip reveal' },
    none: { name: 'No Animation', icon: '—', description: 'Instant load, no motion' },
  },

  // ── FONT SIZES ─────────────────────────────────────────────────────────────
  fontSizes: {
    xs:  { name: 'XS', base: '12px', headline: '14px', hero: '24px' },
    sm:  { name: 'S',  base: '13px', headline: '16px', hero: '28px' },
    md:  { name: 'M',  base: '14px', headline: '18px', hero: '36px' },
    lg:  { name: 'L',  base: '16px', headline: '20px', hero: '44px' },
    xl:  { name: 'XL', base: '18px', headline: '24px', hero: '54px' },
    xxl: { name: 'XXL',base: '22px', headline: '28px', hero: '64px' },
  },

  // ── PLUGINS ────────────────────────────────────────────────────────────────
  // To add a new feature: create /plugins/yourfeature.js, add entry here
  plugins: [
    { name: 'PDF Export',     file: 'plugins/pdf.js',        enabled: true  },
    { name: 'Screenshot',     file: 'plugins/screenshot.js', enabled: true  },
    { name: 'Reader Mode',    file: 'plugins/reader.js',     enabled: true  },
    { name: 'Screenshots Gallery', file: 'plugins/gallery.js', enabled: true },
    // { name: 'My New Feature', file: 'plugins/myfeature.js', enabled: true },
  ],

  // ── DEFAULTS ───────────────────────────────────────────────────────────────
  defaults: {
    language:  'en',
    theme:     'dark',
    animation: 'fade',
    fontSize:  'md',
  },

  // ── SCREENSHOT GALLERY ─────────────────────────────────────────────────────
  // Visitors' screenshots are stored here (localStorage + config)
  screenshotGallery: {
    enabled: true,
    maxPerUser: 10,
    publicGallery: true,
  },
};
