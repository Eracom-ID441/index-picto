# specs.md — SVG Icon Gallery

## Objectif
Créer un site web statique permettant de parcourir, rechercher et réutiliser une collection
d'environ 100 icônes SVG classées par catégories.

Le site vise des développeurs et designers qui doivent trouver vite une icône,
prévisualiser son rendu, puis copier le SVG ou télécharger le fichier.

## Hors périmètre (v1)
- Pas d'authentification
- Pas de favoris persistants (pas de localStorage)
- Pas d'upload d'icônes
- Pas de switch thème clair/sombre
- Pas de pagination
- Pas de backend ni API

---

## Règles globales validées

### Source de vérité
- `icons.json` est la seule source de données.
- Ne jamais hardcoder des icônes dans le HTML.

### Stack
- HTML/CSS/JS vanilla
- Alpine.js via CDN
- Sans bundler

### Affichage global
- Mode normal: toutes les catégories sont visibles les unes sous les autres.
- Chaque catégorie affiche au maximum 6 icônes.
- Ordre des catégories et des icônes: ordre exact de `icons.json`.

### Responsive
- Desktop: 6 colonnes
- Mobile: 3 colonnes
- Aucun palier tablette dédié

### Erreurs
- Si `icons.json` échoue au chargement: message d'erreur plein écran.
- Si un SVG est manquant en galerie: carte masquée.
- Si une catégorie ne contient plus aucune carte visible: section affichée avec
  le message "Aucune icône disponible".

---

## F1 — Affichage de la galerie

### Description
Page principale affichant toutes les catégories et, pour chacune, une grille
des 6 premières icônes valides.

### Comportement
- Au chargement: fetch de `icons.json`
- Affichage des sections catégories dans l'ordre du JSON
- 6 icônes max par catégorie
- Chaque carte affiche:
  - L'icône via `<img src="...">`
  - Le nom de l'icône

### Accessibilité minimum
- Chaque visuel a un `alt` ou `aria-label` pertinent
- Focus visible sur tous les éléments interactifs

### Cas limites
- `icons.json` indisponible: écran d'erreur lisible
- SVG cassé: carte non affichée

---

## F3 — Recherche par mot-clé

### Description
Barre de recherche filtrante sur le nom et les mots-clés.

### Comportement
- Filtrage en temps réel avec debounce 300 ms
- Recherche sur `name` + `keywords`
- Recherche insensible à la casse et aux accents
- Tri des résultats: alphabétique, insensible aux accents
- En recherche active:
  - Les sections catégories sont masquées
  - Une grille globale unique est affichée
- En recherche vide: retour au mode normal (sections catégories)
- Message vide: "Aucune icône trouvée pour \"{terme}\""

### Cas limites
- Caractères spéciaux: ne pas planter

---

## F4 — Vue détail d'une icône

### Description
Au clic sur une carte, ouverture d'une modal/panneau de détail.

### Dimensions et placement
- Desktop: drawer latéral droit, largeur 50% du viewport
- Mobile: pleine largeur, hauteur auto avec marges

### Contenu
- Icône en grand
- Nom
- Catégorie
- Mots-clés
- Auteur (si présent)
- Description (si non vide)
- Bouton "Copier le SVG"
- Bouton "Télécharger"
- Pas de bloc `<pre>` en v1

### Actions
- Copier le SVG:
  - Utilise `navigator.clipboard.writeText()`
  - En succès: bouton "✓ Copié !" pendant 2 secondes
  - En échec: message d'erreur (pas de fallback textarea)
- Télécharger:
  - Lien `<a href="..." download>`

### Fermeture et clavier
- Bouton fermer
- Touche Echap
- Focus trap complet dans la modal

### Cas limites
- Si fetch du SVG échoue: message d'erreur dans la modal, sans crash

---

## F5 — Vue complète par catégorie (V2)

### Description
Ajouter une vue dédiée qui affiche toutes les icônes d'une catégorie (et non plus
seulement les 6 premières cartes).

### Points d'entrée
Deux chemins doivent mener à cette vue:
- Depuis la page d'accueil, sous chaque section catégorie: lien "Voir plus"
- Depuis le header: menu dropdown listant toutes les catégories

### Comportement
- Clic sur "Voir plus": ouvre la vue de la catégorie correspondante
- Sélection d'une catégorie dans le dropdown: ouvre la même vue
- La vue affiche toutes les icônes valides de la catégorie, dans l'ordre du JSON
- Grille responsive identique au reste du site:
  - Desktop: 6 colonnes
  - Mobile: 3 colonnes
- Le titre de la vue affiche le nom de la catégorie active
- La carte d'icône garde le même comportement:
  - Ouverture de la modal détail au clic
  - Même règles de copie et téléchargement

### Navigation
- Bouton/lien "Retour à l'accueil" pour revenir à la vue principale
- L'état actif de la catégorie doit rester cohérent entre lien "Voir plus" et dropdown

### Cas limites
- Si la catégorie demandée n'existe pas dans `icons.json`:
  - Afficher un message "Catégorie introuvable"
  - Proposer un retour à l'accueil
- Si tous les SVG d'une catégorie sont masqués (fichiers manquants):
  - Afficher "Aucune icône disponible" dans la vue catégorie

---

## Structure de données — icons.json

```json
{
  "categories": [
    {
      "id": "string",
      "label": "string",
      "icons": [
        {
          "id": "string",
          "name": "string",
          "keywords": ["string"],
          "file": "string",
          "category": "string",
          "author": "classe ID451",
          "description": ""
        }
      ]
    }
  ]
}
```

---

## Liste des catégories (actuelles)
- audiovisuel
- graphisme
- photo
- web
- game-design
- administration
- batiment
- services