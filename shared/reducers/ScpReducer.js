import {REQUEST_SCP, RECEIVE_SCP} from '../actions';

function scp(state = {
    isFetching: false,
    scp: {}
}, action) {
    switch (action.type) {
        case REQUEST_SCP:
            return {...state, isFetching: true};
        case RECEIVE_SCP:
            return {
                ...state,
                isFetching: false,
                scp: action.scp,
                lastUpdated: action.receivedAt
            };
        default:
            return state;
    }
}

export function scpByAtendimento(state = {}, action) {
    switch (action.type) {
        case RECEIVE_SCP:
        case REQUEST_SCP:
            return {...state, [action.atendimento]: scp(state[action.atendimento], action)};
        default:
            return state
    }
}