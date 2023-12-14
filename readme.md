# Restaurant Website

## How to run
Database
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

Software
```
docker build -t mattez02/restaurant-website .

docker run --name restaurant-website --net host -d \
    -e DB_HOST=localhost \
    -e DB_NAME=restaurant \
    -e DB_USER= \
    -e DB_PASSWORD= \
    -e PORT=80 \
    -e JWT_SECRET= \
    -e STRIPE_SECRET_KEY= \
    -e STRIPE_PUBLISHABLE_KEY= \
    -e STRIPE_WEBHOOK_SECRET= \
    -e NODE_ENV=production \
    -v '/etc/letsencrypt/archive/restaurant-web.northeurope.cloudapp.azure.com/fullchain3.pem:/etc/letsencrypt/live/restaurant-web.northeurope.cloudapp.azure.com/fullchain.pem:ro' \
    -v '/etc/letsencrypt/archive/restaurant-web.northeurope.cloudapp.azure.com/privkey3.pem:/etc/letsencrypt/live/restaurant-web.northeurope.cloudapp.azure.com/privkey.pem:ro' \
    --restart always \
    mattez02/restaurant-website
```

You will also have to install and host [stripe-cli](https://github.com/stripe/stripe-cli#installation) in order to use the payment api.
