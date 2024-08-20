import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaExternalLinkAlt } from 'react-icons/fa';
import './Admin.css'
function AdminFooter() {
  return (
    <footer className="main-footer border-top">
      <Container fluid className='p-3'>
        <Row>
          <Col>
            <p>
              <strong>
                Copyright &copy;{' '}
                <a href="/admin/dashboard">RealEstate</a>.
              </strong>
            </p>
          </Col>
          <Col className="text-right text-end">
            <p>
              <strong>
                <FaExternalLinkAlt /> Version 3.2.0
              </strong>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default AdminFooter;
