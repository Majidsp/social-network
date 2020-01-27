import React, { Component } from 'react';
import axios from "../../axios";
import { Link } from 'react-router-dom';


class Registration extends Component {
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
        axios.post("/register", {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            password: this.state.password
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
                Firstname: <input type="text" name="firstname" onChange={e => this.setValueToState(e)} placeholder="firstname..." autoComplete="off"></input>
                Lastname: <input type="text" name="lastname" onChange={e => this.setValueToState(e)} placeholder="lastname..." autoComplete="off"></input>
                Email: <input type="email" name="email" onChange={e => this.setValueToState(e)} placeholder="email address..." autoComplete="off"></input>
                Password: <input type="password" name="password" onChange={e => this.setValueToState(e)} placeholder="password" autoComplete="off"></input>
                <button className="example_c" type="button" onClick={() => this.submit()}>Register</button>
                <p>Already a member? <Link to="/login">Click here to Log in!</Link></p>
            </div>
        );
    }
}

export default Registration;
