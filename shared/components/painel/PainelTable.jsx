import React from 'react';
import PainelHeader from './PainelHeader';
import PainelRow from './PainelRow';

export default class PainelTable extends React.Component {

  render () {
    const {pacientes, unidade, data} = this.props;
    return (
    <table className="painelTb">
      <PainelHeader unidade={unidade} data={data} />
      <tbody className="painelTb__body">
        {pacientes.map((paciente, key) => <PainelRow paciente={paciente} key={key} index={key} />)}
      </tbody>
    </table>
    );
  }
};
