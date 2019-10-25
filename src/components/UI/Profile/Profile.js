import React from 'react';

const profile = ({ firstname, lastname, imgUrl }) => {
    imgUrl = imgUrl || '../../../assets/images/default_profile_pic.jpg';
    return (
        <div style={{backgroundColor: 'blue'}}>
            <img src={imgUrl} alt="Profile picture!" />
            <h1>
            Welcome {firstname} {lastname}
            </h1>
        </div>
    );
};

export default profile;
