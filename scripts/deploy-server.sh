#!/bin/sh
set -eu

HOST="1.14.95.171"
PORT="22"
USER="hoshi-deploy"
DOMAIN="junjiee.online"
KEY="${HOSHI_SSH_KEY:-$HOME/.ssh/hoshi_server_ed25519}"
ROOT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
REMOTE_SOURCE="/srv/hoshi-no-shiori/source"
REMOTE_RELEASES="/var/www/hoshi-no-shiori/releases"

SSH="ssh -i $KEY -o IdentitiesOnly=yes -p $PORT"

echo "[1/3] Syncing source and media..."
rsync -az --delete \
  --exclude='.git/' \
  --exclude='node_modules/' \
  --exclude='dist/' \
  --exclude='.astro/' \
  -e "$SSH" \
  "$ROOT_DIR/" "$USER@$HOST:$REMOTE_SOURCE/"

echo "[2/3] Building on server..."
$SSH "$USER@$HOST" "set -eu
cd '$REMOTE_SOURCE'
pnpm install --frozen-lockfile
ok=0
for attempt in 1 2 3; do
  echo \"Build attempt \$attempt\"
  rm -rf dist
  if SITE_URL='https://$DOMAIN' BASE_PATH='/' pnpm build; then ok=1; break; fi
done
[ \"\$ok\" -eq 1 ]
stamp=\$(date +%Y%m%d-%H%M%S)
release='$REMOTE_RELEASES'/\$stamp
mkdir -p \"\$release\"
rsync -a --delete dist/ \"\$release/\"
ln -sfn \"\$release\" /var/www/hoshi-no-shiori/current
ls -1dt '$REMOTE_RELEASES'/* 2>/dev/null | tail -n +6 | xargs -r rm -rf
sudo nginx -t
sudo systemctl reload nginx
echo \"Published: \$release\""

echo "[3/3] Verifying production..."
curl -fsS --max-time 30 "https://$DOMAIN/" >/dev/null
curl -fsS --max-time 30 "https://$DOMAIN/gallery/" >/dev/null
curl -fsS --max-time 30 "https://$DOMAIN/robots.txt" >/dev/null
echo "Deployment complete: https://$DOMAIN/"
