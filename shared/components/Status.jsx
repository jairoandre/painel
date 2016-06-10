import React from 'react';

if (process.env.BROWSER) {
  require('./Status.less');
}

export default class Status extends React.Component {

  getClassName(value, altaMedica) {
    switch(value) {
      case 'O':
        if (altaMedica) {
          return 'status status--alta';
        } else {
          return 'status status--ocupado';  
        }        
      case 'V':
        return 'status status--vago';
      case 'A':
        return 'status status--acompanhante';
      case 'L':
        return 'status status--limpeza';
      case 'R':
        return 'status status--reserva';
      case 'M':
        return 'status status--manutencao';
      case 'I':
        return 'status status--interditado';
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
      case 'R':
        return '/imgs/hotel-door-key.png';
      case 'M':
        return '/imgs/handyman-tools.png';
      case 'I':
        return '/imgs/close-sign-for-door.png';
      default:
        return '/imgs/cancel.png';
    }
  }

  render () {
    return (
      <img src={this.getImgName(this.props.value)} width='40px' className={this.getClassName(this.props.value, this.props.altaMedica)} />
      );
  }

}