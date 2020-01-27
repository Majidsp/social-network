import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { receiveFriendsWannabes, acceptFriendRequest, unfriend } from '../../actions.js';
import { Link } from 'react-router-dom';


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
            {friends.length == 0 &&  <div><h2>Friends list:</h2><h4>You do not have any friends yet</h4></div>}
            {!!friends.length &&
                <div>
                    <h2>Friends list:</h2>
                    {friends.map(user => (
                        <div className="friends-user" key={user.firstname} >
                            <Link to={'user/'+user.id}>
                                <img src={user.profile_pic_url} />
                            </Link>
                            <h4>{user.firstname} {user.lastname}</h4>
                            <button className="example_c" onClick={() => dispatch(unfriend(user.id))}>Unfriend</button>
                        </div>
                    ))}
                </div>
            }
            {wannabes.length == 0 &&  <div><h2>Friend requests:</h2><h4>You do not have any friend request.</h4></div>}
            {!!wannabes.length &&
                <div>
                    <h2>Friend requests:</h2>
                    {wannabes.map(user => (
                        <div className="friends-user" key={user.firstname} >
                            <img src={user.profile_pic_url} />
                            <h4>{user.firstname} {user.lastname}</h4>
                            <button className="example_c" onClick={() => dispatch(acceptFriendRequest(user.id))}>Accept request</button>
                        </div>
                    ))}
                </div>
            }
        </div>
    );
};

export default Friends;
