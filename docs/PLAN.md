# PLAN.md — Plan d'implementation

## 1. Architecture et structure de fichiers

Structure cible:

- index.html
- style.css
- app.js
- icons.json (deja present, source unique)
- icons/ (deja present)
- docs/specs.md
- docs/PLAN.md
- docs/TODO.md

Responsabilites:

- index.html
  - Structure de page
  - Header + barre de recherche + zones de rendu
  - Templates Alpine.js pour sections categories, grille recherche, modal
  - Liens CDN (Google Fonts Epilogue + Alpine.js)

- style.css
  - Variables CSS du design system (couleurs, typo, espacements)
  - Layout mobile-first
  - Grilles: mobile 3 colonnes, desktop 6 colonnes
  - Etats interactifs: hover/focus
  - Drawer modal desktop (droite 50vw) + version mobile pleine largeur
  - Styles erreurs (plein ecran et inline)

- app.js
  - Composant racine Alpine: iconGallery()
  - Chargement et normalisation des donnees icons.json
  - Fonctions pures: recherche/filtrage/tri accent-insensible
  - Debounce 300 ms sur la recherche
  - Etat d'UI: mode normal vs recherche, modal ouverte, erreurs
  - Gestion echec image (masquer carte)
  - Chargement SVG detail, copie clipboard, feedback "copie"
  - Focus trap modal + fermeture Echap

## 2. Decoupage des taches avec dependances

Ordre recommande:

1. Squelette HTML et branchements scripts/styles
- Dependances: aucune
- Sortie: page chargee avec conteneurs de rendu

2. Variables design + layout de base
- Dependances: 1
- Sortie: structure visuelle conforme maquette (hors logique)

3. Chargement icons.json + etat Alpine minimal
- Dependances: 1
- Sortie: categories lues depuis JSON

4. Rendu mode normal
- Dependances: 3
- Regles: categories visibles, 6 icones max, ordre JSON

5. Gestion erreurs data/image
- Dependances: 3, 4
- Regles: erreur plein ecran si JSON KO, carte masquee si image KO,
  message categorie vide

6. Recherche globale
- Dependances: 3
- Regles: debounce 300 ms, recherche name/keywords, accents/casse ignores,
  tri alphabetique accent-insensible, message zero resultat

7. Bascule mode normal/recherche
- Dependances: 4, 6
- Regles: sections categories masquees quand recherche active

8. Modal detail
- Dependances: 4, 6
- Regles: drawer desktop droite 50%, mobile pleine largeur hauteur auto

9. Actions modal (copier/telecharger)
- Dependances: 8
- Regles: clipboard API, feedback 2s, message erreur si copie impossible

10. Accessibilite clavier
- Dependances: 8
- Regles: focus trap, fermeture Echap, labels et focus visibles

11. Verification manuelle complete
- Dependances: 1..10
- Regles: test desktop/mobile, erreurs reseau, SVG manquants

## 3. Sous-agents personnalises utiles

Aucun sous-agent n'est necessaire pour construire ce projet: la surface est petite
et les choix sont deja verrouilles.

Si tu veux accelerer ensuite, deux sous-agents peuvent etre utiles:

- UI-Polish Agent (optionnel)
  - Verifier fidelite visuelle vs mockups
  - Proposer ajustements CSS precis sans changer le layout

- A11y-Check Agent (optionnel)
  - Audit des labels, ordre de tabulation, focus trap, Echap
  - Retour concret des ecarts et correctifs minimaux

## 4. Roadmap V2 (F5)

Objectif V2:
- Ajouter une vue complete par categorie, accessible depuis deux points d'entree:
  - lien "Voir plus" sous chaque categorie sur l'accueil
  - dropdown categories dans le header

Etat actuel:
- V2 F5 est implemente techniquement.
- Le comportement est coherent avec la spec:
  - ouverture de la vue categorie depuis "Voir plus"
  - ouverture de la vue categorie depuis dropdown
  - affichage de toutes les icones de la categorie
  - retour accueil
  - cas "Categorie introuvable" et "Aucune icone disponible"

Decoupage V2 (trace implementation):

1. Navigation categorie depuis accueil
- Dependances: V1 complete
- Sortie: bouton "Voir plus" par section categorie

2. Navigation categorie depuis header
- Dependances: 1
- Sortie: dropdown categories synchronise avec la vue active

3. Vue categorie complete
- Dependances: 1, 2
- Sortie: grille complete de la categorie active (ordre JSON)

4. Etats et fallback
- Dependances: 3
- Sortie: gestion "Categorie introuvable" et categorie vide

5. Validation V2
- Dependances: 1..4
- Sortie: parcours "Voir plus", dropdown, retour accueil, modal detail

Pistes V2.1 (optionnel):
- URL state (hash/query) pour partager directement une categorie
- Moteur de recherche scope a la categorie active
- Ajout d'un fil d'Ariane dans la vue categorie
