import React, { Component, PropTypes } from 'react';
import Painel from './Painel';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as PainelActions from '../../actions/PainelActions';

class PainelContainer extends Component {

  constructor (props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (nextUnidade) {
    this.props.selectUnidade(nextUnidade);
  }

  componentDidMount () {
    this.props.selectUnidade(this.props.params.unidade);
    this.props.fetchPacientesIfNeeded(this.props.params.unidade);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedUnidade !== this.props.selectedUnidade) {
      const { fetchPacientesIfNeeded, selectedUnidade } = nextProps;
      fetchPacientesIfNeeded(selectedUnidade);
    }
  }

  render () {
    const { pacientes, selectedUnidade } = this.props;

    return (
    <div>
      <Painel pacientes={pacientes} unidade={selectedUnidade} />
    </div>
    );
  }
}

PainelContainer.propTypes = {
  selectedUnidade: PropTypes.string.isRequired,
  pacientes: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  selectUnidade: PropTypes.func.isRequired,
  fetchPacientesIfNeeded: PropTypes.func.isRequired
};

function mapStateToProps (state) {
  const { selectedUnidade, pacientesByUnidade } = state;
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators(PainelActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PainelContainer);
