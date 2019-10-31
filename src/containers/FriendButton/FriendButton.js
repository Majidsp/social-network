import React, { useState, useEffect } from 'react';
import axios from "../../axios";

const FriendButton = (props) => {
    const [buttonText, setButtonText] = useState('');
    const [rerender, setRerender] = useState(false);

    const friendshipManager = () => {
        if(buttonText == 'Send friend request') {
            sendRequest();
        } else if (buttonText == 'Cancel friend request') {
            cancelRequest();
        } else if (buttonText == 'End friendship') {
            cancelRequest();
        } else if (buttonText == 'Accept friend request') {
            acceptRequest();
        }
    };

    const sendRequest = () => {
        // (async () => {
        //     await axios.post('/sendRequest', {receiver_id: props.userId});
        //     setButtonText('');
        // })();
        axios.post('/sendRequest', {receiver_id: props.userId})
            .then(() => setRerender(!rerender))
            .catch(err => console.log(err));
    };

    const cancelRequest = () => {
        axios.post('/cancelRequest', {id: props.userId})
            .then(() => setRerender(!rerender))
            .catch(err => console.log(err));
    };

    const acceptRequest = () => {
        axios.post('/acceptRequest', {id: props.userId})
            .then(() => setRerender(!rerender))
            .catch(err => console.log(err));
    };

    useEffect(() => {
        (async () => {
            const { data } = await axios.post('/friendship', {receiver_id: props.userId});
            if(data.length > 0) {
                if(data[0].accepted) {
                    setButtonText('End friendship');
                } else {
                    if(data[0].sender_id == props.userId) {
                        setButtonText('Accept friend request');
                    } else {
                        setButtonText('Cancel friend request');
                    }
                }
            } else {
                setButtonText('Send friend request');
            }
        })();
    }, [rerender]);

    return (
        <div>
            <button onClick={friendshipManager}>{buttonText}</button>
        </div>
    );
};

export default FriendButton;
