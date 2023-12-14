# Restaurant Website

A restaurant website built with vanilla HTML and CSS along with Typescript for both frontend and backend.

## How to run
MariaDB Database

With Docker
```
docker run --name mariadb --net host -d \
    -v /var/lib/mysql:/var/lib/mysql \
    -e MYSQL_ROOT_PASSWORD= \
    --restart always \
    mariadb:latest

docker exec -it mariadb bash
mariadb-secure-installation
mysql -u root -p 
```

Or host your instance https://mariadb.org/download/

Software

Production
With Docker
```
docker build -t mattez02/restaurant-website .

docker run --name restaurant-website --net host -d \
    -e API_URL=
    -e DB_HOST=localhost \
    -e DB_NAME=restaurant \
    -e DB_USER= \
    -e DB_PASSWORD= \
    -e PORT=80 \
    -e JWT_SECRET= \
    -e STRIPE_SECRET_KEY= \
    -e STRIPE_PUBLISHABLE_KEY= \
    -e STRIPE_WEBHOOK_SECRET= \
    -e NODE_ENV= \
    --restart always \
    mattez02/restaurant-website
```
Or with NodeJS directly `npm run production`

Developlemt
With NodeJS
`npm i`
and
`npm run start`

You will also have to install and host [stripe-cli](https://github.com/stripe/stripe-cli#installation) in order to use the payment api.
