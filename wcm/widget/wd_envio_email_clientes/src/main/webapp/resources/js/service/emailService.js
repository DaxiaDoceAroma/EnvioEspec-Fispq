async function sendEmail(emailConfig) {
  console.log(emailConfig);

  const url = `/mailSender/v1/mail/send/${WCMAPI.organizationId}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(emailConfig)
  });

  if (response.ok) return response.json();

  const error = await response.text();
  throw new Error(error);
}
