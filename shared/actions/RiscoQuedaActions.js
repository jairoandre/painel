import fetch from 'isomorphic-fetch';

export const REQUEST_RISCO_QUEDA = 'REQUEST_RISCO_QUEDA';
export const RECEIVE_RISCO_QUEDA = 'RECEIVE_RISCO_QUEDA';

function requestRiscoQueda (atendimento) {
  return {
    type: REQUEST_RISCO_QUEDA,
  atendimento};
}

function receiveRiscoQueda (atendimento, riscoQueda) {
  return {
    type: RECEIVE_RISCO_QUEDA,
    atendimento,
    riscoQueda,
    receivedAt: Date.now()
  };
}

function fetchRiscoQueda (atendimento) {
  return dispatch => {
    dispatch(requestRiscoQueda(atendimento));
    return fetch(`/api/riscoQueda/${atendimento}`)
      .then(response => response.json())
      .then(obj => dispatch(receiveRiscoQueda(atendimento, obj.riscoQueda)));
  };
}

function shouldFetchRiscoQueda (state, atendimento) {
  const riscoQueda = state.riscoQuedaByAtendimento[atendimento];
  if (!riscoQueda) {
    return true;
  }
  if (riscoQueda.isFetching) {
    return false;
  }
  return true;
}

export function fetchRiscoQuedaIfNeeded (atendimento) {
  return (dispatch, getState) => {
    if (shouldFetchRiscoQueda(getState(), atendimento)) {
      return dispatch(fetchRiscoQueda(atendimento));
    }
  };
}
