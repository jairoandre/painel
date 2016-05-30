import React from 'react';
import PainelTable from './PainelTable';

export default class Painel extends React.Component {
    createPaciente() {
        const paciente = {};
        paciente.apto = 'Teste 1';
        paciente.nome = 'Teste';
        paciente.medico = 'Teste';
        paciente.observacao = 'Teste';
        paciente.previsaoAlta = 'Teste';
        paciente.scp = 'Teste';
        paciente.riscoQueda = 'Teste';
        paciente.alergia = 'Teste';
        paciente.exame = 'Teste';
        paciente.cirurgia = 'Teste';
        paciente.jejum = 'Teste';
        paciente.precaucao = 'Teste';
        return paciente;
    }

    render() {
        const pacientes = Array(4).fill(this.createPaciente());

        return (
            <div id="painel">
                <PainelTable pacientes={pacientes} asa="Massena" data="30/05/2016"/>
            </div>
        );
    }
}