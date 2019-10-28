import React, { Component } from 'react';
import axios from "../../../axios";

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
            <div>
                <img src={this.state.profile_pic_url || '../../../assets/images/default_profile_pic.jpg'} />
                <h1>Welcome {this.state.firstname} {this.state.lastname}</h1>
                <p>{this.state.bio}</p>
            </div>
        );
    }
}


export default OtherProfile;
