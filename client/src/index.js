import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import App from './app';
import LandingPage from './landingPage';
import SignupPage from './signupPage';
import { Route, BrowserRouter } from 'react-router-dom'
import { createHashHistory } from 'history';

//import history from './history'

const Root = () => (
    <BrowserRouter>
      <div>
        <Route exact="" path="/" component={LandingPage} />
        <Route exact="" path="/signup" component={SignupPage} />
        <Route exact="" path="/app" component={App} />
      </div>
    </BrowserRouter>
)



//ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<LandingPage />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
