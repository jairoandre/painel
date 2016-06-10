import {REQUEST_EXAMES, RECEIVE_EXAMES} from '../actions';

function exames(state = {
    isFetching: false,
    exames: []
}, action) {
    switch (action.type) {
        case REQUEST_EXAMES:
            return {...state, isFetching: true};
        case RECEIVE_EXAMES:
            return {
                ...state,
                isFetching: false,
                exames: action.exames,
                lastUpdated: action.receivedAt
            };
        default:
            return state;
    }
}

export function examesByAtendimento(state = {}, action) {
    switch (action.type) {
        case RECEIVE_EXAMES:
        case REQUEST_EXAMES:
            return {...state, [action.atendimento]: exames(state[action.atendimento], action)};
        default:
            return state
    }
}