import { Button, Card, CardContent, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, Typography } from '@material-ui/core';
import { FC, memo, useCallback, useState } from 'react';
import { genders, initialFieldValues, mealTypes, shirtSizes, validationSchema } from './constants';

import Legal from './Legal';
import Privacy from './Privacy';
import config from './config.json';
import { useFormik } from 'formik';
import { parse } from 'date-fns';

const axios = require('axios').default;


const MemoLegal = memo(Legal)
const MemoTextField = memo(TextField)

interface FormProps {
  onSubmitted: (formData: any) => void;
  formData?: any,
}

const Form: FC<FormProps> = ({ onSubmitted, formData }) => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formik = useFormik({
    initialValues: formData
      ? {
        ...initialFieldValues,
        street: formData.street,
        zip: formData.zip,
        city: formData.city,
        phone: formData.phone,
        mobile: formData.mobile,
        mail: formData.mail,
        additionalContact: formData.additionalContact,
        legalRepresentative: formData.legalRepresentative,
      }
      : initialFieldValues,
    validateOnMount: true,
    validationSchema: validationSchema,
    onSubmit: values => {
      console.log(values);

      setSubmitting(true);
      setError(null);
      axios.post(`${config.apiUrl}/registrations`, {
        ...values,
        birthday: parse(formik.values.birthday, 'dd.MM.yyyy', new Date()),
        goodSwimmer: values.goodSwimmer === 'good',
        swimPermit: values.swimPermit === 'permit',
        mealType: values.mealType === '-' ? null : values.mealType,
      })
        .then(function (response: any) {
          console.log(response);
          onSubmitted(formik.values);
          setSubmitting(false);
        })
        .catch(function (error: any) {
          console.log(error);
          setError(error.message);
          setSubmitting(false);
        })

    },
  });

  const handleFormikChange = useCallback(formik.handleChange, [formik]);

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
              <MemoTextField id="birthday" fullWidth label="Geburtstag (dd.mm.yyyy)" required value={formik.values.birthday} onChange={handleFormikChange} />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl required component="fieldset">
                <FormLabel component="legend">Geschlecht</FormLabel>
                <RadioGroup id="gender" name="gender" value={formik.values.gender} onChange={handleFormikChange}>
                  {genders.map(x => <FormControlLabel key={x.key} value={x.key} control={<Radio />} label={x.label} />)}
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <FormControl required component="fieldset">
                <FormLabel component="legend">T-Shirt-Größe</FormLabel>
                <RadioGroup id="shirtSize" name="shirtSize" value={formik.values.shirtSize} onChange={handleFormikChange}>
                  {shirtSizes.map(x => <FormControlLabel key={x.key} value={x.key} control={<Radio />} label={x.label} />)}
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
                  {mealTypes.map(x => <FormControlLabel key={x.key} value={x.key} control={<Radio />} label={x.label} />)}
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
              <MemoTextField id="mail" type="email" required fullWidth label="E-Mail" value={formik.values.mail} onChange={handleFormikChange} />
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
              <MemoTextField id="healthInsuredWith" fullWidth label="Mitversichert bei" value={formik.values.healthInsuredWith} onChange={handleFormikChange} />
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
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>Sonstiges</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <MemoTextField id="tentRequest" fullWidth label="Zeltwunsch (falls nicht am Vortreff anwesend)" value={formik.values.tentRequest} onChange={handleFormikChange} />
            </Grid>
            <Grid item xs={12} md={6}>
              <MemoTextField id="comment" fullWidth label="Kommentar, Anregung, Anmerkung" value={formik.values.comment} onChange={handleFormikChange} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card variant="outlined">
        <CardContent>
          <MemoLegal onAcceptedChange={(value) => formik.setFieldValue('acceptedLegal', value)} />
        </CardContent>
      </Card>
      <Card variant="outlined">
        <CardContent className="privacy">
          <Privacy />
        </CardContent>
      </Card>
      <Button variant="contained" color="primary" type="submit" disabled={!formik.isValid || submitting} fullWidth>Anmeldung absenden</Button>
      {error && <Typography variant="body1" color="error">{error}</Typography>}
    </form>
  )
}

export default Form;