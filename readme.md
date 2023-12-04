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
    -e DATABASE_HOST=localhost \
    -e DATABASE_NAME=restaurant \
    -e DATABASE_USER= \
    -e DATABASE_PASSWORD= \
    -e PORT=80 \
    -e JWT_SECRET= \
    --restart always \
    mattez02/restaurant-website
```