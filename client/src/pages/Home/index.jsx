import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { capitalize } from 'lodash';
import cx from 'classnames';
import MainHeader from '../../components/BasicElements/MainHeader';
import Create from '../../components/Conference/Create';
import List from '../../components/Conference/List';
import { theme } from '../../common/theme';

const Home = () => {
  const headerClasses = cx(theme, 'pt-4 pb-3 mb-5 rounded-bottom');

  return (
    <Container>
      <Row className={headerClasses}>
        <Col sm='6' lg='8' className='text-center text-sm-start'>
          <MainHeader>{capitalize('conferences')}</MainHeader>
        </Col>
        <Col sm='6' lg='4' className='text-center text-sm-end'>
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
