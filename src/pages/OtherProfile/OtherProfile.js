import React, { Component } from 'react';
import axios from '../../axios';
import FriendButton from '../../components/FriendButton/FriendButton';
// import ProfilePic from '../ProfilePic/ProfilePic';

class OtherProfile extends Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        axios.get(`/api/user/${this.props.match.params.id}`)
            .then(({ data }) => {
                if(data.error) {
                    this.props.history.push('/');
                } else {
                    this.setState({...data[0]});
                }
            })
            .catch(err => {
                console.error(err);
                this.setState({ error: true });
            });
    }

    render() {
        return (
            <div className="otherProfile">
                <img src={this.state.profile_pic_url || '../../../assets/images/default_profile_pic.jpg'} />
                <h1>{this.state.firstname} {this.state.lastname}</h1>
                <p>{this.state.bio}</p>
                <FriendButton userId={this.props.match.params.id} />
            </div>
        );
    }
}


export default OtherProfile;
