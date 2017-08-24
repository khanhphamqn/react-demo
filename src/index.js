import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import configureStore from './store/configureStore'
import Root from './root';

let store = configureStore();
render(
  <Root store={store} />,
  document.getElementById('app')
)