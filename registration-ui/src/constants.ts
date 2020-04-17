import * as Yup from 'yup';

import config from './config.json';
import moment from 'moment';

export const initialFieldValues = {
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

export const genders = [
  { key: 'male', label: 'Männlich' },
  { key: 'female', label: 'Weiblich' },
  { key: 'divers', label: 'Divers' },
];

export const mealTypes = [
  { key: '-', label: 'Ohne Angabe' },
  { key: 'vegetarian', label: 'Vegetarisch' },
  { key: 'vegan', label: 'Vegan' },
  { key: 'no-pork', label: 'kein Schweinefleisch' },
];

export const shirtSizes = [
  { key: 'S', label: 'S' },
  { key: 'M', label: 'M' },
  { key: 'L', label: 'L' },
  { key: 'XL', label: 'XL' },
];

export const validationSchema = Yup.object({
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
});
