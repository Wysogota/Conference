import PropTypes from 'prop-types';
import { InputGroup, FormControl } from 'react-bootstrap';
import { Field, ErrorMessage } from 'formik';
import cx from 'classnames';
import { capitalize } from 'lodash';
import styles from './CreationForm.module.scss';

const CoordInput = (props) => {
  const { groupClasses } = props;
  return (
    <section className='d-flex'>
      <InputGroup as='article' className={groupClasses}>
        <InputGroup.Text className={styles.label}>{capitalize('lat')}</InputGroup.Text>
        <FormControl as={Field}
          type='number'
          name='lat'
          className={styles.input}
        />
        <ErrorMessage name='lat' component='span' className={styles.error} />
      </InputGroup>
      <InputGroup as='article' className={cx(groupClasses, styles.border)}>
        <FormControl as={Field}
          type='number'
          name='lng'
          className={styles.input}
        />
        <InputGroup.Text className={styles.label}>{capitalize('lng')}</InputGroup.Text>
        <ErrorMessage name='lng' component='span' className={styles.error} />
      </InputGroup>
    </section>
  );
};

CoordInput.propTypes = {
  groupClasses: PropTypes.string,
};

export default CoordInput;
