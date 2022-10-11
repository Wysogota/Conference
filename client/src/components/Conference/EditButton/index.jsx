import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { capitalize } from 'lodash';
import cx from 'classnames';
import styles from './EditButton.module.scss';
import { textOverlow } from '../../../common/styles/functions';
import CONSTANTS from '../../../constants';
const { PAGES: { HOME, EDIT } } = CONSTANTS;

const EditButton = (props) => {
  const { id } = props;

  const classes = cx(textOverlow, styles.edit);

  return (
    <Button as={Link} to={`${HOME}${id}${EDIT}`}
    variant='outline-dark'
    className={classes}
    >
      {capitalize('edit')}
    </Button>
  );
};

EditButton.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

export default EditButton;
