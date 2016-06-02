import fetch from 'isomorphic-fetch';

export const SELECT_UNIDADE = 'SELECT_UNIDADE';
export const INVALIDATE_UNIDADE = 'INVALIDATE_UNIDADE';
export const REQUEST_PACIENTES = 'REQUEST_PACIENTES';
export const RECEIVE_PACIENTES = 'RECEIVE_PACIENTES';
export const SHUFFLE_PACIENTES = 'SHUFFLE_PACIENTES';

export function shufflePacientes(unidade) {
  return {
    type: SHUFFLE_PACIENTES,
    unidade
  }
}


export function selectUnidade(unidade) {
  return {
    type: SELECT_UNIDADE,
    unidade
  }
}

export function invalidateUnidade(unidade) {
  return {
    type: INVALIDATE_UNIDADE,
    unidade
  }
}

function requestPacientes(unidade) {
  return {
    type: REQUEST_PACIENTES,
    unidade
  }
}

function receivePacientes(unidade, pacientes) {
  return {
    type: RECEIVE_PACIENTES,
    unidade,
    pacientes,
    receivedAt: Date.now()
  }
}

function fetchPacientes(unidade) {
  return dispatch => {
    dispatch(requestPacientes(unidade))
    return fetch(`/api/pacientes/${unidade}`)
      .then(response => response.json())
      .then(pacientes => dispatch(receivePacientes(unidade, pacientes)))
  }
}

function shouldFetchPacientes(state, unidade) {
  const pacientes = state.pacientesByUnidade[unidade]
  if (!pacientes) {
    return true
  }
  if (pacientes.isFetching) {
    return false
  }
  return pacientes.didInvalidate
}

export function fetchPacientesIfNeeded(unidade) {
  return (dispatch, getState) => {
    if (shouldFetchPacientes(getState(), unidade)) {
      return dispatch(fetchPacientes(unidade))
    }
  }
}
