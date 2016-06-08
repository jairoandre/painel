import {REQUEST_ALERGIA, RECEIVE_ALERGIA} from '../actions';

function alergia(state = {
    isFetching: false,
    alergia: {}
}, action) {
    switch (action.type) {
        case REQUEST_ALERGIA:
            return {...state, isFetching: true};
        case RECEIVE_ALERGIA:
            return {
                ...state,
                isFetching: false,
                alergia: action.alergia,
                lastUpdated: action.receivedAt
            };
        default:
            return state;
    }
}

export function alergiaByAtendimento(state = {}, action) {
    switch (action.type) {
        case RECEIVE_ALERGIA:
        case REQUEST_ALERGIA:
            return {...state, [action.atendimento]: alergia(state[action.atendimento], action)};
        default:
            return state
    }
}