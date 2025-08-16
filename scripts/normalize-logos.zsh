#!/bin/zsh
# Normalize brand logos for consistent sizing and layout.
# - Trims transparent borders
# - Resizes content to fit within CONTENT_BOX
# - Centers onto a TILE canvas with transparent background
#
# Usage:
#   scripts/normalize-logos.zsh [brands_dir]
#
# Defaults to: project_root/public/brands
# Output goes to: <brands_dir>/brands_normalized

set -euo pipefail

# Resolve brands directory (argument or default to ../public/brands relative to this script)
SCRIPT_DIR=$(cd "$(dirname "$0")" && pwd)
DEFAULT_BRANDS_DIR=$(cd "$SCRIPT_DIR/../public/brands" 2>/dev/null && pwd || echo "")
BRANDS_DIR=${1:-$DEFAULT_BRANDS_DIR}

if [[ -z "$BRANDS_DIR" || ! -d "$BRANDS_DIR" ]]; then
  echo "Brands directory not found. Pass an explicit path, e.g.:"
  echo "  scripts/normalize-logos.zsh /absolute/path/to/public/brands"
  exit 1
fi

cd "$BRANDS_DIR" || exit 1

OUT="brands_normalized"
CONTENT_BOX="200x80"   # max content box for logo graphic
TILE="240x120"         # final canvas size
mkdir -p "$OUT"

# Find PNGs case-insensitively (zsh)
setopt null_glob
files=( *.[Pp][Nn][Gg] )
if (( ${#files} == 0 )); then
  echo "No PNG files found in: $PWD"
  exit 1
fi

# Pick ImageMagick CLI
if command -v magick >/dev/null 2>&1; then
  MAGICK=magick
elif command -v convert >/dev/null 2>&1; then
  MAGICK=convert
else
  echo "ImageMagick not found. Install via: brew install imagemagick"
  exit 1
fi

i=0
for f in "${files[@]}"; do
  ((i++))
  echo "[$i/${#files}] Normalizing $f ..."
  "$MAGICK" "$f" -alpha on -trim +repage \
    -resize "$CONTENT_BOX" \
    -gravity center -background none -extent "$TILE" \
    "$OUT/${f:t}"
done

echo "Wrote $i files → $PWD/$OUT"
