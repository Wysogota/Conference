import { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Col } from 'react-bootstrap';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import RemoveItem from '../RemoveItem';
import styles from './ListItem.module.scss';
import CONSTANTS from '../../../constants';

const { PAGES: { HOME } } = CONSTANTS;

const ListItem = (props) => {
  const { conference, onClick, className } = props;
  const [hovered, setHovered] = useState(false);

  const { id, name, event_date } = conference;

  const cardClasses = cx(
    styles.card,
    className,
    'flex-row rounded mb-3',
  );
  const titleClasses = cx(
    styles.title,
    'fs-4',
  );

  return (
    <Card
      className={cardClasses}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Col xs='8' md='9' xl='10'>
        <Card.Body>
          <div className='d-flex justify-content-between'>
            <Card.Title className={titleClasses}>
              <Link to={`${HOME}${id}`} onClick={onClick}>{name}</Link>
            </Card.Title>
          </div>
          <div>
            <div>The event will happen:</div>
            <time>{event_date}</time>
          </div>
          <RemoveItem id={id} hovered={hovered} />
        </Card.Body>
      </Col>
    </Card>
  );
};

ListItem.propTypes = {
  conference: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default ListItem;
