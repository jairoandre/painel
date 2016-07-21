import React, { Component, PropTypes } from 'react';
import Painel from '../components/Painel';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as PacienteActions from '../actions/PacienteActions';

var moment = require('moment');

class PainelView extends Component {

  constructor (props) {
    super(props);
    this.state = {shuffleId: null, refreshId: null};
    this.handleChange = this.handleChange.bind(this);
    this.shufflePacientes = this.shufflePacientes.bind(this);
    this.refreshPacientes = this.refreshPacientes.bind(this);
  }

  refreshPacientes() {
    let unidade = this.props.params.unidade;
    this.props.selectUnidade(unidade);
    this.props.invalidateUnidade(unidade);
    this.props.fetchPacientesIfNeeded(unidade);
  }

  shufflePacientes () {
    if (!this.props.isFetching) {
      this.props.shufflePacientes(this.props.params.unidade);
    }
  }

  handleChange (nextUnidade) {
    this.props.selectUnidade(nextUnidade);
  }

  componentDidMount () {
    this.refreshPacientes();
    let shuffleId = setInterval(this.shufflePacientes, 10000);
    let refreshId = setInterval(this.refreshPacientes, 120000);
    this.setState({...this.state, shuffleId, refreshId});
  }

  componentWillUnmount () {
    clearInterval(this.state.shuffleId);
    clearInterval(this.state.refreshId);
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.selectedUnidade !== this.props.selectedUnidade) {
      const {fetchPacientesIfNeeded, selectedUnidade} = nextProps;
      fetchPacientesIfNeeded(selectedUnidade);
    }
  }

  render () {
    const {pacientes, selectedUnidade, isFetching} = this.props;

    const date = new Date();
    const dateStr = moment(date).format('DD/MM/YYYY');

    return (
      <Painel pacientes={pacientes} unidade={selectedUnidade} data={dateStr} loading={isFetching} />
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
  shufflePacientes: PropTypes.func.isRequired,
  invalidateUnidade: PropTypes.func.isRequired
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
  return bindActionCreators({...PacienteActions}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PainelView);
