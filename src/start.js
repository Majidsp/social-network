import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from './components/UI/Welcome/Welcome';
import App from './App';
import Provider from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import { reducer } from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(reduxPromise)));

let elem = (
    <Provider store={store}>
        <App />
    </Provider>
);
const userIsLoggedIn = location.pathname != '/welcome';

!userIsLoggedIn ? elem = <Welcome /> : elem;


ReactDOM.render(
    // <HelloWorld />,
    elem,
    document.querySelector('main')
);

// function HelloWorld() {
//     return (
//         <div>
//             {elem}
//         </div>
//     );
// }
