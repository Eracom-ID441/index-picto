# Changelog

Tous les changements notables apportés à ce projet seront documentés dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), et ce projet respecte le principe du [Versionnage Sémantique](https://semver.org/lang/fr/spec/v2.0.0.html).

## [Unreleased] - 2026-10-25

### Correctifs visuels

Correctifs visuels pour se rapprocher de la maquette:

- Ajustement des bordures de navigation : liens du menu desktop en semi-bold avec séparateurs blancs de 3 px, suppression de la bordure du bouton hamburger, et bordures bleu foncé de 3 px sur le menu mobile.
- Uniformisation des bordures bleues du site en 2 px.
- Agrandissement des icônes des pages À propos et Licence avec des dimensions fluides selon la taille de l'écran, un fond gris et une bordure bleue.
- Mise en page des pages À propos et Licence en pleine largeur, sans espacement entre les sections ni double bordure à leurs jonctions.
- Suppression du padding des cartes pour aligner les blocs d'icônes sur les bords ; maintien d'un padding intérieur sur les textes.

## [Unreleased] - 2026-05-13

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

##  [Unreleased] - 2026-05-19

Tentative durant le cours, avec Copilot Free. L'agent pose des questions, progresse... mais le résultat ne donne rien de concluant.

Dans l'après-midi, dans la branche ms-copilot: séance de travail avec Copilot Pro (en mode auto, il choisit le modèle GPT-5.3-Codex).

Le résultat est concluant, l'IA produit la fonctionnalité de base du site : 
- vue initiale
- fonction de recherche
- vue par catégorie