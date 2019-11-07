import * as io from 'socket.io-client';
import { chatMessages, chatMessage } from './actions';

export let socket;

export const init = store => {
    if (!socket) {
        socket = io.connect();

        socket.on('chatMessages', messages => store.dispatch(
            chatMessages(messages)
        ));

        socket.on('chatMessage', message => store.dispatch(
            chatMessage(message)
        ));
    }
};
