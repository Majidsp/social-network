const spicedPg = require('spiced-pg');
let db = spicedPg(process.env.DATABASE_URL || 'postgres:postgres:12345@localhost:5432/socialnetwork');

const registerNewUser = (firstname, lastname, email, password) => {
    return db.query(
        `INSERT INTO users (firstname, lastname, email, password)
        VALUES ($1, $2, $3, $4) RETURNING firstname, id`,
        [firstname, lastname, email, password]
    );
};

const logIn = emailaddress => {
    return db.query(
        `SELECT id, password FROM users WHERE email = $1;`,
        [emailaddress]
    );
};

const getUserInfo = id => {
    return db.query(
        `SELECT id, firstname, lastname, email FROM users WHERE id = $1;`,
        [id]
    );
};

module.exports = {
    registerNewUser,
    logIn,
    getUserInfo
};
