import {REQUEST_PREVISAO_ALTA, RECEIVE_PREVISAO_ALTA} from '../actions';

function previsaoAlta(state = {
    isFetching: false,
    previsaoAlta: {}
}, action) {
    switch (action.type) {
        case REQUEST_PREVISAO_ALTA:
            return {...state, isFetching: true};
        case RECEIVE_PREVISAO_ALTA:
            return {
                ...state,
                isFetching: false,
                previsaoAlta: action.previsaoAlta,
                lastUpdated: action.receivedAt
            }
        default:
            return state;
    }
}

export function previsaoAltaByAtendimento(state = {}, action) {
    switch (action.type) {
        case RECEIVE_PREVISAO_ALTA:
        case REQUEST_PREVISAO_ALTA:
            return {...state, [action.atendimento]: previsaoAlta(state[action.atendimento], action)};
        default:
            return state
    }
}