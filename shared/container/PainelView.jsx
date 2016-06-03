import React, {Component, PropTypes} from 'react';
import Painel from '../components/Painel';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as PainelActions from '../actions/PainelActions';
import {getFullName} from '../utils/Utils';

var moment = require('moment');


class PainelView extends Component {


    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            pacientes: [{"atendimento":1189571,"leito":"HM 101/1","nome":"DORCAS ALICE DIAS","medico":"HELOISIO ANTONIO"},{"atendimento":1194710,"leito":"HM 101/2","nome":"MARIA RANGEL VIEIRA","medico":"MARTINA ZANOTTI"},{"atendimento":1197752,"leito":"HM 102/1","nome":"ANDERSON DA SILVA ARAUJO","medico":"LEANDRO MARANO"},{"atendimento":1181407,"leito":"HM 102/2","nome":"CARLOS MAGNO FADINI","medico":"JOSE NEVES"},{"atendimento":1048187,"leito":"HM 103/1","nome":"ANTONIO MIGUEL MIRANDA","medico":"JOSE NEVES"},{"atendimento":1082234,"leito":"HM 104/1","nome":"JORGE ANTONIO MACEDO DE MELLO","medico":"JOSE NEVES"},{"atendimento":1193731,"leito":"HM 105/1","nome":"SIRLENE RAIMUNDO DA SILVA","medico":"JORGE KRIGER"},{"atendimento":1193359,"leito":"HM 106/1","nome":"MARIA DAS DORES DE JESUS MESQUITA OLIVEI","medico":"JOSE NEVES"},{"atendimento":1195152,"leito":"HM 106/2","nome":"CARLA PRISCILA LEAL","medico":"JOSE NEVES"},{"atendimento":1193996,"leito":"HM 107/2","nome":"REGINA SILVA BRITO","medico":"EDELWEISS"},{"atendimento":1169628,"leito":"HM 108/1","nome":"ANTONIO SEBASTIAO PIOVESAN DE JESUS","medico":"JOSE NEVES"},{"atendimento":1195710,"leito":"HM 108/2","nome":"ANGELO BAITELLA","medico":"JOSE NEVES"},{"atendimento":1175603,"leito":"HM 109/1","nome":"LEONTINA ROSA DOS SANTOS","medico":"MAYKE ARMANI"},{"atendimento":1183442,"leito":"HM 110/1","nome":"JOAO DE SOUZA SILVA","medico":"POLYANA GITIRANA"},{"atendimento":1191434,"leito":"HM 110/2","nome":"ROMULO FERREIRA CORDEIRO","medico":"JORGE KRIGER"},{"atendimento":1197933,"leito":"HM 111","nome":"WALFREDO COSTA SANTOS","medico":"POLYANA GITIRANA"},{"atendimento":1189901,"leito":"HM 112","nome":"EURENICE SILVA DE ALMEIDA","medico":"MARCOS REUTER"},{"atendimento":1145943,"leito":"HM 113","nome":"DIONE LISBOA MONIZ FREIRE","medico":"LUIZ VIRGILIO"},{"atendimento":1179801,"leito":"HM 114","nome":"MARCELO FREITAS MARCAL","medico":"JOSE NEVES"},{"atendimento":1187574,"leito":"HM 115","nome":"DERMEVAL BENEDICTO DOS SANTOS","medico":"HELOISIO ANTONIO"},{"atendimento":1170075,"leito":"HM 116","nome":"NATANAEL DE OLIVEIRA","medico":"SERGIO VICENTINI"},{"atendimento":1176649,"leito":"HM 117","nome":"BELMIRO PERINI","medico":"HELOISIO ANTONIO"},{"atendimento":45493,"leito":"HM 118","nome":"MARIA ARCIDELIA SOARES","medico":"JOSE NEVES"},{"atendimento":1191620,"leito":"HM 119","nome":"CARMORINA ANNA FRANCISCHETTO CESCONETTO","medico":"LUIZ VIRGILIO"},{"atendimento":1186136,"leito":"HM 120","nome":"VALTER DELUNARDO","medico":"MAYKE ARMANI"},{"atendimento":1189422,"leito":"HM 121","nome":"EVANDRO BRAZ DE SOUZA","medico":"HELOISIO ANTONIO"},{"atendimento":1150778,"leito":"HM 122","nome":"DIVINO BATISTA LOPES","medico":"JOSE NEVES"},{"atendimento":1116469,"leito":"HM 123","nome":"NANCY RODRIGUES DE ALBUQUERQUE","medico":"HELOISIO ANTONIO"},{"atendimento":1187412,"leito":"HM 124","nome":"JOAO CARLOS DOS SANTOS","medico":"HELOISIO ANTONIO"}]
        }
        this.shufflePacientes = this.shufflePacientes.bind(this);
    }

    shufflePacientes() {
        let unidade = getFullName(this.props.params.unidade);
        this.props.shufflePacientes(unidade);
    }

    handleChange(nextUnidade) {
        this.props.selectUnidade(nextUnidade);
    }

    componentDidMount() {
        let unidade = getFullName(this.props.params.unidade);
        this.props.selectUnidade(unidade);
        this.props.fetchPacientesIfNeeded(unidade);
        setInterval(this.shufflePacientes, 10000);
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
            <Painel pacientes={pacientes} unidade={selectedUnidade} data={dateStr}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(PainelView);
