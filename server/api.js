import express from 'express';
const database = require('./oracle/database.js');
import {getId} from '../shared/utils';

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

  router.route('/previsoes/:unidade')
    .get(getPrevisoesAlta);

  router.route('/ulceraPressao/:unidade')
    .get(getUlceraPressao);

  return router;
}

module.exports.getRouter = getRouter;

var mock = require('./mock.js');

const pacienteLeitoSQL = `
SELECT
P.CD_ATENDIMENTO, L.DS_LEITO, P.NM_PACIENTE, P.NM_MNEMONICO, P.NM_CONVENIO, L.TP_OCUPACAO
FROM
(
   SELECT
   A.CD_ATENDIMENTO,
   L.CD_LEITO,
   P.NM_PACIENTE,
   PR.NM_MNEMONICO,
   C.NM_CONVENIO,
   U.DS_UNID_INT
   FROM DBAMV.TB_ATENDIME A
   JOIN DBAMV.PACIENTE P ON A.CD_PACIENTE = P.CD_PACIENTE
   JOIN DBAMV.PRESTADOR PR ON A.CD_PRESTADOR = PR.CD_PRESTADOR
   JOIN DBAMV.CONVENIO C ON A.CD_CONVENIO = C.CD_CONVENIO
   JOIN DBAMV.LEITO L ON A.CD_LEITO = L.CD_LEITO
   JOIN DBAMV.UNID_INT U ON U.CD_UNID_INT = L.CD_UNID_INT
   WHERE A.TP_ATENDIMENTO = 'I'
   AND U.CD_UNID_INT IN (:CD_UNID_INT)
   AND A.DT_ALTA IS NULL
   AND A.CD_MULTI_EMPRESA = 1
   ORDER BY L.DS_LEITO
)
P
RIGHT JOIN
(
   SELECT
   L.CD_LEITO, L.DS_LEITO, L.TP_OCUPACAO
   FROM DBAMV.LEITO L
   JOIN DBAMV.UNID_INT U ON L.CD_UNID_INT = U.CD_UNID_INT
   WHERE U.CD_UNID_INT IN (:CD_UNIT_INT)
   AND L.TP_SITUACAO = 'A'
   ORDER BY L.DS_LEITO
)
L ON P.CD_LEITO = L.CD_LEITO
ORDER BY L.DS_LEITO
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

/**
 Recupera as previsões de alta para os atendimentos correntes de uma determinada unidade
 PS: Consulta ficou mais lenta (repetição de JOINS)
**/
const previsoesAltaSQL = `
SELECT TB_ATENDIME.CD_ATENDIMENTO, MAX(ITPRE_MED.DH_INICIAL)
    FROM DBAMV.TB_ATENDIME
    JOIN DBAMV.PRE_MED
        ON TB_ATENDIME.CD_ATENDIMENTO = PRE_MED.CD_ATENDIMENTO
    JOIN DBAMV.ITPRE_MED
        ON PRE_MED.CD_PRE_MED = ITPRE_MED.CD_PRE_MED
    JOIN DBAMV.LEITO
        ON TB_ATENDIME.CD_LEITO = LEITO.CD_LEITO
    JOIN DBAMV.UNID_INT
        ON UNID_INT.CD_UNID_INT = LEITO.CD_UNID_INT  
    WHERE UNID_INT.CD_UNID_INT IN (:CD_UNID_INT)
        AND ITPRE_MED.CD_TIP_PRESC = 26057
        AND ITPRE_MED.TP_SITUACAO = 'N'
        AND TB_ATENDIME.DT_ALTA IS NULL
        AND TB_ATENDIME.CD_MULTI_EMPRESA = 1
        AND TB_ATENDIME.TP_ATENDIMENTO = 'I'   
   GROUP BY TB_ATENDIME.CD_ATENDIMENTO
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

const ulceraPressaoSQL = `
SELECT VL_RESULTADO
    FROM DBAMV.PAGU_AVALIACAO
    WHERE PAGU_AVALIACAO.CD_ATENDIMENTO = :CD_ATENDIMENTO
    AND  PAGU_AVALIACAO.CD_FORMULA = 19
    ORDER BY DH_AVALIACAO DESC
`;

// ALERGIA
const alergiaSQL = `
SELECT RR.CD_PERGUNTA_DOC, RR.DS_RESPOSTA FROM DBAMV.REGISTRO_DOCUMENTO RD
  JOIN DBAMV.REGISTRO_RESPOSTA RR ON
  RD.CD_REGISTRO_DOCUMENTO = RR.CD_REGISTRO_DOCUMENTO 
  WHERE RD.CD_ATENDIMENTO = :CD_ATENDIMENTO
  AND RR.DS_RESPOSTA IS NOT NULL
    AND RR.CD_PERGUNTA_DOC IN (16361,16362,16381,16382,16383,16384,16385,16386,16387,16388,16389)
    AND RD.DT_REGISTRO = (
    SELECT MAX(RD.DT_REGISTRO) FROM DBAMV.REGISTRO_DOCUMENTO RD
      JOIN DBAMV.REGISTRO_RESPOSTA RR ON RD.CD_REGISTRO_DOCUMENTO = RR.CD_REGISTRO_DOCUMENTO 
      WHERE RD.CD_ATENDIMENTO = :CD_ATENDIMENTO
      AND RR.DS_RESPOSTA IS NOT NULL
      AND RR.CD_PERGUNTA_DOC IN (16361,16362,16381,16382,16383,16384,16385,16386,16387,16388,16389))
`;

function getPacientes (req, res, next) {
  if (process.env.MOCK) {
    res.send(mock);
  } else {
    let id = getId(req.params.unidade);
    database.simpleExecute(pacienteLeitoSQL,
      [id, id],
      {outFormat: database.ARRAY})
      .then(function (results) {
        res.send(results.rows.map((item, i) => {
          return {
            i,
            atendimento: item[0],
            leito: item[1],
            nome: item[2],
            medico: item[3],
            convenio: item[4],
            status: item[5]
          };
        }));
      })
      .catch(function (err) {
        next(err);
      });
  }
}

function getPrevisoesAlta (req, res, next) {
  if (process.env.MOCK) {
    res.send(mock.map((item) => {return {[item.atendimento]: new Date()};}));
  } else {
    database.simpleExecute(previsoesAltaSQL,
      {CD_UNID_INT: getId(req.params.unidade)},
      {outFormat: database.ARRAY})
        .then(function (results) {
          let result = {};
          let rows = results.rows;
          for (let i = 0 ; i < rows.length; i++) {
            result = {...result, [rows[i][0]]: rows[i][1]}
          }
          res.send(result);
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

function getUlceraPressao (req, res, next) {
  if (process.env.MOCK) {
    res.send({ulceraPressao: Math.floor(Math.random() * 90)});
  } else {
    database.simpleExecute(ulceraPressaoSQL,
      {CD_ATENDIMENTO: req.params.atendimento},
      {outFormat: database.ARRAY})
      .then(function (results) {
        if (results.rows[0])
          res.send({ulceraPressao: results.rows[0][0]});
        else
          res.send({ulceraPressao: 0});
      })
      .catch(function (err) {
        next(err);
      });
  }
}
