# Changelog

Tous les changements notables apportés à ce projet seront documentés dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), et ce projet respecte le principe du [Versionnage Sémantique](https://semver.org/lang/fr/spec/v2.0.0.html).

## Version 1.3.0 - 2026-10-25

Améliorations dans la fenêtre modale. Ajout de la classe en plus du nom, suppression de l'ID qui n'apporte pas d'info utile.

## Version 1.2.0 - 2026-10-25

### Correctifs visuels

Correctifs visuels pour se rapprocher de la maquette:

- Sur la page d'accueil, les grilles d'icônes occupent toute la largeur de la fenêtre ; les titres de catégories, les boutons « voir plus » et les messages conservent une marge latérale.
- On affiche le nombre d'icônes par catégorie
- Amélioration de la fenêtre modale.
- Uniformisation des bordures bleues du site en 2 px.
- Agrandissement des icônes des pages À propos et Licence avec des dimensions fluides selon la taille de l'écran.
- Mise en page en pleine largeur, sans espacement.

Ces changements ont été effectés avec le modèle *HydraFusion (Research Preview)*, l'actuel modèle par défaut de Copilot, et ont coûté 375 crédits (31% des 1500 crédits mensuels).

### Comportement

- Le filtre par catégorie affiche désormais toutes les icônes de la catégorie sélectionnée ; le lien « voir plus » est masqué pendant ce filtrage.

## Version 1.1.0 - 2026-05-13

- Renommage des icônes

On a utilisé pour cela une ligne de commande `bash` pour le Terminal MacOS, à exécuter dans le dossier des icones.

```bash
find . -type f | while read -r f; do
  dir=$(dirname "$f")
  base=$(basename "$f")

  new=$(echo "$base" \
    | tr '[:upper:]' '[:lower:]' \
    | sed -E '
      s/24x24//g;
      s/[ _]/-/g;
      s/-+/-/g;
      s/-\././g;
      s/^-//;
      s/-$//
    ')

  mv "$f" "$dir/$new"
done
```

Résultat : 

- convertit les noms en minuscules
- remplace `_` et les espaces par `-`
- supprime 24x24
- remplacer plusieurs `---` consécutifs par un seul `-`
- évite les noms de fichiers se terminant par `-.svg`

##  Version 1.0.0 - 2026-05-19

Tentative durant le cours, avec Copilot Free. L'agent pose des questions, progresse... mais le résultat ne donne rien de concluant.

Dans l'après-midi, dans la branche ms-copilot: séance de travail avec Copilot Pro (en mode auto, il choisit le modèle GPT-5.3-Codex).

Le résultat est concluant, l'IA produit la fonctionnalité de base du site : 
- vue initiale
- fonction de recherche
- vue par catégorie