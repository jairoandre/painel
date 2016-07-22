import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as PrecaucaoActions from '../actions/PrecaucaoActions';

class Precaucao extends Component {

  constructor (props) {
    super(props);
    this.state = {intervalId: null};
    this.fetchData = this.fetchData.bind(this);
  }

  fetchData () {
    if (this.props.value) {
      this.props.fetchPrecaucaoIfNeeded(this.props.value);
    }
  }

  componentDidMount () {
    if (this.props.value) {
      this.props.fetchPrecaucaoIfNeeded(this.props.value);
      let intervalId = setInterval(this.fetchData, 120000);
      this.setState({...this.state, intervalId});
    }    
  }

  componentWillUnmount () {
    clearInterval(this.state.intervalId);
  }

  renderImg(precaucao) {
    let img = '';
    let color = '';
    let text = '';
    switch(precaucao) {
      case 6: // Padrão
        img = 'handle-with-care.png';
        color = '#88dc88';
        text = 'Padrão';
        break;
      case 7: // Preventiva
        img = 'handle-with-care.png';
        color = '#ff9933';
        text = 'Preventiva';
        break;
      case 1: // Aerossóis
        img = 'spray.png';
        color = '#33ccff';
        text = 'Aerossóis';
        break;
      case 2: // Contato
        img = 'hand.png';
        color = '#ff9933';
        text = 'Contato';
        break;
      case 3: // Contato + Aerossóis
        img = 'hand-spray.png'
        color = '#ff9933';
        text = 'Contato + Aerossóis'
        break;
      case 4: // Contato + Gotículas
        img = 'hand-drops.png'
        color = '#ff9933';
        text = 'Contato + Gotículas'
        break;
      case 5: // Gotículas
        img = 'drops.png';
        color = '#ff9933';
        text = 'Gotículas';
        break;
      default:
        img = 'cancel.png';
        color = '#ffffff';
        text = 'Não definido';
    }
    return <img src={`/imgs/${img}`} title={text} width='40px' style={{backgroundColor: color, borderRadius: '5px', padding: '5px'}} />;
  }

  render () {
    const { precaucoes } = this.props;

    let obj = precaucoes[this.props.value];

    let str = 'Padrão';

    let img;

    if (obj && obj.precaucao) {
      img = this.renderImg(obj.precaucao);
    }

    return (
      <div>
        {img}
      </div>
    );
  }

}

Precaucao.propTypes = {
  precaucoes: PropTypes.object.isRequired,
  lastUpdated: PropTypes.number,
  fetchPrecaucaoIfNeeded: PropTypes.func.isRequired
};

function mapStateToProps (state) {
  const { precaucaoByAtendimento: precaucoes } = state;
  return { precaucoes };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(PrecaucaoActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Precaucao);
