import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from '../../components/Footer';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";
import Lib from "../../lib/Lib";

const BrickFlatSolling = () => {

    const [w, setW] = useState("123+789");
    const [sft, setSft] = useState('1');

    const [brickQty, setBrickQty] = useState('');
    const [sandQty, setSandQty] = useState('');

    const [brickRate, setBrickRate] = useState('');
    const [sandRate, setSandRate] = useState('');

    const [brickTotalTk, setBrickTotalTk] = useState('');
    const [sandTotalTk, setSandTotalTk] = useState('');

    const onChangeWHandler = (e) => {
        setW(e.target.value);
    }

    const onChangeCftHandler = (e) => {
        setSft(e.target.value);
    }

    const resultHandler = async () => {
        await axios.post(process.env.REACT_APP_SERVER_URL + "construction", { works: w })
            .then((response) => {
               // console.log(response.data);
                let wrk = response.data.works;
                if (sft === "1") {
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
        let brick = parseFloat(wrk * 3);
        let sand = wrk * 0.05;

        let br = parseFloat(Lib.price.brick);
        let sr =parseFloat(Lib.price.sand);

        setBrickQty(brick.toFixed(2));
        setSandQty(sand.toFixed(2));

        setBrickRate(br.toFixed(2));
        setSandRate(sr.toFixed(2));

        setBrickTotalTk((brick * br).toFixed(2));
        setSandTotalTk((sand * sr).toFixed(2));
    }

    const resultMks = (wrk) => {
        let brick = parseFloat(wrk * 3 * 10.76);
        let sand = wrk * 0.05 * 10.76;

        let br = parseFloat(Lib.price.brick);
        let sr =parseFloat(Lib.price.sand);
   

        setBrickQty(brick.toFixed(2));
        setSandQty((sand / 35.3147).toFixed(2));

        setBrickRate(br.toFixed(2));
        setSandRate((sr * 35.3147).toFixed(2));

        setBrickTotalTk((brick * br).toFixed(2));
        setSandTotalTk((sand * sr).toFixed(2));
    }


    return (
        <div>
            <Header title="Brick Flat Solling" />
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
                                        <Form.Control type="text" onChange={onChangeWHandler} className="form-control" value={w} />
                                    </Form.Group>
                                </Col>
                                <Col xs={3}>
                                    <Form.Group>
                                        <Form.Label>&nbsp;</Form.Label>
                                        <Form.Select onChange={onChangeCftHandler} value={sft}>
                                            <option value="0">m2</option>
                                            <option value="1">sft</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Button variant="primary" className="mt-4 mb-4" onClick={resultHandler}>Calculate</Button>
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
                                    <td>Sand</td>
                                    <td className="text-end">{sandQty}</td>
                                    <td className="text-end">{sandRate}</td>
                                    <td className="text-end">{sandTotalTk}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
            <Footer title="Brick Flat Solling"></Footer>
        </div>
    );
};

export default BrickFlatSolling;




