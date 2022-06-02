function vueInstance(context) {
  const { createApp, onMounted, ref, computed, watch } = Vue;

  const load = FLUIGC.loading(context.DOM[0]);

  return createApp({
    setup() {
      const assinaturaDocumentId = ref(null);
      const tipoDocumentacao = ref('');
      const codigoCliente = ref('');
      const emailCliente = ref('');
      const cliente = ref('');
      const tipoCopia = ref('nao_copia');
      const entrarComEmail = ref(false);

      const anexos = ref([]);
      const tiposDocumentacao = ref([]);

      const tipoDocumentacaoSelected = computed(() => {
        return tiposDocumentacao.value.find(tipo => tipo.codigo === tipoDocumentacao.value);
      });

      const anexosSize = computed(() => {
        if (anexos.value.length === 0) return 0;
        const sizeSum = anexos.value.reduce((acc, cur) => acc + cur.size, 0);
        return sizeSum.toLocaleString('pt-BR', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        });
      });

      watch(entrarComEmail, () => (cliente.value = ''));
      watch(tipoDocumentacao, () => (anexos.value = []));

      async function openZoom(field) {
        const showModal = getModalZoom();

        if (field === 'cliente') {
          const config = {
            title: 'Clientes',
            description: 'Selecione um cliente abaixo',
            selectedClass: 'info',
            dataset: 'ds_zoom_clientes',
            displayFields: [
              {
                label: 'Código',
                field: 'Codigo'
              },
              {
                label: 'Nome',
                field: 'Nome'
              },
              {
                label: 'E-mail',
                field: 'Email'
              },
              {
                label: 'Loja',
                field: 'Loja'
              }
            ],
            resultFields: ['Codigo', 'Nome', 'Email', 'Loja'],
            filters: [
              {
                field: 'sqlLimit',
                initialValue: '255',
                finalValue: '255',
                type: ConstraintType.MUST
              }
            ],
            orderBy: ['Nome'],
            searchField: 'Nome',
            preFetch: true,
            multiSelect: false,
            limit: 10
          };

          const clienteSelected = await showModal(config);
          if (clienteSelected) {
            codigoCliente.value = clienteSelected.Codigo;
            emailCliente.value = clienteSelected.Email;
            cliente.value = clienteSelected.Nome;
          }
        }

        if (field === 'anexos') {
          if (tipoDocumentacao.value === '')
            return FLUIGC.toast({
              message: 'Selecione o Tipo de Documentação que deseja enviar',
              type: 'warning'
            });

          const parentDocumentId = parseInt(tipoDocumentacaoSelected.value.codigoDiretorio, 10);

          const config = {
            title: 'Anexos',
            description: 'Selecione um ou mais documentos abaixo',
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
              },
              {
                label: 'Versão',
                field: 'documentPK.version'
              }
            ],
            resultFields: [
              'documentPK.documentId',
              'documentDescription',
              'documentPK.version',
              'documentPK.companyId',
              'documentType',
              'parentDocumentId',
              'size',
              'iconId'
            ],
            filters: [
              {
                field: 'documentPK.companyId',
                initialValue: WCMAPI.organizationId,
                finalValue: WCMAPI.organizationId,
                type: ConstraintType.MUST
              },
              {
                field: 'activeVersion',
                initialValue: 'true',
                finalValue: 'true',
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
                initialValue: '2',
                finalValue: '2',
                type: ConstraintType.MUST
              },
              {
                field: 'sqlLimit',
                initialValue: '255',
                finalValue: '255',
                type: ConstraintType.MUST
              }
            ],
            orderBy: ['documentDescription'],
            searchField: 'documentDescription',
            preFetch: true,
            multiSelect: true,
            limit: 10
          };

          const documentos = await showModal(config);
          if (documentos) {
            anexos.value = [...anexos.value, ...documentos];
            anexos.value = [...new Set(anexos.value.map(doc => doc['documentPK.documentId']))].map(docId =>
              anexos.value.find(doc => doc['documentPK.documentId'] === docId)
            );
          }
        }
      }

      function clearField(field) {
        if (field === 'cliente') {
          codigoCliente.value = '';
          emailCliente.value = '';
          cliente.value = '';
        }
      }

      function removeAttachment(anexo) {
        anexos.value = anexos.value.filter(a => a['documentPK.documentId'] !== anexo['documentPK.documentId']);
      }

      async function submitEmail() {
        if (!tipoDocumentacao.value)
          return FLUIGC.toast({
            message: 'Selecione o Tipo de Documentação que deseja enviar',
            type: 'warning'
          });

        if (!cliente.value)
          return FLUIGC.toast({
            message: 'Selecione o cliente destinatário',
            type: 'warning'
          });

        if (anexos.value.length === 0)
          return FLUIGC.toast({
            message: 'Selecione um ou mais anexos para enviar',
            type: 'warning'
          });

        const to = entrarComEmail.value ? (cliente.value || '').split(';') : (emailCliente.value || '').split(';');
        const attachments = anexos.value.map(anexo => anexo['documentPK.documentId']);

        const emailConfig = {
          from: {
            name: WCMAPI.user,
            email: WCMAPI.userEmail
          },
          to,
          subject: tipoDocumentacao.value && `${tipoDocumentacaoSelected.value.descricao} - Daxia`,
          template: tipoDocumentacao.value && tipoDocumentacaoSelected.value.codigoTemplateEmail,
          lang: tipoDocumentacao.value && tipoDocumentacaoSelected.value.idiomaTemplateEmail,
          params: {},
          attachments
        };

        if (tipoCopia.value === 'cc' || tipoCopia.value == 'cco') emailConfig[tipoCopia.value] = [WCMAPI.userEmail];
        if (assinaturaDocumentId.value) emailConfig.params.SIGNATURE = assinaturaDocumentId.value;

        load.show();
        try {
          const result = await sendEmail(emailConfig);
          console.log(result);
          FLUIGC.toast({
            message: 'E-mail enviado com sucesso',
            type: 'success'
          });

          tipoDocumentacao.value = '';
          cliente.value = '';
          anexos.value = [];
          tipoCopia.value = 'nao_copiar';
          entrarComEmail.value = false;
        } catch (error) {
          console.error(error);
          FLUIGC.toast({
            message: 'Erro ao enviar o e-mail',
            type: 'danger'
          });
        } finally {
          load.hide();
        }
      }

      onMounted(async () => {
        load.show();

        try {
          tiposDocumentacao.value = await getDocumentationTypes();
          assinaturaDocumentId.value = await getLoggedUserSignature();
        } catch (error) {
          console.error(error);
          FLUIGC.toast({
            message: 'Erro ao carregar opções de documentação',
            type: 'danger'
          });
        } finally {
          load.hide();
        }
      });

      return {
        entrarComEmail,
        tipoDocumentacao,
        codigoCliente,
        emailCliente,
        cliente,
        tipoCopia,
        anexos,
        anexosSize,
        tiposDocumentacao,
        openZoom,
        clearField,
        removeAttachment,
        submitEmail
      };
    }
  });
}
