import React from 'react';
import { Motion, spring } from 'react-motion';

export default class Marquee extends React.Component {

	renderData(data) {
		return data.map((item, i) => {
			const motionStyle = {
      	y: spring(10 * i, {stiffness: 160, damping: 17})
      };
      return (
      	<Motion defaultStyle={{y: 0}} style={motionStyle}>
      	{(style) => 
      		<div style={{position: 'absolute', transform: `translate3d(0, ${style.y}px, ${style.y}px)`}}>
						{item}
					</div>
      	}
  			</Motion>
      );
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