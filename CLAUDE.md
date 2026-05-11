# CLAUDE.md — SVG Icon Gallery

## Comportement attendu
Préfère le feedback direct et honnête plutôt que l'approbation. Corrige-moi si j'ai tort, souligne les faiblesses et les alternatives plutôt que de valider mon approche.

Réponses concises, mais complètes là où ça compte. Tout n'a pas besoin d'être une liste à puces, utilise-les uniquement quand c'est justifié.

N'écris pas du code trop compact ou inutilement optimisé : le code doit être simple. Même si c'est verbeux et basique, du code lisible c'est mieux.

## Process de démarrage
Interviewe-moi avant de faire quoi que ce soit d'autre. Creuse en profondeur :

- Les décisions d'implémentation technique que la spec ne couvre pas
- Les hypothèses UI/UX qui nécessitent validation
- Les ambiguïtés ou contradictions dans la spec
- Les compromis dont je devrais être conscient

Ne pose pas de questions évidentes. Continue l'interview jusqu'à ce qu'on ait tout couvert, une série de questions à la fois.

Pose-moi les questions les unes après les autres, à choix multiple.

Ensuite, à partir de notre discussion, propose :

1. L'architecture et la structure de fichiers
2. Le découpage des tâches avec dépendances et ordre d'exécution
3. Si des sous-agents personnalisés seraient utiles, et si oui, ce qu'ils feraient

Ensuite, de retour en mode accept edits, mets à jour @docs/specs.md avec ce qu'on a discuté et toute l'information manquante nécessaire.

Écris le plan d'implémentation dans docs/PLAN.md. Écris la checklist des tâches dans docs/TODO.md.

## Vue d'ensemble du projet
Site web statique présentant une collection d'environ 100 icônes SVG organisées en ~10 catégories.
Pas de backend, pas de build step, pas de base de données. Tout fonctionne dans le navigateur.

## Stack technique
- **HTML/CSS/JS** vanilla — pas de bundler, pas de framework
- **Alpine.js** (CDN) — réactivité et interactions UI
- **JSON** — source de données unique (`icons.json`)
- **SVG** — format des icônes, embarqué inline ou chargé depuis `/icons/`

## Structure des fichiers proposée
```
/
├── index.html          ← Point d'entrée unique
├── style.css           ← Styles globaux
├── app.js              ← Logique Alpine.js principale
├── icons.json          ← Catalogue complet (source de vérité)
└── icons/
    ├── ui/             ← Fichiers .svg organisés par catégorie
    ├── arrows/
    ├── social/
    └── ...
```

## Référence visuelle
Consulte `docs/design.md` et les images dans `mockups/` pour le rendu attendu.


## Format du fichier icons.json
```json
{
  "categories": [
    {
      "id": "ui",
      "label": "Interface",
      "icons": [
        {
          "id": "arrow-right",
          "name": "Arrow Right",
          "keywords": ["arrow", "next", "forward", "direction"],
          "file": "icons/ui/arrow-right.svg",
          "category": "ui"
        }
      ]
    }
  ]
}
```
**Règle absolue** : `icons.json` est la seule source de vérité. Ne jamais hardcoder d'icônes dans le HTML.

## Conventions de code

### Alpine.js
- Un seul composant racine `x-data="iconGallery()"` sur le `<body>` ou le conteneur principal
- La logique métier va dans `app.js`, pas dans les attributs `x-data` inline
- Préférer `x-show` à `x-if` pour les éléments qui s'affichent/masquent fréquemment

### CSS
- Variables CSS pour toutes les couleurs et tailles (`--color-primary`, `--spacing-sm`, etc.)
- Pas de framework CSS (pas de Tailwind, pas de Bootstrap)
- Mobile-first

### JavaScript
- Vanilla ES6+ (arrow functions, async/await, template literals)
- Pas de dépendances npm — tout via CDN si nécessaire
- Fonctions pures pour filtrage/recherche (plus facile à tester manuellement)

## Fonctionnement de la recherche
- Filtre côté client sur les champs `name` et `keywords` de chaque icône
- Recherche insensible à la casse et aux accents (normaliser avec `localeCompare` ou `.normalize()`)
- Pas de debounce obligatoire (100 icônes = charge négligeable), mais bienvenu pour la UX

## Ce qu'il ne faut PAS faire
- ❌ Ne pas introduire de bundler (Vite, Webpack) sans discussion préalable
- ❌ Ne pas utiliser de framework CSS externe
- ❌ Ne pas créer de backend ou d'API
- ❌ Ne pas modifier la structure de `icons.json` sans mettre à jour ce fichier
- ❌ Ne pas utiliser `document.write()` ou `innerHTML` avec du contenu non sanitizé

## Copier le code SVG
Lorsque l'utilisateur clique "Copier le SVG", le contenu brut du fichier `.svg` est copié via `navigator.clipboard.writeText()`.
Fallback si l'API clipboard n'est pas disponible : afficher le code dans une `<textarea>` sélectionnée.

## Télécharger une icône
Utiliser un lien `<a href="..." download>` pointant vers le fichier `.svg`. Pas de génération dynamique.

## Accessibilité (minimum requis)
- Chaque icône dans la grille doit avoir un `alt` ou `aria-label` avec son nom
- La barre de recherche doit avoir un `<label>` associé
- La modal de détail doit être fermable au clavier (touche Échap)
- Focus visible sur tous les éléments interactifs

## Performance
- Les SVG ne sont PAS embarqués inline dans la page d'accueil (trop lourd pour 100 icônes)
- Ils sont chargés via `<img src="...">` dans la grille
- Le SVG inline n'est chargé (via fetch) que dans la vue détail / pour la copie
