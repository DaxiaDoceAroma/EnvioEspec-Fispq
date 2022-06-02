function validateForm(form) {
  var message = '';

  if (isEmpty(form.getValue('descricao'))) message += 'Informa a descrição <br />';
  if (isEmpty(form.getValue('diretorio'))) message += 'Informe o diretório <br />';
  if (isEmpty(form.getValue('templateEmail'))) message += 'Informe o template de e-mail <br />';

  if (message) throw message;
}

function isEmpty(value) {
  return value === null || value === undefined || ((value || '') + '').trim() === '';
}
