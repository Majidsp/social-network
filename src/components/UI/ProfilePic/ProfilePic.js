import React from 'react';

const profilePic = ({ firstname, lastname, imgUrl}) => {
    imgUrl = imgUrl || '../../../assets/images/default_profile_pic.jpg';
    return (
        <div>
            <img src={imgUrl} />
            <h1>
            Here is the Profile Pic Component! {firstname} {lastname}
            </h1>
        </div>
    );
};

export default profilePic;
