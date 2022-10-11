import * as yup from 'yup';

export const CONFERENCE_FORM_SCHEMA = yup.object({
  name: yup.string().min(2, 'Min 2 chars').max(255, 'Max 255 chars').required('Enter name'),
  eventDate: yup.string().required(),
  lat: yup.string().required(),
  lng: yup.string().required(),
  country: yup.string().not(['0'], 'Please select country').required(),
});
