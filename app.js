const MAX_ICONS_PER_CATEGORY = 6;

const iconGallery = () => ({
  categories: [],
  isLoading: true,
  hasLoadError: false,
  searchQuery: "",
  brokenIconIds: new Set(),

  async init() {
    await this.loadCatalog();
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
    return this.searchQuery.trim().length > 0;
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

  markIconAsBroken(iconId) {
    this.brokenIconIds.add(iconId);
  },

  clearSearch() {
    this.searchQuery = "";
  },

  openDetail(icon) {
    console.log("Detail a implementer", icon);
  },
});

window.iconGallery = iconGallery;
