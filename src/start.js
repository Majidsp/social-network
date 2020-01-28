import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from './components/Welcome/Welcome';
import App from './App';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import reducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(reduxPromise)));

import { init } from './socket';

let elem;
const userIsLoggedIn = location.pathname != '/welcome';

if (!userIsLoggedIn) {
    elem = <Welcome />;
} else {
    init(store);
    elem = (
        <Provider store={store}>
            <App />
        </Provider>
    );
}


ReactDOM.render(elem, document.querySelector('main'));
