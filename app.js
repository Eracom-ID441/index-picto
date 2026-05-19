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

  openDetail(icon) {
    console.log("Detail a implementer", icon);
  },
});

window.iconGallery = iconGallery;
