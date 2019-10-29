import React, { Component } from 'react';
import Uploader from './containers/Uploader/Uploader';
import Profile from './components/UI/Profile/Profile';
import axios from "./axios";
import { BrowserRouter, Route } from 'react-router-dom';
import OtherProfile from './components/UI/OtherProfile/Otherprofile';
import FindPeople from './containers/FindPeople/FindPeople';


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
                this.setState(data[0]);
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
            profile_pic_url: imgUrl,
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
                    <meta  content='no-cache' />
                    <meta  content='0' />
                    <meta  content='no-cache' />

                    <Route exact path="/" render={() => (
                        <Profile
                            firstname = {this.state.firstname}
                            lastname = {this.state.lastname}
                            imgUrl = {this.state.profile_pic_url}
                            profileModal = {() => this.toggleModal()}
                            profileBio = {this.state.bio}
                            passbio = {this.sendBioToDatabase}
                        />
                    )}
                    />

                    <Route path="/user/:id" render={props => (
                        <OtherProfile
                            key={props.match.url}
                            match={props.match}
                            history={props.history}
                        />
                    )}
                    />

                    <Route path="/users" render={ () => (
                        <FindPeople />
                    )}
                    />

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
