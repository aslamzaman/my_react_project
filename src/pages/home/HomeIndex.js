
import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import Footer from "../../components/Footer";

export default function Home() {

  return (
    <div>
    <Container fluid>
      <Row>
        <Col xs={12}>
          <Image src="https://i.ibb.co/dkQSGXd/cover-page.jpg" alt="Header Pic" style={{width:"100%"}} />
        </Col>
      </Row>
    </Container>
    <Footer />
    </div>
  );
}