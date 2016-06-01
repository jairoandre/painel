import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './../shared/routes';

import { Provider } from 'react-redux';
import configureStore from '../shared/store/configureStore';
import { fromJS } from 'immutable';

const initialState = window.__INITIAL_STATE__ || {};

// Transform into Immutable.js collections,
// but leave top level keys untouched for Redux
Object
  .keys(initialState)
  .forEach(key => {
    initialState[key] = fromJS(initialState[key]);
  });

const store = configureStore(initialState);

ReactDOM.render(
  <Provider store={ store }>
    <Router children={routes} history={browserHistory}/>
  </Provider>,
  document.getElementById('react-view'));
