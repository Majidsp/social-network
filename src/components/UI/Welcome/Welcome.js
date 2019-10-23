import React from 'react';
import Logo from '../../Logo/Logo';
import Registration from '../Registration/Registration';


const welcome = () => (
    <div>
        <h1>Here is the Welcome component! Welcome to our social network!</h1>
        <Logo />
        <Registration />
        <img src="/logo.png" />
    </div>
);

export default welcome;
