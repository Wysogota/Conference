import * as yup from 'yup';

export const CONFERENCE_FORM_SCHEMA = yup.object({
  name: yup
    .string()
    .matches(/^[a-zA-Z0-9 -]+$/, 'This field cannot contain white space and special character')
    .matches(/^(\w+\s?)*\s*$/, 'Too many spaces')
    .min(2, 'Min 2 chars').max(255, 'Max 255 chars')
    .required('Enter name'),
  eventDate: yup.string().required(),
  lat: yup.number(),
  lng: yup.number(),
  country: yup.string().not(['0'], 'Please select country').required(),
});
