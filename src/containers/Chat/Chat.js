import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { socket } from '../../socket';

const Chat = () => {
    const chatMessages = useSelector(
        state => state.messages && state.messages
    );

    const elemRef = useRef();

    useEffect(() => {
        if(elemRef.current) {
            elemRef.current.scrollTop = elemRef.current.scrollHeight - elemRef.current.clientHeight;
        }
    }, [chatMessages]);


    const KeyCheck = (e) => {
        if(e.key == 'Enter') {
            e.preventDefault();
            socket.emit('chatMessage', e.target.value);
            e.target.value = '';

        }
    };

    if (!chatMessages) {
        return null;
    }

    return(
        <div className="chat">
            <h2>Chat with the world!</h2>
            {!!chatMessages.length &&
                <div className="chat-container" ref={elemRef}>
                    {chatMessages.map(item => (
                        <div className="message-wrapper" key={item.id} >
                            <div className="message-left">
                                <img src={item.profile_pic_url} />
                                <p className="sender">{item.firstname} {item.lastname}</p>
                            </div>
                            <div className="message-right">
                                <p className="msg">{item.message}</p>
                                <p className="time">{item.created_at}</p>
                            </div>

                        </div>
                    ))}
                </div>
            }
            <textarea placeholder="Write message..." onKeyDown={KeyCheck} rows="2" cols="75" />
        </div>
    );
};


export default Chat;





// .chat-container {
//     height: 300px;
//     overflow-y: scroll;
// }
