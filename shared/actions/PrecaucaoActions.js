import fetch from 'isomorphic-fetch';


export const REQUEST_PRECAUCAO = 'REQUEST_PRECAUCAO';
export const RECEIVE_PRECAUCAO = 'RECEIVE_PRECAUCAO';

function requestPrecaucao(atendimento) {
    return {
        type: REQUEST_PRECAUCAO,
        atendimento
    }
}

function receivePrecaucao(atendimento, precaucao) {
    return {
        type: RECEIVE_PRECAUCAO,
        atendimento,
        precaucao,
        receivedAt: Date.now()
    }
}

function fetchPrecaucao(atendimento) {
    return dispatch => {
        dispatch(requestPrecaucao(atendimento))
        return fetch(`/api/precaucao/${atendimento}`)
            .then(response => response.json())
            .then(obj => dispatch(receivePrecaucao(atendimento, obj.precaucao)))
    }
}

function shouldFetchPrecaucao(state, atendimento) {
    const precaucao = state.precaucaoByAtendimento[atendimento]
    if (!precaucao) {
        return true;
    }
    if (precaucao.isFetching) {
        return false;
    }
    return true;
}

export function fetchPrecaucaoIfNeeded(atendimento) {
    return (dispatch, getState) => {
        if (shouldFetchPrecaucao(getState(), atendimento)) {
            return dispatch(fetchPrecaucao(atendimento))
        }
    }
}