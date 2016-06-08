import React from 'react';
import * as Utils from '../utils';
import { Link } from 'react-router';

export default class Landing extends React.Component {

	renderButtons() {
		return (
			Utils.unidades.map((item, idx) => <Link to={`/painel/${item}`} key={idx}><button key={idx}>{Utils.getFullName(item)}</button></Link>)
			);
	}

	render() {

		return (
			<div style={{padding: '10px'}}>
			<h1>Selecione o painel a ser exibido</h1>
				{this.renderButtons()}
			</div>
			);

	}
}