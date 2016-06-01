import React from 'react';
import PainelTable from './PainelTable';

var moment = require('moment');

if (process.env.BROWSER) {
  require('./Painel.less');
}

export default class Painel extends React.Component {

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
