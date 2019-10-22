import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from './components/UI/Welcome/Welcome';

ReactDOM.render(
    <HelloWorld />,
    document.querySelector('main')
);

function HelloWorld() {
    return (
        <div>
            <Welcome />
        </div>
    );
}
