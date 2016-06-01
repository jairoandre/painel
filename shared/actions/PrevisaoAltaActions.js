import fetch from 'isomorphic-fetch';


export const REQUEST_PREVISAO_ALTA = 'REQUEST_PREVISAO_ALTA';
export const RECEIVE_PREVISAO_ALTA = 'RECEIVE_PREVISAO_ALTA';

function requestPrevisaoAlta(atendimento) {
    return {
        type: REQUEST_PREVISAO_ALTA,
        atendimento
    }
}

function receivePrevisaoAlta(atendimento, previsaoAlta) {
    return {
        type: RECEIVE_PREVISAO_ALTA,
        atendimento,
        previsaoAlta,
        receivedAt: Date.now()
    }
}

function fetchPrevisaoAlta(atendimento) {
    return dispatch => {
        dispatch(requestPrevisaoAlta(atendimento))
        return fetch(`/api/previsaoAlta/${atendimento}`)
            .then(response => response.json())
            .then(obj => dispatch(receivePrevisaoAlta(atendimento, obj.previsaoAlta)))
    }
}

function shouldFetchPrevisaoAlta(state, atendimento) {
    const previsaoAlta = state.previsaoAltaByAtendimento[atendimento]
    if (!previsaoAlta) {
        return true
    }
    if (previsaoAlta.isFetching) {
        return false
    }
    return previsaoAlta.didInvalidate
}

export function fetchPrevisaoAltaIfNeeded(atendimento) {
    return (dispatch, getState) => {
        if (shouldFetchPrevisaoAlta(getState(), atendimento)) {
            return dispatch(fetchPrevisaoAlta(atendimento))
        }
    }
}