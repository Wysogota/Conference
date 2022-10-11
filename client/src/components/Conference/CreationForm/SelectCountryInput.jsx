import PropTypes from 'prop-types';
import { FormSelect, InputGroup } from 'react-bootstrap';
import { Field, ErrorMessage } from 'formik';
import { capitalize } from 'lodash';
import cx from 'classnames';
import { countryStore } from '../../../store';
import styles from './CreationForm.module.scss';
import useFetching from '../../../hooks/useFetching';
import { useEffect } from 'react';

const SelectCountryInput = (props) => {
  const { setFieldValue, groupClasses } = props;
  const { getAll, countries, isFetching } = countryStore;
  useEffect(() => { getAll(); }, []);

  const onClickHandle = (lat, lng) => {
    setFieldValue('lat', Number(lat));
    setFieldValue('lng', Number(lng));
  };

  const errorClasses = cx(styles.error, styles.select_error);

  const fetching = useFetching({ data: countries, isFetching });
  if (fetching) return fetching;

  return (
    <InputGroup className={groupClasses}>
      <InputGroup.Text className={styles.label}>{capitalize('country')}</InputGroup.Text>
      <Field as={FormSelect} name='country' className={styles.input}>
        <option value='0' disabled>{capitalize('countries')}</option>
        {countries.map(({ id, name, coords_lat: lat, coords_lng: lng }) => (
          <option key={id} value={id} onClick={() => onClickHandle(lat, lng)}>
            {name}
          </option>
        ))}
      </Field>
      <ErrorMessage name='country' component='span' className={errorClasses} />
    </InputGroup>
  );
};

SelectCountryInput.propTypes = {
  setFieldValue: PropTypes.func.isRequired,
  groupClasses: PropTypes.string,
};

export default SelectCountryInput;
