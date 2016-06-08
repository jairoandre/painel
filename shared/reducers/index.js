import { combineReducers } from 'redux';
import { scpByAtendimento } from './ScpReducer';
import { riscoQuedaByAtendimento } from './RiscoQuedaReducer';
import { previsaoAltaByAtendimento } from './PrevisaoAltaReducer';
import { pacientesByUnidade, selectedUnidade } from './PacienteReducer';
import { ulceraPressaoByAtendimento } from './UlceraPressaoReducer';
import { alergiaByAtendimento } from './AlergiaReducer';

const rootReducer = combineReducers({
  scpByAtendimento,
  riscoQuedaByAtendimento,
  previsaoAltaByAtendimento,
  pacientesByUnidade,
  ulceraPressaoByAtendimento,
  alergiaByAtendimento,
  selectedUnidade
});

export default rootReducer;
