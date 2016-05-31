import React from 'react';

export default class PainelRow extends React.Component {

    render() {
        const {paciente} = this.props;
        return (
            <tr>
                <td>{paciente.apto}</td>
                <td>{paciente.nome}</td>
                <td>{paciente.medico}</td>
                <td>{paciente.observacao}</td>
                <td>{paciente.previsaoAlta}</td>
                <td>{paciente.scp}</td>
                <td>{paciente.riscoQueda}</td>
                <td>{paciente.alergia}</td>
                <td>{paciente.exame}</td>
                <td>{paciente.cirurgia}</td>
                <td>{paciente.jejum}</td>
                <td>{paciente.precaucao}</td>
            </tr>
        );
    }
}