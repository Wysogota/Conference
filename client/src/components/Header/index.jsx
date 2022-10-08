import { Container, Row, Col, } from 'react-bootstrap';
import Logo from '../Logo';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <Container as='header' className={styles.header} fluid>
      <Row>
        <Col xs='4' md='2'>
          <Logo />
        </Col>
      </Row>
    </Container>
  );
};

export default Header;
