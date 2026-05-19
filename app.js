const MAX_ICONS_PER_CATEGORY = 6;
const SEARCH_DEBOUNCE_MS = 300;

const normalizeText = (value) =>
  String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

const byNameAccentInsensitive = (left, right) =>
  left.name.localeCompare(right.name, "fr", {
    sensitivity: "base",
  });

const iconGallery = () => ({
  categories: [],
  isLoading: true,
  hasLoadError: false,
  searchInput: "",
  debouncedSearchQuery: "",
  searchDebounceTimer: null,
  brokenIconIds: new Set(),
  viewMode: "home",
  activeCategoryId: "",
  isDetailOpen: false,
  selectedIcon: null,
  rawSvgContent: "",
  detailSvgLoadError: "",
  copyError: "",
  isCopySuccessVisible: false,
  copyFeedbackTimer: null,
  previousFocusedElement: null,

  async init() {
    this.setupSearchDebounce();
    await this.loadCatalog();
  },

  setupSearchDebounce() {
    this.$watch("searchInput", (value) => {
      if (this.searchDebounceTimer) {
        clearTimeout(this.searchDebounceTimer);
      }

      this.searchDebounceTimer = setTimeout(() => {
        this.debouncedSearchQuery = value.trim();
      }, SEARCH_DEBOUNCE_MS);
    });
  },

  async loadCatalog() {
    this.isLoading = true;
    this.hasLoadError = false;

    try {
      const response = await fetch("icons.json", { cache: "no-store" });

      if (!response.ok) {
        throw new Error(`Impossible de charger icons.json (status ${response.status})`);
      }

      const data = await response.json();
      this.categories = Array.isArray(data.categories) ? data.categories : [];
    } catch (error) {
      this.hasLoadError = true;
      this.categories = [];
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  },

  get hasActiveSearch() {
    return this.debouncedSearchQuery.length > 0;
  },

  get isCategoryView() {
    return this.viewMode === "category";
  },

  allIcons() {
    return this.categories.flatMap((category) => {
      const categoryIcons = Array.isArray(category.icons) ? category.icons : [];

      return categoryIcons.map((icon) => ({
        ...icon,
        categoryLabel: category.label,
      }));
    });
  },

  displayedCategories() {
    return this.categories.map((category) => {
      const firstIcons = Array.isArray(category.icons)
        ? category.icons.slice(0, MAX_ICONS_PER_CATEGORY)
        : [];

      const limitedIcons = firstIcons.filter((icon) => !this.brokenIconIds.has(icon.id));

      return {
        id: category.id,
        label: category.label,
        limitedIcons,
      };
    });
  },

  currentCategory() {
    if (!this.activeCategoryId) {
      return null;
    }

    return this.categories.find((category) => category.id === this.activeCategoryId) || null;
  },

  currentCategoryLabel() {
    const category = this.currentCategory();
    return category ? category.label : "";
  },

  categoryIcons() {
    const category = this.currentCategory();

    if (!category || !Array.isArray(category.icons)) {
      return [];
    }

    return category.icons.filter((icon) => !this.brokenIconIds.has(icon.id));
  },

  handleCategorySelect(categoryId) {
    if (!categoryId) {
      this.goHomeView();
      return;
    }

    this.goToCategory(categoryId);
  },

  goToCategory(categoryId) {
    this.clearSearch();
    this.activeCategoryId = categoryId;
    this.viewMode = "category";
  },

  goHomeView() {
    this.viewMode = "home";
    this.activeCategoryId = "";
  },

  searchResults() {
    if (!this.hasActiveSearch) {
      return [];
    }

    const normalizedQuery = normalizeText(this.debouncedSearchQuery);

    return this.allIcons()
      .filter((icon) => !this.brokenIconIds.has(icon.id))
      .filter((icon) => {
        const normalizedName = normalizeText(icon.name);
        const normalizedKeywords = Array.isArray(icon.keywords)
          ? icon.keywords.map((keyword) => normalizeText(keyword)).join(" ")
          : "";

        return normalizedName.includes(normalizedQuery) || normalizedKeywords.includes(normalizedQuery);
      })
      .sort(byNameAccentInsensitive);
  },

  markIconAsBroken(iconId) {
    this.brokenIconIds.add(iconId);
  },

  clearSearch() {
    this.searchInput = "";
    this.debouncedSearchQuery = "";

    if (this.searchDebounceTimer) {
      clearTimeout(this.searchDebounceTimer);
      this.searchDebounceTimer = null;
    }
  },

  async openDetail(icon, categoryLabel, event) {
    this.previousFocusedElement = event?.currentTarget || null;
    this.selectedIcon = {
      ...icon,
      categoryLabel: categoryLabel || icon.categoryLabel || "",
    };
    this.isDetailOpen = true;
    this.rawSvgContent = "";
    this.detailSvgLoadError = "";
    this.copyError = "";
    this.isCopySuccessVisible = false;

    await this.loadDetailSvg();

    this.$nextTick(() => {
      if (this.$refs.detailCloseButton) {
        this.$refs.detailCloseButton.focus();
      }
    });
  },

  closeDetail() {
    this.isDetailOpen = false;
    this.selectedIcon = null;
    this.rawSvgContent = "";
    this.detailSvgLoadError = "";
    this.copyError = "";
    this.isCopySuccessVisible = false;

    if (this.copyFeedbackTimer) {
      clearTimeout(this.copyFeedbackTimer);
      this.copyFeedbackTimer = null;
    }

    if (this.previousFocusedElement) {
      this.previousFocusedElement.focus();
      this.previousFocusedElement = null;
    }
  },

  async loadDetailSvg() {
    if (!this.selectedIcon) {
      return;
    }

    try {
      const response = await fetch(this.selectedIcon.file, { cache: "no-store" });

      if (!response.ok) {
        throw new Error(`Impossible de charger le SVG (status ${response.status})`);
      }

      this.rawSvgContent = await response.text();
      this.detailSvgLoadError = "";
    } catch (error) {
      this.rawSvgContent = "";
      this.detailSvgLoadError = "Impossible de charger le fichier SVG pour cette icone.";
      console.error(error);
    }
  },

  copyButtonLabel() {
    return this.isCopySuccessVisible ? "✓ Copie !" : "Copier le SVG";
  },

  async copySvg() {
    this.copyError = "";

    if (!this.rawSvgContent) {
      this.copyError = "Copie impossible: le SVG n'est pas disponible.";
      return;
    }

    try {
      await navigator.clipboard.writeText(this.rawSvgContent);
      this.isCopySuccessVisible = true;

      if (this.copyFeedbackTimer) {
        clearTimeout(this.copyFeedbackTimer);
      }

      this.copyFeedbackTimer = setTimeout(() => {
        this.isCopySuccessVisible = false;
      }, 2000);
    } catch (error) {
      this.copyError = "La copie a echoue sur ce navigateur.";
      this.isCopySuccessVisible = false;
      console.error(error);
    }
  },

  getModalFocusableElements() {
    if (!this.$refs.detailModal) {
      return [];
    }

    const focusableSelector =
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

    return [...this.$refs.detailModal.querySelectorAll(focusableSelector)].filter(
      (element) => element.getAttribute("aria-disabled") !== "true"
    );
  },

  handleModalTab(event) {
    const focusables = this.getModalFocusableElements();

    if (focusables.length === 0) {
      return;
    }

    const currentIndex = focusables.indexOf(document.activeElement);
    const movingBackward = event.shiftKey;

    if (movingBackward) {
      const previousIndex = currentIndex <= 0 ? focusables.length - 1 : currentIndex - 1;
      focusables[previousIndex].focus();
      return;
    }

    const nextIndex = currentIndex === -1 || currentIndex === focusables.length - 1 ? 0 : currentIndex + 1;
    focusables[nextIndex].focus();
  },
});

window.iconGallery = iconGallery;
