import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Footer from "../../components/Footer";
import axios from 'axios';
import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";
import Lib from "../../lib/Lib";

const PlasterWorks = () => {
    const [works, setWorks] = useState(100);
    const [r1, setR1] = useState(1);
    const [r2, setR2] = useState(4);
    const [depth, setDepth] = useState(1);
    const [depthString, setDepthString] = useState("inch");
    const [opt, setOpt] = useState("sft");

    const [cement, setCement] = useState(0);
    const [sand, setSand] = useState(0);

    const [cementRate, setCementRate] = useState(0);
    const [sandRate, setSandRate] = useState(0);

    const [cementTotal, setCementTotal] = useState(0);
    const [sandTotal, setSandTotal] = useState(0);

    const [cft, setCft] = useState("");

    useEffect(() => {
        if (opt === "sft") {
            setDepthString("inch");
            setDepth(1);
        } else {
            setDepthString("mm")
            setDepth(25.4);
        }
    }, [opt]);

    const resultHandler = async () => {

        await axios.post(process.env.REACT_APP_SERVER_URL + "construction", { works: works })
            .then((response) => {
                let wrk = response.data.works;
                console.log(wrk);

                if (opt === "sft") {
                    sftResult(wrk);
                }
                else {
                    m2Result(wrk);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }


    const sftResult = (w) => {
        let ratio = (parseFloat(r1) + parseFloat(r2));
        let worksWt = (parseFloat(w) * (depth / 12) * 1.5);

        let cement = (((worksWt / ratio) * parseFloat(r1)) / 1.25).toFixed(2);
        let sand = ((worksWt / ratio) * parseFloat(r2)).toFixed(2)

        let cementRate = parseFloat(Lib.price.cement).toFixed(2);
        let sandRate = (parseFloat(Lib.price.sand) * 35.3147).toFixed(2);

        let cementTotal = (cement * cementRate).toFixed(2);
        let sandTotal = (sand * sandRate).toFixed(2);

        setCement(cement);
        setSand(sand);

        setCementRate(cementRate);
        setSandRate(sandRate);

        setCementTotal(cementTotal);
        setSandTotal(sandTotal);

        setCft("cft");

    }

    const m2Result = (w) => {
        let ratio = (parseFloat(r1) + parseFloat(r2));
        let worksWt = (parseFloat(w) * (depth / 1000) * 1.5);
        let cement = ((((worksWt / ratio) * parseFloat(r1)) * 35.3147) / 1.25).toFixed(2)
        let sand = ((worksWt / ratio) * parseFloat(r2)).toFixed(2)

        let cementRate = parseFloat(Lib.price.cement).toFixed(2);
        let sandRate = (parseFloat(Lib.price.sand) * 35.3147).toFixed(2);

        let cementTotal = (cement * cementRate).toFixed(2);
        let sandTotal = (sand * sandRate).toFixed(2);

        setCement(cement);
        setSand(sand);

        setCementRate(cementRate);
        setSandRate(sandRate);

        setCementTotal(cementTotal);
        setSandTotal(sandTotal);

        setCft("m3");

    }


    return (
        <div>
            <Header title="Plaster Works" />
            <Container>
                <Row>
                    <Col xs={12} md={6}>
                    <h3>Result</h3>
                        <hr />
                        <Form>
                            <Row>
                                <Col xs={9}>
                                    <Form.Group>
                                        <Form.Label>Total Works</Form.Label>
                                        <Form.Control type="text" onChange={(e) => { setWorks(e.target.value); }} value={works} />
                                    </Form.Group>
                                </Col>
                                <Col xs={3}>
                                    <Form.Group>
                                        <Form.Label>&nbsp;</Form.Label>
                                        <Form.Select onChange={(e) => { setOpt(e.target.value); }} value={opt}>
                                            <option value="sft">SFT</option>
                                            <option value="m2">M2</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Ratio</Form.Label>
                                        <Form.Control type="text" onChange={(e) => { setR1(e.target.value); }} value={r1} />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>&nbsp;</Form.Label>
                                        <Form.Control type="text" onChange={(e) => { setR2(e.target.value); }} value={r2} />
                                    </Form.Group>
                                </Col>
                                <Col>

                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Depth ({depthString})</Form.Label>
                                        <Form.Control type="text" onChange={(e) => { setDepth(e.target.value); }} value={depth} />
                                    </Form.Group>
                                </Col>
                                <Col>

                                </Col>
                                <Col>

                                </Col>
                            </Row>
                            <Button variant="primary" className="mt-4 mb-4" onClick={resultHandler} >Calculate</Button>
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
                                    <td>Cement</td>
                                    <td className="text-end">{cement}bags</td>
                                    <td className="text-end">{cementRate}</td>
                                    <td className="text-end">{cementTotal}</td>
                                </tr>
                                <tr>
                                    <td>Sand</td>
                                    <td className="text-end">{sand}{cft}</td>
                                    <td className="text-end">{sandRate}</td>
                                    <td className="text-end">{sandTotal}</td>

                                </tr>
                            </tbody>
                        </Table>          
                    </Col>
                </Row>
            </Container>
            <Footer />
        </div>

    )

}

export default PlasterWorks;