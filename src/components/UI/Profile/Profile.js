import React from 'react';

const profile = ({ firstname, lastname, imgUrl, bio }) => {
    imgUrl = imgUrl || '../../../assets/images/default_profile_pic.jpg';
    bio = bio || 'Add your bio now';
    return (
        <div style={{backgroundColor: 'blue'}}>
            <img src={imgUrl} alt="Profile picture!" />
            <h1>
            Welcome {firstname} {lastname}
            </h1>
            <a href="">{bio}</a>
        </div>
    );
};

export default profile;
