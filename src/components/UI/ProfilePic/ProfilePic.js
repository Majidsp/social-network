import React from 'react';
import { Link } from 'react-router-dom';
import axios from "../../../axios";


const profilePic = ({  imgUrlProfilePic, modal}) => {
    imgUrlProfilePic = imgUrlProfilePic || '../../../assets/images/default_profile_pic.jpg';

    const logout = async () => {
        await axios.get('./logout');
    };

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
            <Link onClick={() => logout()} to="/welcome">Logout</Link>

            <img src={imgUrlProfilePic} alt="Profile picture!" onClick={modal} />

        </div>
    );
};

export default profilePic;
