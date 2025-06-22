#!/usr/bin/env bash

# Directory to watch (default to current directory if not provided)
WATCH_DIR="${1:-.}"

on_change() {
    local file="$1"
#    ffmpeg \
#      -i "${file}" \
#      -c:v libx264 \
#      -preset fast \
#      -crf 18 \
#      -profile:v high \
#      -pix_fmt yuv420p \
#      -c:a aac \
#      -b:a 320k \
#      "${WATCH_DIR}/out/$(basename "$file")"
    cp "${file}" "${WATCH_DIR}/out/$(basename "$file")"
}

# Check if inotifywait is installed
if ! command -v inotifywait >/dev/null 2>&1; then
    echo "Error: inotifywait is not installed."
    exit 1
fi

# Start watching using inotifywait
inotifywait -m -e close_write --format '%w%f' "$WATCH_DIR/in" | while read file; do
    on_change "$file"
done
