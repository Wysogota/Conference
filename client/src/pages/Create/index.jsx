import { Container, Row, Col } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { capitalize } from 'lodash';
import cx from 'classnames';
import { conferenceStore } from '../../store';
import CreationForm from '../../components/Conference/CreationForm';
import MainHeader from '../../components/BasicElements/MainHeader';
import BackButton from '../../components/BasicElements/BackButton';
import useAfterRequestAction from '../../hooks/useAfterRequestAction';
import { theme } from '../../common/theme';
import CONSTANTS from '../../constants';
const { PAGES: { HOME } } = CONSTANTS;

const Create = observer(() => {
  const { create, error } = conferenceStore;
  const navigate = useNavigate();

  const action = () => navigate(HOME);
  const { setIsRequested } = useAfterRequestAction(action, error);

  const submitAction = (conference) => {
    setIsRequested(true);
    create(conference);
  };

  const headerClasses = cx(theme, 'pt-4 pb-3 mb-5 rounded-bottom');
  const bodyClasses = cx(theme, 'p-3 rounded m-auto');

  return (
    <Container>
      <Row className={headerClasses}>
        <Col className='text-center text-sm-start'>
          <MainHeader>{capitalize('create new conference')}</MainHeader>
        </Col>
      </Row>
      <Col md='10' lg='8' className={bodyClasses}>
        <Row>
          <Col>
            <CreationForm submitAction={submitAction} />
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

export default Create;
