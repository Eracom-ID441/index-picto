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
- [x] Ouvrir la modal au clic sur une carte
- [x] Desktop: drawer droit largeur 50%
- [x] Mobile: pleine largeur, hauteur auto avec marges
- [x] Afficher nom, categorie, keywords, author (si present), description (si non vide)
- [x] Afficher bouton "Copier le SVG"
- [x] Afficher bouton "Telecharger"
- [x] Ne pas afficher de bloc pre en v1

## Actions modal
- [x] Charger le SVG brut a l'ouverture detail
- [x] Copier via navigator.clipboard.writeText
- [x] Afficher "✓ Copie !" pendant 2 secondes en succes
- [x] Afficher un message d'erreur si la copie echoue
- [x] Fournir un lien download direct vers le fichier SVG

## Accessibilite
- [x] Ajouter alt/aria-label sur chaque visuel
- [x] Assurer focus visible sur tous les elements interactifs
- [x] Fermer la modal avec Echap
- [x] Implementer un focus trap complet dans la modal

## Validation finale
- [x] Tester rendu desktop (6 colonnes)
- [x] Tester rendu mobile (3 colonnes)
- [x] Tester recherche avec accents/casse
- [x] Tester cas 0 resultat
- [x] Tester SVG manquant (galerie + modal)
- [x] Tester copie SVG (succes + echec)

## V2 — Vue complete par categorie (F5)
- [x] Ajouter un lien "Voir plus" sous chaque categorie en accueil
- [x] Ajouter un dropdown categories dans le header
- [x] Ajouter une vue categorie affichant toutes les icones de la categorie active
- [x] Conserver l'ordre des icones selon icons.json dans la vue categorie
- [x] Reutiliser la grille responsive existante (desktop 6, mobile 3)
- [x] Ouvrir la modal detail depuis la vue categorie
- [x] Ajouter un bouton "Retour a l'accueil"
- [x] Synchroniser l'etat entre "Voir plus" et dropdown
- [x] Gerer le cas "Categorie introuvable"
- [x] Gerer le cas "Aucune icone disponible" dans la vue categorie
