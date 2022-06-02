function defineStructure() {
  addColumn('Codigo');
  addColumn('Loja');
  addColumn('Nome');
  addColumn('Email');
  addColumn('codNome');

  setKey(['Codigo', 'Loja']);
}

function onSync(lastSyncDate) {
  var dataset = DatasetBuilder.newDataset();

  try {
    var clientService = fluigAPI.getAuthorizeClientService();
    var data = {
      companyId: getValue('WKCompany') + '',
      serviceCode: 'Rest_Protheus',
      endpoint: '/ClientesList',
      method: 'get',
      timeoutService: '100',
      options: {
        encoding: 'UTF-8',
        mediaType: 'application/json',
        useSSL: true
      }
    };
    var vo = clientService.invoke(JSON.stringify(data));
    if (vo.getResult() == null || vo.getResult().isEmpty()) throw new Exception('Retorno está vazio');

    var retorno = JSON.parse(vo.getResult());
    var zoom = retorno.ClientesList;
    for (var i = 0; i < zoom.length; i++) {
      dataset.addOrUpdateRow([zoom[i].Codigo, zoom[i].Loja, zoom[i].Nome, zoom[i].Email, zoom[i].Codigo + '-' + zoom[i].Nome]);
    }
  } catch (error) {
    throw error;
  }

  return dataset;
}

function createDataset(fields, constraints, sortFields) {}

function onMobileSync(user) {}
