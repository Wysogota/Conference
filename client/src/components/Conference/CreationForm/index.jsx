import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import cx from 'classnames';
import moment from 'moment';
import { capitalize } from 'lodash';
import MapInput from './MapInput';
import CoordInput from './CoordInput';
import SelectCountryInput from './SelectCountryInput';
import EventDateInput from './EventDateInput';
import useFetching from '../../../hooks/useFetching';
import { countryStore } from '../../../store';
import styles from './CreationForm.module.scss';
import { CONFERENCE_FORM_SCHEMA } from '../../../utils/validationSchemas';

const initialValues = {
  name: '',
  eventDate: moment().add(1, 'day').format('YYYY-MM-DD'),
  lat: '',
  lng: '',
  country: '0',
};

const CreationForm = observer((props) => {
  const { submitAction } = props;
  const { getAll, countries, isFetching } = countryStore;

  useEffect(() => { getAll(); }, []);

  const onSubmit = (values, formikBag) => {
    const { name, eventDate: event_date, lat, lng, country: country_id } = values;
    submitAction({ name, event_date, lat, lng, country_id });
    formikBag.resetForm();
  };

  const fetching = useFetching({ data: countries, isFetching });
  if (fetching) return fetching;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={CONFERENCE_FORM_SCHEMA}
      onSubmit={onSubmit}
    >{({ values, setFieldValue }) => (
      <Form className='p-3 rounded'>
        <InputGroup className={styles.input_container}>
          <InputGroup.Text className={styles.label}>{capitalize('title')}</InputGroup.Text>
          <FormControl as={Field} name='name' className={styles.input} />
          <ErrorMessage name='name' component='div' className={styles.error} />
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

        {values.country !== '0' && <>
          <CoordInput groupClasses={styles.input_container}/>
          <MapInput lat={values.lat} lng={values.lng} setFieldValue={setFieldValue} />
        </>}

        <Button type='submit' variant='light' className={cx(styles.label, styles.submit)}>Save</Button>
      </Form>
    )}
    </Formik>
  );
});

CreationForm.propTypes = {
  submitAction: PropTypes.func.isRequired,
};

export default CreationForm;
