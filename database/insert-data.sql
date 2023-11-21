-- insert restaurant data
INSERT INTO
    Restaurant (name, address, opening_hours)
VALUES
    ('Restaurant 1', '123 Main St', '9am - 5pm');

INSERT INTO
    Restaurant (name, address, opening_hours)
VALUES
    ('Restaurant 2', '456 Main St', '9am - 5pm');

-- insert menu items
INSERT INTO
    MenuItem (name, description, price, restaurant)
VALUES
    ('Item 1', 'Item 1 description', 1.99, 1);

INSERT INTO
    MenuItem (name, description, price, restaurant)
VALUES
    ('Item 2', 'Item 2 description', 2.99, 1);

INSERT INTO
    MenuItem (name, description, price, restaurant)
VALUES
    ('Item 3', 'Item 3 description', 3.99, 1);

-- insert user data
INSERT INTO
    User (
        username,
        password,
        first_name,
        last_name,
        email,
        phone,
        level
    )
VALUES
    (
        'admin',
        'admin',
        'Admin',
        'User',
        'admin@restaurant.org',
        '555-555-5555',
        1
    );

INSERT INTO
    User (
        username,
        password,
        first_name,
        last_name,
        email,
        phone,
        level
    )
VALUES
    (
        'staff',
        'staff',
        'Staff',
        'User',
        'staff@restaurant.org',
        '555-555-5555',
        2
    );

INSERT INTO
    User (
        username,
        password,
        first_name,
        last_name,
        email,
        phone,
        level
    )
VALUES
    (
        'user',
        'user',
        'User',
        'User',
        'user@restaurant.org',
        '555-555-5555',
        3
    );

-- insert order and order items
INSERT INTO
    `Order` (user, restaurant, status, items)
VALUES
    (1, 1, 1, 1);

INSERT INTO
    OrderItems (`order`, item, quantity)
VALUES
    (1, 1, 1);

INSERT INTO
    OrderItems (`order`, item, quantity)
VALUES
    (1, 2, 1);