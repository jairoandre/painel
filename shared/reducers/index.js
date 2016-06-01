import {combineReducers} from 'redux'
import {
    SELECT_UNIDADE, INVALIDATE_UNIDADE,
    REQUEST_PACIENTES, RECEIVE_PACIENTES,
    REQUEST_PREVISAO_ALTA, RECEIVE_PREVISAO_ALTA
} from '../actions'

function selectedUnidade(state = '', action) {
    switch (action.type) {
        case SELECT_UNIDADE:
            return action.unidade
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
            })
        case REQUEST_PACIENTES:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            })
        case RECEIVE_PACIENTES:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.pacientes,
                lastUpdated: action.receivedAt
            })
        default:
            return state
    }
}

function pacientesByUnidade(state = {}, action) {
    switch (action.type) {
        case INVALIDATE_UNIDADE:
        case RECEIVE_PACIENTES:
        case REQUEST_PACIENTES:
            return Object.assign({}, state, {
                [action.unidade]: pacientes(state[action.unidade], action)
            })
        default:
            return state
    }
}

function previsaoAlta(state = {
    isFetching: false,
    didInvalidate: false,
    previsaoAlta: {}
}, action) {
    switch (action.type) {
        case REQUEST_PREVISAO_ALTA:
            return {...state, isFetching: true, didInvalidate: false};
        case RECEIVE_PREVISAO_ALTA:
            return {
                ...state,
                isFetching: false,
                didInvalidate: false,
                previsaoAlta: action.previsaoAlta,
                lastUpdated: action.receivedAt
            }
        default:
            return state;
    }
}

function previsaoAltaByAtendimento(state = {}, action) {
    switch (action.type) {
        case RECEIVE_PREVISAO_ALTA:
        case REQUEST_PREVISAO_ALTA:
            return {...state, [action.atendimento]: previsaoAlta(state[action.atendimento], action)};
        default:
            return state
    }
}

const rootReducer = combineReducers({
    previsaoAltaByAtendimento,
    pacientesByUnidade,
    selectedUnidade
})

export default rootReducer;