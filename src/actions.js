import axios from 'axios';


const receiveUsers = async () => {
    const { data } = await axios.get('/users');
    return {
        type: 'RECEIVE_USERS',
        users: data.users
    };
};

const makeHot = async (id) => {
    await axios.post(`/hot/${id}`);
    return {
        type: 'MAKE_HOT',
        id
    };
};

const makeNot = async (id) => {
    await axios.post(`/not/${id}`);
    return {
        type: 'MAKE_NOT',
        id
    };
};

module.exports = {
    receiveUsers,
    makeHot,
    makeNot
};
