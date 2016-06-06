import fetch from 'isomorphic-fetch';

export const REQUEST_ULCERA_PRESSAO = 'REQUEST_ULCERA_PRESSAO';
export const RECEIVE_ULCERA_PRESSAO = 'RECEIVE_ULCERA_PRESSAO';

function requestUlceraPressao (atendimento) {
  return {
    type: REQUEST_ULCERA_PRESSAO,
  atendimento};
}

function receiveUlceraPressao (atendimento, ulceraPressao) {
  return {
    type: RECEIVE_ULCERA_PRESSAO,
    atendimento,
    ulceraPressao,
    receivedAt: Date.now()
  };
}

function fetchUlceraPressao (atendimento) {
  return dispatch => {
    dispatch(requestUlceraPressao(atendimento));
    return fetch(`/api/ulceraPressao/${atendimento}`)
      .then(response => response.json())
      .then(obj => dispatch(receiveUlceraPressao(atendimento, obj.ulceraPressao)));
  };
}

function shouldFetchUlceraPressao (state, atendimento) {
  const ulceraPressao = state.ulceraPressaoByAtendimento[atendimento];
  if (!ulceraPressao) {
    return true;
  }
  if (ulceraPressao.isFetching) {
    return false;
  }
  return true;
}

export function fetchUlceraPressaoIfNeeded (atendimento) {
  return (dispatch, getState) => {
    if (shouldFetchUlceraPressao(getState(), atendimento)) {
      return dispatch(fetchUlceraPressao(atendimento));
    }
  };
}
