import express from 'express';
const database = require('./oracle/database.js');

function getRouter() {
    var router = express.Router();

    router.route('/pacientes/:unidade')
        .get(getPacientes);

    router.route('/previsaoAlta/:atendimento')
        .get(getPrevisaoAlta);

    return router;
}


module.exports.getRouter = getRouter;

const pacienteLeitoColunas = [
    'TB_ATENDIME.CD_ATENDIMENTO',
    'LEITO.DS_LEITO',
    'PACIENTE.NM_PACIENTE',
    'PRESTADOR.NM_MNEMONICO'
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

function getPacientes(req, res, next) {
    database.simpleExecute(pacienteLeitoSQL,
        {DS_UNID_INT: req.params.unidade},
        {outFormat: database.ARRAY})
        .then(function (results) {
            res.send(results.rows.map((item) => {
                return {
                    atendimento: item[0],
                    leito: item[1],
                    nome: item[2],
                    medico: item[3]
                }
            }));
        })
        .catch(function (err) {
            next(err);
        });
}

function getPrevisaoAlta(req, res, next) {
    database.simpleExecute(previsaoAltaSQL,
        {CD_ATENDIMENTO: req.params.atendimento},
        {outFormat: database.ARRAY})
        .then(function (results) {
            if (results.rows[0][0])
                res.send({previsaoAlta: results.rows[0][0]});
            else
                res.send({previsaoAlta: null});        
        })
        .catch(function (err) {
            next(err);
        });
}