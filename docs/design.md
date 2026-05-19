# design.md — Référence visuelle & Design System

> **Usage LLM** : Lis ce fichier avant toute tâche d'intégration HTML/CSS.
> Les valeurs entre `[crochets]` sont à remplacer avec les valeurs réelles de la maquette Figma.

---

## Fichiers de maquette

### Maquette mobile

| Fichier | Contenu |
|---------|---------|
| `mockups/mobile-accueil.png` | Page principale en vue mobile |
| `mockups/mobile-modal.png` | Modal de détail d'une icône (ouverte) en vue mobile |
| `mockups/mobile-icon-list.png` | Quand on est dans une catégorie, page avec toutes les icones de cette catégorie |
| `mockups/mobile-licence-page.png` | Page avec les informations de la licence |

### Maquette desktop

| Fichier | Contenu |
|---------|---------|
| `mockups/desktop-accueil.png` | Page principale — grille d'icônes |
| `mockups/desktop-icones.png` | Quand on est dans une catégorie, page avec toutes les icones de cette catégorie |
| `mockups/desktop-modal.png` | Modal de détail d'une icône (ouverte) en vue desktop |
| `mockups/desktop-page-about.png` | La page ?À propos |
| `mockups/desktop-page-licence.png` | Page avec les informations de la licence |

---

## Palette de couleurs

```css
/* Couleurs */
--color-bg-page:        #EDF0F5;   /* fond général de la page */
--color-bg-darker: #E5E6E8;   /* fond plus sombre */
--color-blue:     #0145F2;   /* contraste, contours */
--color-blue-dark:        #051BCB;   /* bordures */

/* Textes */
--color-text-primary:   #070707;   /* titres, noms d'icônes */
```

---

## Typographie

```css
/* Familles */
--font-body:    'Epilogue', sans-serif;  /* texte courant */
 */

/* Tailles */
--text-xs:   14px;   /* nom des icones mobile */
--text-sm:   15px;   /* header mobile */
--text-base: 19px;   /* corps de texte mobile */
--text-xl:   22px;   /* titre de section */
--text-2xl:  28px;   /* titre du site (header) */

/* Graisses */
--font-normal:   400;
--font-medium:   500; /* Corps de texte */
--font-semibold: 600;
--font-bold:     700;

/* Hauteurs de ligne */
--leading-tight:  1.05;
--leading-normal: 1.5;
```

### Import Google Fonts

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Epilogue:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
```

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
```

---

## Notes importantes
- La grille fait 6 colonnes en desktop, 3 en mobile
---

## Ce que le LLM ne doit PAS inventer

- ❌ Ne pas choisir des couleurs hors de cette palette
- ❌ Ne pas utiliser de polices autres que celles définies ci-dessus
- ❌ Ne pas ajouter d'animations non listées dans les états interactifs
- ❌ Ne pas modifier le layout (nombre de colonnes, largeur sidebar) sans instruction explicite
- ✅ Si une valeur est manquante (encore entre crochets), demander avant d'improviser
