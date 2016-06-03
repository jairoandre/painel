import {REQUEST_RISCO_QUEDA, RECEIVE_RISCO_QUEDA} from '../actions';

function riscoQueda(state = {
    isFetching: false,
    riscoQueda: {}
}, action) {
    switch (action.type) {
        case REQUEST_RISCO_QUEDA:
            return {...state, isFetching: true};
        case RECEIVE_RISCO_QUEDA:
            return {
                ...state,
                isFetching: false,
                riscoQueda: action.riscoQueda,
                lastUpdated: action.receivedAt
            };
        default:
            return state;
    }
}

export function riscoQuedaByAtendimento(state = {}, action) {
    switch (action.type) {
        case RECEIVE_RISCO_QUEDA:
        case REQUEST_RISCO_QUEDA:
            return {...state, [action.atendimento]: riscoQueda(state[action.atendimento], action)};
        default:
            return state
    }
}