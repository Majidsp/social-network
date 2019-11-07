export default function(state = {}, action) {
    
    if (action.type == 'RECEIVE_FRIENDS_WANNABES') {
        return {...state, friendsWannabes: action.friendsWannabes};
    }

    if (action.type == 'ACCEPT_FRIENDSHIP') {
        return { ...state,
            friendsWannabes: state.friendsWannabes.map(user => {
                if ((user.id == action.id)) {
                    return {...user, accepted: true};
                } else {
                    return user;
                }
            })
        };
    }

    if (action.type == 'UNFRIEND') {
        return { ...state,
            friendsWannabes: state.friendsWannabes.filter(user => {
                return user.id != action.id;
            })
        };
    }

    if (action.type == 'CHAT_MESSAGES') {
        return {...state, messages: action.messages.reverse()};
    }

    if (action.type == 'CHAT_MESSAGE') {
        return {...state, messages: [...state.messages, ...action.message]};
    }
    return state;
}
