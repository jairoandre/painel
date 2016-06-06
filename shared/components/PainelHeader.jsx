import React from 'react';

export default class PainelHeader extends React.Component {

  render () {
    const {unidade, data} = this.props;
    return (
    <div className='panel__header'>
      <div className='header__elem header__elem--data'>
        Data:
        {data}
      </div>
      <div className='header__elem header__elem--title'>
        {unidade}
      </div>
      <div className='header__elem header__elem--logo'>
        <img src='/imgs/logo.png' width='180px' />
      </div>
      <div className='header__elem header__elem--leito'>
        APTO
      </div>
      <div className='header__elem header__elem--name'>
        NOME DO PACIENTE
      </div>
      <div className='header__elem header__elem--medic'>
        MÉDICO ASSISTENTE
      </div>
      <div className='header__elem header__elem--convenio'>
        CONVÊNIO
      </div>
      <div className='header__elem header__elem--obs'>
        OBSERVAÇÃO
      </div>
      <div className='header__elem header__elem--small header__elem--previsao'>
        PREVISÃO DE ALTA
      </div>
      <div className='header__elem header__elem--small header__elem--scp'>
        SCP
      </div>
      <div className='header__elem header__elem--small header__elem--riscoQueda'>
        RISCO DE QUEDA
      </div>
      <div className='header__elem header__elem--small header__elem--ulceraPressao'>
        ÚLCERA POR PRESSÃO
      </div>
      <div className='header__elem header__elem--small header__elem--alergia'>
        ALERGIA
      </div>
      <div className='header__elem header__elem--small header__elem--exame'>
        EXAME
      </div>
      <div className='header__elem header__elem--small header__elem--cirurgia'>
        CIRURGIA
      </div>
      <div className='header__elem header__elem--small header__elem--jejum'>
        JEJUM
      </div>
      <div className='header__elem header__elem--small header__elem--precaucao'>
        PRECAUÇÃO
      </div>
    </div>
    );
  }
}
