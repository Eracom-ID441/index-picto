# TODO.md — Checklist v1

## Étape 1 : Fichiers de base
- [ ] Creer `index.html` avec structure Alpine + CDN (Epilogue, Alpine)
- [ ] Creer `style.css` avec les variables du design system
- [ ] Creer `app.js` avec le composant racine `iconGallery()`

## Étape 2 : F1 — Galerie
- [ ] Charger `icons.json` au demarrage via fetch
- [ ] Afficher toutes les categories dans l'ordre du JSON
- [ ] Limiter a 6 icones max par categorie
- [ ] Afficher l'icone (via `<img>`) et le nom sur chaque carte
- [ ] Carte cliquable avec `role="button"`, `tabindex="0"`, entree clavier

## Étape 3 : Gestion erreurs (F1)
- [ ] Ecran d'erreur plein page si `icons.json` echoue
- [ ] Masquer carte si le SVG est introuvable (`@error` on img)
- [ ] Afficher "Aucune icone disponible" si categorie vide apres masquage

## Étape 4 : F3 — Recherche
- [ ] Champ de recherche avec `<label>` associe
- [ ] Debounce 300ms (searchTerm immediat, debouncedTerm differe)
- [ ] Recherche insensible a la casse et aux accents (NFD + `localeCompare`)
- [ ] Filtrer sur `name` + `keywords`
- [ ] Trier les resultats alphabetiquement, accent-insensible
- [ ] En recherche active : masquer les sections categories, afficher grille globale
- [ ] En recherche vide : revenir au mode normal
- [ ] Message "Aucune icone trouvee pour \"{terme}\"" si 0 resultat

## Étape 5 : F4 — Drawer detail
- [ ] Ouvrir le drawer au clic sur une carte
- [ ] Desktop : overlay latéral droit, largeur 50% viewport
- [ ] Mobile : pleine largeur, hauteur auto, centre
- [ ] Backdrop semi-transparent, clic pour fermer
- [ ] Afficher : icone en grand, nom, categorie, keywords, auteur (si present), description (si non vide)
- [ ] Charger le SVG inline via fetch a l'ouverture
- [ ] Si fetch SVG echoue : message d'erreur dans le drawer

## Étape 6 : Actions drawer
- [ ] Bouton "Copier le SVG" : `navigator.clipboard.writeText()`
- [ ] Succes : "✓ Copié !" pendant 2 secondes
- [ ] Echec : message d'erreur
- [ ] Bouton "Telecharger" : lien `<a href="..." download>`

## Étape 7 : Accessibilite
- [ ] `alt`/`aria-label` sur chaque icone
- [ ] Focus visible sur tous les elements interactifs
- [ ] Fermeture du drawer avec la touche Echap
- [ ] Focus trap dans le drawer ouvert

## Étape 8 : Validation
- [ ] Desktop : grille 6 colonnes
- [ ] Mobile : grille 3 colonnes
- [ ] Recherche avec accents/casse
- [ ] Cas 0 resultat
- [ ] SVG manquant (galerie + drawer)
- [ ] Erreur chargement icons.json
- [ ] Copie SVG (succes + echec)
- [ ] Navigation clavier dans le drawer (Tab, Echap)

---

## V2 — Vue complete par categorie (F5)
- [ ] Ajouter un lien "Voir plus" sous chaque categorie en accueil
- [ ] Ajouter un dropdown categories dans le header
- [ ] Ajouter une vue categorie affichant toutes les icones de la categorie active
- [ ] Conserver l'ordre des icones selon icons.json dans la vue categorie
- [ ] Reutiliser la grille responsive existante (desktop 6, mobile 3)
- [ ] Ouvrir la modal detail depuis la vue categorie
- [ ] Ajouter un bouton "Retour a l'accueil"
- [ ] Synchroniser l'etat entre "Voir plus" et dropdown
- [ ] Gerer le cas "Categorie introuvable"
- [ ] Gerer le cas "Aucune icone disponible" dans la vue categorie
