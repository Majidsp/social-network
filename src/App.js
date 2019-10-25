import React, { Component } from 'react';
import Uploader from './containers/Uploader/Uploader';
import Profile from './components/UI/Profile/Profile';
import axios from "./axios";


class App extends Component {
    constructor() {
        super();
        this.state = {
            showUploader: false,
            // bio: 'HI'
        };

        //This was for testing purposes.
        // this.methodInApp = this.methodInApp.bind(this);

        this.setImageUrl = this.setImageUrl.bind(this);
        this.setBio = this.setBio.bind(this);
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

    //This was for testing purposes.
    // methodInApp(firstname) {
    //     console.log('I AM A METHOD IN APP!');
    //     this.setState({firstname});
    // }

    setImageUrl(imgUrl) {
        this.setState({
            imgUrl: imgUrl,
            showUploader: !this.state.showUploader
        });
    }

    setBio(bio) {
        this.setState({bio});
    }

    showState() {
        console.log(this.state);
    }

    render () {
        return (
            <div style={{backgroundColor: 'red', textAlign: 'center'}}>
                <Profile
                    firstname = {this.state.firstname}
                    lastname = {this.state.lastname}
                    imgUrl = {this.state.imgUrl}
                    profileModal = {() => this.toggleModal()}
                    profileBio = {this.state.bio}
                    passbio = {this.setBio}
                />
                {/* <ProfilePic
                    imgUrl = {this.state.imgUrl}
                    modal = {() => this.toggleModal()}
                /> */}

                {this.state.showUploader &&
                    <Uploader
                        //This was for testing purposes.
                        // sthToTest = {this.methodInApp}
                        setUrl = {this.setImageUrl}
                    />
                }
                <button onClick={() => this.showState()}>Show State</button>
            </div>
        );
    }
}

export default App;
