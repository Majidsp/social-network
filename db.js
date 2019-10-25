const spicedPg = require('spiced-pg');
let db = spicedPg(process.env.DATABASE_URL || 'postgres:postgres:12345@localhost:5432/socialnetwork');

const registerNewUser = (firstname, lastname, email, password) => {
    return db.query(
        `INSERT INTO users (firstname, lastname, email, password)
        VALUES ($1, $2, $3, $4) RETURNING id;`,
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
        `SELECT id, firstname, lastname, email, bio, profile_pic_url FROM users WHERE id = $1;`,
        [id]
    );
};

const editProfilePic = (url, id) => {
    return db.query(
        `UPDATE users SET profile_pic_url = $1 WHERE id = $2 RETURNING profile_pic_url;`,
        [url, id]
    );
};

const updateBio = (bio, id) => {
    return db.query(
        `UPDATE users SET bio = $1 WHERE id = $2;`,
        [bio, id]
    );
};


module.exports = {
    registerNewUser,
    logIn,
    getUserInfo,
    editProfilePic,
    updateBio
};
