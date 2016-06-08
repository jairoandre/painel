import fetch from 'isomorphic-fetch';


export const REQUEST_ALERGIA = 'REQUEST_ALERGIA';
export const RECEIVE_ALERGIA = 'RECEIVE_ALERGIA';

function requestAlergia(atendimento) {
    return {
        type: REQUEST_ALERGIA,
        atendimento
    }
}

function receiveAlergia(atendimento, alergia) {
    return {
        type: RECEIVE_ALERGIA,
        atendimento,
        alergia,
        receivedAt: Date.now()
    }
}

function fetchAlergia(atendimento) {
    return dispatch => {
        dispatch(requestAlergia(atendimento))
        return fetch(`/api/alergia/${atendimento}`)
            .then(response => response.json())
            .then(obj => dispatch(receiveAlergia(atendimento, obj)))
    }
}

function shouldFetchAlergia(state, atendimento) {
    const alergia = state.alergiaByAtendimento[atendimento]
    if (!alergia) {
        return true
    }
    if (alergia.isFetching) {
        return false
    }
    return alergia.didInvalidate
}

export function fetchAlergiaIfNeeded(atendimento) {
    return (dispatch, getState) => {
        if (shouldFetchAlergia(getState(), atendimento)) {
            return dispatch(fetchAlergia(atendimento))
        }
    }
}