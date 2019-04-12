import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import LandingPage from './landingPage';
import { Link, Route, Router } from 'react-router-dom';
import history from './history';
import './styles.css';

class SignupPage extends Component {
    state = {
        email: null,
        password: null,
        passwordRepeat: null
    }

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
                <br />
                  <button type="button" onClick={() =>
                      ReactDOM.render(<LandingPage />, document.getElementById('root'))}>
                      Cancel 
                  </button>
                <br />
                <button type="button" onClick={() =>
                    ReactDOM.render(<App />, document.getElementById('root'))}>
                    Sign Up
                  </button>
                <br />  
                <br />
              </div>
            </div>
        )};
}

export default SignupPage;
