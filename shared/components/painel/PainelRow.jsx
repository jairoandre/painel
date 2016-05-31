import React from 'react';

export default class PainelRow extends React.Component {

    render() {
        const {paciente, index} = this.props;
        return (
            <tr className={ (index % 2 === 0) ? 'painelTb__tr' : 'painelTb__tr--zebra'}>
                <td className="painelTb__td">{paciente.apto}</td>
                <td className="painelTb__td">{paciente.nome}</td>
                <td className="painelTb__td">{paciente.medico}</td>
                <td className="painelTb__td">{paciente.observacao}</td>
                <td className="painelTb__td">{paciente.previsaoAlta}</td>
                <td className="painelTb__td">{paciente.scp}</td>
                <td className="painelTb__td">{paciente.riscoQueda}</td>
                <td className="painelTb__td">{paciente.alergia}</td>
                <td className="painelTb__td">{paciente.exame}</td>
                <td className="painelTb__td">{paciente.cirurgia}</td>
                <td className="painelTb__td">{paciente.jejum}</td>
                <td className="painelTb__td">{paciente.precaucao}</td>
            </tr>
        );
    }
}