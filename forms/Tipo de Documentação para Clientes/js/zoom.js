const showModal = getModalZoom();

async function openZoom(field) {
  if (field === 'diretorio') {
    const parentDocumentId = '0';

    const config = {
      title: 'Diretório',
      description: 'Selecione o diretório abaixo',
      selectedClass: 'info',
      dataset: 'document',
      displayFields: [
        {
          label: 'Código',
          field: 'documentPK.documentId'
        },
        {
          label: 'Descrição',
          field: 'documentDescription'
        }
      ],
      resultFields: [
        'documentPK.documentId',
        'documentDescription',
        'documentPK.version',
        'documentPK.companyId',
        'documentType',
        'parentDocumentId'
      ],
      filters: [
        {
          field: 'documentPK.companyId',
          initialValue: parent.WCMAPI.organizationId,
          finalValue: parent.WCMAPI.organizationId,
          type: ConstraintType.MUST
        },
        {
          field: 'parentDocumentId',
          initialValue: parentDocumentId,
          finalValue: parentDocumentId,
          type: ConstraintType.MUST
        },
        {
          field: 'documentType',
          initialValue: '1',
          finalValue: '1',
          type: ConstraintType.MUST
        },
        {
          field: 'sqlLimit',
          initialValue: '255',
          finalValue: '255',
          type: ConstraintType.MUST
        }
      ],
      orderBy: ['documentPK.documentId'],
      searchField: 'documentDescription',
      preFetch: true,
      multiSelect: false,
      limit: 10
    };

    const diretorio = await showModal(config);
    if (diretorio) {
      document.getElementById('codigoDiretorio').value = diretorio['documentPK.documentId'];
      document.getElementById('diretorio').value = diretorio.documentDescription;
    }
  }

  if (field === 'template') {
    const config = {
      title: 'Template de E-mail',
      description: 'Selecione o template de e-mail abaixo',
      selectedClass: 'info',
      dataset: 'ds_templates_email',
      displayFields: [
        {
          label: 'Código',
          field: 'COD_TEMPLATE_EMAIL'
        },
        {
          label: 'Descrição',
          field: 'DES_TEMPLATE_EMAIL'
        },
        {
          label: 'Idioma',
          field: 'COD_DIALETO'
        }
      ],
      resultFields: ['COD_DIALETO', 'COD_EMPRESA', 'COD_TEMPLATE_EMAIL', 'DES_TEMPLATE_EMAIL'],
      filters: [
        {
          field: 'COD_EMPRESA',
          initialValue: parent.WCMAPI.organizationId,
          finalValue: parent.WCMAPI.organizationId,
          type: ConstraintType.MUST
        },
        {
          field: 'LOG_TEMPLATE_PADR',
          initialValue: 'false',
          finalValue: 'false',
          type: ConstraintType.MUST
        },
        {
          field: 'sqlLimit',
          initialValue: '255',
          finalValue: '255',
          type: ConstraintType.MUST
        }
      ],
      orderBy: ['DES_TEMPLATE_EMAIL'],
      searchField: 'DES_TEMPLATE_EMAIL',
      preFetch: true,
      multiSelect: false,
      limit: 10
    };

    const template = await showModal(config);
    if (template) {
      document.getElementById('idiomaTemplateEmail').value = template.COD_DIALETO;
      document.getElementById('codigoTemplateEmail').value = template.COD_TEMPLATE_EMAIL;
      document.getElementById('templateEmail').value = template.DES_TEMPLATE_EMAIL;
    }
  }
}
