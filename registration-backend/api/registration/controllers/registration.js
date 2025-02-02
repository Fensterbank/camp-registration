'use strict';

const { registerConfirmation } = require("../../../utils/mailtemplates");
const { utils, write, writeFileXLSX } = require('xlsx');
const { parseISO, differenceInYears, setMonth, startOfMonth } = require("date-fns");

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
  },
  async export(ctx) {
    const { query } = ctx;
    const results = await strapi.services.registration.find({
      ...query,
      _limit: -1,
      _sort: 'lastName:asc,firstName:asc',
    }, [])

    const flatTable = results.map(r => ({
      'Name': r.lastName,
      'Vorname': r.firstName,
      'Adresse': `${r.street}, ${r.zip} ${r.city}`,
      'Geburtstag': r.birthday,
      'Alter (1. Aug)': differenceInYears(startOfMonth(setMonth(new Date(), 7)), parseISO(r.birthday)),
      'Geschlecht': r.gender,
      'Telefon': r.phone,
      'Mobil': r.mobile,
      'Mail': r.mail,
      'Abweichender Kontat': r.additionalContact,
      'Rechtlicher Vertreter': r.legalRepresentative,
      'T-Shirt-Größe': r.shirtSize,
      'Allergien': r.allergies,
      'Krankheiten': r.diseases,
      'Medikamente': r.medication,
      'Versicherung': r.healthInsurance,
      'Versicherungsnummer': r.healthInsuranceNo,
      'Versichert mit': r.healthInsuredWith,
      'Kommentar': r.comment,
      'Zeltwunsch': r.tentRequest,
      'Essenswunsch': r.mealSuggestion,
      'Essenstyp': r.mealType,
      'Darf Schwimmen': r.swimPermit,
      'Anmeldedatum': r.created_at,
    }))

    const wb = utils.book_new()
    const ws = utils.json_to_sheet(flatTable, {});
    ws['!cols'] = [
      { wch: 15 },
      { wch: 15 },
      { wch: 30 },
      { wch: 10 },
      { wch: 15 },
      { wch: 10 }, // Geschlecht
      { wch: 15 },
      { wch: 15 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 15 },
      { wch: 20 }, // Allergien
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 20 },
    ]
    utils.book_append_sheet(wb, ws, 'Anmeldungen');
    ctx.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')

    const data = await write(wb, {
      type: 'binary',
    })
    writeFileXLSX(wb, 'Anmeldungen.xlsx')

    return data
  },
};
