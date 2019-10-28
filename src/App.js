import React, { Component } from 'react';
import Uploader from './containers/Uploader/Uploader';
import Profile from './components/UI/Profile/Profile';
import axios from "./axios";
import { BrowserRouter, Route } from 'react-router-dom';
import OtherProfile from './components/UI/OtherProfile/Otherprofile';


class App extends Component {
    constructor() {
        super();
        this.state = {
            showUploader: false,
        };

        this.setImageUrl = this.setImageUrl.bind(this);
        this.sendBioToDatabase = this.sendBioToDatabase.bind(this);
    }

    componentDidMount() {
        axios.get('/user')
            .then(({ data }) => {
                this.setState({...data[0]});
            })
            .catch(err => {
                console.error(err);
                this.setState({ error: true });
            });
    }

    componentDidUpdate() {

    }


    toggleModal() {
        this.setState({
            showUploader: !this.state.showUploader
        });
    }

    setImageUrl(imgUrl) {
        this.setState({
            imgUrl: imgUrl,
            showUploader: !this.state.showUploader
        });
    }

    async setBio(bio) {
        this.setState({bio});
    }

    sendBioToDatabase(bio) {
        this.setBio(bio).then(() => {
            axios.post('/bio', {
                bio: this.state.bio
            }).catch(err => {
                console.error(err);
                this.setState({ error: true });
            });
        });

    }

    showState() {
        console.log(this.state);
    }

    render () {
        return (
            <BrowserRouter>
                <div style={{backgroundColor: 'red', textAlign: 'center'}}>

                    <Route exact path="/" render={() => (
                        <Profile
                            firstname = {this.state.firstname}
                            lastname = {this.state.lastname}
                            imgUrl = {this.state.imgUrl}
                            profileModal = {() => this.toggleModal()}
                            profileBio = {this.state.bio}
                            passbio = {this.sendBioToDatabase}
                        />
                    )}
                    />

                    <Route path="/user/:id" component={OtherProfile} />

                    {this.state.showUploader &&
                        <Uploader
                            setUrl = {this.setImageUrl}
                        />
                    }
                </div>
            </BrowserRouter>

        );
    }
}

export default App;
