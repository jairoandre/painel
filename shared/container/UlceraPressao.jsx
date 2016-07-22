import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as UlceraPressaoActions from '../actions/UlceraPressaoActions';

class UlceraPressao extends Component {

  constructor (props) {
    super(props);
    this.state = {intervalId: null};
    this.fetchData = this.fetchData.bind(this);
  }

  fetchData () {
    if (this.props.value) {
      this.props.fetchUlceraPressaoIfNeeded(this.props.value);      
    }
  }

  componentDidMount () {
    if (this.props.value) {
      this.props.fetchUlceraPressaoIfNeeded(this.props.value);
      let intervalId = setInterval(this.fetchData, 120000);
      this.setState({...this.state, intervalId});
    }    
  }

  componentWillUnmount () {
    clearInterval(this.state.intervalId);
  }

  renderImgBed(color) {
    return <img src='/imgs/bed.png' width='40px' style={{backgroundColor: color, borderRadius: '5px', padding: '5px'}} />;
  }

  renderPolygon (obj) {
    if (obj) {
      let ulceraPressao = obj.ulceraPressao;
      if (ulceraPressao >= 4 && ulceraPressao <= 12) {
        return this.renderImgBed('#88dc88');
      } else if (ulceraPressao >= 13 && ulceraPressao <= 15) {
        return this.renderImgBed('#fd9b10');
      } else if (ulceraPressao >= 4 && ulceraPressao <= 12) {
        return this.renderImgBed('#ff5555');
      }
    }
  }

  render () {
    const {valoresUlceraPressao} = this.props;
    let obj = valoresUlceraPressao[this.props.value];
    return (
    <div>
      {this.renderPolygon(obj)}
    </div>
    );
  }

}

UlceraPressao.propTypes = {
  valoresUlceraPressao: PropTypes.object.isRequired,
  lastUpdated: PropTypes.number,
  fetchUlceraPressaoIfNeeded: PropTypes.func.isRequired
};

function mapStateToProps (state) {
  const {ulceraPressaoByAtendimento: valoresUlceraPressao} = state;
  return {valoresUlceraPressao};
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(UlceraPressaoActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UlceraPressao);
