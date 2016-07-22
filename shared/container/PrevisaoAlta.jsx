import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as PrevisaoAltaActions from '../actions/PrevisaoAltaActions';

var moment = require('moment');

class PrevisaoAlta extends Component {

  constructor (props) {
    super(props);
    this.state = {intervalId: null};
    this.fetchData = this.fetchData.bind(this);
  }

  fetchData () {
    if (this.props.value) {
      this.props.fetchPrevisaoAltaIfNeeded(this.props.value);  
    }
  }

  componentDidMount () {    
    if (this.props.value) {
      this.props.fetchPrevisaoAltaIfNeeded(this.props.value);
      let intervalId = setInterval(this.fetchData, 120000);
      this.setState({...this.state, intervalId});
    }
  }

  componentWillUnmount () {
    clearInterval(this.state.intervalId);
  }

  render () {
    const { previsoes } = this.props;

    let obj = previsoes[this.props.value];

    let dateStr = 'N/A';

    if (obj && obj.previsaoAlta) {
      dateStr = moment(obj.previsaoAlta).format('DD/MM/YYYY');
    }

    return (
    <div>
      {dateStr}
    </div>
    );
  }

}

PrevisaoAlta.propTypes = {
  previsoes: PropTypes.object.isRequired,
  lastUpdated: PropTypes.number,
  fetchPrevisaoAltaIfNeeded: PropTypes.func.isRequired
};

function mapStateToProps (state) {
  const { previsaoAltaByAtendimento: previsoes } = state;
  return {
  previsoes};
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(PrevisaoAltaActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PrevisaoAlta);
