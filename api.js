var oracle = require('oracledb');

const credentials = {
  user: 'dbamv',
  password: 'insertvah16',
  connectString: '10.1.0.30:1521/mvprod'
};

var pacienteLeitoColunas = [
  'TB_ATENDIME.CD_ATENDIMENTO',
  'UNID_INT.DS_UNID_INT',
  'LEITO.DS_LEITO',
  'PACIENTE.NM_PACIENTE',
  'PRESTADOR.NM_PRESTADOR'
];

var pacienteLeitoSQL = 'SELECT ' + pacienteLeitoColunas.join() +
  " FROM DBAMV.TB_ATENDIME \
  JOIN DBAMV.PACIENTE \
    ON TB_ATENDIME.CD_PACIENTE = PACIENTE.CD_PACIENTE \
  JOIN DBAMV.LEITO \
    ON TB_ATENDIME.CD_LEITO = LEITO.CD_LEITO \
  JOIN DBAMV.UNID_INT \
    ON UNID_INT.CD_UNID_INT = LEITO.CD_UNID_INT \
  JOIN DBAMV.PRESTADOR \
    ON TB_ATENDIME.CD_PRESTADOR = PRESTADOR.CD_PRESTADOR \
    WHERE TB_ATENDIME.TP_ATENDIMENTO = 'I' \
      AND UNID_INT.DS_UNID_INT = :DS_UNID_INT \
      AND TB_ATENDIME.DT_ALTA IS NULL \
      AND TB_ATENDIME.CD_MULTI_EMPRESA = 1";

function getConnection () {
  console.log('Conecting...');
  return oracle.getConnection(credentials);
}

function fetchData (sql, params) {
  return getConnection()
    .then((conn) => {
      console.log('Connected!');
      return conn.execute(sql, params)
        .then((result) => {
          console.log('Data fetched!');
          let results = result.rows;
          conn.release();
          return results;
        })
        .catch((err) => {
          console.error('Fecth data error: ' + err);
          return conn.release();
        });
    })
    .catch((err) => {
      console.error('Connection error: ' + err);
    });
}

function consultar (unidade) {
  let promise = new Promise(function (resolve, reject) {
    let result = fetchData(pacienteLeitoSQL, {DS_UNID_INT: unidade});
    if (result) {
      resolve(result);
    } else {
      reject('error');
    }
  });
  return promise;
}

module.exports = {consultar: consultar};
