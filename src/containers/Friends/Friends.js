import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { receiveFriendsWannabes, acceptFriendRequest, unfriend } from '../../actions.js';

const Friends =  function() {
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('Friends mounted!');
        (() => {
            try {
                dispatch(receiveFriendsWannabes());
            } catch (err) {
                console.error(err);
            }
        })();
    }, []);

    const wannabes = useSelector(
        state => state.friendsWannabes && state.friendsWannabes.filter(user => user.accepted == false)
    );

    const friends = useSelector(
        state => state.friendsWannabes && state.friendsWannabes.filter(user => user.accepted == true)
    );


    if (!wannabes) {
        console.log('F here', wannabes);
        return null;
    }

    return (
        <div className="friends">
            {!!friends.length &&
                <div>
                    <h2>Friends list:</h2>
                    {friends.map(user => (
                        <div className="friends-user" key={user.firstname} >
                            <img src={user.profile_pic_url} />
                            <h5>{user.firstname} {user.lastname}</h5>
                            <button onClick={() => dispatch(unfriend(user.id))}>Unfriend</button>
                        </div>
                    ))}
                </div>
            }

            {!!wannabes.length &&
                <div>
                    <h2>Friend requests:</h2>
                    {wannabes.map(user => (
                        <div className="friends-user" key={user.firstname} >
                            <img src={user.profile_pic_url} />
                            <h5>{user.firstname} {user.lastname}</h5>
                            <button onClick={() => dispatch(acceptFriendRequest(user.id))}>Accept request</button>
                        </div>
                    ))}
                </div>
            }
        </div>
    );
};

export default Friends;
