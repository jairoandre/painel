import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AlergiaActions from '../actions/AlergiaActions';

if (process.env.BROWSER) {
  require('./Alergia.less');
}

class Alergia extends Component {

  constructor (props) {
    super(props);
    this.state = {intervalId: null};
    this.fetchData = this.fetchData.bind(this);
  }

  fetchData () {
    if (this.props.value) {
      this.props.fetchAlergiaIfNeeded(this.props.value);
    }
  }

  componentDidMount () {
    if (this.props.value) {
      this.props.fetchAlergiaIfNeeded(this.props.value);
      let intervalId = setInterval(this.fetchData, 120000);
      this.setState({...this.state, intervalId});    
    }    
  }

  componentWillUnmount () {
    clearInterval(this.state.intervalId);
  }

  renderAlergias (obj) {
    if (obj) {
        let arr = [];
        if (obj.alimentarDs) {
            arr.push(obj.alimentarDs);
        }
        if (obj.esparadrapo) {
            arr.push('ESPARADRAPO');
        }
        if (obj.iodo) {
            arr.push('IODO');
        }
        if (obj.medicamentosDs) {
            arr.push(obj.medicamentosDs);
        }
        if (obj.micropore) {
            arr.push('MICROPORE');
        }
        if (obj.outrosDs) {
            arr.push(obj.outrosDs);
        }
        if (arr.length > 0) {
            return (
                <div className='alergia'>
                    {arr.join(', ')}
                </div>
                );
        }
    }
  }

  render () {
    const {alergias} = this.props;

    let obj = alergias[this.props.value];

    if (obj) {
      obj = obj.alergia;
    }

    return (
    <div>
      {this.renderAlergias(obj)}
    </div>
    );
  }

}

Alergia.propTypes = {
  alergias: PropTypes.object.isRequired,
  lastUpdated: PropTypes.number,
  fetchAlergiaIfNeeded: PropTypes.func.isRequired
};

function mapStateToProps (state) {
  const {alergiaByAtendimento: alergias} = state;
  return {
  alergias};
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(AlergiaActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Alergia);
