#!/bin/zsh
# Fetch client logos from Clearbit and normalize them for the brand grid.
# - Downloads PNG logos from https://logo.clearbit.com/<domain>
# - Normalizes to white-on-transparent on a 240x120 tile (logo height ~64px)
# - Outputs to: public/brands/brands_normalized/<slug>.png
#
# Usage:
#   1) Run with built-in mapping (edit D below):
#        zsh scripts/fetch-logos.zsh
#   2) Fetch a single logo by slug + domain:
#        zsh scripts/fetch-logos.zsh <slug> <domain>
#      Example:
#        zsh scripts/fetch-logos.zsh travismathew travismathew.com
#
# Requirements: zsh, curl, ImageMagick (magick or convert)

set -euo pipefail
setopt extendedglob null_glob

SCRIPT_DIR=$(cd "$(dirname "$0")" && pwd)
ROOT_DIR=$(cd "$SCRIPT_DIR/.." && pwd)
BRANDS_DIR="$ROOT_DIR/public/brands"
RAW_DIR="$BRANDS_DIR/raw"
OUT_DIR="$BRANDS_DIR/brands_normalized"

mkdir -p "$RAW_DIR" "$OUT_DIR"

# Pick ImageMagick CLI
if command -v magick >/dev/null 2>&1; then
  MAGICK=magick
elif command -v convert >/dev/null 2>&1; then
  MAGICK=convert
else
  echo "ImageMagick not found. Install via: brew install imagemagick" >&2
  exit 1
fi

# If two args are provided, treat as single fetch
if [[ ${#@} -eq 2 ]]; then
  slug="$1" ; domain="$2"
  echo "Fetching $slug ($domain) ..."
  rm -f "$RAW_DIR/$slug.png" "$OUT_DIR/$slug.png"
  if curl -fsSL "https://logo.clearbit.com/$domain" -o "$RAW_DIR/$slug.png"; then
    echo "Normalizing → $OUT_DIR/$slug.png"
    "$MAGICK" "$RAW_DIR/$slug.png" -alpha on -fuzz 5% -transparent white -fill white -colorize 100 \
      -background none -resize x64 -gravity center -extent 240x120 \
      "$OUT_DIR/$slug.png"
    echo "Done: $OUT_DIR/$slug.png"
  else
    echo "⚠️  $slug not found on Clearbit ($domain)" >&2
  fi
  exit 0
fi

# Built-in mapping (slug → domain)
# Feel free to edit/add entries here.
typeset -A D
D=(
  # re-get
  national-cryptocurrency-association nca.org
  nuface                         mynuface.com
  talent-systems                 talentsystems.com
  toshiba                        toshiba.com

  # new
  publicsq                       publicsq.com
  iverson-inc                    iverson.inc
  factory-ai                     factory.ai
  fiji-vacations                 fijivacations.com
  molina-healthcare              molinahealthcare.com
  t-mobile                       t-mobile.com
  the-honest-kitchen             thehonestkitchen.com
  netflix                        netflix.com
)

# Fetch all entries in mapping
for slug in ${(k)D}; do
  domain=${D[$slug]}
  echo "Fetching $slug ($domain) ..."
  rm -f "$RAW_DIR/$slug.png" "$OUT_DIR/$slug.png"
  if curl -fsSL "https://logo.clearbit.com/$domain" -o "$RAW_DIR/$slug.png"; then
    echo "Normalizing → $OUT_DIR/$slug.png"
    "$MAGICK" "$RAW_DIR/$slug.png" -alpha on -fuzz 5% -transparent white -fill white -colorize 100 \
      -background none -resize x64 -gravity center -extent 240x120 \
      "$OUT_DIR/$slug.png"
  else
    echo "⚠️  $slug not found on Clearbit ($domain)" >&2
  fi
  echo
done

echo "Done → $OUT_DIR"
