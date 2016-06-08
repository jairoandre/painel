import React from 'react';

if (process.env.BROWSER) {
  require('./Status.less');
}

export default class Status extends React.Component {

  getClassName(value) {
    switch(value) {
      case 'O':
        return 'status status--ocupado';
      case 'V':
        return 'status status--vago';
      case 'A':
        return 'status status--acompanhante';
      case 'L':
        return 'status status--limpeza';
      default:
        return 'status status--empty';
    }
  }

  getImgName(value) {
    switch(value) {
      case 'O':
      case 'A':
        return '/imgs/man-user.png';
      case 'V':
        return '/imgs/hotel-single-bed.png';
      case 'L':
        return '/imgs/wiping-swipe-for-floors.png';
      default:
        return '/imgs/cancel.png';
    }
  }

  render () {
    return (
      <img src={this.getImgName(this.props.value)} width='40px' className={this.getClassName(this.props.value)} />
      );
  }

}