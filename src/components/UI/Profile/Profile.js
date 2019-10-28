import React from 'react';
import ProfilePic from '../ProfilePic/ProfilePic';
import BioEditor from '../BioEditor/BioEditor';


const profile = ({ firstname, lastname, imgUrl, profileModal, profileBio, passbio }) => {
    imgUrl = imgUrl || '../../../assets/images/default_profile_pic.jpg';
    return (
        <div style={{backgroundColor: 'blue'}}>
            <img src={imgUrl} alt="Profile picture!" />
            <h1>Welcome {firstname} {lastname}</h1>
            <BioEditor bio={profileBio} passBioTwo={passbio}/>
            <ProfilePic modal={profileModal} imgUrlProfilePic={imgUrl}/>
        </div>
    );
};

export default profile;
