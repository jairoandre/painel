import express from 'express';
import path from 'path';

import React from 'react';
import ReactDOM from 'react-dom/server';
import { Provider } from 'react-redux';
import { RouterContext, match, createMemoryHistory } from 'react-router';
import { createStore, combineReducers } from 'redux';

import routes from './../shared/routes';
import * as reducers from './../shared/reducers';
var api = require('./rest/api');

const server = express();

server.set('env', process.env.NODE_ENV || 'development');

if (server.get('env') === 'development') {
  server.set('resourceUrlPrefix', 'http://localhost:8080/');
} else {
  server.set('resourceUrlPrefix', '/');
}

// REST

var apiRouter = express.Router();

apiRouter.get('/pacientes/:unidade', (req, res) => {
  api.consultar(req.params.unidade)
    .then((result) => {
      console.log('Searched');
      res.send(result.map((arr) => {
        return {
          apto: arr[2],
          nome: arr[3],
          medico: arr[4]
        };}));
      res.end();
    })
    .catch((err) => {
      console.log('Error');
      res.send(err);
      res.end();
    });
});

server.use('/api', apiRouter);

server.use('/bundle.js', express.static(path.join(__dirname, './../dist/bundle.js')));
server.use('/main.css', express.static(path.join(__dirname, './../dist/main.css')));
server.use('/imgs/', express.static(path.join(__dirname, './../shared/assets/imgs/')));

server.use((req, res) => {

  const reducer = combineReducers(reducers);
  const store = createStore(reducer);

  match({routes, location: req.url}, (err, redirectLocation, renderProps) => {
    if (err) {
      console.error(err);
      return res.status(500).end('Internal server error');
    }

    if (!renderProps) {
      return res.status(404).end('Not found');
    }

    const InitialComponent = (
    <Provider store={store}>
      <RouterContext {...renderProps} />
    </Provider>
    );

    const initialState = store.getState();

    const componentHTML = ReactDOM.renderToString(InitialComponent);

    const HTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Painel de acompanhamento - ${server.get('env')}</title>
          <link rel="stylesheet" href="${server.get('resourceUrlPrefix')}main.css"/>
        </head>
        <body>
          <div id="react-view">${componentHTML}</div>
          <script type="aplication/javascript">
            window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
          </script>
          <script type="application/javascript" src="${server.get('resourceUrlPrefix')}bundle.js"></script>
        </body>
      </html>
  `;

    res.end(HTML);
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, function () {
  console.log(`Server listening on ${PORT}`);
});
