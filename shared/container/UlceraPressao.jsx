import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as UlceraPressaoActions from '../actions/UlceraPressaoActions';

class UlceraPressao extends Component {

  constructor (props) {
    super(props);
  }

  componentDidMount () {
    this.props.fetchUlceraPressaoIfNeeded(this.props.value);
  }

  renderPolygon (obj) {
    if (obj) {
      let ulceraPressao = obj.ulceraPressao;

      if (ulceraPressao >= 4 && ulceraPressao <= 12) {
        return <img src='/imgs/bed.png' width='50px' style={{backgroundColor: '#88dc88', borderRadius: '5px'}} />;
      } else if (ulceraPressao >= 13 && ulceraPressao <= 15) {
        return <img src='/imgs/bed.png' width='50px' style={{backgroundColor: '#fd9b10', borderRadius: '5px'}} />;
      } else if (ulceraPressao >= 4 && ulceraPressao <= 12) {
        return <img src='/imgs/bed.png' width='50px' style={{backgroundColor: '#ff5555', borderRadius: '5px'}} />;
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
  isFetching: PropTypes.bool.isRequired,
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
