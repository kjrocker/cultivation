#!/usr/bin/env bash
#
# Deploy site/ to the server Caddy serves links.kehvyn.dev from.
#
#   scripts/deploy.sh          deploy
#   scripts/deploy.sh -n       dry run — print what would change, write nothing

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SRC="$REPO_ROOT/build/"

# Trailing slash on BOTH sides, and it matters on both:
#   site/  copies the *contents* of site/ into the destination.
#   site   would create /var/www/cultivation/site/ and break the whole deploy.
DEST="personal:/var/www/cultivation/"

dry=()
case "${1-}" in
"") ;;
-n | --dry-run) dry=(--dry-run) ;;
*)
	printf 'deploy: unknown argument %q (expected -n)\n' "$1" >&2
	exit 1
	;;
esac

# Cheap guard against rsyncing an empty or wrong tree into a --delete.
[ -f "${SRC}index.html" ] || {
	printf 'deploy: %sindex.html is missing\n' "$SRC" >&2
	exit 1
}

# --delete removes retired files; dotfiles are excluded because editor state and
# tool config turn up in working directories and don't belong on a web server.
# Nothing the page needs starts with a dot — if that changes (a .well-known/ for
# ACME is the realistic case), add a matching --include *before* this --exclude,
# since rsync takes the first matching rule. --delete leaves excluded files on
# the receiver alone, so an existing .well-known/ there is safe.
echo "deploy: $SRC -> $DEST"
rsync -avz --delete --exclude='.*' "${dry[@]}" "$SRC" "$DEST"

if [ ${#dry[@]} -gt 0 ]; then
	echo "deploy: dry run — nothing changed."
else
	echo "deploy: done."
fi
