export const INCLUDE_INTERVAL = 'INCLUDE_INTERVAL';
export const CLEAR_INTERVALS = 'CLEAR_INTERVALS';

export function includeInterval(intervalId) {
	return {
		type: INCLUDE_INTERVAL,
		intervalId
	}  
}

export function clearIntervals() {
	return {
		type: CLEAR_INTERVALS
	}
}