import { Container, Row, Col } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { useNavigate, useParams } from 'react-router-dom';
import { capitalize } from 'lodash';
import cx from 'classnames';
import { conferenceStore } from '../../store';
import CreationForm from '../../components/Conference/CreationForm';
import MainHeader from '../../components/BasicElements/MainHeader';
import BackButton from '../../components/BasicElements/BackButton';
import useAfterRequestAction from '../../hooks/useAfterRequestAction';
import { theme } from '../../common/theme';
import CONSTANTS from '../../constants';
import { useEffect } from 'react';
import useFetching from '../../hooks/useFetching';
const { PAGES: { HOME } } = CONSTANTS;

const Edit = observer(() => {
  const { getOne, update, conference, isFetching, error } = conferenceStore;

  const { conferenceId } = useParams();
  useEffect(() => { getOne(conferenceId); }, []);

  const navigate = useNavigate();
  const action = () => navigate(HOME + conferenceId);
  const { setIsRequested } = useAfterRequestAction(action, isFetching, error);

  const submitAction = (id, conference) => {
    setIsRequested(true);
    update(id, conference);
  };

  const fetching = useFetching({ data: conference });
  if (fetching) return fetching;

  const headerClasses = cx(theme, 'pt-4 pb-3 mb-5 rounded-bottom');
  const bodyClasses = cx(theme, 'p-3 rounded m-auto');

  return (
    <Container>
      <Row className={headerClasses}>
        <Col className='text-center text-sm-start'>
          <MainHeader>{capitalize('edit conference')}</MainHeader>
        </Col>
      </Row>
      <Col md='10' lg='8' className={bodyClasses}>
        <Row>
          <Col>
            <CreationForm conference={conference} submitAction={submitAction} editMode />
          </Col>
        </Row>
        <Row>
          <Col md='6' className='m-auto'>
            <BackButton />
          </Col>
        </Row>
      </Col>
    </Container>
  );
});

export default Edit;
