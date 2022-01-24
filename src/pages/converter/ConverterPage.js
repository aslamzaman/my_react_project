import React, { useState, useEffect } from "react";

import { Container, Row, Col, Button, Form, Modal, Table } from "react-bootstrap";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CustomLib from "../../lib/Lib";

const ConverterPage = () => {
    const [startDt, setStartDt] = useState("1968-06-25");
    const [endDt, setEndDt] = useState(CustomLib.dateFormat(new Date(),"-"));
    const [result, setResult] = useState("");
    // ---------------------------------------------------------
    const [opt, setOpt] = useState("sf");
    const [area, setArea] = useState(100);
    const [sft, setSft] = useState(0);

    const [newsft, setNewsft] = useState(0);
    const [newsm, setNewsm] = useState(0);
    const [newsc, setNewsc] = useState(0);
    const [newojutangsho, setNewojutangsho] = useState(0);
    const [newshotok, setNewshotok] = useState(0);
    const [newkatha, setNewkatha] = useState(0);
    const [newbigha, setNewbigha] = useState(0);
    const [newkani, setNewkani] = useState(0);
    const [newacre, setNewacre] = useState(0);
    const [newhectare, setNewhectare] = useState(0);
    const [newgonda, setNewgonda] = useState(0);
    const [newkora, setNewkora] = useState(0);
    const [newkranti, setNewkranti] = useState(0);
    const [newtil, setNewtil] = useState(0);
    const [newlink, setNewslink] = useState(0);

    //----------------------------------------------
    const [length, setLength] = useState(100);
    const [optLength, setOptLength] = useState("ft");
    const [resultLength, setResultLength] = useState("");


    const [dateDiffModalShow, setDateDiffModalShow] = useState(false);
    const [landAreaModalShow, setLandAreaModalShow] = useState(false);
    const [lengthModalShow, setLengthModalShow] = useState(false);


    useEffect(() => {
        let expr = opt;
        switch (expr) {
            case "sf":
                setSft(parseFloat(area) * 1);
                break;
            case "sm":
                setSft(parseFloat(area) * 10.7639);
                break;
            case "sc":
                setSft(parseFloat(area) * 4356);
                break;
            case "ojutangsho":
                setSft(parseFloat(area) * 4.356);
                break;
            case "shotok":
                setSft(parseFloat(area) * 435.6);
                break;
            case "katha":
                setSft(parseFloat(area) * 720);
                break;
            case "bigha":
                setSft(parseFloat(area) * 14400);
                break;
            case "kani":
                setSft(parseFloat(area) * 17280);
                break;
            case "acre":
                setSft(parseFloat(area) * 43560);
                break;
            case "hectare":
                setSft(parseFloat(area) * 107639);
                break;
            case "gonda":
                setSft(parseFloat(area) * 864);
                break;
            case "kora":
                setSft(parseFloat(area) * 653.4);
                break;
            case "kranti":
                setSft(parseFloat(area) * 72);
                break;
            case "til":
                setSft(parseFloat(area) * 3.6);
                break;
            case "slink":
                setSft(parseFloat(area) * 0.4356);
                break;
            default:
                console.log(`Sorry, we are out of ${expr}.`);
        }

    }, [opt, area]);


    const dateDiffModalCloseHandler = () => {
        setDateDiffModalShow(false);
    }

    const dateDiffModalShowHandler = () => {
        setDateDiffModalShow(true);
    }

    const calculateHandler = () => {
        let x = CustomLib.manulal_date_diff(startDt, endDt);
        setResult("Date differance: " + x);
    }
    //--------------------------------------------------------------

    const landAreaModalShowHandler = () => {
        setLandAreaModalShow(true);
    }

    const landAreaModalCloseHandler = () => {
        setLandAreaModalShow(false);
    }

    const calculateLandAreaHandler = () => {
        let x = sft;
        setNewsft(x);
        setNewsm(x / 10.7639);
        setNewsc(x / 4356);
        setNewojutangsho(x / 4.356);
        setNewshotok(x / 435.6);
        setNewkatha(x / 720);
        setNewbigha(x / 14400);
        setNewkani(x / 17280);
        setNewacre(x / 43560);
        setNewhectare(x / 107639);
        setNewgonda(x / 864);
        setNewkora(x / 653.4);
        setNewkranti(x / 72);
        setNewtil(x / 3.6);
        setNewslink(x / 0.4356);
    }

    //-------------------------------------

    const lengthModalShowHanler = () => {
        setLengthModalShow(true);
    }

    const lengthModalCloseHandler = () => {
        setLengthModalShow(false);
    }

    const calculateLengthHandler = () => {
        setResultLength(length + " / " + optLength);
    }

    return (
        <div>
            <Header title="Converter" />
            <Container fluid>
                <Row>
                    <Col>
                        <Button variant="primary" className="me-1" onClick={dateDiffModalShowHandler}>Date Differance</Button>
                        <Button variant="secondary" className="me-1" onClick={landAreaModalShowHandler}>Land Area</Button>
                        <Button variant="success" className="me-1" onClick={lengthModalShowHanler}>Length</Button>

                    </Col>
                </Row>
            </Container>


            <Modal size="lg" show={dateDiffModalShow} onHide={dateDiffModalCloseHandler}>
                <Modal.Header closeButton>
                    <Modal.Title>Date Differance (Traditional)</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row className="mb-3">
                            <Form.Group as={Col} xs="6">
                                <Form.Label>Start Date</Form.Label>
                                <Form.Control type="date" onChange={(e) => { setStartDt(e.target.value) }} value={startDt} />
                            </Form.Group>
                            <Form.Group as={Col} xs="6">
                                <Form.Label>End Date</Form.Label>
                                <Form.Control type="date" onChange={(e) => { setEndDt(e.target.value) }} value={endDt} />
                            </Form.Group>
                            <h4 className="mt-3 text-primary">Result</h4>
                            <h6 className="text-primary">{result}</h6>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={dateDiffModalCloseHandler}>Close</Button>
                    <Button variant="primary" onClick={calculateHandler}>Calculate</Button>
                </Modal.Footer>
            </Modal>


            <Modal size="lg" show={landAreaModalShow} onHide={landAreaModalCloseHandler}>
                <Modal.Header closeButton>
                    <Modal.Title>Date Differance</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row className="mb-3">
                            <Form.Group as={Col} xs="8">
                                <Form.Label>Area</Form.Label>
                                <Form.Control type="text" onChange={(e) => { setArea(e.target.value); }} value={area} />
                            </Form.Group>
                            <Form.Group as={Col} xs="4">
                                <Form.Label>Option</Form.Label>
                                <Form.Select onChange={(e) => { setOpt(e.target.value); }} className="form-control" value={opt}>
                                    <option value="sf">Square Feet</option>
                                    <option value="sm">Square Meter</option>
                                    <option value="sc">Square Chain</option>
                                    <option value="ojutangsho">Ojutangsho</option>
                                    <option value="shotok">Decimal (Shotok)</option>
                                    <option value="katha">Katha</option>
                                    <option value="bigha">Bigha (Paki)</option>
                                    <option value="kani">Kani(Aana)</option>
                                    <option value="acre">Acre</option>
                                    <option value="hectare">Hectare</option>
                                    <option value="gonda">Gonda</option>
                                    <option value="kora">Kora</option>
                                    <option value="kranti">Kranti</option>
                                    <option value="til">Til</option>
                                    <option value="slink">Square Links</option>
                                </Form.Select>

                            </Form.Group>
                            <Col>

                                <Button variant="primary" className="mt-4" onClick={calculateLandAreaHandler}>Calculate</Button>
                            </Col>
                            <h4 className="mt-3 text-primary">Result</h4>
                            <Table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th className="text-center">#</th>
                                        <th className="text-left">Description</th>
                                        <th className="text-end">Result</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr>
                                        <td className="text-center">01</td>
                                        <td className="text-left">Square Feet</td>
                                        <td className="text-end">{newsft.toFixed(3)}</td>
                                    </tr>

                                    <tr>
                                        <td className="text-center">02</td>
                                        <td className="text-left">Square Meter</td>
                                        <td className="text-end">{newsm.toFixed(3)}</td>
                                    </tr>

                                    <tr>
                                        <td className="text-center">03</td>
                                        <td className="text-left">Square Chain</td>
                                        <td className="text-end">{newsc.toFixed(3)}</td>
                                    </tr>

                                    <tr>
                                        <td className="text-center">04</td>
                                        <td className="text-left">Ojutangsho</td>
                                        <td className="text-end">{newojutangsho.toFixed(3)}</td>
                                    </tr>

                                    <tr>
                                        <td className="text-center">05</td>
                                        <td className="text-left">Shotok</td>
                                        <td className="text-end">{newshotok.toFixed(3)}</td>
                                    </tr>

                                    <tr>
                                        <td className="text-center">06</td>
                                        <td className="text-left">Katha</td>
                                        <td className="text-end">{newkatha.toFixed(3)}</td>
                                    </tr>

                                    <tr>
                                        <td className="text-center">07</td>
                                        <td className="text-left">Bigha (Paki)</td>
                                        <td className="text-end">{newbigha.toFixed(3)}</td>
                                    </tr>

                                    <tr>
                                        <td className="text-center">08</td>
                                        <td className="text-left">Kani (Aana)</td>
                                        <td className="text-end">{newkani.toFixed(3)}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-center">09</td>
                                        <td className="text-left">Acre</td>
                                        <td className="text-end">{newacre.toFixed(3)}</td>
                                    </tr>

                                    <tr>
                                        <td className="text-center">10</td>
                                        <td className="text-left">Hectare</td>
                                        <td className="text-end">{newhectare.toFixed(3)}</td>
                                    </tr>

                                    <tr>
                                        <td className="text-center">11</td>
                                        <td className="text-left">Gonda</td>
                                        <td className="text-end">{newgonda.toFixed(3)}</td>
                                    </tr>

                                    <tr>
                                        <td className="text-center">12</td>
                                        <td className="text-left">Kora</td>
                                        <td className="text-end">{newkora.toFixed(3)}</td>
                                    </tr>

                                    <tr>
                                        <td className="text-center">13</td>
                                        <td className="text-left">Kranti</td>
                                        <td className="text-end">{newkranti.toFixed(3)}</td>
                                    </tr>

                                    <tr>
                                        <td className="text-center">14</td>
                                        <td className="text-left">Til</td>
                                        <td className="text-end">{newtil.toFixed(3)}</td>
                                    </tr>

                                    <tr>
                                        <td className="text-center">15</td>
                                        <td className="text-left">Square Links</td>
                                        <td className="text-end">{newlink.toFixed(3)}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={landAreaModalCloseHandler}>Close</Button>
                </Modal.Footer>
            </Modal>


            <Modal size="lg" show={lengthModalShow} onHide={lengthModalCloseHandler}>
                <Modal.Header closeButton>
                    <Modal.Title>Length Convert</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>

                        <Row className="mb-3">
                            <Form.Group as={Col} xs="8">
                                <Form.Label>Length</Form.Label>
                                <Form.Control type="text" onChange={(e) => { setLength(e.target.value) }} value={length} />
                            </Form.Group>
                            <Form.Group as={Col} xs="4">
                                <Form.Label>Option</Form.Label>
                                <Form.Select onChange={(e) => { setOptLength(e.target.value) }} value={optLength}>
                                    <option value="ft">Feet</option>
                                    <option value="m">Meter</option>
                                </Form.Select>
                            </Form.Group>
                            <h4 className="mt-3 text-primary">Result</h4>
                            <h6 className="text-primary">{resultLength}</h6>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={lengthModalCloseHandler}>Close</Button>
                    <Button variant="primary" onClick={calculateLengthHandler}>Calculate</Button>
                </Modal.Footer>
            </Modal>


            <Footer />
        </div>
    );

};
export default ConverterPage;
