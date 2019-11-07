-- DROP TABLE IF EXISTS users CASCADE;
--
-- CREATE TABLE users(
--     id SERIAL PRIMARY KEY,
--     firstname VARCHAR NOT NULL CHECK (firstname != ''),
--     lastname VARCHAR NOT NULL CHECK (lastname != ''),
--     email VARCHAR NOT NULL UNIQUE CHECK (email != ''),
--     password VARCHAR NOT NULL CHECK (password != ''),
--     profile_pic_url VARCHAR(300),
--     bio VARCHAR(300),
--     registered_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
-- );
--
--
-- DROP TABLE IF EXISTS friendships CASCADE;
--
-- CREATE TABLE friendships (
--     id SERIAL PRIMARY KEY,
--     sender_id INT NOT NULL REFERENCES users(id),
--     receiver_id INT NOT NULL REFERENCES users(id),
--     accepted BOOLEAN DEFAULT false,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );


-- DROP TABLE IF EXISTS messages;
--
-- CREATE TABLE messages (
--     id SERIAL PRIMARY KEY,
--     sender_id INT NOT NULL REFERENCES users(id),
--     message VARCHAR(300),
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );
