window.iconGallery = function iconGallery() {
  return {
    categories: [],
    search: '',
    error: false,
    modalOpen: false,
    modalIcon: null,
    modalCategory: null,
    modalSvg: '',
    modalError: '',
    copied: false,
    downloaded: false,
    copyFallback: false,
    lastFocused: null,
    iconSize: 64,
    categoryFilter: '',
    expandedCategories: [],
    menuOpen: false,
    async init() {
      try {
        const res = await fetch('icons.json');
        if (!res.ok) throw new Error('fetch');
        const data = await res.json();
        this.categories = data.categories.map(cat => ({...cat, icons: cat.icons.map(icon => ({...icon, categoryObj: cat}))}));
      } catch (e) {
        this.error = true;
      }
    },
    iconImgSrc(icon) {
      return icon.file;
    },
    hideIcon(icon, cat) {
      cat.icons = cat.icons.filter(i => i.id !== icon.id);
    },
    get filteredCategories() {
      if (!this.categoryFilter) return this.categories;
      return this.categories.filter(cat => cat.id === this.categoryFilter);
    },
    get searchResults() {
      if (!this.search.trim()) return [];
      const norm = s => s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
      const term = norm(this.search);
      let results = [];
      this.categories.forEach(cat => {
        cat.icons.forEach(icon => {
          if (
            norm(icon.name).includes(term) ||
            (icon.keywords && icon.keywords.some(k => norm(k).includes(term)))
          ) {
            results.push({...icon, categoryObj: cat});
          }
        });
      });
      results.sort((a, b) => norm(a.name).localeCompare(norm(b.name)));
      return results;
    },
    get searchActive() {
      return !!this.search.trim();
    },
    resetHome() {
      this.search = '';
      this.categoryFilter = '';
      this.closeModal();
      this.menuOpen = false;
    },
    toggleCategory(id) {
      const idx = this.expandedCategories.indexOf(id);
      if (idx === -1) {
        this.expandedCategories.push(id);
      } else {
        this.expandedCategories.splice(idx, 1);
      }
    },
    isCategoryExpanded(id) {
      if (this.categoryFilter === id) return true;
      return this.expandedCategories.includes(id);
    },
    openModal(icon, cat) {
      this.modalIcon = icon;
      this.modalCategory = cat;
      this.modalOpen = true;
      this.modalSvg = '';
      this.modalError = '';
      this.copied = false;
      this.downloaded = false;
      this.copyFallback = false;
      this.lastFocused = document.activeElement;
      fetch(icon.file)
        .then(r => r.ok ? r.text() : Promise.reject('fetch'))
        .then(svg => { this.modalSvg = svg; })
        .catch(() => { this.modalError = 'Erreur lors du chargement du SVG.'; });
      this.$nextTick(() => {
        const modal = document.querySelector('.iconlib-modal-panel');
        if (modal) modal.focus();
      });
    },
    closeModal() {
      this.modalOpen = false;
      this.modalIcon = null;
      this.modalCategory = null;
      this.modalSvg = '';
      this.modalError = '';
      this.copied = false;
      this.downloaded = false;
      this.copyFallback = false;
      if (this.lastFocused) this.lastFocused.focus();
    },
    markDownloaded() {
      this.downloaded = true;
      setTimeout(() => { this.downloaded = false; }, 2000);
    },
    async copySvg() {
      if (!this.modalSvg) return;
      try {
        await navigator.clipboard.writeText(this.modalSvg);
        this.copied = true;
        setTimeout(() => { this.copied = false; }, 2000);
      } catch (e) {
        this.copyFallback = true;
        setTimeout(() => { this.copyFallback = false; }, 8000);
      }
    }
  };
}
