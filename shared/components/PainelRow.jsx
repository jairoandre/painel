import React from 'react';
import PrevisaoAlta from '../container/PrevisaoAlta';

export default class PainelRow extends React.Component {

    render() {
        const {paciente, index} = this.props;
        return (
            <div className={(index % 2 === 0) ? 'panel__body__row' : 'panel__body__row panel__body__row--zebra'}>
                <div className="panel__body__row__elem panel__body__row__elem--small">{paciente.leito}</div>
                <div className="panel__body__row__elem panel__body__row__elem--name">{paciente.nome}</div>
                <div className="panel__body__row__elem panel__body__row__elem--medic">{paciente.medico}</div>
                <div className="panel__body__row__elem panel__body__row__elem--obs">{paciente.observacao}</div>
                <div className="panel__body__row__elem panel__body__row__elem--small panel__body__row__elem--previsao"><PrevisaoAlta value={paciente.atendimento}/></div>
                <div className="panel__body__row__elem panel__body__row__elem--small panel__body__row__elem--scp">{paciente.scp}</div>
                <div className="panel__body__row__elem panel__body__row__elem--small panel__body__row__elem--riscoQueda">{paciente.riscoQueda}</div>
                <div className="panel__body__row__elem panel__body__row__elem--small panel__body__row__elem--alergia">{paciente.alergia}</div>
                <div className="panel__body__row__elem panel__body__row__elem--small panel__body__row__elem--exame">{paciente.exame}</div>
                <div className="panel__body__row__elem panel__body__row__elem--small panel__body__row__elem--cirurgia">{paciente.cirurgia}</div>
                <div className="panel__body__row__elem panel__body__row__elem--small panel__body__row__elem--jejum">{paciente.jejum}</div>
                <div className="panel__body__row__elem panel__body__row__elem--small panel__body__row__elem--precaucao">{paciente.precaucao}</div>
            </div>
        );
    }
}