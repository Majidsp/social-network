const spicedPg = require('spiced-pg');
let db = spicedPg(process.env.DATABASE_URL || 'postgres:postgres:12345@localhost:5432/socialnetwork');

const registerNewUser = (firstname, lastname, email, password) => {
    return db.query(
        `INSERT INTO users (firstname, lastname, email, password)
        VALUES ($1, $2, $3, $4) RETURNING firstname, id`,
        [firstname, lastname, email, password]
    );
};

module.exports = {
    registerNewUser
};