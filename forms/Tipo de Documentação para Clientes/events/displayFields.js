function displayFields(form, customHTML) {
  var userID = getValue('WKUser');
  var nomeUsuario = getUserById(userID);

  customHTML.append('<script>');
  //   customHTML.append('function getState() { return ' + task + '; };');
  customHTML.append("function getUserCode() { return '" + userID + "'; };");
  customHTML.append('function getMobile() { return ' + form.getMobile() + '; };');
  customHTML.append("function getFormMode() { return '" + form.getFormMode() + "'; };");
  customHTML.append("function getCardId() { return '" + form.getDocumentId() + "'; };");
  //   customHTML.append('function isManager() { return ' + getValue('WKManagerMode') + '; };');
  customHTML.append('</script>');

  form.setShowDisabledFields(true);
  form.setHidePrintLink(true);

  var dataAtual = new java.util.Date();
  var formater = new java.text.SimpleDateFormat('dd/MM/yyyy HH:mm:ss');
  var dataAtualFormatada = formater.format(dataAtual);

  if (form.getFormMode() == 'ADD') {
    form.setValue('dataCriacao', dataAtualFormatada);
    form.setValue('id_criador', userID);
    form.setValue('criador', nomeUsuario);

    var codigo = generateCode();
    form.setValue('codigo', codigo);
  } else if (form.getFormMode() == 'MOD') {
    form.setValue('dataEdicao', dataAtualFormatada);
    form.setValue('id_editor', userID);
    form.setValue('editor', nomeUsuario);
  }
}

function getUserById(user) {
  var constraints = [DatasetFactory.createConstraint('colleaguePK.colleagueId', user, user, ConstraintType.MUST)];
  var dsColleague = DatasetFactory.getDataset('colleague', null, constraints, null);
  return dsColleague.getValue(0, 'colleagueName');
}

function generateCode() {
  var companyid = getValue('WKCompany');

  var constraints = [
    DatasetFactory.createConstraint('companyid', companyid, companyid, ConstraintType.MUST),
    DatasetFactory.createConstraint('metadata#active', 'true', 'true', ConstraintType.MUST),
    DatasetFactory.createConstraint('sqlLimit', 1, 1, ConstraintType.MUST)
  ];
  var dsCadastros = DatasetFactory.getDataset('ds_tipo_documentacao_cliente', null, constraints, ['documentid;desc']);
  if (dsCadastros.rowsCount == 0) return '1';

  var ultimoCodigo = dsCadastros.getValue(0, 'codigo');
  return parseInt(ultimoCodigo, 10) + 1;
}
