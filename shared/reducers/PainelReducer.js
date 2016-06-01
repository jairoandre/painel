import { combineReducers } from 'redux'
import {
  SELECT_UNIDADE, INVALIDATE_UNIDADE,
  REQUEST_PACIENTES, RECEIVE_PACIENTES
} from '../actions'

function selectedUnidade(state = {pacientes: []}, action) {
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
  pacientes: []
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
        pacientes: action.pacientes,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

function pacientesByUnidade(state = { pacientes: [] }, action) {
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

const rootReducer = combineReducers({
  pacientesByUnidade,
  selectedUnidade
})

export default rootReducer