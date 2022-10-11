import PropTypes from 'prop-types';
import cx from 'classnames';
import { textOverlow2 } from '../../../common/styles/functions';

const MainHeader = (props) => {
  const { className, children } = props;

  const classes = cx(
    textOverlow2,
    className,
    'mb-3 m-0',
  );

  return (
    <h2 className={classes}>{children}</h2>
  );
};

MainHeader.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any.isRequired,
};

export default MainHeader;
