import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, IndexRedirect } from 'react-router';
import App from './components/app';
import Home from './components/page/home';
import Bookstore from './components/page/bookstore';
import Navigation from './components/page/navigation';
import './assets/styles/styles.scss';

const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
      	<IndexRedirect to="/home"/>
      	<Route path="/home" component={Home}/>
      	<Route path="/bookstore" component={Bookstore}/>
      	<Route path="/navigation" navigation='true' component={Navigation}/>
      </Route>
    </Router>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired
};

export default Root;