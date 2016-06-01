import React from 'react';
import { Route } from 'react-router';

import App from './components';
import PainelContainer from './components/painel/PainelContainer';

export default (
<Route name="app" component={App} path="/">
  <Route component={PainelContainer} path="painel/:unidade" />
</Route>
);
