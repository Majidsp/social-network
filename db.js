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

const recentlyJoinedUsers = () => {
    return db.query(
        `SELECT * FROM users ORDER BY id DESC LIMIT 3;`
    );
};

const findUsers = (input, id) => {
    return db.query(
        `SELECT * FROM users WHERE firstname ILIKE $1 AND id != $2;`,
        [input + '%', id]
    );
};

const checkFriendship = (receiver_id, sender_id) => {
    return db.query(
        `SELECT * FROM friendships WHERE (receiver_id = $1 AND sender_id = $2)
        OR (receiver_id = $2 AND sender_id = $1);`,
        [receiver_id, sender_id]
    );
};

const createFriendshipRequest = (sender_id, receiver_id) => {
    return db.query(
        `INSERT INTO friendships (sender_id, receiver_id)
        VALUES ($1, $2)`,
        [sender_id, receiver_id]
    );
};

const cancelFriendshipRequest = (receiver_id, sender_id) => {
    return db.query(
        `DELETE FROM friendships WHERE (receiver_id = $1 AND sender_id = $2)
        OR (receiver_id = $2 AND sender_id = $1);`,
        [receiver_id, sender_id]
    );
};

const acceptFriendRequest = (receiver_id, sender_id) => {
    return db.query(
        `UPDATE friendships SET accepted = TRUE WHERE (receiver_id = $1 AND sender_id = $2)
        OR (receiver_id = $2 AND sender_id = $1);`,
        [receiver_id, sender_id]
    );
};

module.exports = {
    registerNewUser,
    logIn,
    getUserInfo,
    editProfilePic,
    updateBio,
    recentlyJoinedUsers,
    findUsers,
    checkFriendship,
    createFriendshipRequest,
    cancelFriendshipRequest,
    acceptFriendRequest
};
