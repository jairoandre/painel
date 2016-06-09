import React from 'react';
import Scp from '../container/Scp';
import RiscoQueda from '../container/RiscoQueda';
import PrevisaoAlta from '../container/PrevisaoAlta';
import UlceraPressao from '../container/UlceraPressao';
import Alergia from '../container/Alergia';
import Status from './Status';
import Precaucao from '../container/Precaucao';

export default class PainelRow extends React.Component {

    rowNormalClass(value) {
        return `panel__body__row__elem panel__body__row__elem--${value}`
    }

    rowSmallClass(value) {
        return `panel__body__row__elem panel__body__row__elem--small panel__body__row__elem--${value}`;
    }

    render() {
        const {paciente} = this.props;
        return (
            <div title={paciente.atendimento}>
                <div className={this.rowNormalClass('leito')}>{paciente.leito}</div>
                <div className={this.rowNormalClass('status')}><Status value={paciente.status}/></div>
                <div className={this.rowNormalClass('name')}>{paciente.nome}</div>
                <div className={this.rowNormalClass('medic')}>{paciente.medico}</div>
                <div className={this.rowNormalClass('convenio')}>{paciente.convenio}</div>
                <div className={this.rowNormalClass('obs')}>{paciente.observacao}</div>
                <div className={this.rowSmallClass('previsao')}>{<PrevisaoAlta value={paciente.atendimento}/>}</div>
                <div className={this.rowSmallClass('precaucao')}><Precaucao value={paciente.atendimento}/></div>
                <div className={this.rowSmallClass('scp')}><Scp value={paciente.atendimento}/></div>
                <div className={this.rowSmallClass('riscoQueda')}><RiscoQueda value={paciente.atendimento}/></div>
                <div className={this.rowSmallClass('ulceraPressao')}><UlceraPressao value={paciente.atendimento}/></div>
                <div className={this.rowSmallClass('alergia')}><Alergia value={paciente.atendimento}/></div>
                <div className={this.rowSmallClass('exame')}>{paciente.exame}</div>
                <div className={this.rowSmallClass('cirurgia')}>{paciente.cirurgia}</div>
                <div className={this.rowSmallClass('jejum')}>{paciente.jejum}</div>
            </div>
        );
    }
}