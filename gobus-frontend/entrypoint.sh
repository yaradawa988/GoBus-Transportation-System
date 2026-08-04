#!/bin/sh
set -e

cat <<EOF > /usr/share/nginx/html/env-config.js
window._env_ = {
  API_URL: "${VITE_API_URL:-https://api.yourdomain.com}"
};
EOF

echo "✅ env-config.js generated with API_URL=${VITE_API_URL}"

exec "$@"