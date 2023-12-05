-- insert restaurant data
INSERT INTO
    Restaurant (name, address, opening_hours)
VALUES
    ('Restaurant 1', '123 Main St', '9am - 5pm');

INSERT INTO
    Restaurant (name, address, opening_hours)
VALUES
    ('Restaurant 2', '456 Main St', '9am - 5pm');



-- insert menu items burgers 1
INSERT INTO
    MenuItem (name, description, price, category)
VALUES
    ('Naudan Burger', '1 x 200g Naudan pihvi , 2 x Pekoniviipale, Tomaatti,
    Jäävuorisalaatti, Pikkelöity punasipuli, Jalopeno, Tulinen majoneesi,', 9.99, 1);

INSERT INTO
    MenuItem (name, description, price, category)
VALUES
    ('Kanan Burger', '1 x 200g Kanan pihvi , Tomaatti,
    Jäävuorisalaatti, Pikkelöity punasipuli, Jalopeno, Tulinen majoneesi,', 6.99, 1);

INSERT INTO
    MenuItem (name, description, price, category)
VALUES
    ('Possun Burger', '1 x 200g Possun pihvi , 2 x Pekoniviipale, Tomaatti,
    Jäävuorisalaatti, Pikkelöity punasipuli, Jalopeno, Tulinen majoneesi,', 8.99, 1);


-- insert menu items sides 2
INSERT INTO
    MenuItem (name, description, price, category)
VALUES
    ('Ranskalaiset', 'suomalaista perunaa', 2.99, 2);
INSERT INTO
    MenuItem (name, description, price, category)
VALUES
    ('Bataatti ranskalaiset', 'suomalaista bataattia', 2.99, 2);

INSERT INTO
    MenuItem (name, description, price, category)
VALUES
    ('Dippi Tulinen Paprika','laktoositon, habanero' 2.99, 2);
INSERT INTO
    MenuItem (name, description, price, category)
VALUES
    ('Dippi Kurkku','laktoositon' 2.99, 2);


-- insert menu items drinks 3
INSERT INTO
    MenuItem (name, description, price, category)
VALUES
    ('Juoma Pepsi', 3.99, 3);
INSERT INTO
    MenuItem (name, description, price, category)
VALUES
    ('Juoma Jaffa', 3.99, 3);
INSERT INTO
    MenuItem (name, description, price, category)
VALUES
    ('Juoma Coke', 3.99, 3);


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
