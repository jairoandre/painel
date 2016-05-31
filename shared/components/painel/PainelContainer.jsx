import React from 'react';
import Painel from './Painel';
import { bindActionCreators } from 'redux';
import * as PainelActions from './../../actions/PainelActions';
import { connect } from 'react-redux';

@connect(state => ({pacientes: state.pacientes}))

export default class PainelContainer extends React.Component {
render() {
  const { pacientes, dispatch } = this.props;

  return(
    <Painel pacientes={pacientes} unidade={this.props.params.unidade} {...bindActionCreators(PainelActions, dispatch)} />
    );
}
}
