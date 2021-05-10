module.exports = ({ env }) => ({
  email: {
    provider: "nodemailer",
    providerOptions: {
      host: env("SMTP_HOST"),
      secure: true,
      auth: {
        user: env("SMTP_USER"),
        pass: env("SMTP_PASS"),
      }
    },
    settings: {
      defaultFrom: "info@boni-arche-camp.de",
    },
  },
});
