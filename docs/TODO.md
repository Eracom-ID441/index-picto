# TODO.md — Checklist implementation

## Setup
- [x] Creer index.html avec structure principale et imports CDN
- [x] Creer style.css avec variables design system
- [x] Creer app.js avec composant Alpine racine

## Galerie (mode normal)
- [x] Charger icons.json au demarrage
- [x] Afficher toutes les categories dans l'ordre du JSON
- [x] Limiter a 6 icones max par categorie
- [x] Afficher nom + image par carte

## Gestion erreurs
- [x] Afficher un ecran d'erreur plein page si icons.json ne charge pas
- [x] Masquer une carte si son SVG est introuvable
- [x] Afficher "Aucune icone disponible" si categorie vide apres masquage

## Recherche
- [x] Ajouter un champ de recherche avec label associe
- [x] Ajouter debounce 300 ms
- [x] Filtrer sur name + keywords
- [x] Rendre la recherche insensible a la casse et aux accents
- [x] Trier les resultats alphabetiquement, accent-insensible
- [x] En recherche active, masquer les sections categories
- [x] En recherche vide, revenir au mode normal
- [x] Afficher "Aucune icone trouvee pour \"{terme}\"" si 0 resultat

## Modal detail
- [ ] Ouvrir la modal au clic sur une carte
- [ ] Desktop: drawer droit largeur 50%
- [ ] Mobile: pleine largeur, hauteur auto avec marges
- [ ] Afficher nom, categorie, keywords, author (si present), description (si non vide)
- [ ] Afficher bouton "Copier le SVG"
- [ ] Afficher bouton "Telecharger"
- [ ] Ne pas afficher de bloc pre en v1

## Actions modal
- [ ] Charger le SVG brut a l'ouverture detail
- [ ] Copier via navigator.clipboard.writeText
- [ ] Afficher "✓ Copie !" pendant 2 secondes en succes
- [ ] Afficher un message d'erreur si la copie echoue
- [ ] Fournir un lien download direct vers le fichier SVG

## Accessibilite
- [x] Ajouter alt/aria-label sur chaque visuel
- [x] Assurer focus visible sur tous les elements interactifs
- [ ] Fermer la modal avec Echap
- [ ] Implementer un focus trap complet dans la modal

## Validation finale
- [ ] Tester rendu desktop (6 colonnes)
- [ ] Tester rendu mobile (3 colonnes)
- [ ] Tester recherche avec accents/casse
- [ ] Tester cas 0 resultat
- [ ] Tester SVG manquant (galerie + modal)
- [ ] Tester copie SVG (succes + echec)
