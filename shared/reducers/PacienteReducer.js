import {
    SELECT_UNIDADE, INVALIDATE_UNIDADE, SHUFFLE_PACIENTES,
    REQUEST_PACIENTES, RECEIVE_PACIENTES,
    REQUEST_PREVISOES, RECEIVE_PREVISOES
} from '../actions';
import {shuffle} from 'lodash';

var moment = require('moment');

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
            return {...state,
                didInvalidate: true};
        case REQUEST_PACIENTES:
            return {...state, 
                isFetching: true,
                didInvalidate: false
            };
        case RECEIVE_PACIENTES:
            return {...state,
                isFetching: false,
                didInvalidate: false,
                items: action.pacientes,
                lastUpdated: action.receivedAt
            };
        case REQUEST_PREVISOES:
            return {...state, isFetching: true};
        case RECEIVE_PREVISOES:

            let itemsComPrevisao = state.items.map((paciente) => {
                let previsaoAlta = action.previsoes[paciente.atendimento];
                let previsaoAltaStr = 'N/A';
                if (previsaoAlta) {
                    previsaoAltaStr = moment(previsaoAlta).format('DD/MM/YYYY');
                }
                return {...paciente, previsaoAlta: previsaoAltaStr}
            });

            return {...state, items: itemsComPrevisao, lastUpdated: action.receivedAt};
            
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
        case RECEIVE_PREVISOES:
        case REQUEST_PREVISOES:
            return Object.assign({}, state, {
                [action.unidade]: pacientes(state[action.unidade], action)
            });
        default:
            return state;
    }
}