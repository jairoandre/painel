import express from 'express';
import path from 'path';

import React from 'react';
import ReactDOM from 'react-dom/server';
import { Provider } from 'react-redux';
import { RouterContext, match, createMemoryHistory } from 'react-router';
import { createStore, combineReducers } from 'redux';

import routes from './../shared/routes';
import * as reducers from './../shared/reducers';
var api = require('./../shared/api/api');

const server = express();

server.set("env", process.env.NODE_ENV || "development");

if (server.get("env") === "development") {
  server.set("bundle", "http://localhost:8080/bundle.js");
} else {
  server.set("bundle", "/bundle.js");
}

server.use("/bundle.js", express.static(path.join(__dirname, './../dist/bundle.js')));

server.use('/pacientes', (req, res) => {
  api.consultar('HOMERO MASSENA')
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

server.use((req, res) => {

  // const location = createMemoryHistory().createLocation(req.url);
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
      <Provider store={ store }>
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
          <title>Painel de acompanhamento - ${server.get("env")}</title>
        </head>
        <body>
          <div id="react-view">${componentHTML}</div>
          <script type="aplication/javascript">
            window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
          </script>
          <script type="application/javascript" src="${server.get("bundle")}"></script>
        </body>
      </html>
  `;

    res.end(HTML);
  });

});


const PORT = process.env.PORT || 3000;

server.listen(PORT, function() {
  console.log(`Server listening on ${PORT}`);
});