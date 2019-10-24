import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from './components/UI/Welcome/Welcome';
import App from './App';


let elem;
const userIsLoggedIn = location.pathname != '/welcome';

!userIsLoggedIn ? elem = <Welcome /> : elem = <App />;


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
