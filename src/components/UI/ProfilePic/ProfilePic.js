import React from 'react';

const profilePic = ({ firstname, lastname, imgUrl, modal}) => {
    imgUrl = imgUrl || '../../../assets/images/default_profile_pic.jpg';
    return (
        <div>
            <img src={imgUrl} alt="Profile picture!" onClick={modal} />
            <h1>
            Welcome {firstname} {lastname}
            </h1>
        </div>
    );
};

export default profilePic;
