import React from 'react';
import PainelTable from './PainelTable';

if (process.env.BROWSER) {
    console.log('Less loading');
    require('./Painel.less');
}

export default class Painel extends React.Component {
    createPaciente() {
        const paciente = {};
        paciente.apto = '206';
        paciente.nome = 'José da Silva';
        paciente.medico = 'Dra. Fernanda';
        paciente.observacao = 'Observação';
        paciente.previsaoAlta = '10/06/2016';
        paciente.scp = '?';
        paciente.riscoQueda = '?';
        paciente.alergia = '?';
        paciente.exame = '?';
        paciente.cirurgia = '?';
        paciente.jejum = '?';
        paciente.precaucao = '?';
        return paciente;
    }

    render() {
        const pacientes = Array(4).fill(this.createPaciente());

        return (
            <div id="painel">
                <PainelTable pacientes={pacientes} asa="Homero Massena" data="30/05/2016"/>
            </div>
        );
    }
}