DROP DATABASE IF EXISTS restaurant;

CREATE DATABASE restaurant CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE USER 'restaurant' @ 'localhost' IDENTIFIED BY 'password';

GRANT ALL PRIVILEGES ON `restaurant`.* TO 'restaurant' @ 'localhost';

FLUSH PRIVILEGES;

USE restaurant;

CREATE TABLE UserLevel (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE User (
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    level INT NOT NULL,
    phone VARCHAR(255) DEFAULT NULL,
    address VARCHAR(255) DEFAULT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (level) REFERENCES UserLevel(id)
);

CREATE TABLE Restaurant (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    opening_hours VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE MenuCategory (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE MenuItem (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    description VARCHAR(255) NOT NULL,
    category INT NOT NULL,
    times_ordered INT NOT NULL DEFAULT 0,
    PRIMARY KEY (id),
    FOREIGN KEY (category) REFERENCES MenuCategory(id)
);

CREATE TABLE OrderItem (
    id INT NOT NULL AUTO_INCREMENT,
    item INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (item) REFERENCES MenuItem(id)
);

CREATE TABLE OrderStatus (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE `Order` (
    id INT NOT NULL AUTO_INCREMENT,
    user INT NOT NULL,
    restaurant INT NOT NULL,
    status INT NOT NULL,
    items INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user) REFERENCES User(id),
    FOREIGN KEY (restaurant) REFERENCES Restaurant(id),
    FOREIGN KEY (status) REFERENCES OrderStatus(id)
);

CREATE TABLE OrderItems (
    id INT NOT NULL AUTO_INCREMENT,
    `order` INT NOT NULL,
    item INT NOT NULL,
    quantity INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (`order`) REFERENCES `Order`(id),
    FOREIGN KEY (item) REFERENCES OrderItem(id)
);

ALTER TABLE
    `Order`
ADD
    FOREIGN KEY (items) REFERENCES OrderItems(id);

INSERT INTO
    UserLevel (name)
VALUES
    ('admin');

INSERT INTO
    UserLevel (name)
VALUES
    ('staff');

INSERT INTO
    UserLevel (name)
VALUES
    ('user');

INSERT INTO
    OrderStatus (name)
VALUES
    ('pending');

INSERT INTO
    OrderStatus (name)
VALUES
    ('accepted');

INSERT INTO
    OrderStatus (name)
VALUES
    ('rejected');

INSERT INTO
    OrderStatus (name)
VALUES
    ('delivered');

INSERT INTO
    MenuCategory (name)
VALUES
    ('burgers');

INSERT INTO
    MenuCategory (name)
VALUES
    ('sides');

INSERT INTO
    MenuCategory (name)
VALUES
    ('drinks');