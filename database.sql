DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    firstname VARCHAR NOT NULL CHECK (firstname != ''),
    lastname VARCHAR NOT NULL CHECK (lastname != ''),
    email VARCHAR NOT NULL UNIQUE CHECK (email != ''),
    password VARCHAR NOT NULL CHECK (password != ''),
    registered_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
