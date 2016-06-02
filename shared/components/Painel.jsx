import React from 'react';
import PainelHeader from './PainelHeader';
import PainelRow from './PainelRow';
import FlipMove from 'react-flip-move';

if (process.env.BROWSER) {
    require('./Painel.less');
}

export default class Painel extends React.Component {

    render() {
        const {pacientes, unidade, data} = this.props;
        return (
            <div className="panel">
                <PainelHeader unidade={unidade} data={data}/>
                <div className="panel__body">
                    <FlipMove easing="cubic-bezier(0, 0.7, 0.8, 0.1)">
                        {pacientes.map((paciente, key) =>
                            <PainelRow paciente={paciente} key={key} index={key}/>)}
                    </FlipMove>
                </div>

            </div>
        );
    }
};
