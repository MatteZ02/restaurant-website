-- insert menu items burgers 1
INSERT INTO
    MenuItem (name, description, price, category)
VALUES
    (
        'Naudan Burger',
        '1 x 200g Naudan pihvi , 2 x Pekoniviipale, Tomaatti,
    Jäävuorisalaatti, Pikkelöity punasipuli, Jalopeno, Tulinen majoneesi,',
        9.99,
        1
    );

INSERT INTO
    MenuItem (name, description, price, category)
VALUES
    (
        'Kanan Burger',
        '1 x 200g Kanan pihvi , Tomaatti,
    Jäävuorisalaatti, Pikkelöity punasipuli, Jalopeno, Tulinen majoneesi,',
        6.99,
        1
    );

INSERT INTO
    MenuItem (name, description, price, category)
VALUES
    (
        'Possun Burger',
        '1 x 200g Possun pihvi , 2 x Pekoniviipale, Tomaatti,
    Jäävuorisalaatti, Pikkelöity punasipuli, Jalopeno, Tulinen majoneesi,',
        8.99,
        1
    );

-- insert menu items sides 2
INSERT INTO
    MenuItem (name, description, price, category)
VALUES
    ('Ranskalaiset', 'suomalaista perunaa', 2.99, 2);

INSERT INTO
    MenuItem (name, description, price, category)
VALUES
    (
        'Bataatti ranskalaiset',
        'suomalaista bataattia',
        2.99,
        2
    );

INSERT INTO
    MenuItem (name, description, price, category)
VALUES
    (
        'Dippi Tulinen Paprika',
        'laktoositon, habanero',
        2.99,
        2
    );

INSERT INTO
    MenuItem (name, description, price, category)
VALUES
    ('Dippi Kurkku', 'laktoositon', 2.99, 2);

-- insert menu items drinks 3
INSERT INTO
    MenuItem (name, description, price, category)
VALUES
    ('Juoma Pepsi', 'Pepsi', 3.99, 3);

INSERT INTO
    MenuItem (name, description, price, category)
VALUES
    ('Juoma Jaffa', 'Jaffa', 3.99, 3);

INSERT INTO
    MenuItem (name, description, price, category)
VALUES
    ('Juoma Coke', 'Coke', 3.99, 3);
