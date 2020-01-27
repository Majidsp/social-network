import React from 'react';
import { Link } from 'react-router-dom';

const profilePic = ({  imgUrlProfilePic, modal}) => {
    imgUrlProfilePic = imgUrlProfilePic || '../../../assets/images/default_profile_pic.jpg';

    return (
        <div className="profilePic">
            <Link to="/">Home</Link>
            &nbsp;&nbsp;|&nbsp;&nbsp;
            <Link to="/users">Find People</Link>
             &nbsp;&nbsp;|&nbsp;&nbsp;
            <Link to="/friends">Friends</Link>
            &nbsp;&nbsp;|&nbsp;&nbsp;
            <Link to="/chat">Chat</Link>
            &nbsp;&nbsp;|&nbsp;&nbsp;
            <a href="/logout">Logout</a>

            <img src={imgUrlProfilePic} alt="Profile picture!" onClick={modal} />

        </div>
    );
};

export default profilePic;
