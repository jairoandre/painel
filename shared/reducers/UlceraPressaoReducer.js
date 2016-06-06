import {REQUEST_ULCERA_PRESSAO, RECEIVE_ULCERA_PRESSAO} from '../actions';

function ulceraPressao(state = {
    isFetching: false,
    ulceraPressao: {}
}, action) {
    switch (action.type) {
        case REQUEST_ULCERA_PRESSAO:
            return {...state, isFetching: true};
        case RECEIVE_ULCERA_PRESSAO:
            return {
                ...state,
                isFetching: false,
                ulceraPressao: action.ulceraPressao,
                lastUpdated: action.receivedAt
            };
        default:
            return state;
    }
}

export function ulceraPressaoByAtendimento(state = {}, action) {
    switch (action.type) {
        case RECEIVE_ULCERA_PRESSAO:
        case REQUEST_ULCERA_PRESSAO:
            return {...state, [action.atendimento]: ulceraPressao(state[action.atendimento], action)};
        default:
            return state
    }
}