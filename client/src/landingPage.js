import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import SignupPage from './signupPage';
import { Link, Route, Router, IndexRoute } from 'react-router-dom';
import history from './history';
import './styles.css';

class LandingPage extends Component {
    state = {
        loading: true,
        users: null,
        
        username: null,
        password: null,
        loginSuccess: false,
        errorMessage: ""
    };

    /* contructor that possibly takes in Auth information from user would be cool. */
    /* maybe a componentDidMount handler that takes care of user login based on some token */

    
    componentDidMount() {
        fetch("http://localhost:3001/api/getUser")
        .then(data => data.json())
        .then(res => 
        {
        this.setState({ users: res.data });
        fetch("http://localhost:3001/api/checkLogin")
        .then(data => data.json())
        .then(res => {
            if (res.data != false) {
                this.state.users.forEach( user => {
                    if (user.email.toLowerCase() === res.data.toLowerCase()) {
                        ReactDOM.render(<App user={user} />, document.getElementById('root'))
                    }
                })
            }
        })
            })
        this.setState({ loading: false });
    }

    userLogin = () => {
        while (this.state.loading) {
        }
        this.state.users.forEach(user => {
             if (user != undefined &&
                 user != null &&
                 user.email != null && 
                 this.state.password != null &&
                 user.email.toLowerCase() === this.state.username.toLowerCase() &&
                 user.password === this.state.password) {
                     ReactDOM.render(<App user={user} />, document.getElementById('root')) 
                 }
             }
          )
    };

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
              <span style={{ color: "red" }}>{this.state.errorMessage}</span>
              <br />
                <button type="button" onClick={() => { 
                    this.userLogin();
                } }>  
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

