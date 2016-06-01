import React from 'react';
import { Route } from 'react-router';

import App from './container/App';
import Painel from './container/Painel';

export default (
<Route name="app" component={App} path="/">
  <Route component={Painel} path="painel/:unidade" />
</Route>
);
