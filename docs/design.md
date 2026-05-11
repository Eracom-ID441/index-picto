# design.md — Référence visuelle & Design System

> **Usage LLM** : Lis ce fichier avant toute tâche d'intégration HTML/CSS.
> Les valeurs entre `[crochets]` sont à remplacer avec les valeurs réelles de la maquette Figma.

---

## Fichiers de maquette

| Fichier | Contenu |
|---------|---------|
| `mockups/desktop-gallery.png` | Page principale — grille d'icônes, sidebar catégories, barre de recherche |
| `mockups/mobile-gallery.png` | Page principale en vue mobile |
| `mockups/desktop-modal.png` | Modal de détail d'une icône (ouverte) |
| `mockups/mobile-modal.png` | Modal en vue mobile |
| `mockups/states-hover-focus.png` | États interactifs : hover sur carte, focus clavier, bouton copié |

---

## Palette de couleurs

```css
/* Arrière-plans */
--color-bg-page:        [#F8FAFC];   /* fond général de la page */
--color-bg-sidebar:     [#FFFFFF];   /* fond de la sidebar catégories */
--color-bg-card:        [#FFFFFF];   /* fond d'une carte icône */
--color-bg-card-hover:  [#F1F5F9];   /* fond d'une carte au survol */
--color-bg-modal:       [#FFFFFF];   /* fond de la modal */
--color-bg-overlay:     [rgba(0,0,0,0.4)]; /* overlay derrière la modal */

/* Textes */
--color-text-primary:   [#0F172A];   /* titres, noms d'icônes */
--color-text-secondary: [#64748B];   /* labels catégories, mots-clés */
--color-text-placeholder:[#94A3B8];  /* placeholder du champ de recherche */

/* Accent & interactivité */
--color-accent:         [#2563EB];   /* catégorie active, bouton primaire */
--color-accent-hover:   [#1D4ED8];   /* hover sur éléments accent */
--color-accent-light:   [#EFF6FF];   /* fond badge catégorie active */

/* Bordures */
--color-border:         [#E2E8F0];   /* bordures cartes, séparateurs */
--color-border-focus:   [#2563EB];   /* outline focus clavier */

/* Feedback */
--color-success:        [#16A34A];   /* bouton "✓ Copié !" */
--color-error:          [#DC2626];   /* message d'erreur */
```

---

## Typographie

```css
/* Familles */
--font-heading: '[NomPolice]', sans-serif;  /* titres, nom du site */
--font-body:    '[NomPolice]', sans-serif;  /* texte courant */
--font-mono:    '[NomPolice]', monospace;   /* bloc code SVG */

/* Tailles */
--text-xs:   11px;   /* mots-clés / tags */
--text-sm:   13px;   /* labels secondaires, compteur */
--text-base: 15px;   /* corps de texte */
--text-lg:   18px;   /* nom d'icône dans la modal */
--text-xl:   22px;   /* titre de section */
--text-2xl:  28px;   /* titre du site (header) */

/* Graisses */
--font-normal:   400;
--font-medium:   500;
--font-semibold: 600;
--font-bold:     700;

/* Hauteurs de ligne */
--leading-tight:  1.2;
--leading-normal: 1.5;
```

> **Import Google Fonts** (si applicable) :
> ```html
> <link rel="preconnect" href="https://fonts.googleapis.com">
> <link href="https://fonts.googleapis.com/css2?family=[NomPolice]&display=swap" rel="stylesheet">
> ```

---

## Espacements & géométrie

```css
/* Espacements */
--spacing-xs:  4px;
--spacing-sm:  8px;
--spacing-md:  16px;
--spacing-lg:  24px;
--spacing-xl:  32px;
--spacing-2xl: 48px;

/* Rayons de bordure */
--radius-sm:   4px;   /* badges, tags */
--radius-md:   8px;   /* cartes icônes */
--radius-lg:   12px;  /* modal, sidebar */
--radius-full: 9999px; /* boutons pill, champ de recherche */

/* Ombres */
--shadow-card:  0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04);
--shadow-card-hover: 0 4px 12px rgba(0,0,0,0.10);
--shadow-modal: 0 20px 60px rgba(0,0,0,0.15);
```

---

## Notes importantes
- La grille fait 6 colonnes en desktop, 2 en mobile
- Les cartes ont un border-radius de 8px et une ombre portée légère
- La sidebar catégories est fixe en desktop, devient un menu déroulant en mobile
- 
---

## Ce que le LLM ne doit PAS inventer

- ❌ Ne pas choisir des couleurs hors de cette palette
- ❌ Ne pas utiliser de polices autres que celles définies ci-dessus
- ❌ Ne pas ajouter d'animations non listées dans les états interactifs
- ❌ Ne pas modifier le layout (nombre de colonnes, largeur sidebar) sans instruction explicite
- ✅ Si une valeur est manquante (encore entre crochets), demander avant d'improviser
