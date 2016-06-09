import { INCLUDE_INTERVAL, CLEAR_INTERVALS } from '../actions';
import Immutable from 'immutable';

export function intervals(state = [], action) {
	switch (action.type) {
		case INCLUDE_INTERVAL:
			let newState = Immutable.List(state);
			return newState.push(action.intervalId).toArray();
		case CLEAR_INTERVALS:
			for (let i = 0; i < state.length; i++) {
				clearInterval(state[i]);
			}
			return [];
		default:
			return state;
	}
}