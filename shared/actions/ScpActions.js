import fetch from 'isomorphic-fetch';

export const REQUEST_SCP = 'REQUEST_SCP';
export const RECEIVE_SCP = 'RECEIVE_SCP';

function requestScp (atendimento) {
  return {
    type: REQUEST_SCP,
  atendimento};
}

function receiveScp (atendimento, scp) {
  return {
    type: RECEIVE_SCP,
    atendimento,
    scp,
    receivedAt: Date.now()
  };
}

function fetchScp (atendimento) {
  return dispatch => {
    dispatch(requestScp(atendimento));
    return fetch(`/api/scp/${atendimento}`)
      .then(response => response.json())
      .then(obj => dispatch(receiveScp(atendimento, obj.scp)));
  };
}

function shouldFetchScp (state, atendimento) {
  const scp = state.scpByAtendimento[atendimento];
  if (!scp) {
    return true;
  }
  if (scp.isFetching) {
    return false;
  }
  return true;
}

export function fetchScpIfNeeded (atendimento) {
  return (dispatch, getState) => {
    if (shouldFetchScp(getState(), atendimento)) {
      return dispatch(fetchScp(atendimento));
    }
  };
}
