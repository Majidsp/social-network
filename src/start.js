import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from './components/UI/Welcome/Welcome';


let elem;
const userIsLoggedIn = location.pathname != '/welcome';

!userIsLoggedIn ? elem = <Welcome /> : elem = <h1>USER IS LOGGED IN!</h1>;


ReactDOM.render(
    <HelloWorld />,
    document.querySelector('main')
);

function HelloWorld() {
    return (
        <div>
            {elem}
        </div>
    );
}
