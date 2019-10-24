import React, { Component } from 'react';
import ProfilePic from './components/UI/ProfilePic/ProfilePic';
import Uploader from './containers/Uploader/Uploader';
import axios from "./axios";


class App extends Component {
    constructor() {
        super();
        this.state = {
            // firstname: '',
            // lastname: '',
            img: '',
            showUploader: false
        };

        this.methodInApp = this.methodInApp.bind(this);
    }

    componentDidMount() {
        console.log('HEY HEY HEY App Component did mounted!');
        axios.get('./user')
            .then(({ data }) => {
                this.setState(data[0]);
                console.log(this.state);
            })
            .catch(err => {
                console.error(err);
                this.setState({ error: true });
            });
    }

    toggleModal() {
        this.setState({
            showUploader: !this.state.showUploader
        });
    }

    methodInApp(firstname) {
        console.log('I AM A METHOD IN APP!');
        this.setState({firstname});
    }

    render () {
        return (
            <div>
                <h1 onClick={() => this.toggleModal()}>Hello from App Component!</h1>
                <ProfilePic
                    firstname = {this.state.firstname}
                    lastname = {this.state.lastname}
                    imgUrl = {this.state.img}
                />
                {this.state.showUploader &&
                    <Uploader
                        sth = {this.methodInApp}
                    />
                }
            </div>
        );
    }
}

export default App;
