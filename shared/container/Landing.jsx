import React from 'react';
import * as Utils from '../utils';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as IntervalActions from '../actions/IntervalActions';

if (process.env.BROWSER) {
  require('./Landing.less');
}

class Landing extends React.Component {

	componentDidMount() {
		this.props.clearIntervals();
	}

	renderButtons() {
		return (
			Utils.unidades.map((item, idx) => <Link to={`/painel/${item}`} key={idx}><button className='landing--button' key={idx}>{Utils.getFullName(item)}</button></Link>)
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

function mapStateToProps (state) {
	const { intervals } = state;

	return {
		intervals
	}
}

function mapDispatchToProps (dispatch) {
	return bindActionCreators(IntervalActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing);