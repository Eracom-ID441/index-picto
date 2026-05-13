# Changelog

Tous les changements notables apportés à ce projet seront documentés dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), et ce projet respecte le principe du [Versionnage Sémantique](https://semver.org/lang/fr/spec/v2.0.0.html).

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