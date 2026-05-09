(() => {
  const storageKey = 'cms-week-language';
  const languageToggle = document.querySelector('[data-language-toggle]');
  let currentLanguage = 'es';

  const getStoredLanguage = () => {
    try {
      return window.localStorage.getItem(storageKey);
    } catch {
      return null;
    }
  };

  const storeLanguage = (lang) => {
    try {
      window.localStorage.setItem(storageKey, lang);
    } catch {
      // Local storage can be blocked in some browser modes.
    }
  };

  const textNodes = Array.from(document.querySelectorAll('[data-en]'));
  textNodes.forEach((element) => {
    if (!element.dataset.es) element.dataset.es = element.innerHTML;
  });

  const attributeNodes = Array.from(document.querySelectorAll('[data-aria-en], [data-alt-en], [data-title-en]'));
  attributeNodes.forEach((element) => {
    if (element.dataset.ariaEn && !element.dataset.ariaEs) {
      element.dataset.ariaEs = element.getAttribute('aria-label') || '';
    }
    if (element.dataset.altEn && !element.dataset.altEs) {
      element.dataset.altEs = element.getAttribute('alt') || '';
    }
    if (element.dataset.titleEn && !element.dataset.titleEs) {
      element.dataset.titleEs = element.getAttribute('title') || '';
    }
  });

  const applyLanguage = (lang) => {
    currentLanguage = lang === 'en' ? 'en' : 'es';
    document.documentElement.lang = currentLanguage;
    document.body.dataset.lang = currentLanguage;

    if (document.body.dataset.titleEn) {
      document.title = currentLanguage === 'en'
        ? document.body.dataset.titleEn
        : document.body.dataset.titleEs || document.title;
    }

    textNodes.forEach((element) => {
      element.innerHTML = currentLanguage === 'en' ? element.dataset.en : element.dataset.es;
    });

    attributeNodes.forEach((element) => {
      if (element.dataset.ariaEn) {
        element.setAttribute('aria-label', currentLanguage === 'en' ? element.dataset.ariaEn : element.dataset.ariaEs);
      }
      if (element.dataset.altEn) {
        element.setAttribute('alt', currentLanguage === 'en' ? element.dataset.altEn : element.dataset.altEs);
      }
      if (element.dataset.titleEn) {
        element.setAttribute('title', currentLanguage === 'en' ? element.dataset.titleEn : element.dataset.titleEs);
      }
    });

    if (languageToggle) {
      languageToggle.setAttribute('aria-pressed', currentLanguage === 'en' ? 'true' : 'false');
      languageToggle.setAttribute(
        'aria-label',
        currentLanguage === 'en' ? 'Switch language to Spanish' : 'Cambiar idioma a inglés'
      );
    }

    storeLanguage(currentLanguage);
  };

  if (languageToggle) {
    languageToggle.addEventListener('click', () => {
      applyLanguage(currentLanguage === 'en' ? 'es' : 'en');
    });
  }

  applyLanguage(getStoredLanguage() === 'en' ? 'en' : 'es');
})();

(() => {
  if (!document.querySelector('nav')) return;

  const body = document.body;
  let lastY = window.scrollY;
  let ticking = false;
  const hideAfter = 96;
  const deltaThreshold = 10;

  const updateNavState = () => {
    const currentY = window.scrollY;
    const delta = currentY - lastY;

    if (currentY <= 12) {
      body.classList.remove('nav-hidden', 'nav-scrolled');
      lastY = currentY;
      ticking = false;
      return;
    }

    body.classList.add('nav-scrolled');

    if (delta > deltaThreshold && currentY > hideAfter) {
      body.classList.add('nav-hidden');
    } else if (delta < -deltaThreshold) {
      body.classList.remove('nav-hidden');
    }

    lastY = currentY;
    ticking = false;
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateNavState);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', () => {
    lastY = window.scrollY;
  });

  updateNavState();
})();
