import PropTypes from 'prop-types';
import cx from 'classnames';
import { textOverlow } from '../../../common/styles/functions';

const MainHeader = (props) => {
  const { className, children } = props;

  const classes = cx(
    textOverlow,
    className,
    'pb-3 m-0',
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
