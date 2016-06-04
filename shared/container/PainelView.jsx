import React, { Component, PropTypes } from 'react';
import Painel from '../components/Painel';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as PacienteActions from '../actions/PacienteActions';
import { getFullName } from '../utils/Utils';

var moment = require('moment');

class PainelView extends Component {

  constructor (props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.shufflePacientes = this.shufflePacientes.bind(this);
  }

  shufflePacientes () {
    let unidade = getFullName(this.props.params.unidade);
    this.props.shufflePacientes(unidade);
  }

  handleChange (nextUnidade) {
    this.props.selectUnidade(nextUnidade);
  }

  componentDidMount () {
    let unidade = getFullName(this.props.params.unidade);
    this.props.selectUnidade(unidade);
    this.props.fetchPacientesIfNeeded(unidade);
    setInterval(this.shufflePacientes, 5000);
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.selectedUnidade !== this.props.selectedUnidade) {
      const {fetchPacientesIfNeeded, selectedUnidade} = nextProps;
      fetchPacientesIfNeeded(selectedUnidade);
    }
  }

  render () {
    const {pacientes, selectedUnidade} = this.props;

    const date = new Date();
    const dateStr = moment(date).format('DD/MM/YYYY');

    return (
    <Painel pacientes={pacientes} unidade={selectedUnidade} data={dateStr} />
    );
  }
}

PainelView.propTypes = {
  selectedUnidade: PropTypes.string.isRequired,
  pacientes: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  selectUnidade: PropTypes.func.isRequired,
  fetchPacientesIfNeeded: PropTypes.func.isRequired,
  shufflePacientes: PropTypes.func.isRequired
};

function mapStateToProps (state) {
  const {selectedUnidade, pacientesByUnidade} = state;
  const {isFetching, lastUpdated, items: pacientes} = pacientesByUnidade[selectedUnidade] || {
    isFetching: true,
    items: []
  };

  return {
    selectedUnidade,
    pacientes,
    isFetching,
  lastUpdated};
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(PacienteActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PainelView);
