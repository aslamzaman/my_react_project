import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from '../../components/Footer';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";
import Lib from "../../lib/Lib";

const BrickWork = () => {

    const [w, setW] = useState("100");
    const [cft, setCft] = useState('1');
    const [r1, setR1] = useState('1');
    const [r2, setR2] = useState('5');

    const [brickQty, setBrickQty] = useState('');
    const [cementQty, setCementQty] = useState('');
    const [sandQty, setSandQty] = useState('');

    const [brickRate, setBrickRate] = useState('');
    const [cementRate, setCementRate] = useState('');
    const [sandRate, setSandRate] = useState('');

    const [brickTotalTk, setBrickTotalTk] = useState('');
    const [cementTotalTk, setCementTotalTk] = useState('');
    const [sandTotalTk, setSandTotalTk] = useState('');

    const onChangeWHandler = (e) => {
        setW(e.target.value);
    }

    const onChangeCftHandler = (e) => {
        setCft(e.target.value);
    }

    const onChangeR1Handler = (e) => {
        setR1(e.target.value);
    }

    const onChangeR2Handler = (e) => {
        setR2(e.target.value);
    }

    const resultHandler = () => {
        axios.post(process.env.REACT_APP_SERVER_URL + "construction", { works: w })
            .then((response) => {
                let wrk = response.data.works;
                console.log(wrk);

                if (cft === "1") {
                    resultFps(wrk);
                }
                else {
                    resultMks(wrk);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const resultFps = (wrk) => {
        let brick = parseFloat(wrk * 12);
        let ratio = parseFloat(r1) + parseFloat(r2);
        let cement = (((wrk * 1.5 * 0.30) / ratio) * r1) / 1.25;
        let sand = ((wrk * 1.5 * 0.30) / ratio) * r2;

        let br = parseFloat(Lib.price.brick);
        let cr = parseFloat(Lib.price.cement);
        let sr = parseFloat(Lib.price.sand);

        setBrickQty(brick.toFixed(2));
        setCementQty(cement.toFixed(2));
        setSandQty(sand.toFixed(2));

        setBrickRate(br.toFixed(2));
        setCementRate(cr.toFixed(2));
        setSandRate(sr.toFixed(2));


        setBrickTotalTk((brick * br).toFixed(2));
        setCementTotalTk((cement * cr).toFixed(2));
        setSandTotalTk((sand * sr).toFixed(2));
    }

    const resultMks = (wrk) => {
        let brick = (wrk * 12 * 35.3147);
        let ratio = parseFloat(r1) + parseFloat(r2);
        let cement = (((wrk * 35.3147 * 1.5 * 0.30) / ratio) * r1) / 1.25;
        let sand = ((wrk * 35.3147 * 1.5 * 0.30) / ratio) * r2;
        let br = parseFloat(Lib.price.brick);
        let cr = parseFloat(Lib.price.cement);
        let sr = parseFloat(Lib.price.sand);

        setBrickQty(brick.toFixed(2));
        setCementQty(cement.toFixed(2));
        setSandQty((sand / 35.3147).toFixed(2));

        setBrickRate(br.toFixed(2));
        setCementRate(cr.toFixed(2));
        setSandRate((sr * 35.3147).toFixed(2));

        setBrickTotalTk((brick * br).toFixed(2));
        setCementTotalTk((cement * cr).toFixed(2));
        setSandTotalTk((sand * sr).toFixed(2));
    }


    return (

        <div>

            <Header title="Brick Works" />

            <Container>
                <Row>
                    <Col xs={12} md={6}>
                        <h3>Works</h3>
                        <hr />
                        <Form>
                            <Row>
                                <Col xs={9}>
                                    <Form.Group>
                                        <Form.Label>Total Works</Form.Label>
                                        <Form.Control type="text" onChange={onChangeWHandler} value={w} />
                                    </Form.Group>
                                </Col>
                                <Col xs={3}>
                                    <Form.Group>
                                        <Form.Label>&nbsp;</Form.Label>
                                        <Form.Select onChange={onChangeCftHandler} value={cft}>
                                            <option value="0">m3</option>
                                            <option value="1">cft</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Ratio</Form.Label>
                                        <Form.Control type="text" onChange={onChangeR1Handler} value={r1} />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>&nbsp;</Form.Label>
                                        <Form.Control type="text" onChange={onChangeR2Handler} value={r2} />
                                    </Form.Group>
                                </Col>
                                <Col>

                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Button variant="primary" className="mb-4 mt-4" onClick={resultHandler}>Calculate</Button>

                                </Col>
                            </Row>
                        </Form>

                    </Col>
                    <Col xs={12} md={6}>

                        <h3>Result</h3>
                        <hr />
                        <Table striped hover bordered>
                            <thead>
                                <tr>
                                    <th>Items</th>
                                    <th className="text-end">Quantity</th>
                                    <th className="text-end">Rate</th>
                                    <th className="text-end">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Brick</td>
                                    <td className="text-end">{brickQty}</td>
                                    <td className="text-end">{brickRate}</td>
                                    <td className="text-end">{brickTotalTk}</td>
                                </tr>
                                <tr>
                                    <td>Cement</td>
                                    <td className="text-end">{cementQty}</td>
                                    <td className="text-end">{cementRate}</td>
                                    <td className="text-end">{cementTotalTk}</td>
                                </tr>
                                <tr>
                                    <td>Sand</td>
                                    <td className="text-end">{sandQty}</td>
                                    <td className="text-end">{sandRate}</td>
                                    <td className="text-end">{sandTotalTk}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row> {/* ----./row----- */}
            </Container> {/* ----./container----- */}
            <Footer></Footer>
        </div >
    );
};

export default BrickWork;
