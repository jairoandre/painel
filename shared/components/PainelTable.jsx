import React from 'react';
import PainelHeader from './PainelHeader';
import PainelRow from './PainelRow';

export default class PainelTable extends React.Component {

    render() {
        const {pacientes, asa, data} = this.props;
        return (
            <table>
                <PainelHeader asa={asa} data={data}/>
                <tbody style={{backgroundColor: 'yellow'}}>
                    {pacientes.map((paciente, key) => <PainelRow paciente={paciente} key={key}/>)}
                </tbody>
            </table>
        );
    }
}