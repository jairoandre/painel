import fetch from 'isomorphic-fetch';

export const REQUEST_EXAMES = 'REQUEST_EXAMES';
export const RECEIVE_EXAMES = 'RECEIVE_EXAMES';

function requestExames(atendimento) {
    return {
        type: REQUEST_EXAMES,
        atendimento
    }
}

function receiveExames(atendimento, exames) {
    return {
        type: RECEIVE_EXAMES,
        atendimento,
        exames,
        receivedAt: Date.now()
    }
}

function fetchExames(atendimento) {
    return dispatch => {
        dispatch(requestExames(atendimento))
        return fetch(`/api/exames/${atendimento}`)
            .then(response => response.json())
            .then(obj => dispatch(receiveExames(atendimento, obj.exames)))
    }
}

function shouldFetchExames(state, atendimento) {
    const exames = state.examesByAtendimento[atendimento]
    if (!exames) {
        return true
    }
    if (exames.isFetching) {
        return false
    }
    return exames.didInvalidate
}

export function fetchExamesIfNeeded(atendimento) {
    return (dispatch, getState) => {
        if (shouldFetchExames(getState(), atendimento)) {
            return dispatch(fetchExames(atendimento))
        }
    }
}
