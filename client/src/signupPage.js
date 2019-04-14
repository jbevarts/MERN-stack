import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import App from './app';
import LandingPage from './landingPage';
import { Link, Route, Router } from 'react-router-dom';
import history from './history';
import './styles.css';

class SignupPage extends Component {
    state = {
        email: null,
        password: null,
        passwordRepeat: null,
        users: [],
        validEmail: true,
        errorMessage: "",
        loading: true
    }
    
    componentDidMount() {
        fetch("http://localhost:3001/api/getUser")
        .then(data => data.json())
        .then(res => this.setState({ users: res.data }))
        this.setState({loading: false})
    };
        

    validateUser = () => {
        while (this.state.loading) {
        }
        var success = true;
        this.state.users.forEach(user => {
          if (user.email != null && user.email.toLowerCase() === this.state.email.toLowerCase()) {
              this.setState({ errorMessage: "Email already used" })
              success = false;
          }
        })
        console.log(success)
        return success;
    };

    createUser = () => {
        axios.post("http://localhost:3001/api/putUser", {
            email: this.state.email,
            password: this.state.password })
        .then(res => ReactDOM.render(<LandingPage />, document.getElementById('root')))
    };


        /*
        fetch("http://localhost:3001/api/getUser")
        .then(data => data.json())
        .then(res => res.data.forEach( user => {
            if (user.email != null && user.email.toLowerCase() === this.state.email.toLowerCase()) {
                ReactDOM.render(<App user={user} />, document.getElementById('root'))
            }
        }))
    };*/
    // ComponentDidMount
    // ComponentWillUnMount

    render() {
        return (
            <div className="signup">
              <div className="signupHeader">
                Sign up with email and password
              </div>
              
              <div className="signupFooter">
                <input type="text" placeholder="email" style = {{ width: "60%", textAlign: "center" }} onChange={e =>
                    this.setState({ email: e.target.value })} />
                <br />
                <input type="text" placeholder="password" style = {{ width: "60%", textAlign: "center" }} onChange={e =>
                    this.setState({ password: e.target.value })} />
                <br />
                <input type="text" placeholder="repeat password" style = {{ width: "60%", textAlign: "center" }} onChange={e =>
                    this.setState({ passwordRepeat: e.target.value })} />
                <br />
                <span style={{ color: "red" }}>{this.state.errorMessage}</span>
                <br />
                <button type="button" onClick={() =>
                    {
                    if (this.validateUser()) {
                        console.log("good to make new account");
                        this.createUser();
                    } else {
                        console.log("else case")
                    }}}>

                    Sign Up
                </button>
                <button type="button" onClick={() =>
                      ReactDOM.render(<LandingPage />, document.getElementById('root'))}>
                      Cancel  
                  </button>
                  
                <br />  
                <br />
              </div>
            </div>
        )};
}

export default SignupPage;
