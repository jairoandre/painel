import express from 'express';
import path from 'path';
import http from 'http';

import React from 'react';
import ReactDOM from 'react-dom/server';
import { Provider } from 'react-redux';
import { RouterContext, match } from 'react-router';
import configureStore from '../shared/store/configureStore';

import routes from './../shared/routes';

const api = require('./api');

const database = require('./oracle/database.js');
const dbconfig = require('./oracle/dbconfig.js');

var app;
var httpServer;
var openHttpConnections = {};

process.on('uncaughtException', function(err) {
  console.error('Uncaught exception ', err);
  shutdown();
});

process.on('SIGTERM', function () {
  console.log('Received SIGTERM');

  shutdown();
});

process.on('SIGINT', function () {
  console.log('Received SIGINT');

  shutdown();
});

initApp();

function initApp() {
  app = express();
  httpServer = http.Server(app);

  var apiRouter = api.getRouter();

  app.use('/api', apiRouter);

  app.use(handleError);

  app.set('env', process.env.NODE_ENV || 'development');

  if (process.env.NODE_ENV === 'development') {
    app.set('cssInclude', '');
    app.set('resourceUrlPrefix', 'http://localhost:8080/')
  } else {
    app.set('cssInclude', `<link rel="stylesheet" href="/main.css"/>`);
    app.set('resourceUrlPrefix', '/');
  }

  app.use('/bundle.js', express.static(path.join(__dirname, './../dist/bundle.js')));
  app.use('/main.css', express.static(path.join(__dirname, './../dist/main.css')));
  app.use('/imgs/', express.static(path.join(__dirname, './../shared/assets/imgs/')));

  app.use((req, res) => {

    const store = configureStore({});

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
          <title>Painel - ${app.get('env')}</title>
          ${app.get('cssInclude')}
        </head>
        <body>
          <div id="react-view">${componentHTML}</div>
          <script type="aplication/javascript">
            window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
          </script>
          <script type="application/javascript" src="${app.get('resourceUrlPrefix')}bundle.js"></script>
        </body>
      </html>
  `;

      res.end(HTML);
    });
  });

  httpServer.on('connection', function(conn) {
    var key = conn.remoteAddress + ':' + (conn.remotePort || '');

    openHttpConnections[key] = conn;

    conn.on('close', function() {
      delete openHttpConnections[key];
    });
  });

  database.addBuildupSql({
    sql: "BEGIN EXECUTE IMMEDIATE q'[alter session set NLS_DATE_FORMAT='DD-MM-YYYY']'; END;"
  });

  database.addTeardownSql({
    sql: "BEGIN sys.dbms_session.modify_package_state(sys.dbms_session.reinitialize); END;"
  });

  database.createPool(dbconfig)
      .then(function() {
        const PORT = process.env.PORT || 3000;
        httpServer.listen(PORT, function() {
          console.log(`==> 🌎  Listening on port ${PORT}. Open up http://localhost:${PORT}/ in your browser.`);
        });
      })
      .catch(function(err) {
        console.error('Error occurred creating database connection pool', err);
        console.log('Exiting process');
        process.exit(0);
      });
}

function shutdown() {
  console.log('Shutting down');
  console.log('Closing web server');

  httpServer.close(function () {
    console.log('Web server closed');

    database.terminatePool()
        .then(function() {
          console.log('node-oracledb connection pool terminated');
          console.log('Exiting process');
          process.exit(0);
        })
        .catch(function(err) {
          console.error('Error occurred while terminating node-oracledb connection pool', err);
          console.log('Exiting process');
          process.exit(0);
        });
  });

  for (key in openHttpConnections) {
    openHttpConnections[key].destroy();
  }
}

function handleError(err, req, res, next) {
  console.error(err);
  res.status(500).send({error: 'An error has occurred, please contact support if the error persists'});
  shutdown();//process would usually be restarted via something like https://github.com/foreverjs/forever
}