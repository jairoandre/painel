import React from 'react';

if (process.env.BROWSER) {
  require('../assets');
}

export default class App extends React.Component {
  render () {
    return (
    <did id='app-view'>
      {this.props.children}
    </did>
    );
  }
}
