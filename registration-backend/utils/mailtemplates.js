const registerConfirmation = {
  subject: 'Bestätigung Ihrer Anmeldung für das Boni-Arche-Camp',
  text: `Hallo,

  vielen Dank. Wir haben die Anmeldung für <%= name %> erhalten.

  
  Mit freundlichen Grüßen,
  Boni-Arche-Camp Metzingen
  `,
  html: `Hallo,<br />

  <p>vielen Dank. Wir haben die Anmeldung für <strong><%= name %></strong> erhalten.</p>
  
  <p>Mit freundlichen Grüßen,<br />
  Boni-Arche-Camp Metzingen</p>
  `,
};

module.exports = {
  registerConfirmation,
};
