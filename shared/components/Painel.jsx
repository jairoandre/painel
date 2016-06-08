import React from 'react';
import PainelHeader from './PainelHeader';
import PainelRow from './PainelRow';
import { Motion, spring } from 'react-motion';

if (process.env.BROWSER) {
  require('./Painel.less');
}

export default class Painel extends React.Component {

  constructor (props) {
    super(props);
    this.renderPacientes = this.renderPacientes.bind(this);
  }

  renderPacientes () {
    const { pacientes } = this.props;
    return pacientes.map((paciente, key) => {
      const motionStyle = {
        y: spring(50 * paciente.i, {stiffness: 160, damping: 17}),
        o: (paciente.i >= 20 ? spring(0) : 1)
      };
      return (
      <Motion defaultStyle={{y: 0, o: 1}} style={motionStyle} key={key}>
        {(style) =>
                           <div className={(paciente.i % 2 === 0) ? 'panel__body__row' : 'panel__body__row panel__body__row--zebra'}
                                style={{
                                 position: 'absolute',
                                 transform: `translate3d(0, ${style.y}px, ${style.y}px)`,
                                 opacity: style.o
                               }}>
                             <PainelRow paciente={paciente} key={key} index={key}/>
                           </div>}
      </Motion>
      );
    });
  }

  render () {
    const { unidade, data} = this.props;
    return (
    <div className="panel">
      <PainelHeader unidade={unidade} data={data} />
      <div className="panel__body">
        {this.renderPacientes()}
      </div>
    </div>
    );
  }
};
