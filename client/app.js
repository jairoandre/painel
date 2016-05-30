import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './../shared/routes';

import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import * as reducers from './../shared/reducers';
import { fromJS } from 'immutable';

const initialState = window.__INITIAL_STATE__ || {};

// Transform into Immutable.js collections,
// but leave top level keys untouched for Redux
Object
  .keys(initialState)
  .forEach(key => {
    initialState[key] = fromJS(initialState[key]);
  });

const reducer = combineReducers(reducers);
const store = createStore(reducer, initialState);

ReactDOM.render(
  <Provider store={ store }>
    <Router children={routes} history={browserHistory}/>
  </Provider>,
  document.getElementById('react-view'));
