import React from 'react';
import { Route } from 'react-router';

import App from './components';
import Todo from './components/todo/Todo';
import PainelContainer from './components/painel/PainelContainer';

export default (
<Route name="app" component={App} path="/">
  <Route component={Todo} path="todo" />
  <Route component={PainelContainer} path="painel/:unidade" />
</Route>
);
