import React from 'react';
import { Route } from 'react-router';

import App from './container/App';
import PainelView from './container/PainelView';

export default (
<Route name="app" component={App} path="/">
  <Route component={PainelView} path="painel/:unidade" />
</Route>
);
