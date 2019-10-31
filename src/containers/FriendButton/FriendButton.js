import React, { useState, useEffect } from 'react';
import axios from "../../axios";

const FriendButton = (props) => {
    const [buttonText, setButtonText] = useState('');
    const [rerender, setRerender] = useState(false);
    const [error, setError] = useState(false);

    const friendshipManager = () => {
        if(buttonText == 'Send friend request') {
            sendRequest();
        } else if ((buttonText == 'End friendship') || (buttonText == 'Cancel friend request')) {
            cancelRequest();
        } else if (buttonText == 'Accept friend request') {
            acceptRequest();
        }
    };

    const sendRequest = () => {
        (async () => {
            try {
                await axios.post('/sendRequest', {receiver_id: props.userId});
                setRerender(!rerender);
            } catch(err) {
                console.log(err);
                setError(true);
            }
        })();
    };

    const cancelRequest = () => {
        (async () => {
            try {
                await axios.post('/cancelRequest', {id: props.userId});
                setRerender(!rerender);
            } catch(err) {
                console.log(err);
                setError(true);
            }
        })();
    };

    const acceptRequest = () => {
        (async () => {
            try {
                await axios.post('/acceptRequest', {id: props.userId});
                setRerender(!rerender);
            } catch(err) {
                console.log(err);
                setError(true);
            }
        })();
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
            {error && <p>Something went wrong. Please try again!</p>}
            <button onClick={friendshipManager}>{buttonText}</button>
        </div>
    );
};

export default FriendButton;
