import React from 'react';

const profilePic = ({  imgUrl, modal}) => {
    imgUrl = imgUrl || '../../../assets/images/default_profile_pic.jpg';
    return (
        <div style={{backgroundColor: 'yellow'}}>
            <img src={imgUrl} alt="Profile picture!" onClick={modal} />
        </div>
    );
};

export default profilePic;
