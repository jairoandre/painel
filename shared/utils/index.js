const unidades = ['homero', 'cora', 'augusto', 'monteiro', 'rubem', 'uti1', 'uti2', 'dayclinic'];

const alergias = {
16361:  'alergia',
16362:  'alimentar',
16381:  'alimentarDs',
16382:  'esparadrapo',
16383:  'iodo',
16384:  'latex',
16385:  'medicamentos',
16386:  'medicamentosDs',
16387:  'micropore',
16388:  'outras',
16389:  'outrasDs'
}


function getFullName (unidade) {
  switch (unidade) {
    case 'homero':
      return 'HOMERO MASSENA';
    case 'cora':
      return 'CORA CORALINA';
    case 'augusto':
      return 'AUGUSTO RUSCHI';
    case 'monteiro':
      return 'MONTEIRO LOBATO';
    case 'rubem':
      return 'RUBEM BRAGA';
    case 'uti1':
      return 'UTI 01';
    case 'uti2':
      return 'UTI 02 / CARDIOLOGIA';
    case 'dayclinic':
      return 'DAY CLINIC';
    case 'ctq':
      return 'CENTRO DE TRAT. DE QUEIMADOS';
    default:
      return;
  }
};

const ids = {
  homero: [1],
  augusto: [2],
  cora: [3],
  monteiro: [4],
  rubem: [5],
  dayclinic: [6],
  uti2: [7, 8],
  uti1: [9],
  ctq: [10]
}

function getId (unidade) {
  var id = ids[unidade];
  if (id) {
    return id.join();
  }
};

module.exports = {getId, ids, unidades, getFullName, alergias};
