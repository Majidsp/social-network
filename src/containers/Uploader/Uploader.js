import React, { Component } from 'react';
// import axios from "../../axios";

class Uploader extends Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        console.log('Uploader did mount!');
    }

    render () {
        return (
            <div>
                <h1 onClick={() => this.props.sth('Arash')}>Uploader Here!</h1>
            </div>

        );
    }
}


export default Uploader;
