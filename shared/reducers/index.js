import { combineReducers } from 'redux';
import { scpByAtendimento } from './ScpReducer';
import { riscoQuedaByAtendimento } from './RiscoQuedaReducer';
import { pacientesByUnidade, selectedUnidade } from './PacienteReducer';
import { previsaoAltaByAtendimento } from './PrevisaoAltaReducer';

const rootReducer = combineReducers({
  scpByAtendimento,
  riscoQuedaByAtendimento,
  previsaoAltaByAtendimento,
  pacientesByUnidade,
  selectedUnidade
});

export default rootReducer;
