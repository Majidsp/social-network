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

const friendsAndWannabes = (id) => {
    return db.query(
        `SELECT users.id, firstname, lastname, profile_pic_url, accepted FROM friendships JOIN users
        ON (accepted = false AND receiver_id = $1 AND sender_id = users.id)
        OR (accepted = true AND receiver_id = $1 AND sender_id = users.id)
        OR (accepted = true AND sender_id = $1 AND receiver_id = users.id);`,
        [id]
    );
};

const newMessage = (id, message) => {
    return db.query(
        `INSERT INTO messages (sender_id, message)
        VALUES ($1, $2)
        RETURNING id, sender_id, message, created_at;`,
        [id, message]
    );
};

const getMessageSenderInfo = id => {
    return db.query(
        `SELECT firstname, lastname, profile_pic_url FROM users WHERE id = $1;`,
        [id]
    );
};

const getMessages = () => {
    return db.query(
        `SELECT messages.id, sender_id, message, messages.created_at, firstname, lastname, profile_pic_url FROM messages LEFT JOIN users
        ON (users.id = sender_id) ORDER BY created_at DESC LIMIT 10;`
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
    acceptFriendRequest,
    friendsAndWannabes,
    newMessage,
    getMessageSenderInfo,
    getMessages
};
