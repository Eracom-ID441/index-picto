document.addEventListener('alpine:init', () => {
  Alpine.data('iconGallery', () => ({
    // State
    categories: [],
    allIcons: [],
    searchTerm: '',
    debouncedTerm: '',
    selectedIcon: null,
    detailSvg: '',
    copyStatus: 'idle',
    loading: true,
    loadError: false,
    _debounceTimer: null,
    _focusHandler: null,

    // Lifecycle
    init() {
      this.loadIcons()

      this.$watch('searchTerm', (val) => {
        clearTimeout(this._debounceTimer)
        if (!val || val.trim() === '') {
          this.debouncedTerm = ''
          return
        }
        this._debounceTimer = setTimeout(() => {
          this.debouncedTerm = val.trim()
        }, 300)
      })
    },

    // Computed
    get isDrawerOpen() {
      return this.selectedIcon !== null
    },

    get isSearchActive() {
      return this.debouncedTerm.trim().length > 0
    },

    get visibleCategories() {
      return this.categories.map(c => ({
        ...c,
        displayIcons: c.icons.filter(i => !i.error).slice(0, 6)
      }))
    },

    get copyButtonText() {
      if (this.copyStatus === 'success') return '✓ Copié !'
      if (this.copyStatus === 'error') return 'Erreur de copie'
      return 'Copier le SVG'
    },

    get searchResults() {
      if (!this.isSearchActive) return []

      const normalize = s =>
        s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

      const term = normalize(this.debouncedTerm)

      return this.allIcons
        .filter(i => !i.error)
        .filter(i => {
          const name = normalize(i.name)
          const keywords = i.keywords.map(normalize)
          return name.includes(term) || keywords.some(k => k.includes(term))
        })
        .sort((a, b) =>
          a.name.localeCompare(b.name, 'fr', { sensitivity: 'base' })
        )
    },

    // Data loading
    async loadIcons() {
      try {
        const res = await fetch('icons.json')
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()

        data.categories.forEach(c => {
          c.icons.forEach(i => { i.error = false })
        })

        this.categories = data.categories
        this.allIcons = data.categories.flatMap(c =>
          c.icons.map(i => ({ ...i, error: false }))
        )
        this.loading = false
      } catch (e) {
        this.loadError = true
        this.loading = false
      }
    },

    handleImageError(icon) {
      icon.error = true
    },

    // Drawer
    async openDetail(icon) {
      this.selectedIcon = icon
      this.copyStatus = 'idle'
      this.detailSvg = ''

      try {
        const res = await fetch(icon.file)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        this.detailSvg = await res.text()
      } catch (e) {
        this.detailSvg = 'error'
      }

      this.$nextTick(() => this.trapFocus())
    },

    closeDrawer() {
      this.releaseFocusTrap()
      this.selectedIcon = null
      this.detailSvg = ''
      this.copyStatus = 'idle'
    },

    // Clipboard
    async copySvg() {
      if (!this.detailSvg || this.detailSvg === 'error') return
      try {
        await navigator.clipboard.writeText(this.detailSvg)
        this.copyStatus = 'success'
        setTimeout(() => { this.copyStatus = 'idle' }, 2000)
      } catch (e) {
        this.copyStatus = 'error'
      }
    },

    // Focus trap
    trapFocus() {
      const drawer = document.querySelector('.drawer')
      if (!drawer) return

      const sel = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      const els = drawer.querySelectorAll(sel)
      if (els.length > 0) els[0].focus()

      const handler = (e) => {
        if (e.key !== 'Tab') return
        const focusable = drawer.querySelectorAll(sel)
        if (focusable.length < 2) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }

      document.addEventListener('keydown', handler)
      this._focusHandler = handler
    },

    releaseFocusTrap() {
      if (this._focusHandler) {
        document.removeEventListener('keydown', this._focusHandler)
        this._focusHandler = null
      }
    }
  }))
})
