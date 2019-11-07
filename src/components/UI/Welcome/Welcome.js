import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Logo from '../../Logo/Logo';
import Registration from '../Registration/Registration';
import Login from '../Login/Login';


const welcome = () => (
    <div className="welcome wrapper">
        <h1 className="welcome-title">Connect with friends and the world around you on Connect.</h1>
        <Logo />
        <HashRouter>
            <Route exact path="/" component={Registration} />
            <Route exact path="/login" component={Login} />
        </HashRouter>
    </div>
);

export default welcome;
