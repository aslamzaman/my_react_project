import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Button, Form, Table, Modal } from "react-bootstrap";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { Link } from "react-router-dom";

const LandPage = () => {
    const [lands, setLands] = useState([]);
    const [unit, setUnit] = useState("");
    const [qty, setQty] = useState("");
    const [reg_dt, setReg_dt] = useState("");
    const [donors, setDonors] = useState("");
    const [remarks, setRemarks] = useState("");
    const [msg, setMsg] = useState("Data ready");
    const [updateId, setUpdateId] = useState("");
    const [deleteId, setDeleteId] = useState("");

    const [mainModalTitle, setMainModalTitle] = useState("");
    const [mainModalShow, setMainModalShow] = useState(false);
    const [deleteModalShow, setDeleteModalShow] = useState(false);

    const [rtcLand, setRtcLand] = useState(0);
    const [absLand, setAbsLand] = useState(0);


    useEffect(() => {
        let url = process.env.REACT_APP_SERVER_URL + "land";
        axios.get(url)
            .then((response) => {
                setLands(response.data);
            })
            .catch((err) => {
                console.log(err);
            });

        let rtc_land_url = process.env.REACT_APP_SERVER_URL + "land/total_rtc_land";
        axios.get(rtc_land_url)
            .then((response) => {
                setRtcLand(response.data.rtc);
            })
            .catch((err) => {
                console.log(err);
            });


        let abs_land_url = process.env.REACT_APP_SERVER_URL + "land/total_abs_land";
        axios.get(abs_land_url)
            .then((response) => {
                setAbsLand(response.data.abs);
            })
            .catch((err) => {
                console.log(err);
            });

    }, [msg]);

    const mainModalCloseHandler = () => {
        setMainModalShow(false);
    }
    const deleteModalCloseHandler = () => {
        setDeleteModalShow(false);
    }

    const addNewHandler = () => {
        setUnit("");
        setQty("");
        setReg_dt("");
        setDonors("");
        setRemarks("");
        setMainModalShow(true);
        setUpdateId("0");
        setMainModalTitle("Add New Land");
    }

    const editHandler = (id) => {
        setUnit("");
        setQty("");
        setReg_dt("");
        setDonors("");
        setRemarks("");
        setMainModalShow(true);
        setMainModalTitle("Update Land");
        let url_edit = process.env.REACT_APP_SERVER_URL + "land/edit/" + id;
        axios.get(url_edit)
            .then((response) => {
                setUnit(response.data.unit);
                setQty(response.data.qty);
                setReg_dt(response.data.reg_dt);
                setDonors(response.data.donors);
                setRemarks(response.data.remarks);
                setMsg("Ready to edit");
                setUpdateId(id);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const saveHandler = async () => {
        if (!validationCheck() === true) { return false; };
        let save_url = "";
        if (updateId === "0") {
            save_url = process.env.REACT_APP_SERVER_URL + "land/save";
        } else {
            save_url = process.env.REACT_APP_SERVER_URL + "land/update/" + updateId;
        }
        let obj = {
            unit: unit,
            qty: qty,
            reg_dt: reg_dt,
            donors: donors,
            remarks: remarks
        }
        await axios.post(save_url, obj)
            .then((response) => {
                setMsg(response.data.msg);
                setMainModalShow(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const deleteHandler = async (id) => {
        setDeleteModalShow(true);
        setMsg("Are you sure?");
        setDeleteId(id);
    }

    const removeHandler = async () => {
        let url_delete = process.env.REACT_APP_SERVER_URL + "land/delete/" + deleteId;
        await axios.delete(url_delete)
            .then((response) => {
                setMsg(response.data.msg);
                setDeleteModalShow(false);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const validationCheck = () => {
        let warn = [];
        if (unit && qty && reg_dt && donors && remarks) {
            return true;
        }
        if (!unit) {
            warn.push(" Unit required");
        }
        if (!qty) {
            warn.push(" Qty required");
        }
        if (!reg_dt) {
            warn.push(" Reg_dt required");
        }
        if (!donors) {
            warn.push(" Donors required");
        }
        if (!remarks) {
            warn.push(" Remarks required");
        }
        let checkWarning = warn.toString();
        setMsg(checkWarning);
    }

    return (
        <div>
            <Header title={`RTC=${rtcLand}; ABS=${absLand}; Total=${rtcLand+absLand}`} />

            <Container fluid>
                <Row>
                    <Col>
                        <Button variant="primary" onClick={addNewHandler}>Add New</Button>
                        <p className="text-primary" style={{ margin: "0px", paddingTop: "10px" }}>{msg}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Table striped bordered hover responsive>
                            <thead className="table-secondary">
                                <tr>
                                    <th scope="col">Unit</th>
                                    <th scope="col">Qty</th>
                                    <th scope="col">Reg_dt</th>
                                    <th scope="col">Donors</th>
                                    <th scope="col">Remarks</th>
                                    <th scope="col" className="text-center"> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    lands.length ? lands.map((land) => {
                                        return (
                                            <tr key={land._id}>
                                                <td>{land.unit}</td>
                                                <td>{land.qty}</td>
                                                <td>{land.reg_dt}</td>
                                                <td>{land.donors}</td>
                                                <td>{land.remarks}</td>
                                                <td style={{ width: "190px", textAlign: "right" }}>
                                                    <Button variant="secondary me-1" size="sm" onClick={() => { editHandler(land._id) }}> Edit</Button>
                                                    <Button variant="danger" size="sm me-1" onClick={() => { deleteHandler(land._id) }} disabled>Delete</Button>
                                                    <Link className="btn btn-primary btn-sm" to={`/land/list/${land._id}`} >View</Link>
                                                </td>
                                            </tr>
                                        )
                                    })
                                        : null
                                }
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>

            <Modal size="lg" show={mainModalShow} onHide={mainModalCloseHandler}>
                <Modal.Header closeButton>
                    <Modal.Title>{mainModalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row className="mb-3">
                            <Form.Group as={Col} lg="6">
                                <Form.Label>Unit</Form.Label>
                                <Form.Control type="text" onChange={(e) => { setUnit(e.target.value) }} className="form-control" value={unit} />
                            </Form.Group>
                            <Form.Group as={Col} lg="6">
                                <Form.Label>Qty</Form.Label>
                                <Form.Control type="text" onChange={(e) => { setQty(e.target.value) }} className="form-control" value={qty} />
                            </Form.Group>
                            <Form.Group as={Col} lg="6">
                                <Form.Label>Reg_dt</Form.Label>
                                <Form.Control type="text" onChange={(e) => { setReg_dt(e.target.value) }} className="form-control" value={reg_dt} />
                            </Form.Group>
                            <Form.Group as={Col} lg="6">
                                <Form.Label>Donors</Form.Label>
                                <Form.Control type="text" onChange={(e) => { setDonors(e.target.value) }} className="form-control" value={donors} />
                            </Form.Group>
                            <Form.Group as={Col} lg="6">
                                <Form.Label>Remarks</Form.Label>
                                <Form.Control type="text" onChange={(e) => { setRemarks(e.target.value) }} className="form-control" value={remarks} />
                            </Form.Group>
                            <p className="text-primary" style={{ margin: "0px", paddingTop: "10px" }}>{msg}</p>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={mainModalCloseHandler}>Close</Button>
                    <Button variant="primary" onClick={saveHandler}>Save Changes</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={deleteModalShow} onHide={deleteModalCloseHandler}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className="text-danger text-center">{msg}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={deleteModalCloseHandler}>Close</Button>
                    <Button variant="primary" onClick={removeHandler}>Yes</Button>
                </Modal.Footer>
            </Modal>

            <Footer />
        </div>
    );

};
export default LandPage;
