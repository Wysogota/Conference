import PropTypes from 'prop-types';
import Datetime from 'react-datetime';
import moment from 'moment';
import styles from './DateInput.module.scss';
import cx from 'classnames';
import 'react-datetime/css/react-datetime.css';
 
const DateInput = (props) => {
  const { date, setDate, className } = props;

  const onChangeHandle = (date) => {
    setDate(date.format('YYYY-MM-DD HH:mm'));
  };

  const classes = cx(className, styles.datetime);

  return (
    <Datetime
      value={moment(date)}
      onChange={onChangeHandle}
      inputProps={{ readOnly: true }}
      dateFormat='YYYY-MM-DD'
      className={classes}
    />
  );
};

DateInput.propTypes = {
  date: PropTypes.string.isRequired,
  setDate: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default DateInput;
