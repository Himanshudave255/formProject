import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import RUCforms from './components/RUCformsComponent/RUCforms';
import Home from './components/HomeComponent/Home';
import * as serviceWorker from './serviceWorker';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import { createBrowserHistory } from "history";
// import ReduxExample from './components/ReduxExample';

const history = createBrowserHistory();
const routing = (
    <Router history={history}>
      <div>
        <Route path="/" component={App} />
         {/* to be removed later */}
      </div>
    </Router>
  )

// ReactDOM.render(routing, document.getElementById('root'));
ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// exports.Login = Login;
