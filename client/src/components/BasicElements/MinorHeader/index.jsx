import PropTypes from 'prop-types';
import cx from 'classnames';
import { textOverlow } from '../../../common/styles/functions';

const MinorHeader = (props) => {
  const { className, children } = props;

  const classes = cx(
    textOverlow,
    className,
    'pb-2 m-0 fs-3',
  );

  return (
    <h3 className={classes}>{children}</h3>
  );
};

MinorHeader.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any.isRequired,
};

export default MinorHeader;
