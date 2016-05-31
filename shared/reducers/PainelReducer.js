import { List } from 'immutable';

var axios = require('axios');

const defaultState = [{apto: 1, nome: 'teste', medico: 'dr. teste'}];

export default function painelReducer (state = defaultState , action) {
  switch (action.type) {
    case 'LISTAR_PACIENTES':
      axios.get(`http://localhost:3000/api/pacientes/${action.unidade}`)
        .then(function (res) {
          return res.data;
        })
        .catch(function (res) {
          console.log(res);
          return state;
        });
      break;
    default:
      console.log('teste');
      return state;
  }
};
