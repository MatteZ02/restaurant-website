-- get full menu
SELECT
    *
FROM
    MenuItem;

-- get orders for a restaurant
SELECT
    *
FROM
    `Order`
WHERE
    restaurant = 1;

-- get order items for an order
SELECT
    *
FROM
    OrderItems
WHERE
    `order` = 1;

-- get user with username and password
SELECT
    *
FROM
    User
WHERE
    username = 'admin'
    AND password = 'admin';