import React, { useState, useEffect } from 'react';
import axios from "../../axios";

const FriendButton = (props) => {
    const [buttonText, setButtonText] = useState('');
    const [exist, setExist] = useState(false);
    const [accepted, setAccepted] = useState(false);
    const [receiver, setReceiver] = useState(false);
    const [sender, setSender] = useState(false);

    const friendshipManager = () => {
        if(!exist) {
            sendRequest();
        } else if (sender) {
            cancelRequest();
        } else if (receiver) {
            acceptRequest();
        } else if (accepted) {
            cancelRequest();
        }
    };

    const sendRequest = () => {
        axios.post('/sendRequest', {receiver_id: props.userId})
            .then(() => setButtonText(''))
            .catch(err => console.log(err));
    };

    const cancelRequest = () => {
        axios.post('/cancelRequest', {id: props.userId})
            .then(() => setButtonText(''))
            .catch(err => console.log(err));
    };

    const acceptRequest = () => {
        axios.post('/acceptRequest', {id: props.userId})
            .then(() => setButtonText(''))
            .catch(err => console.log(err));
    };


    useEffect(() => {
        (async () => {
            console.log(props.userId);
            const { data } = await axios.post('/friendship', {receiver_id: props.userId});
            if(data.length > 0) {
                setExist(true);
                if(data[0].accepted) {
                    setAccepted(true);
                    setButtonText('End friendship');
                } else {
                    if(data[0].sender_id == props.userId) {
                        setReceiver(true);
                        setButtonText('Accept friend request');
                    } else {
                        setSender(true);
                        setButtonText('Cancel friend request');
                    }
                }

            } else {
                setButtonText('Send friend request');
            }

        })();

    }, [buttonText]);

    return (
        <div>
            <button onClick={friendshipManager}>{buttonText}</button>
        </div>
    );
};

export default FriendButton;
