INSERT INTO role (role_name)
VALUES ('Admin');

INSERT INTO role (role_name)
VALUES ('Manager');

INSERT INTO role (role_name)
VALUES ('Worker');

INSERT INTO Users (user_name, user_address, user_phone_number, user_email,
                   user_password, user_date_of_birth, is_busy,
                   manager_id, role_id)
VALUES ('Hy', 'noWayHome', '123456789',
        'Hy@gmail.com', '123456', '1999-12-12',
        false, null, 1);
