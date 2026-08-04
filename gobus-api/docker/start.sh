#!/bin/bash
set -e

echo "====================================="
echo "Starting GoBus Laravel Application..."
echo "====================================="

cd /var/www/html

##############################################
# إنشاء .env 
##############################################
if [ ! -f .env ]; then
    echo "Creating .env file..."
    cp .env.example .env
fi

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
# APP_KEY —
##############################################
if [ -z "$APP_KEY" ]; then
    echo "⚠️  WARNING: APP_KEY environment variable is not set!"
    echo "⚠️  Generating a temporary key — sessions/encrypted data will break on next deploy."
    echo "⚠️  Set APP_KEY permanently in CapRover App Configs."
    php artisan key:generate --force
else
    echo "✅ APP_KEY loaded from environment."
fi

##############################################
# انتظار قاعدة البيانات قبل المتابعة
##############################################
echo "Waiting for database connection..."
MAX_TRIES=30
COUNT=0
until php artisan db:show > /dev/null 2>&1; do
    COUNT=$((COUNT+1))
    if [ $COUNT -ge $MAX_TRIES ]; then
        echo "❌ Database not reachable after $MAX_TRIES attempts. Exiting."
        exit 1
    fi
    echo "DB not ready yet (attempt $COUNT/$MAX_TRIES), retrying in 3s..."
    sleep 3
done
echo "✅ Database connected."

##############################################
# Database Migration 
##############################################
echo "Running migrations..."
php artisan migrate --force

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
# Start Supervisor
##############################################
echo "Starting Supervisor..."
exec /usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf