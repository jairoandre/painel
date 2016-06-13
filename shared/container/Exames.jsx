import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ExamesActions from '../actions/ExamesActions';
import Marquee from '../components/Marquee';

if (process.env.BROWSER) {
  require('./Exames.less');
}

class Exames extends Component {

  constructor (props) {
    super(props);
  }

  componentDidMount () {
    if (this.props.value) {
      this.props.fetchExamesIfNeeded(this.props.value);
    }
  }

  renderExames (obj) {
    if (obj && obj.exames && obj.exames.length > 0) {
      return (
        <div className='exames'>
            <Marquee data={obj.exames} height='10'/>
        </div>
      );
    }
  }

  render () {
    const {exames} = this.props;

    let obj = exames[this.props.value];

    return (
      <div>
        {this.renderExames(obj)}
      </div>
    );
  }

}

Exames.propTypes = {
  exames: PropTypes.object.isRequired,
  lastUpdated: PropTypes.number,
  fetchExamesIfNeeded: PropTypes.func.isRequired
};

function mapStateToProps (state) {
  const {examesByAtendimento: exames} = state;
  return {
  exames};
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(ExamesActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Exames);
