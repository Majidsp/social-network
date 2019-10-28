import React from 'react';

const profilePic = ({  imgUrlProfilePic, modal}) => {
    imgUrlProfilePic = imgUrlProfilePic || '../../../assets/images/default_profile_pic.jpg';
    return (
        <div style={{backgroundColor: 'yellow'}}>
            <img src={imgUrlProfilePic} alt="Profile picture!" onClick={modal} />
        </div>
    );
};

export default profilePic;
