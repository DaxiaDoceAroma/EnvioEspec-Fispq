async function getDocumentationTypes() {
  const constraints = [
    DatasetFactory.createConstraint('companyid', WCMAPI.organizationId, WCMAPI.organizationId, ConstraintType.MUST),
    DatasetFactory.createConstraint('metadata#active', 'true', 'true', ConstraintType.MUST)
  ];
  const dsTipoDocumentacao = await new Promise((success, error) =>
    DatasetFactory.getDataset('ds_tipo_documentacao_cliente', null, constraints, ['documentid;asc'], { success, error })
  );

  if (!dsTipoDocumentacao.values || dsTipoDocumentacao.values.length === 0) {
    FLUIGC.toast({
      title: 'Erro ao carregar tipos de documentação: ',
      message: 'Tipos de documentação não encontrados'
    });
    return [];
  }
  return dsTipoDocumentacao.values;
}
