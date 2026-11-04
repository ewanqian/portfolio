(function () {
  const STORAGE_KEY = 'portfolio-lang';

  function pickInitialLanguage() {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === 'zh' || saved === 'en') {
      return saved;
    }

    const browser = String(window.navigator.language || '').toLowerCase();
    return browser.startsWith('zh') ? 'zh' : 'en';
  }

  function setMetaDescription(value) {
    const meta = document.querySelector('meta[name="description"]');
    if (meta && typeof value === 'string') {
      meta.setAttribute('content', value);
    }
  }

  function applyDataLanguage(language) {
    document.querySelectorAll('[data-lang-zh],[data-lang-en]').forEach((element) => {
      const next = element.getAttribute(`data-lang-${language}`);
      if (next == null) {
        return;
      }
      element.innerHTML = next;
    });
  }

  function applyOperations(operations) {
    operations.forEach((operation) => {
      const elements = document.querySelectorAll(operation.selector);
      if (!elements.length) {
        return;
      }

      elements.forEach((element, index) => {
        const textValue = Array.isArray(operation.text) ? operation.text[index] : operation.text;
        const htmlValue = Array.isArray(operation.html) ? operation.html[index] : operation.html;
        const attrsValue = Array.isArray(operation.attrs) ? operation.attrs[index] : operation.attrs;

        if (htmlValue != null) {
          element.innerHTML = htmlValue;
        } else if (textValue != null) {
          element.textContent = textValue;
        }

        if (attrsValue && typeof attrsValue === 'object') {
          Object.entries(attrsValue).forEach(([name, value]) => {
            element.setAttribute(name, value);
          });
        }
      });
    });
  }

  function applyCanonicalProjectNames(language) {
    const pathname = window.location.pathname.toLowerCase();
    const isZh = language !== 'en';

    if (pathname.endsWith('/works/timer.html')) {
      const heading = document.querySelector('#project-title, .project-title, h1');
      if (heading) {
        heading.textContent = isZh ? 'TIMER / 控时者' : 'TIMER';
      }
      document.querySelectorAll('h2,h3,strong,span,a').forEach((element) => {
        const text = (element.textContent || '').trim();
        if (text === 'TIMER 控时者 影像环形版') {
          element.textContent = isZh ? 'TIMER / 控时者 —「加载…权限 2」' : 'TIMER · Loading… Access 2';
        }
      });
    }

    if (pathname.endsWith('/works/drop-flow.html')) {
      const heading = document.querySelector('.hero-title, h1');
      if (heading) {
        heading.textContent = isZh ? 'Drop Flow / 滴流' : 'Drop Flow';
      }
      document.querySelectorAll('h2,h3,strong,span,a').forEach((element) => {
        const text = (element.textContent || '').trim();
        if (text === '杭州双年展：开幕式展演') {
          element.textContent = isZh ? 'Drop Flow / 滴流 — 杭州双年展开幕式' : 'Drop Flow · Hangzhou Biennale';
        }
      });
    }
  }

  function updateToggleState(language) {
    document.querySelectorAll('[data-set-language]').forEach((button) => {
      const active = button.getAttribute('data-set-language') === language;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  }

  function applyLanguage(language) {
    const normalized = language === 'en' ? 'en' : 'zh';
    window.localStorage.setItem(STORAGE_KEY, normalized);
    document.documentElement.lang = normalized === 'en' ? 'en' : 'zh-CN';
    document.documentElement.dataset.siteLang = normalized;

    applyDataLanguage(normalized);
    updateToggleState(normalized);

    const config = window.PORTFOLIO_LEGACY_I18N;
    const localized = config?.[normalized];
    if (localized) {
      if (localized.title) {
        document.title = localized.title;
      }
      if (localized.description) {
        setMetaDescription(localized.description);
      }
      if (Array.isArray(localized.ops)) {
        applyOperations(localized.ops);
      }
    }

    applyCanonicalProjectNames(normalized);
  }

  function bindButtons() {
    document.querySelectorAll('[data-set-language]').forEach((button) => {
      button.addEventListener('click', () => {
        applyLanguage(button.getAttribute('data-set-language'));
      });
    });
  }

  function init() {
    bindButtons();
    applyLanguage(pickInitialLanguage());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }

  window.PortfolioLegacyLanguage = {
    get: pickInitialLanguage,
    set: applyLanguage
  };
})();
