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

var mock = [{"atendimento":1189571,"leito":"HM 101/1","nome":"DORCAS ALICE DIAS","medico":"HELOISIO ANTONIO"},{"atendimento":1194710,"leito":"HM 101/2","nome":"MARIA RANGEL VIEIRA","medico":"MARTINA ZANOTTI"},{"atendimento":1197752,"leito":"HM 102/1","nome":"ANDERSON DA SILVA ARAUJO","medico":"LEANDRO MARANO"},{"atendimento":1181407,"leito":"HM 102/2","nome":"CARLOS MAGNO FADINI","medico":"JOSE NEVES"},{"atendimento":1048187,"leito":"HM 103/1","nome":"ANTONIO MIGUEL MIRANDA","medico":"JOSE NEVES"},{"atendimento":1082234,"leito":"HM 104/1","nome":"JORGE ANTONIO MACEDO DE MELLO","medico":"JOSE NEVES"},{"atendimento":1193731,"leito":"HM 105/1","nome":"SIRLENE RAIMUNDO DA SILVA","medico":"JORGE KRIGER"},{"atendimento":1193359,"leito":"HM 106/1","nome":"MARIA DAS DORES DE JESUS MESQUITA OLIVEI","medico":"JOSE NEVES"},{"atendimento":1195152,"leito":"HM 106/2","nome":"CARLA PRISCILA LEAL","medico":"JOSE NEVES"},{"atendimento":1193996,"leito":"HM 107/2","nome":"REGINA SILVA BRITO","medico":"EDELWEISS"},{"atendimento":1169628,"leito":"HM 108/1","nome":"ANTONIO SEBASTIAO PIOVESAN DE JESUS","medico":"JOSE NEVES"},{"atendimento":1195710,"leito":"HM 108/2","nome":"ANGELO BAITELLA","medico":"JOSE NEVES"},{"atendimento":1175603,"leito":"HM 109/1","nome":"LEONTINA ROSA DOS SANTOS","medico":"MAYKE ARMANI"},{"atendimento":1183442,"leito":"HM 110/1","nome":"JOAO DE SOUZA SILVA","medico":"POLYANA GITIRANA"},{"atendimento":1191434,"leito":"HM 110/2","nome":"ROMULO FERREIRA CORDEIRO","medico":"JORGE KRIGER"},{"atendimento":1197933,"leito":"HM 111","nome":"WALFREDO COSTA SANTOS","medico":"POLYANA GITIRANA"},{"atendimento":1189901,"leito":"HM 112","nome":"EURENICE SILVA DE ALMEIDA","medico":"MARCOS REUTER"},{"atendimento":1145943,"leito":"HM 113","nome":"DIONE LISBOA MONIZ FREIRE","medico":"LUIZ VIRGILIO"},{"atendimento":1179801,"leito":"HM 114","nome":"MARCELO FREITAS MARCAL","medico":"JOSE NEVES"},{"atendimento":1187574,"leito":"HM 115","nome":"DERMEVAL BENEDICTO DOS SANTOS","medico":"HELOISIO ANTONIO"},{"atendimento":1170075,"leito":"HM 116","nome":"NATANAEL DE OLIVEIRA","medico":"SERGIO VICENTINI"},{"atendimento":1176649,"leito":"HM 117","nome":"BELMIRO PERINI","medico":"HELOISIO ANTONIO"},{"atendimento":45493,"leito":"HM 118","nome":"MARIA ARCIDELIA SOARES","medico":"JOSE NEVES"},{"atendimento":1191620,"leito":"HM 119","nome":"CARMORINA ANNA FRANCISCHETTO CESCONETTO","medico":"LUIZ VIRGILIO"},{"atendimento":1186136,"leito":"HM 120","nome":"VALTER DELUNARDO","medico":"MAYKE ARMANI"},{"atendimento":1189422,"leito":"HM 121","nome":"EVANDRO BRAZ DE SOUZA","medico":"HELOISIO ANTONIO"},{"atendimento":1150778,"leito":"HM 122","nome":"DIVINO BATISTA LOPES","medico":"JOSE NEVES"},{"atendimento":1116469,"leito":"HM 123","nome":"NANCY RODRIGUES DE ALBUQUERQUE","medico":"HELOISIO ANTONIO"},{"atendimento":1187412,"leito":"HM 124","nome":"JOAO CARLOS DOS SANTOS","medico":"HELOISIO ANTONIO"}];

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