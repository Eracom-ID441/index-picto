# specs.md — SVG Icon Gallery

## Objectif
Créer un site web statique permettant de parcourir, rechercher et réutiliser une collection
de ~100 icônes SVG classées en ~10 catégories. Le site est conçu pour des développeurs et
designers qui veulent trouver et copier rapidement une icône.

## Hors périmètre (v1)
- Pas d'authentification
- Pas de favoris persistants (pas de localStorage pour l'instant)
- Pas d'upload d'icônes par l'utilisateur
- Pas de thème sombre/clair switchable (choisir l'un ou l'autre)
- Pas de pagination (100 icônes = affichage direct)

---

## F1 — Affichage de la galerie

### Description
Page principale affichant une selesciton d'icônes (6 par catégorie) sous forme de grille en fonction des catégories.

### Comportement
- Au chargement, fetch de `icons.json` → affichage de toutes les icônes
- Grille responsive : ~6 colonnes desktop, 4 tablette, 2-3 mobile
- Chaque carte icône affiche :
  - L'icône SVG (via `<img>`)
  - Le nom de l'icône en dessous

### Cas limites
- Si `icons.json` ne se charge pas → message d'erreur lisible, pas de page blanche
- Si un fichier `.svg` est manquant → icône de fallback (carré gris ou placeholder)

---


## F3 — Recherche par mot-clé

### Description
Barre de recherche filtrante sur le nom et les mots-clés des icônes.

### Comportement
- Champ de recherche visible en haut de page, toujours accessible
- Filtre en temps réel à chaque frappe (pas besoin de valider)
- Recherche sur les champs `name` et `keywords` de chaque icône
- Insensible à la casse (`"Arrow"` = `"arrow"`)
- Si aucun résultat → message "Aucune icône trouvée pour '…'"
- Réinitialisation : bouton ✕ dans le champ ou vider le texte

### Cas limites
- Recherche avec des caractères spéciaux → ne pas planter, ignorer ou sanitizer
- Recherche vide → afficher toutes les icônes (ou celles de la catégorie sélectionnée)

---

## F4 — Vue détail d'une icône

### Description
En cliquant sur une icône, une modal (ou panneau) s'ouvre avec les détails et actions.

### Dimentions
La modal est affiché 
- sur la moitié de la page en desktop dans la largeur
- prend toute la page en mobile dans la largeur


### Comportement
La modal affiche :
- L'icône en grand (ex : 200×200px)
- Son nom et sa catégorie
- Ses mots-clés (tags)
- Bouton **"Copier le SVG"** → copie le code source SVG brut dans le presse-papier
- Bouton **"Télécharger"** → télécharge le fichier `.svg`
- (Optionnel) Aperçu du code SVG dans un bloc `<pre>`

### Fermeture de la modal
- Clic sur le bouton ✕
- Touche Échap

### Feedback utilisateur
- Après "Copier le SVG" : le bouton affiche "✓ Copié !" pendant 2 secondes

### Cas limites
- Si le fetch du SVG échoue → message d'erreur dans la modal, pas de crash

---

## Structure de données — icons.json

```json
{
  "categories": [
    {
      "id": "string",           // identifiant URL-safe, ex: "ui"
      "label": "string",        // nom affiché, ex: "Interface"
      "icons": [
        {
          "id": "string",       // unique, ex: "arrow-right"
          "name": "string",     // nom lisible, ex: "Arrow Right"
          "keywords": ["string"],  // mots-clés pour la recherche
          "file": "string",     // chemin relatif, ex: "icons/ui/arrow-right.svg"
          "category": "string",  // répète l'id de la catégorie parente
          "author": "classe ID451", // auteur de l'icone
          "description": "" // description de l'icone
        }
      ]
    }
  ]
}
```

Un exemple: 

```json
{
  "categories": [
    {
      "id": "audiovisuel",
      "label": "Audiovisuel",
      "icons": [
        {
          "id": "camera",
          "name": "Caméra",
          "keywords": [
            "camera",
            "audiovisuel"
          ],
          "file": "icons/audiovisuel/camera-1.svg",
          "category": "audiovisuel",
          "author": "classe ID451",
          "description": ""
        }
      ]
    }
  ]
}
```

---

## Liste des catégories: 

- audiovisuel
- graphisme
- photo
- web
- game-design
- administration
- batiment
- services
