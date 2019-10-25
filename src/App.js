import React, { Component } from 'react';
import ProfilePic from './components/UI/ProfilePic/ProfilePic';
import Uploader from './containers/Uploader/Uploader';
import axios from "./axios";


class App extends Component {
    constructor() {
        super();
        this.state = {
            showUploader: false
        };

        this.methodInApp = this.methodInApp.bind(this);
        this.setImageUrl = this.setImageUrl.bind(this);

    }

    componentDidMount() {
        axios.get('./user')
            .then(({ data }) => {
                this.setState(data[0]);
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

    // methodInApp(firstname) {
    //     console.log('I AM A METHOD IN APP!');
    //     this.setState({firstname});
    // }

    setImageUrl(imgUrl) {
        this.setState({imgUrl});
    }

    render () {
        return (
            <div>
                <h1>Hello from App Component!</h1>
                <ProfilePic
                    firstname = {this.state.firstname}
                    lastname = {this.state.lastname}
                    imgUrl = {this.state.imgUrl}
                    modal = {() => this.toggleModal()}
                />
                {this.state.showUploader &&
                    <Uploader
                        sthToTest = {this.methodInApp}
                        setUrl = {this.setImageUrl}
                    />
                }
            </div>
        );
    }
}

export default App;
