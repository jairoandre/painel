import React from 'react';

export default class PainelHeader extends React.Component {

    render() {
        const {asa, data} = this.props;
        return (
            <thead>
            <tr>
                <th colSpan="2" className="painelTb__data">Data: {data}</th>
                <th colSpan="3" className="painelTb__setor">{asa}</th>
                <th colSpan="7"><img src="/imgs/logo.png" width="200px"/></th>
            </tr>
            <tr>
                <th className="painelTb__th painelTb__th--left">APTO</th>
                <th className="painelTb__th painelTb__th--darker painelTb__th--left">NOME DO PACIENTE</th>
                <th className="painelTb__th painelTb__th--left">NOME DO MÉDICO</th>
                <th className="painelTb__th painelTb__th--darker painelTb__th--left">OBSERVAÇÃO</th>
                <th className="painelTb__th painelTb__th--previsao">PREVISÃO DE ALTA</th>
                <th className="painelTb__th painelTb__th--detalhe painelTb__th--scp">SCP</th>
                <th className="painelTb__th painelTb__th--detalhe painelTb__th--queda">RISCO DE QUEDA</th>
                <th className="painelTb__th painelTb__th--detalhe painelTb__th--alergia">ALERGIA</th>
                <th className="painelTb__th painelTb__th--detalhe painelTb__th--exame">EXAME</th>
                <th className="painelTb__th painelTb__th--detalhe painelTb__th--cirurgia">CIRURGIA</th>
                <th className="painelTb__th painelTb__th--detalhe painelTb__th--jejum">JEJUM</th>
                <th className="painelTb__th painelTb__th--detalhe painelTb__th--precaucao">PRECAU- ÇÃO</th>
            </tr>
            </thead>
        );
    }
}