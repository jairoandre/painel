import React from 'react';

export default class PainelHeader extends React.Component {

  renderHeaderElem(value) {
    return `header__elem header__elem--${value}`;
  }

  renderHeaderSmallElem(value) {
    return `header__elem header__elem--small header__elem--${value}`;
  }

  render () {
    const {unidade, data} = this.props;
    return (
    <div className='panel__header'>
      <div className={this.renderHeaderElem('data')}>
        Data: {data}
      </div>
      <div className={this.renderHeaderElem('title')}>
        {unidade}
      </div>
      <div className={this.renderHeaderElem('logo')}>
        <img src='/imgs/logo.png' width='180px' />
      </div>
      <div className={this.renderHeaderElem('leito')}>
        APTO
      </div>
      <div className={this.renderHeaderElem('name')}>
        NOME DO PACIENTE
      </div>
      <div className={this.renderHeaderElem('medic')}>
        MÉDICO ASSISTENTE
      </div>
      <div className={this.renderHeaderElem('convenio')}>
        CONVÊNIO
      </div>
      <div className={this.renderHeaderElem('obs')}>
        OBSERVAÇÃO
      </div>
      <div className={this.renderHeaderSmallElem('previsao')}>
        PREVISÃO DE ALTA
      </div>
      <div className={this.renderHeaderSmallElem('scp')}>
        SCP
      </div>
      <div className={this.renderHeaderSmallElem('riscoQueda')}>
        RISCO DE QUEDA
      </div>
      <div className={this.renderHeaderSmallElem('ulceraPressao')}>
        ÚLCERA POR PRESSÃO
      </div>
      <div className={this.renderHeaderSmallElem('alergia')}>
        ALERGIA
      </div>
      <div className={this.renderHeaderSmallElem('exame')}>
        EXAME
      </div>
      <div className={this.renderHeaderSmallElem('cirurgia')}>
        CIRURGIA
      </div>
      <div className={this.renderHeaderSmallElem('jejum')}>
        JEJUM
      </div>
      <div className={this.renderHeaderSmallElem('precaucao')}>
        PRECAUÇÃO
      </div>
    </div>
    );
  }
}
