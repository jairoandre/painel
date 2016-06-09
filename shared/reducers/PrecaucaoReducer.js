import {REQUEST_PRECAUCAO, RECEIVE_PRECAUCAO} from '../actions';

function precaucao(state = {
    isFetching: false,
    precaucao: {}
}, action) {
    switch (action.type) {
        case REQUEST_PRECAUCAO:
            return {...state, isFetching: true};
        case RECEIVE_PRECAUCAO:
            return {
                ...state,
                isFetching: false,
                precaucao: action.precaucao,
                lastUpdated: action.receivedAt
            }
        default:
            return state;
    }
}

export function precaucaoByAtendimento(state = {}, action) {
    switch (action.type) {
        case RECEIVE_PRECAUCAO:
        case REQUEST_PRECAUCAO:
            return {...state, [action.atendimento]: precaucao(state[action.atendimento], action)};
        default:
            return state
    }
}