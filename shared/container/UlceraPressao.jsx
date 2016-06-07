import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as UlceraPressaoActions from '../actions/UlceraPressaoActions';

class UlceraPressao extends Component {

  constructor (props) {
    super(props);
  }

  componentDidMount () {
    if (this.props.value) {
      this.props.fetchUlceraPressaoIfNeeded(this.props.value);
    }
  }

  renderImgBed(color) {
    return <img src='/imgs/bed.png' width='50px' style={{backgroundColor: color, borderRadius: '5px'}} />;
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
