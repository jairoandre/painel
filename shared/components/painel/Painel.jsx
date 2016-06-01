import React from 'react';
import PainelTable from './PainelTable';

var moment = require('moment');

if (process.env.BROWSER) {
  console.log('Less loading');
  require('./Painel.less');
}

export default class Painel extends React.Component {

  componentDidMount () {
    const { unidade } = this.props;
    this.props.fetchPacientesIfNeeded(unidade);
    return;
  }

  render () {
    const { pacientes, unidade } = this.props;

    const date = new Date();
    const dateStr = moment(date).format('DD/MM/YYYY');

    return (
    <div id="painel">
      <PainelTable pacientes={pacientes} unidade={unidade} data={dateStr} />
    </div>
    );
  }
};
