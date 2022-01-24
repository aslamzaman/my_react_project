import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

const Octen = () => {
    const [preBalance, setPreBalance] = useState(156);
    const [octenUse, setOctenUse] = useState(20);
    const [currenMeter, setCurrenMeter] = useState(197);
    const [preMeter, setPreMeter] = useState(95);
    const [opt, setOpt] = useState("microbus");
    const [result, setResult] = useState("");
    const [resultColor, setResultColor] = useState({});

    useEffect(() => {
        setResult("Result");
        setResultColor({ color: "blue", textAlign: "center" });

    }, [])

    const calculateHandler = () => {
        let km = 0;
        if (opt === 'microbus') {
            km = 4.5;
        }
        else {
            km = 4.3;
        }
        let ret = (parseFloat(preBalance) + (parseFloat(octenUse) * km)) - (parseFloat(currenMeter) - parseFloat(preMeter));


        if (parseFloat(currenMeter) < parseFloat(preMeter)) {
            setResultColor({ color: "red", textAlign: "center" });
            setResult("Current meter is smaller !");
        }
        else if (parseFloat(ret) < 0) {
            setResultColor({ color: "red", textAlign: "center" });
            setResult("Result is smaller !  [" + ret.toFixed(2) + "]");
        }
        else {
            setResultColor({ color: "blue", textAlign: "center" });
            setResult(ret.toFixed(2));
        }

    }




    return (
        <div>
            <Header title="Octen" />
            <Container>
                <Row>
                    <Col lg={2}></Col>
                    <Col lg={8}>
                        <Card style={{ width: '100%' }}>
                            <Card.Body>
                                <h3 style={resultColor}>{result}</h3>
                                <Form>
                                    <Row>
                                        <Form.Group as={Col} xs="12">
                                            <Form.Label>Vehicle</Form.Label>
                                            <Form.Select onChange={(e) => { setOpt(e.target.value); }} value={opt} >
                                                <option value="microbus">Microbus</option>
                                                <option value="pajero">Pajero Jeep</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group as={Col} xs="6">
                                            <Form.Label>Previous Balance (KM):</Form.Label>
                                            <Form.Control type="text" onChange={(e) => { setPreBalance(e.target.value); }} value={preBalance} />
                                        </Form.Group>
                                        <Form.Group as={Col} xs="6">
                                            <Form.Label>Octen Used:</Form.Label>
                                            <Form.Control type="text" onChange={(e) => { setOctenUse(e.target.value); }} value={octenUse} />
                                        </Form.Group>                                     
                                    </Row>
                                    <Row>
                                        <Form.Group as={Col} xs="6">
                                            <Form.Label>Current Meter Reading:</Form.Label>
                                            <Form.Control type="text" onChange={(e) => { setCurrenMeter(e.target.value); }} value={currenMeter}  />
                                        </Form.Group>
                                        <Form.Group as={Col} xs="6">
                                            <Form.Label>Previous Meter Reading:</Form.Label>
                                            <Form.Control type="text" onChange={(e) => { setPreMeter(e.target.value); }} value={preMeter} />
                                        </Form.Group>                                     
                                    </Row> 
                                    <Button variant="primary" className="mt-4" onClick={calculateHandler}>Calculate</Button>                                   
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={2}></Col>
                </Row>
            </Container>

            <Footer />
        </div >
    );
};
export default Octen;
