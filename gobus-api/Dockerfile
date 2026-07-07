############################
# Stage 1: Composer environment
############################

FROM composer:2 AS composer

WORKDIR /app

COPY composer.json composer.lock ./

RUN composer install \
    --no-dev \
    --prefer-dist \
    --optimize-autoloader \
    --ignore-platform-reqs \
    --no-interaction \
    --no-scripts

COPY . .

RUN composer dump-autoload --optimize


############################
# Stage 2: Production environment
############################

FROM php:8.2-fpm

LABEL maintainer="GoBus"

WORKDIR /var/www/html

RUN apt-get update && apt-get install -y \
    nginx \
    supervisor \
    git \
    unzip \
    zip \
    curl \
    cron \
    libzip-dev \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    libonig-dev \
    libxml2-dev \
    libicu-dev \
    libpq-dev \
    libcurl4-openssl-dev \
    libssl-dev \
    libjpeg-dev \
    libwebp-dev \
    libxpm-dev \
    libmagickwand-dev \
    && docker-php-ext-configure gd \
    --with-freetype \
    --with-jpeg \
    --with-webp \
    && docker-php-ext-install \
    pdo \
    pdo_mysql \
    bcmath \
    exif \
    intl \
    gd \
    zip \
    opcache

RUN pecl install redis \
    && docker-php-ext-enable redis


COPY --from=composer /app /var/www/html

RUN cp .env.example .env
RUN php artisan package:discover --ansi

COPY docker/nginx.conf /etc/nginx/sites-enabled/default
COPY docker/php.ini /usr/local/etc/php/conf.d/custom.ini
COPY docker/www.conf /usr/local/etc/php-fpm.d/www.conf
COPY docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY docker/start.sh /start.sh

RUN chmod +x /start.sh

RUN chown -R www-data:www-data /var/www/html

EXPOSE 80

CMD ["/start.sh"]
