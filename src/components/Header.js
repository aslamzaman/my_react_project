import React from "react"
import { Container, Row, Col} from "react-bootstrap";

const Header = (props) => {
    return (
        <Container fluid>
            <Row>
                <Col>
                    <h1 className="text-primary text-center" style={{ marginTop: "40px", paddingBottom: "10px", marginBottom: "0px" }}>{props.title}</h1>
                    <hr style={{ border: "2px solid blue", marginBottom: "30px", marginTop: "0px", paddingTop: "0px" }} />
                </Col>
            </Row>
        </Container>
    )
}

export default Header
