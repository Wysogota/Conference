import PropTypes from 'prop-types';
import Datetime from 'react-datetime';
import moment from 'moment';
import 'react-datetime/css/react-datetime.css';
 
const DateInput = (props) => {
  const { date, setFieldValue } = props;

  return (
    <Datetime
      value={moment(date)}
      onChange={(date) => setFieldValue('eventDate', date.format('YYYY-MM-DD HH:mm'))}
      dateFormat='YYYY-MM-DD'
    />
  );
};

DateInput.propTypes = {
  date: PropTypes.string.isRequired,
  setFieldValue: PropTypes.func.isRequired,
};

export default DateInput;
