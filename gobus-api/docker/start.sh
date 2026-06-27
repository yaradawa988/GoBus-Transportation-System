#!/bin/bash

set -e

echo "====================================="
echo "Starting GoBus Laravel Application..."
echo "====================================="

cd /var/www/html

##############################################
# Permissions
##############################################

echo "Setting permissions..."

mkdir -p storage/framework/cache
mkdir -p storage/framework/sessions
mkdir -p storage/framework/views
mkdir -p storage/logs

chmod -R 775 storage
chmod -R 775 bootstrap/cache

chown -R www-data:www-data storage
chown -R www-data:www-data bootstrap/cache

##############################################
# Generate APP_KEY
##############################################

if grep -q "^APP_KEY=$" .env || ! grep -q "^APP_KEY=" .env; then

    echo "Generating APP_KEY..."

    php artisan key:generate --force

fi

##############################################
# Storage Link
##############################################

if [ ! -L public/storage ]; then

    echo "Creating storage link..."

    php artisan storage:link

fi

##############################################
# Cache
##############################################

echo "Optimizing Laravel..."

php artisan optimize:clear

php artisan config:cache

php artisan route:cache

php artisan view:cache

php artisan event:cache

##############################################
# Database Migration
##############################################

echo "Running migrations..."

php artisan migrate --force

##############################################
# Start Supervisor
##############################################

echo "Starting Supervisor..."

exec /usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf