import React from 'react';
import PainelHeader from './PainelHeader';
import PainelRow from './PainelRow';
import {Motion, spring} from 'react-motion';

if (process.env.BROWSER) {
  require('./Painel.less');
}

export default class Painel extends React.Component {

  constructor(props) {
    super(props);
    this.renderPacientes = this.renderPacientes.bind(this);
  }

  renderPacientes() {
    const { pacientes } = this.props;
    return pacientes.map((paciente, key) =>
      <Motion defaultStyle={{y: 0}} style={{y: spring(50 * paciente.i)}} key={key}>
        {(style) =>
          <div className={(paciente.i % 2 === 0) ? 'panel__body__row' : 'panel__body__row panel__body__row--zebra'}
               style={{
          position: 'absolute',
          transform: `translate3d(0, ${style.y}px, 0)`,
          WebkitTransform: `translate3d(0, ${style.y}px, 0)`
          }}>
            <PainelRow paciente={paciente} key={key} index={key}/>
          </div>
        }
      </Motion>)
  }

  render() {
    const { unidade, data} = this.props;
    return (
      <div className="panel">
        <PainelHeader unidade={unidade} data={data}/>
        <div className="panel__body">
          {this.renderPacientes()}
        </div>

      </div>
    );
  }
};
