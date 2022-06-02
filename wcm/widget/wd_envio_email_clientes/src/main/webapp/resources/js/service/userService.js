async function getLoggedUserSignature() {
  const constraintsUser = [
    DatasetFactory.createConstraint('colleaguePK.companyId', WCMAPI.organizationId, WCMAPI.organizationId, ConstraintType.MUST),
    DatasetFactory.createConstraint('colleaguePK.colleagueId', WCMAPI.userCode, WCMAPI.userCode, ConstraintType.MUST)
  ];

  const dsColleague = await new Promise((success, error) => DatasetFactory.getDataset('colleague', null, constraintsUser, null, { success, error }));
  if (!dsColleague.values || dsColleague.values.length === 0)
    return FLUIGC.toast({
      title: 'Erro ao carregar assinatura do usuário: ',
      message: 'Usuário não encontrado'
    });

  const [{ userTenantId }] = dsColleague.values;

  const constraintsExtras = [
    DatasetFactory.createConstraint('USER_TENANT_ID', userTenantId, userTenantId, ConstraintType.MUST),
    DatasetFactory.createConstraint('DATA_KEY', 'ASSINATURA', 'ASSINATURA', ConstraintType.MUST)
  ];

  const dsColleagueExtras = await new Promise((success, error) =>
    DatasetFactory.getDataset('ds_colleague_extras', null, constraintsExtras, null, { success, error })
  );

  if (!dsColleagueExtras.values || dsColleagueExtras.values.length === 0) return null;

  const [{ DATA_VALUE }] = dsColleagueExtras.values;
  return DATA_VALUE;
}
