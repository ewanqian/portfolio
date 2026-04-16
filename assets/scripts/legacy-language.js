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
