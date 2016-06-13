import React from 'react';
import { Motion, spring } from 'react-motion';

export default class Marquee extends React.Component {

  constructor(props) {
    super(props);
    this.state = {items: [], intervalId: null, height: props.height | 10};
    this.shiftIndexes = this.shiftIndexes.bind(this);
    this.renderData = this.renderData.bind(this);
  }

  shiftIndexes () {
    let items = this.state.items.map((i, idx, arr) => {
      let newIdx = i - 1;
      if (newIdx < 0) {
        newIdx += arr.length;
      }
      return newIdx;
    });
    this.setState({...this.state, items});
  }

	componentDidMount() {
    let items = Array(this.props.data.length).fill().map((i, idx) => idx);
    let intervalId = setInterval(this.shiftIndexes, 2000);
		this.setState({items, intervalId});
	}

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

	renderData(data) {
    return data.map((item, idx) => {
      const motionStyle = {
        y: spring(this.state.height * this.state.items[idx], {stiffness: 160, damping: 17})
      };
      return (
        <Motion defaultStyle={{y: 0}} style={motionStyle}>
          {(style) => 
            <div key={idx} style={{position: 'absolute', transform: `translate3d(0, ${style.y}px, ${style.y}px)`}}>
              {item}
            </div>
          }
        </Motion>);
		});
	}
	render () {
		return (
			<div style={{position: 'relative'}}>
				{this.renderData(this.props.data)}
			</div>
			);
	}

}