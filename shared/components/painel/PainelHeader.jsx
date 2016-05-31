import React from 'react';

export default class PainelHeader extends React.Component {

    render() {
        const {asa, data} = this.props;
        return (
            <thead>
            <tr>
                <th colSpan="2">Data: {data}</th>
                <th colSpan="3">{asa}</th>
                <th colSpan="7" className="painel-logo"></th>
            </tr>
            <tr>
                <th>APTO</th>
                <th>NOME DO PACIENTE</th>
                <th>NOME DO MÉDICO</th>
                <th>OBSERVAÇÃO</th>
                <th>PREVISÃO DE ALTA</th>
                <th>SCP</th>
                <th>RISCO DE QUEDA</th>
                <th>ALERGIA</th>
                <th>EXAME</th>
                <th>CIRURGIA</th>
                <th>JEJUM</th>
                <th>PRECAUÇÃO</th>
            </tr>
            </thead>
        );
    }
}