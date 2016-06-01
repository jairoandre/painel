import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as PrevisaoAltaActions from '../actions/PrevisaoAltaActions';

var moment = require('moment');

class PrevisaoAlta extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchPrevisaoAltaIfNeeded(this.props.value);
    }

    render() {
        const { previsoes } = this.props;

        let obj = previsoes[this.props.value];

        let dateStr = 'N/A';

        if (obj) {
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
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    fetchPrevisaoAltaIfNeeded: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const { previsaoAltaByAtendimento: previsoes } = state;


    return {
        previsoes
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(PrevisaoAltaActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PrevisaoAlta);