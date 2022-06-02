[X] Permitir selecionar cliente ou digitar emails seprados por ;
[ ] Permitir remover anexo

[X] Permitir copia email
[X] Selecionar a assinutura do usuário atual ou assinatura padrão (pegar de template especificação técnica)

const url = `/mailSender/v1/mail/send/${WCMAPI.organizationId}`;
const response = await fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    from: {
      name: 'No-Reply',
      email: 'no-repy@daxia.com.br'
    },
    to: ['danilo.marinho@hicoder.com.br'],
    cc: ['dannilodms123@gmail.com'],
    cco: ['flavio.ribeiro123@daxia.com.br'],
    subject: 'Teste de envio de email',
    template: 'tmpl_especificacao_tecnica_fisqp',
    lang: 'pt_BR',
    params: {
      SIGNATURE: 443
    },
    attachments: [396]
  })
});

if (response.ok) {
  const message = await response.json();
  console.log(message);
}

if (!response.ok) {
  const error = await response.text();
  console.log(error);
}
