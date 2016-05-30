import React from 'react';

export default class AppView extends React.Component {
  render() {
    return (
      <did id="app-view">
        {this.props.children}
      </did>
    );
  }
}