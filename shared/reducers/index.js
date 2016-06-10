import { combineReducers } from 'redux';
import { scpByAtendimento } from './ScpReducer';
import { riscoQuedaByAtendimento } from './RiscoQuedaReducer';
import { previsaoAltaByAtendimento } from './PrevisaoAltaReducer';
import { pacientesByUnidade, selectedUnidade } from './PacienteReducer';
import { ulceraPressaoByAtendimento } from './UlceraPressaoReducer';
import { precaucaoByAtendimento } from './PrecaucaoReducer';
import { alergiaByAtendimento } from './AlergiaReducer';
import { examesByAtendimento } from './ExamesReducer';
import { intervals } from './IntervalReducer';

const rootReducer = combineReducers({
  scpByAtendimento,
  riscoQuedaByAtendimento,
  previsaoAltaByAtendimento,
  pacientesByUnidade,
  ulceraPressaoByAtendimento,
  precaucaoByAtendimento,
  alergiaByAtendimento,
  examesByAtendimento,
  intervals,
  selectedUnidade
});

export default rootReducer;