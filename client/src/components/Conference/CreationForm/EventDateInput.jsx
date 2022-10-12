import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { InputGroup } from 'react-bootstrap';
import DateInput from '../../DateInput';
import { capitalize } from 'lodash';
import moment from 'moment';
import styles from './CreationForm.module.scss';

const EventDateInput = (props) => {
  const { eventDate, setFieldValue, groupClasses } = props;
  const [date, setDate] = useState(eventDate);

  useEffect(() => {
    setDate(eventDate);
  }, [eventDate]);

  useEffect(() => {
    setFieldValue('eventDate', date); // If new date value was select, update formik state
  }, [date]);

  const validateDate = (currentDate) => currentDate > moment();

  return (
    <InputGroup className={groupClasses}>
      <InputGroup.Text className={styles.label}>{capitalize('event date')}</InputGroup.Text>
      <DateInput date={date} setDate={setDate} validateDate={validateDate} className={styles.input}/>
    </InputGroup>
  );
};

EventDateInput.propTypes = {
  eventDate: PropTypes.string.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  groupClasses: PropTypes.string,
};

export default EventDateInput;
