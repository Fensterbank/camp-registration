'use strict';

const { registerConfirmation } = require("../../../utils/mailtemplates");

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async create(ctx) {
    const entity = await strapi.services.registration.create(ctx.request.body)
    strapi.plugins['email'].services.email.sendTemplatedEmail(
      {
        to: entity.mail,
      },
      registerConfirmation,
      {
        name: `${entity.firstName} ${entity.lastName}`,
      },
    );
    strapi.plugins['email'].services.email.sendTemplatedEmail(
      {
        to: process.env.ADMIN_MAIL,
      },
      registerConfirmation,
      {
        name: `${entity.firstName} ${entity.lastName}`,
      },
    );
    return entity;
  }
};
