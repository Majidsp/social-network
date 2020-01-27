import React from 'react';
import ProfilePic from '../ProfilePic/ProfilePic';
import BioEditor from '../BioEditor/BioEditor';


const profile = ({ firstname, lastname, imgUrl, profileModal, profileBio, passbio }) => {
    imgUrl = imgUrl || '../../../assets/images/default_profile_pic.jpg';
    return (
        <div className="profile wrapper">
            <ProfilePic modal={profileModal} imgUrlProfilePic={imgUrl}/>
            <img className="profile-img" src={imgUrl} alt="Profile picture!" />
            <div className="profile-inner">
                <h1>Welcome <br />{firstname} {lastname}</h1>
                <BioEditor bio={profileBio} passBioTwo={passbio}/>
            </div>
        </div>
    );
};

export default profile;
