import React, { useState, useEffect } from 'react';
import axios from "../../axios";

const FriendButton = (props) => {
    const [buttonText, setButtonText] = useState('');
    const [rerender, setRerender] = useState(false);
    const [error, setError] = useState(false);

    const friendshipManager = () => {
        if(buttonText == 'Send friend request') {
            requester(sendReq);
        } else if ((buttonText == 'End friendship') || (buttonText == 'Cancel friend request')) {
            requester(cancelReq);
        } else if (buttonText == 'Accept friend request') {
            requester(acceptReq);
        }
    };

    const sendReq = () => axios.post('/sendRequest', {receiver_id: props.userId});
    const cancelReq = () => axios.post('/cancelRequest', {id: props.userId});
    const acceptReq = () => axios.post('/acceptRequest', {id: props.userId});

    const requester = (arg) => {
        (async () => {
            try {
                await arg();
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
