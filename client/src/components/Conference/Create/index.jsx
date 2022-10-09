import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { capitalize } from 'lodash';
import cx from 'classnames';
import { textOverlow } from '../../../common/styles/functions';
import CONSTANTS from '../../../constants';
const { PAGES: { CREATE } } = CONSTANTS;

const Create = () => {
  const classes = cx(textOverlow, 'mw-100');

  return (
    <Button as={Link} to={CREATE}
    variant='outline-dark'
    className={classes}
    >
      {capitalize('create new conference')}
    </Button>
  );
};

export default Create;
