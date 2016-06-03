import React from 'react';
import PrevisaoAlta from '../container/PrevisaoAlta';
import Scp from '../container/Scp';
import RiscoQueda from '../container/RiscoQueda';

export default class PainelRow extends React.Component {

    render() {
        const {paciente} = this.props;
        return (
            <div>
                <div className="panel__body__row__elem panel__body__row__elem--leito">{paciente.leito}</div>
                <div className="panel__body__row__elem panel__body__row__elem--name">{paciente.nome}</div>
                <div className="panel__body__row__elem panel__body__row__elem--medic">{paciente.medico}</div>
                <div className="panel__body__row__elem panel__body__row__elem--convenio">{paciente.convenio}</div>
                <div className="panel__body__row__elem panel__body__row__elem--obs">{paciente.observacao}</div>
                <div className="panel__body__row__elem panel__body__row__elem--small panel__body__row__elem--previsao">
                    <PrevisaoAlta value={paciente.atendimento}/></div>
                <div className="panel__body__row__elem panel__body__row__elem--small panel__body__row__elem--scp">
                    <Scp value={paciente.atendimento}/>
                </div>
                <div
                    className="panel__body__row__elem panel__body__row__elem--small panel__body__row__elem--riscoQueda">
                    <RiscoQueda value={paciente.atendimento}/>
                </div>
                <div
                    className="panel__body__row__elem panel__body__row__elem--small panel__body__row__elem--ulceraPressao">{paciente.ulceraPressao}</div>
                <div
                    className="panel__body__row__elem panel__body__row__elem--small panel__body__row__elem--alergia">{paciente.alergia}</div>
                <div
                    className="panel__body__row__elem panel__body__row__elem--small panel__body__row__elem--exame">{paciente.exame}</div>
                <div
                    className="panel__body__row__elem panel__body__row__elem--small panel__body__row__elem--cirurgia">{paciente.cirurgia}</div>
                <div
                    className="panel__body__row__elem panel__body__row__elem--small panel__body__row__elem--jejum">{paciente.jejum}</div>
                <div
                    className="panel__body__row__elem panel__body__row__elem--small panel__body__row__elem--precaucao">{paciente.precaucao}</div>
            </div>
        );
    }
}