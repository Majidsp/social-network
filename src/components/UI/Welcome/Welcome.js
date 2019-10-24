import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Logo from '../../Logo/Logo';
import Registration from '../Registration/Registration';
import Login from '../Login/Login';


const welcome = () => (
    <div>
        <h1>Here is the Welcome component! Welcome to our social network!</h1>
        <Logo />
        <HashRouter>
            <div>
                <Route exact path="/" component={Registration} />
                <Route path="/login" component={Login} />
            </div>
        </HashRouter>
        <img src="/logo.png" />
    </div>
);

export default welcome;
