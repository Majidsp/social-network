import React from 'react';

const bioEditor = ({  bio, modal}) => {
    bio = bio || 'Add your bio now';
    return (
        <div style={{backgroundColor: 'brown'}}>
            <a href="" onClick={modal}>{bio}</a>
        </div>
    );
};

export default bioEditor;
