import axios from './axios';

export async function receiveFriendsWannabes() {
    try {
        const { data } = await axios.get('/api/friends-wannabes');
        return {
            type: 'RECEIVE_FRIENDS_WANNABES',
            friendsWannabes: data
        };
    } catch (err) {
        console.error(err);
    }
}

export async function acceptFriendRequest(userId) {
    try {
        await axios.post('/acceptRequest', {id: userId});
        return {
            type: 'ACCEPT_FRIENDSHIP',
            id: userId
        };
    } catch (err) {
        console.error(err);
    }
}

export async function unfriend(userId) {
    try {
        await axios.post('/cancelRequest', {id: userId});
        return {
            type: 'UNFRIEND',
            id: userId
        };
    } catch (err) {
        console.error(err);
    }
}

export async function chatMessages(messages) {
    try {
        return {
            type: 'CHAT_MESSAGES',
            messages: messages
        };
    } catch (err) {
        console.error(err);
    }
}

export async function chatMessage(message) {
    try {
        return {
            type: 'CHAT_MESSAGE',
            message: message
        };
    } catch (err) {
        console.error(err);
    }
}
