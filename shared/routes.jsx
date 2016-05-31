import React from 'react';
import {Route} from 'react-router';

import App from './components';
import Todo from './components/todo/Todo';
import Painel from './components/painel/Painel';

export default (
    <Route name="app" component={App} path="/">
        <Route component={Todo} path="todo"/>
        <Route component={Painel} path="painel"/>
    </Route>
);