import {
    SELECT_UNIDADE, INVALIDATE_UNIDADE,
    REQUEST_PACIENTES, RECEIVE_PACIENTES,
    SHUFFLE_PACIENTES
} from '../actions';
import {shuffle} from 'lodash';

export function selectedUnidade(state = '', action) {
    switch (action.type) {
        case SELECT_UNIDADE:
            return action.unidade;
        default:
            return state
    }
}

function pacientes(state = {
    isFetching: false,
    didInvalidate: false,
    items: []
}, action) {
    switch (action.type) {
        case INVALIDATE_UNIDADE:
            return Object.assign({}, state, {
                didInvalidate: true
            });
        case REQUEST_PACIENTES:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            });
        case RECEIVE_PACIENTES:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.pacientes,
                lastUpdated: action.receivedAt
            });
        case SHUFFLE_PACIENTES:

            let itemsLength = state.items.length;

            let delta = itemsLength - 20;

            if (delta <= 0) {
                return state;
            } else if (delta > 20) {
                delta = 20;
            }

            let cycledItems = state.items.map((item) => {
                let newI = item.i - delta;
                if (newI < 0) {
                    newI += itemsLength;
                }
                return {...item, i: newI};
            });

            return {...state, items: cycledItems};
        default:
            return state;
    }
}

export function pacientesByUnidade(state = {}, action) {
    switch (action.type) {
        case INVALIDATE_UNIDADE:
        case RECEIVE_PACIENTES:
        case REQUEST_PACIENTES:
        case SHUFFLE_PACIENTES:
            return Object.assign({}, state, {
                [action.unidade]: pacientes(state[action.unidade], action)
            });
        default:
            return state;
    }
}