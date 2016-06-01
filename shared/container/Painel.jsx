import React, {Component, PropTypes} from 'react';
import PainelTable from '../components/PainelTable';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as PainelActions from '../actions/PainelActions';
import { getFullName } from '../utils/Utils';

var moment = require('moment');

if (process.env.BROWSER) {
    require('./Painel.less');
}

class Painel extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(nextUnidade) {
        this.props.selectUnidade(nextUnidade);
    }

    componentDidMount() {
        let unidade = getFullName(this.props.params.unidade);
        this.props.selectUnidade(unidade);
        this.props.fetchPacientesIfNeeded(unidade);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedUnidade !== this.props.selectedUnidade) {
            const {fetchPacientesIfNeeded, selectedUnidade} = nextProps;
            fetchPacientesIfNeeded(selectedUnidade);
        }
    }

    render() {
        const {pacientes, selectedUnidade} = this.props;

        const date = new Date();
        const dateStr = moment(date).format('DD/MM/YYYY');

        return (
            <div>
                <PainelTable pacientes={pacientes} unidade={selectedUnidade} data={dateStr}/>
            </div>
        );
    }
}

Painel.propTypes = {
    selectedUnidade: PropTypes.string.isRequired,
    pacientes: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    selectUnidade: PropTypes.func.isRequired,
    fetchPacientesIfNeeded: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const {selectedUnidade, pacientesByUnidade} = state;
    const {isFetching, lastUpdated, items: pacientes} = pacientesByUnidade[selectedUnidade] || {
        isFetching: true,
        items: []
    };

    return {
        selectedUnidade,
        pacientes,
        isFetching,
        lastUpdated
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(PainelActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Painel);
