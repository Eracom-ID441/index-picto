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
--color-bg:		#EDF0F5 ;	/* fond général de la page */
--color-blue: 	#0145F2 ; 	/* couleur du header et des bordures et textes */

/* Textes */
--color-text:	#070707 ;	/* titres, noms d'icônes */
--color-lien:	#0145F2 ;	/* lien voir plus*/


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
