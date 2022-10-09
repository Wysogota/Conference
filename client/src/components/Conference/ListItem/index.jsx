import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { capitalize } from 'lodash';
import format from 'date-fns/format';
import cx from 'classnames';
import Remove from '../Remove';
import styles from './ListItem.module.scss';
import { theme, hoveredTheme } from '../../../common/theme';
import CONSTANTS from '../../../constants';
const { PAGES: { HOME } } = CONSTANTS;

const ListItem = (props) => {
  const { conference } = props;
  const [hovered, setHovered] = useState(false);

  const { id, name, event_date, countries_name } = conference;
  const eventDate = new Date(event_date);
  const date = format(eventDate, 'dd.MM.yyyy');
  const time = format(eventDate, 'p');

  const cardClasses = cx(
    styles.card,
    theme, hoveredTheme,
    'p-2 mb-3 m-auto rounded',
    'col-md-10 col-lg-8',
  );
  const titleClasses = cx(
    styles.title,
    'mb-3 fs-2',
  );

  return (
    <Card
      className={cardClasses}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Card.Body>
        <time dateTime={eventDate} className={styles.tiny_text}>{date}</time>
        <section className='d-flex justify-content-between mb-2 position-relative'>
          <Card.Title className={titleClasses}>
            <Link to={`${HOME}${id}`}>{name.toUpperCase()}</Link>
          </Card.Title>
          <Remove id={id} hovered={hovered} />
        </section>
        <section className='d-flex justify-content-between'>
          <article>
            <div className={styles.tiny_text}>{capitalize('country')}</div>
            <div className='fs-5'>{countries_name.toUpperCase()}</div>
          </article>
          <article>
            <div className={styles.tiny_text}>{capitalize('start at')}</div>
            <time className='fs-5'>{time}</time>
          </article>
        </section>
      </Card.Body>
    </Card>
  );
};

ListItem.propTypes = {
  conference: PropTypes.object.isRequired,
};

export default ListItem;
