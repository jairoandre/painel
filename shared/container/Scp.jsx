import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as ScpActions from '../actions/ScpActions';

class Scp extends Component {

    constructor(props) {
        super(props);
        this.state = {intervalId: null};
        this.fetchData = this.fetchData.bind(this);
    }

    fetchData () {
        if (this.props.value) {         
            this.props.fetchScpIfNeeded(this.props.value);   
        }
    }

    componentDidMount () {
        if (this.props.value) {
            this.props.fetchScpIfNeeded(this.props.value);
            let intervalId = setInterval(this.fetchData, 120000);
            this.setState({...this.state, intervalId});
        }        
    }

    componentWillUnmount () {
        clearInterval(this.state.intervalId);
    }

    renderPolygon(obj) {
        if (obj) {
            let scp = obj.scp;
            if (scp >= 9 && scp <= 14) {
                return (
                    <svg height="50" width="50">
                        <polygon points="0,50 50,50 25,0" fill="green"/>
                    </svg>
                );
            } else if (scp >= 15 && scp <= 23) {
                return (
                    <svg width="50" height="50">
                        <circle cx="25" cy="25" r="25" fill="#cc0099"/>
                    </svg>
                );
            } else if (scp >= 24 && scp <= 31) {
                return (
                    <svg width="50" height="50">
                        <rect width="50" height="50" fill="orange"/>
                    </svg>
                );
            } else if (scp > 31) {
                return (
                    <svg width="50" height="50">
                        <polygon fill="#ff3333" points="25,0 0,20 9,50 41,50 50,20"/>
                    </svg>
                );
            }
        }
    }

render()
{
    const {scps} = this.props;

    let obj = scps[this.props.value];

    return (
        <div>
            {this.renderPolygon(obj)}
        </div>
    );
}

}

Scp.propTypes = {
    scps: PropTypes.object.isRequired,
    lastUpdated: PropTypes.number,
    fetchScpIfNeeded: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const {scpByAtendimento: scps} = state;
    return {
        scps
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ScpActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Scp);