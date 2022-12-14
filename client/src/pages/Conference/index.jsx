import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Container, Row, Col } from 'react-bootstrap';
import { capitalize } from 'lodash';
import cx from 'classnames';
import { format } from 'date-fns';
import MainHeader from '../../components/BasicElements/MainHeader';
import MinorHeader from '../../components/BasicElements/MinorHeader';
import Map from '../../components/Map';
import EditButton from '../../components/Conference/EditButton';
import Remove from '../../components/Conference/Remove';
import { conferenceStore } from '../../store';
import useFetching from '../../hooks/useFetching';
import { theme } from '../../common/theme';

const Conference = observer(() => {
  const { getOne, conference } = conferenceStore;
  const { conferenceId } = useParams();

  useEffect(() => { getOne(conferenceId); }, [conferenceId]);

  const fetching = useFetching({ data: conference, title: 'Conference not found' });
  if (fetching) return fetching;

  const { name, event_date, countries_name, coords_lat, coords_lng } = conference;
  const date = format(new Date(event_date), 'PPPPp');

  const headerClasses = cx(theme, 'pt-4 pb-3 mb-5 align-items-baseline rounded-bottom');
  const bodyClasses = cx(theme, 'p-3 rounded m-auto');

  return (
    <Container >
      <Row className={headerClasses}>
        <Col sm='8'>
          <MainHeader>{capitalize(name)}</MainHeader>
        </Col>
        <Col className='text-end fs-5'>
          <time dateTime={event_date}>{date}</time>
        </Col>
      </Row>
      <Col md='10' lg='8' className={bodyClasses}>
        <Row className='mb-3'>
          <Col>
            <MinorHeader>{capitalize(countries_name)}</MinorHeader>
          </Col>
          <Col className='text-end'>
            <EditButton id={conferenceId} />
            <Remove id={conferenceId} className='ms-2' />
          </Col>
        </Row>
        {coords_lat !== '' && coords_lng !== '' && (
        <Row>
          <Col>
            <Map
              className='m-auto rounded col-sm-10 col-lg-8 col-xl-6'
              coord={{ lat: Number(coords_lat), lng: Number(coords_lng) }}
              fixed
            />
          </Col>
        </Row>
        )}
        <Row className='mt-3'>
          <Col className='text-center text-md-end'>
            <span>{coords_lat}</span>
          </Col>
          <Col className='text-center text-md-start'>
            <span>{coords_lng}</span>
          </Col>
        </Row>
      </Col>
    </Container>
  );
});

export default Conference;
