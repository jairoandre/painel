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
  }

  componentDidMount () {
    if (this.props.value) {
      this.props.fetchAlergiaIfNeeded(this.props.value);
    }
  }

  renderPolygon (obj) {
    if (obj) {
      return (
      <div>
        <div className='alergia alergia__alimentar'>
          {obj.alimentar ? obj.alimentarDs : ''}
        </div>
        <div className='alergia alergia__esparadrapo'>
          {obj.esparadrapo ? 'Esparadrapo' : ''}
        </div>
        <div className='alergia alergia__iodo'>
          {obj.iodo ? 'Iodo' : ''}
        </div>
        <div className='alergia alergia__latex'>
          {obj.latex ? 'Látex' : ''}
        </div>
        <div className='alergia alergia__medicamentos'>
          {obj.medicamentos ? obj.medicamentosDs : ''}
        </div>
        <div className='alergia alergia__micropore'>
          {obj.micropore ? 'Micropore' : ''}
        </div>
        <div className='alergia alergia__outros'>
          {obj.outros ? obj.outrosDs : ''}
        </div>
      </div>
      );
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
      {this.renderPolygon(obj)}
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
