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
            <div className="registration-login-wrapper">
                {this.state.error && ( <p className="error">Something went wrong. Please try again!</p> )}
                Email Address: <input type="email" name="email" onChange={e => this.setValueToState(e)} placeholder="email address..." autoComplete="off"></input>
                Password: <input type="password" name="password" onChange={e => this.setValueToState(e)} placeholder="password" autoComplete="off"></input>
                <button className="example_c" type="button" onClick={() => this.submit()}>Login</button>
                <p>Not a member yet? <Link to="/">Click here to Register!</Link></p>
            </div>
        );
    }

}


export default Login;
