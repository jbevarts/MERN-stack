import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import SignupPage from './signupPage';
import { Link, Route, Router, IndexRoute } from 'react-router-dom';
import history from './history';
import './styles.css';

class LandingPage extends Component {
    state = {
        username: null,
        password: null,
    };

    /* contructor that possibly takes in Auth information from user would be cool. */
    /* maybe a componentDidMount handler that takes care of user login based on some token */

    render() {
        return (
            <div className="login">
              <div className="loginHeader">
                Login with username and password<br />
              </div>
              <div className="loginFooter">
              
              <input type="text" placeholder="username" style = {{ width: "40%", textAlign: "center" }} onChange={e =>
                  this.setState({ username: e.target.value })} />
              <input type="text" placeholder="password" style = {{ width: "40%", textAlign: "center"  }}  onChange={e =>
                  this.setState({ password: e.target.value })} />
              <br />
                <button type="button" onClick={() =>
                    ReactDOM.render(<App />, document.getElementById('root'))}>
                  Login
                </button>
              <button type="button" onClick ={() =>
                  this.setState({ username: null, password: null })}
                  >Clear</button>
              <br />
              <br />
                <button type="button" style = {{ backgroundColor: "green", color: "white" }} onClick={() =>
                    ReactDOM.render(<SignupPage />, document.getElementById('root'))}>
                  Sign Up
                </button>
              <br />
              <br />
                 made by jerb, 2019
              </div>
            </div>
        )};
}

export default LandingPage;

