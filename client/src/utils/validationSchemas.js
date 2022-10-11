import * as yup from 'yup';

export const CONFERENCE_FORM_SCHEMA = yup.object({
  name: yup.string().min(2, 'Min 2 chars').max(255, 'Max 255 chars').required('Enter name'),
  eventDate: yup.string().required(),
  lat: yup.number().min(-85, 'Min value is -85').max(85, 'Max value is 85').required(),
  lng: yup.number().min(-360, 'Min value is -360').max(360, 'Max value is 360').required(),
  country: yup.string().not(['0'], 'Please select country').required(),
});
