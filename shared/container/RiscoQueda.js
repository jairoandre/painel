import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as RiscoQuedaActions from '../actions/RiscoQuedaActions';

class RiscoQueda extends Component {

  constructor (props) {
    super(props);
    this.state = {intervalId: null};
    this.fetchData = this.fetchData.bind(this);
  }

  fetchData () {
    if (this.props.value) {     
      this.props.fetchRiscoQuedaIfNeeded(this.props.value); 
    }
  }

  componentDidMount () {
    if (this.props.value) {
      this.props.fetchRiscoQuedaIfNeeded(this.props.value);      
      let intervalId = setInterval(this.fetchData, 120000);
      this.setState({...this.state, intervalId});
    }
  }

  componentWillUnmount () {
    clearInterval(this.state.intervalId);
  }

  renderPolygon (obj) {
    if (obj) {
      let color = '#88dc88';
      if (obj.riscoQueda >= 45) {
        color = '#ff5555';
      }
      return (
        <img src='/imgs/slide.png' width='40px' style={{backgroundColor: color, borderRadius: '5px', padding: '5px'}} />
      );
    }
  }

  render () {
    const {riscos} = this.props;

    let obj = riscos[this.props.value];

    return (
    <div>
      {this.renderPolygon(obj)}
    </div>
    );
  }

}

RiscoQueda.propTypes = {
  riscos: PropTypes.object.isRequired,
  lastUpdated: PropTypes.number,
  fetchRiscoQuedaIfNeeded: PropTypes.func.isRequired
};

function mapStateToProps (state) {
  const {riscoQuedaByAtendimento: riscos} = state;
  return {riscos};
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(RiscoQuedaActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RiscoQueda);
