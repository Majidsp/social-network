import React, { Component } from 'react';
import axios from "../../../axios";
import { Link } from 'react-router-dom';


class Login extends Component {
    constructor() {
        super();
        this.state = {};
    }

    setValueToState({ target }) {
        this.setState({
            [target.name]: target.value
        });
    }

    submit() {
        axios.post("/login", {
            email: this.state.email,
            password: this.state.password,
        })
            .then(() => location.replace("/"))
            .catch(err => {
                console.error(err);
                this.setState({ error: true });
            });
    }

    render() {
        return (
            <div>
                {this.state.error && ( <div className="error">Something went wrong. Please try again!</div> )}
                Email Address: <input type="email" name="email" onChange={e => this.setValueToState(e)} placeholder="email address..." autoComplete="off"></input>
                Password: <input type="password" name="password" onChange={e => this.setValueToState(e)} placeholder="password" autoComplete="off"></input>
                <button type="button" onClick={() => this.submit()}>Login</button>
                <p>Not a member yet?<Link to="/">Click here to Register!</Link></p>
            </div>
        );
    }

}


export default Login;
