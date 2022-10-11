import { Button, Col, Container, Row } from 'react-bootstrap';
import cx from 'classnames';
import MainHeader from '../../components/BasicElements/MainHeader';
import { theme } from '../../common/theme';
import { capitalize } from 'lodash';
import CreationForm from '../../components/Conference/CreationForm';
import { observer } from 'mobx-react-lite';
import { conferenceStore } from '../../store';

const Create = observer(() => {
  const { create } = conferenceStore;

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
            <CreationForm submitAction={create} />
          </Col>
        </Row>
        <Row>
          <Col md='6' className='m-auto'>
            <Button variant='outline-dark' className='w-100'>Back</Button>
          </Col>
        </Row>
      </Col>
    </Container>
  );
});

export default Create;
