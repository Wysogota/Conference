import PropTypes from 'prop-types';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import cx from 'classnames';
import moment from 'moment';
import { capitalize } from 'lodash';
import Remove from '../Remove';
import MapInput from './MapInput';
import CoordInput from './CoordInput';
import SelectCountryInput from './SelectCountryInput';
import EventDateInput from './EventDateInput';
import styles from './CreationForm.module.scss';
import { CONFERENCE_FORM_SCHEMA } from '../../../utils/validationSchemas';

const initialValues = (conference) => {
  if (conference) {
    const { name, event_date: eventDate, coords_lat: lat, coords_lng: lng, country_id: country } = conference;
    return { name, eventDate, lat: Number(lat), lng: Number(lng), country };
  }
  return {
    name: '',
    eventDate: moment().add(1, 'day').format('YYYY-MM-DD'),
    lat: '',
    lng: '',
    country: '0',
  };
};

const CreationForm = (props) => {
  const { conference, submitAction, editMode } = props;

  const onSubmit = (values, formikBag) => {
    const { name, eventDate: event_date, lat, lng, country: country_id } = values;
    const result = { name, event_date, lat, lng, country_id };

    if (editMode) {
      result.coord_id = conference.coord_id;
      submitAction(conference.id, result);
    } else {
      submitAction(result);
    }

    formikBag.resetForm();
  };

  const buttonClasses = cx(styles.label, styles.submit);

  return (
    <Formik
      initialValues={initialValues(conference)}
      validationSchema={CONFERENCE_FORM_SCHEMA}
      onSubmit={onSubmit}
    >{({ values, setFieldValue }) => (
      <Form className='p-3 rounded'>
        <InputGroup className={styles.input_container}>
          <InputGroup.Text className={styles.label}>{capitalize('title')}</InputGroup.Text>
          <FormControl as={Field} name='name' className={styles.input} />
          <ErrorMessage name='name' component='span' className={styles.error} />
        </InputGroup>
        
        <EventDateInput
          eventDate={values.eventDate}
          setFieldValue={setFieldValue}
          groupClasses={styles.input_container}
         />

        <SelectCountryInput
          setFieldValue={setFieldValue}
          groupClasses={styles.input_container}
        />
        {values.country !== '0' && !Number.isNaN(values.lat) && !Number.isNaN(values.lng) && <>
          <CoordInput groupClasses={styles.input_container} />
          <MapInput lat={values.lat} lng={values.lng} setFieldValue={setFieldValue} />
        </>}

        {editMode
          ? (
            <div className='d-flex justify-content-between'>
              <Button type='submit' variant='light' className={buttonClasses}>Save</Button>
              <Remove id={conference.id} className={buttonClasses} />
            </div>
            )
          : (
            <Button type='submit' variant='light' className={buttonClasses}>Save</Button>
            )}
      </Form>
    )}
    </Formik>
  );
};

CreationForm.propTypes = {
  conference: PropTypes.object,
  submitAction: PropTypes.func.isRequired,
  editMode: PropTypes.bool,
};

export default CreationForm;
