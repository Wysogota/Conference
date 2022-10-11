import PropTypes from 'prop-types';
import { InputGroup } from 'react-bootstrap';
import styles from './CreationForm.module.scss';
import DateInput from '../../DateInput';
import { capitalize } from 'lodash';
import { useEffect, useState } from 'react';

const EventDateInput = (props) => {
  const { eventDate, setFieldValue, groupClasses } = props;
  const [date, setDate] = useState(eventDate);

  useEffect(() => {
    setDate(eventDate);
  }, [eventDate]);

  useEffect(() => {
    setFieldValue('eventDate', date);
  }, [date]);

  return (
    <InputGroup className={groupClasses}>
      <InputGroup.Text className={styles.label}>{capitalize('event date')}</InputGroup.Text>
      <DateInput date={date} setDate={setDate} className={styles.input}/>
    </InputGroup>
  );
};

EventDateInput.propTypes = {
  eventDate: PropTypes.string.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  groupClasses: PropTypes.string,
};

export default EventDateInput;
