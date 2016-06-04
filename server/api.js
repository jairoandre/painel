import express from 'express';
const database = require('./oracle/database.js');

function getRouter () {
  var router = express.Router();

  router.route('/pacientes/:unidade')
    .get(getPacientes);

  router.route('/previsaoAlta/:atendimento')
    .get(getPrevisaoAlta);

  router.route('/scp/:atendimento')
    .get(getScp);

  router.route('/riscoQueda/:atendimento')
    .get(getRiscoQueda);

    router.route('/teste').post(postTeste);

  return router;
}

module.exports.getRouter = getRouter;

var mock = require('./mock.js');

const pacienteLeitoColunas = [
  'TB_ATENDIME.CD_ATENDIMENTO',
  'LEITO.DS_LEITO',
  'PACIENTE.NM_PACIENTE',
  'PRESTADOR.NM_MNEMONICO',
  'CONVENIO.NM_CONVENIO'
];

const pacienteLeitoSQL = `
  SELECT ${pacienteLeitoColunas.join()} FROM DBAMV.TB_ATENDIME
  JOIN DBAMV.PACIENTE
    ON TB_ATENDIME.CD_PACIENTE = PACIENTE.CD_PACIENTE
  JOIN DBAMV.LEITO
    ON TB_ATENDIME.CD_LEITO = LEITO.CD_LEITO
  JOIN DBAMV.UNID_INT
    ON UNID_INT.CD_UNID_INT = LEITO.CD_UNID_INT
  JOIN DBAMV.PRESTADOR
    ON TB_ATENDIME.CD_PRESTADOR = PRESTADOR.CD_PRESTADOR
  JOIN DBAMV.CONVENIO
    ON TB_ATENDIME.CD_CONVENIO = CONVENIO.CD_CONVENIO
    WHERE TB_ATENDIME.TP_ATENDIMENTO = 'I'
      AND UNID_INT.DS_UNID_INT = :DS_UNID_INT
      AND TB_ATENDIME.DT_ALTA IS NULL
      AND TB_ATENDIME.CD_MULTI_EMPRESA = 1
      ORDER BY LEITO.DS_LEITO
`;

const previsaoAltaSQL = `
SELECT MAX(ITPRE_MED.DH_INICIAL)
    FROM DBAMV.TB_ATENDIME
    JOIN DBAMV.PRE_MED
        ON TB_ATENDIME.CD_ATENDIMENTO = PRE_MED.CD_ATENDIMENTO
    JOIN DBAMV.ITPRE_MED
        ON PRE_MED.CD_PRE_MED = ITPRE_MED.CD_PRE_MED
    WHERE TB_ATENDIME.CD_ATENDIMENTO = :CD_ATENDIMENTO
        AND ITPRE_MED.CD_TIP_PRESC = 26057
        AND ITPRE_MED.TP_SITUACAO = 'N'
`;

const scpSQL = `
SELECT VL_RESULTADO
    FROM DBAMV.PAGU_AVALIACAO
    WHERE PAGU_AVALIACAO.CD_ATENDIMENTO = :CD_ATENDIMENTO
    AND  PAGU_AVALIACAO.CD_FORMULA = 21
    ORDER BY DH_AVALIACAO DESC
`;

const riscoQuedaSQL = `
SELECT VL_RESULTADO
    FROM DBAMV.PAGU_AVALIACAO
    WHERE PAGU_AVALIACAO.CD_ATENDIMENTO = :CD_ATENDIMENTO
    AND  PAGU_AVALIACAO.CD_FORMULA = 18
    ORDER BY DH_AVALIACAO DESC
`;

function getPacientes (req, res, next) {
  if (process.env.MOCK) {
    res.send(mock);
  } else {
    database.simpleExecute(pacienteLeitoSQL,
      {DS_UNID_INT: req.params.unidade},
      {outFormat: database.ARRAY})
      .then(function (results) {
        res.send(results.rows.map((item, i) => {
          return {
            i,
            atendimento: item[0],
            leito: item[1],
            nome: item[2],
            medico: item[3],
            convenio: item[4]
          };
        }));
      })
      .catch(function (err) {
        next(err);
      });
  }
}

function getPrevisaoAlta (req, res, next) {
  if (process.env.MOCK) {
    res.send({previsaoAlta: new Date()});
  } else {
    database.simpleExecute(previsaoAltaSQL,
      {CD_ATENDIMENTO: req.params.atendimento},
      {outFormat: database.ARRAY})
      .then(function (results) {
        if (results.rows[0])
          res.send({previsaoAlta: results.rows[0][0]});
        else
          res.send({previsaoAlta: null});
      })
      .catch(function (err) {
        next(err);
      });
  }
}

function getScp (req, res, next) {
  if (process.env.MOCK) {
    res.send({scp: Math.floor(Math.random() * 50)});
  } else {
    database.simpleExecute(scpSQL,
      {CD_ATENDIMENTO: req.params.atendimento},
      {outFormat: database.ARRAY})
      .then(function (results) {
        if (results.rows[0])
          res.send({scp: results.rows[0][0]});
        else
          res.send({scp: 0});
      })
      .catch(function (err) {
        next(err);
      });
  }
}

function getRiscoQueda (req, res, next) {
  if (process.env.MOCK) {
    res.send({riscoQueda: Math.floor(Math.random() * 90)});
  } else {
    database.simpleExecute(riscoQuedaSQL,
      {CD_ATENDIMENTO: req.params.atendimento},
      {outFormat: database.ARRAY})
      .then(function (results) {
        if (results.rows[0])
          res.send({riscoQueda: results.rows[0][0]});
        else
          res.send({riscoQueda: 0});
      })
      .catch(function (err) {
        next(err);
      });
  }
}

function postTeste (req, res, next) {
  res.send(req.body.teste);
}
