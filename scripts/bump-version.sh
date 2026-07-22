#!/usr/bin/env bash
set -euo pipefail

stamp=$(date +%Y%m%d%H%M)
for f in index.html about.html contact.html extracurriculars.html; do
  sed -i '' "s/?v=[0-9.]*/?v=$stamp/g" "$f"
done
echo "Bumped cache version to $stamp"
