import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from '../../components/Footer';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";
import Lib from "../../lib/Lib";

const CcWork = () => {

    const [w, setW] = useState("100");
    const [cft, setCft] = useState('1');
    const [r1, setR1] = useState('1');
    const [r2, setR2] = useState('3');
    const [r3, setR3] = useState('6');

    const [cementQty, setCementQty] = useState('');
    const [sandQty, setSandQty] = useState('');
    const [khoaQty, setKhoaQty] = useState('');

    const [cementRate, setCementRate] = useState('');
    const [sandRate, setSandRate] = useState('');
    const [khoaRate, setKhoaRate] = useState('');

    const [cementTotalTk, setCementTotalTk] = useState('');
    const [sandTotalTk, setSandTotalTk] = useState('');
    const [khoaTotalTk, setKhoaTotalTk] = useState('');


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

    const onChangeR3Handler = (e) => {
        setR3(e.target.value);
    }

    const resultHandler = async () => {
        await axios.post(process.env.REACT_APP_SERVER_URL + "construction", { works: w })
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
        let ratio = parseFloat(r1) + parseFloat(r2) + parseFloat(r3);
        let cement = (((wrk * 1.5) / ratio) * r1) / 1.25;
        let sand = ((wrk * 1.5) / ratio) * r2;
        let khoa = ((wrk * 1.5) / ratio) * r3;

        let cr = parseFloat(Lib.price.cement);
        let sr = parseFloat(Lib.price.sand);
        let kr = parseFloat(Lib.price.khoa);

        setCementQty(cement.toFixed(2));
        setSandQty(sand.toFixed(2));
        setKhoaQty(khoa.toFixed(2));

        setCementRate(cr.toFixed(2));
        setSandRate(sr.toFixed(2));
        setKhoaRate(kr.toFixed(2));

        setCementTotalTk((cement * cr).toFixed(2));
        setSandTotalTk((sand * sr).toFixed(2));
        setKhoaTotalTk((khoa * kr).toFixed(2));

    }

    const resultMks = (wrk) => {
        let ratio = parseFloat(r1) + parseFloat(r2) + parseFloat(r3);
        let cement = (((wrk * 35.3147 * 1.5) / ratio) * r1) / 1.25;
        let sand = ((wrk * 35.3147 * 1.5) / ratio) * r2;
        let khoa = ((wrk * 35.3147 * 1.5) / ratio) * r3;

        let cr = parseFloat(Lib.price.cement);
        let sr = parseFloat(Lib.price.sand);
        let kr = parseFloat(Lib.price.khoa);

        setCementQty(cement.toFixed(2));
        setSandQty((sand / 35.3147).toFixed(2));
        setKhoaQty((khoa / 35.3147).toFixed(2));

        setCementRate(cr.toFixed(2));
        setSandRate((sr * 35.3147).toFixed(2));
        setKhoaRate((kr * 35.3147).toFixed(2));

        setCementTotalTk((cement * cr).toFixed(2));
        setSandTotalTk((sand * sr).toFixed(2));
        setKhoaTotalTk((khoa * sr).toFixed(2));

    }

    return (

        <div>
            <Header title="CC Works" />
            <Container>
                <Row>
                    <Col xs={12} md={6}>
                        <h3>CC Works</h3>
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
                                    <Form.Group>
                                        <Form.Label>&nbsp;</Form.Label>
                                        <Form.Control type="text" onChange={onChangeR3Handler} value={r3} />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Form>
                        <Button variant="primary" className="mb-4 mt-4" onClick={resultHandler}>Calculate</Button>
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
                                <tr>
                                    <td>Khoa</td>
                                    <td className="text-end">{khoaQty}</td>
                                    <td className="text-end">{khoaRate}</td>
                                    <td className="text-end">{khoaTotalTk}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>


                </Row> {/* ----./row----- */}
            </Container>
            <Footer></Footer>
        </div>
    );
};

export default CcWork;
