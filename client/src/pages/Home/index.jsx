import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import MainHeader from '../../components/BasicElements/MainHeader';
import Create from '../../components/Conference/Create';
import List from '../../components/Conference/List';
import cx from 'classnames';
import { theme } from '../../common/theme';

const Home = () => {
  const headerClasses = cx(theme, 'pt-4 pb-3 mb-5 rounded-bottom');
  
  return (
    <Container>
      <Row className={headerClasses}>
        <Col>
          <MainHeader>Conferences</MainHeader>
        </Col>
        <Col className='text-end'>
          <Create />
        </Col>
      </Row>
      <Row>
        <List />
      </Row>
    </Container>
  );
};

export default Home;
