import React from "react"
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
    return (
        <Container fluid  style={{backgroundColor:"#F0EDED", marginTop:"100px"}}>
            <Row>
                <Col>
                    <h6 className="text-center p-4">Developer:<br /> Aslam Zaman</h6>
                    <p className="text-center">Email: aslamcmes@gmail.com <br /> Mobile: 01720025151</p>
                </Col>
            </Row>
        </Container>
    )
}

export default Footer
