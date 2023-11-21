-- update user data
UPDATE
    User
SET
    username = 'test'
WHERE
    id = 2;

-- update restaurant opening hours
UPDATE
    Restaurant
SET
    opening_hours = '10am - 6pm'
WHERE
    id = 1;

-- update order status
UPDATE
    `Order`
SET
    status = 2
WHERE
    id = 1;

-- update menu item price
UPDATE
    MenuItem
SET
    price = 4.99
WHERE
    id = 1;