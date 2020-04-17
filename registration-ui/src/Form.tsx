import * as Yup from 'yup';

import { Button, Card, CardContent, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, Typography } from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import React, { memo, useCallback } from 'react';
import moment, { Moment } from 'moment';

import Legal from './Legal';
import MomentUtils from '@date-io/moment';
import config from './config.json';
import { useFormik } from 'formik';

const initialFieldValues = {
  firstName: '',
  lastName: '',
  street: '',
  zip: '',
  city: '',
  birthday: moment(config.end).subtract(15, 'years').toISOString(),
  gender: null,
  phone: '',
  mobile: '',
  mail: '',
  shirtSize: '',
  additionalContact: '',
  legalRepresentative: '',
  healthInsurance: '',
  healthInsuranceNo: '',
  healthInsuredWith: '',
  allergies: '',
  diseases: '',
  medication: '',
  comment: '',
  tentRequest: '',
  mealSuggestion: '',
  mealType: '-',
  goodSwimmer: '',
  swimPermit: '',
  acceptedLegal: false,
};

const MemoLegal = memo(Legal)
const MemoTextField = memo(TextField)
const genders = [
  { key: 'male', label: 'Männlich' },
  { key: 'female', label: 'Weiblich' },
  { key: 'divers', label: 'Divers' },
];

const mealTypes = [
  { key: '-', label: 'Ohne Angabe' },
  { key: 'vegetarian', label: 'Vegetarisch' },
  { key: 'vegan', label: 'Vegan' },
  { key: 'no-pork', label: 'kein Schweinefleisch' },
];

const shirtSizes = [
  { key: 'S', label: 'S' },
  { key: 'M', label: 'M' },
  { key: 'L', label: 'L' },
  { key: 'XL', label: 'XL' },
];

const Form = () => {
  const formik = useFormik({
    initialValues: initialFieldValues,
    isInitialValid: false,
    validationSchema: Yup.object({
      firstName: Yup.string().required(),
      lastName: Yup.string().required(),
      street: Yup.string().required(),
      zip: Yup.string().required(),
      city: Yup.string().required(),
      birthday: Yup.string().required(),
      gender: Yup.string().oneOf(genders.map(x => x.key)).required(),
      phone: Yup.string().notRequired(),
      mobile: Yup.string().notRequired(),
      mail: Yup.string().notRequired(),
      shirtSize: Yup.string().oneOf(shirtSizes.map(x => x.key)).required(),
      additionalContact: Yup.string().notRequired(),
      legalRepresentative: Yup.string().notRequired(),
      healthInsurance: Yup.string().required(),
      healthInsuranceNo: Yup.string().required(),
      healthInsuredWith: Yup.string().notRequired(),
      allergies: Yup.string().notRequired(),
      diseases: Yup.string().notRequired(),
      medication: Yup.string().notRequired(),
      comment: Yup.string().notRequired(),
      tentRequest: Yup.string().notRequired(),
      mealSuggestion: Yup.string().notRequired(),
      mealType: Yup.string().oneOf(mealTypes.map(x => x.key)),
      goodSwimmer: Yup.string().oneOf(['good', 'less-good']).required(),
      swimPermit: Yup.string().oneOf(['permit', 'no-permit']).required(),
      acceptedLegal: Yup.boolean().oneOf([true], 'Bedingungen müssen akzeptiert werden'),

    }),
    onSubmit: values => {
      console.log(values);
    },
  });

  const handleFormikChange = useCallback(formik.handleChange, []);

  const handleDateChange = (date: Moment | null) => formik.setFieldValue('birthday', date);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>Allgemeine Angaben zum Kind</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <MemoTextField id="firstName" fullWidth label="Vorname" required value={formik.values.firstName} onChange={handleFormikChange} />
            </Grid>
            <Grid item xs={12} md={6}>
              <MemoTextField id="lastName" fullWidth label="Nachname" required value={formik.values.lastName} onChange={handleFormikChange} />
            </Grid>
            <Grid item xs={12} md={6}>
              <MemoTextField id="street" fullWidth label="Straße und Hausnummer" required value={formik.values.street} onChange={handleFormikChange} />
            </Grid>
            <Grid item xs={6} md={2}>
              <MemoTextField id="zip" fullWidth label="PLZ" required value={formik.values.zip} onChange={handleFormikChange} />
            </Grid>
            <Grid item xs={6} md={4}>
              <MemoTextField id="city" fullWidth label="Stadt" required value={formik.values.city} onChange={handleFormikChange} />
            </Grid>
            <Grid item xs={12} md={6}>
              <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils} locale="de">
                <DatePicker
                  required
                  variant="inline"
                  format="LL"
                  label="Geburtstag"
                  value={formik.values.birthday}
                  onChange={handleDateChange}
                  fullWidth
                  maxDate={moment(config.end).subtract(15, 'years').toISOString()}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl required component="fieldset">
                <FormLabel component="legend">Geschlecht</FormLabel>
                <RadioGroup id="gender" name="gender" value={formik.values.gender} onChange={handleFormikChange}>
                  {genders.map(x => <FormControlLabel value={x.key} control={<Radio />} label={x.label} />)}
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <FormControl required component="fieldset">
                <FormLabel component="legend">T-Shirt-Größe</FormLabel>
                <RadioGroup id="shirtSize" name="shirtSize" value={formik.values.shirtSize} onChange={handleFormikChange}>
                  {shirtSizes.map(x => <FormControlLabel value={x.key} control={<Radio />} label={x.label} />)}
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={5}>
              <FormControl required component="fieldset">
                <FormLabel component="legend">Schwimmen</FormLabel>
                <RadioGroup id="goodSwimmer" name="goodSwimmer" value={formik.values.goodSwimmer} onChange={handleFormikChange}>
                  <FormControlLabel value="good" label="Guter Schwimmer" control={<Radio />} />
                  <FormControlLabel value="less-good" label="Weniger guter Schwimmer" control={<Radio />} />
                </RadioGroup>
              </FormControl>
              <hr />
              <FormControl component="fieldset">
                <RadioGroup id="swimPermit" name="swimPermit" value={formik.values.swimPermit} onChange={handleFormikChange}>
                  <FormControlLabel value="permit" label="darf schwimmen" control={<Radio />} />
                  <FormControlLabel value="no-permit" label="darf nicht schwimmen" control={<Radio />} />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={5}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Essensgewohnheiten</FormLabel>
                <RadioGroup id="mealType" name="mealType" value={formik.values.mealType} onChange={handleFormikChange}>
                  {mealTypes.map(x => <FormControlLabel value={x.key} control={<Radio />} label={x.label} />)}
                </RadioGroup>
              </FormControl>
              <MemoTextField id="mealSuggestion" fullWidth label="Essensvorschlag" value={formik.values.mealSuggestion} onChange={handleFormikChange} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>Kontakt</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <MemoTextField id="mail" fullWidth label="E-Mail" value={formik.values.mail} onChange={handleFormikChange} />
            </Grid>
            <Grid item xs={12} md={4}>
              <MemoTextField id="mobile" fullWidth label="Mobiltelefon" value={formik.values.mobile} onChange={handleFormikChange} />
            </Grid>
            <Grid item xs={12} md={4}>
              <MemoTextField id="phone" fullWidth label="Telefon" value={formik.values.phone} onChange={handleFormikChange} />
            </Grid>
            <Grid item xs={12}>
              <MemoTextField id="additionalContact" fullWidth label="Kontaktinformationen während des Lagers (falls abweichend)" value={formik.values.additionalContact} onChange={handleFormikChange} />
            </Grid>
            <Grid item xs={12}>
              <MemoTextField id="legalRepresentative" fullWidth label="Name und Adresse des gesetzlichen Vertreters (falls abweichend)" value={formik.values.legalRepresentative} onChange={handleFormikChange} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>Gesundheitliche Daten</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <MemoTextField id="healthInsurance" fullWidth label="Krankenkasse" required value={formik.values.healthInsurance} onChange={handleFormikChange} />
            </Grid>
            <Grid item xs={12} md={4}>
              <MemoTextField id="healthInsuranceNo" fullWidth label="Versicherungsnummer" required value={formik.values.healthInsuranceNo} onChange={handleFormikChange} />
            </Grid>
            <Grid item xs={12} md={4}>
              <MemoTextField id="healthInsurance" fullWidth label="Mitversichert bei" value={formik.values.healthInsuredWith} onChange={handleFormikChange} />
            </Grid>
            <Grid item xs={12} md={12}>
              <MemoTextField id="allergies" fullWidth label="Allergien" value={formik.values.allergies} onChange={handleFormikChange} />
            </Grid>
            <Grid item xs={12} md={12}>
              <MemoTextField id="diseases" fullWidth label="Besondere / Chronische Erkrankungen" value={formik.values.diseases} onChange={handleFormikChange} />
            </Grid>
            <Grid item xs={12} md={12}>
              <MemoTextField id="medication" fullWidth label="Regelmäßig einzunehmende Medikamente" value={formik.values.medication} onChange={handleFormikChange} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <MemoLegal onAcceptedChange={(value) => formik.setFieldValue('acceptedLegal', value)} />
        </CardContent>
      </Card>
      <Button variant="contained" color="primary" type="submit" disabled={!formik.isValid} fullWidth>Anmeldung absenden</Button>
    </form>
  )
}

export default Form;