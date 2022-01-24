import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Button, Form, Table, Modal } from "react-bootstrap";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Link, useParams } from "react-router-dom";

const LandabsPage = () => {
    const [landabss, setLandabss] = useState([]);
    const [unit, setUnit] = useState("");
    const [school, setSchool] = useState("");
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

    const [titleText, setTitleText] = useState("");

    const { unitId } = useParams();


    useEffect(() => {
        let url = process.env.REACT_APP_SERVER_URL + "land/landabs/" + unitId;
        axios.get(url)
            .then((response) => {
                setLandabss(response.data);
                setTitleText(response.data[0].unit);
            })
            .catch((err) => {
                console.log(err);
            });

        setUnit(unitId);
    }, [msg, unitId]);

    const mainModalCloseHandler = () => {
        setMainModalShow(false);
    }
    const deleteModalCloseHandler = () => {
        setDeleteModalShow(false);
    }


    const addNewHandler = () => {
        setSchool("");
        setQty("");
        setReg_dt("");
        setDonors("");
        setRemarks("");
        setMainModalShow(true);
        setUpdateId("0");
        setMainModalTitle("Add New Landabs");
    }

    const editHandler = (id) => {
        setSchool("");
        setQty("");
        setReg_dt("");
        setDonors("");
        setRemarks("");
        setMainModalShow(true);
        setMainModalTitle("Update Landabs");
        let url_edit = process.env.REACT_APP_SERVER_URL + "land/edit_abs/" + id;
        axios.get(url_edit)
            .then((response) => {
                setUnit(response.data.unit);
                setSchool(response.data.school);
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
            save_url = process.env.REACT_APP_SERVER_URL + "land/abs_save";
        } else {
            save_url = process.env.REACT_APP_SERVER_URL + "land/update_abs/" + updateId;
        }
        let obj = {
            unit: unit,
            school: school,
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
        let url_delete = process.env.REACT_APP_SERVER_URL + "land/delete_abs/" + deleteId;
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
        if (school && qty && reg_dt) {
            return true;
        }

        if (!school) {
            warn.push(" School required");
        }
        if (!qty) {
            warn.push(" Qty required");
        }
        if (!reg_dt) {
            warn.push(" Reg_dt required");
        }

        let checkWarning = warn.toString();
        setMsg(checkWarning);
    }

    return (
        <div>
            <Header title={`${titleText} Unit`} />

            <Container fluid>
                <Row>
                    <Col>
                        <Button variant="primary me-1" onClick={addNewHandler}>Add New</Button>
                        <Link className="btn btn-danger" to="/land">Close</Link>
                        <p className="text-primary" style={{ margin: "0px", paddingTop: "10px" }}>{msg}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Table striped bordered hover responsive>
                            <thead className="table-secondary">
                                <tr>
                                    <th scope="col">School</th>
                                    <th scope="col">Qty</th>
                                    <th scope="col">Reg_dt</th>
                                    <th scope="col">Donors</th>
                                    <th scope="col">Remarks</th>
                                    <th scope="col" className="text-center"> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    landabss.length ? landabss.map((landabs) => {
                                        return (
                                            <tr key={landabs._id}>
                                                <td>{landabs.school}</td>
                                                <td>{landabs.qty}</td>
                                                <td>{landabs.reg_dt}</td>
                                                <td>{landabs.donors}</td>
                                                <td>{landabs.remarks}</td>
                                                <td style={{ width: "140px", textAlign: "right" }}>
                                                    <Button variant="secondary me-1" size="sm" onClick={() => { editHandler(landabs._id) }}> Edit</Button>
                                                    <Button variant="danger" size="sm" onClick={() => { deleteHandler(landabs._id) }} disabled>Delete</Button>
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
                                <Form.Label>School</Form.Label>
                                <Form.Control type="text" onChange={(e) => { setSchool(e.target.value) }} className="form-control" value={school} />
                            </Form.Group>
                            <Form.Group as={Col} lg="6">
                                <Form.Label>Qty</Form.Label>
                                <Form.Control type="text" onChange={(e) => { setQty(e.target.value) }} className="form-control" value={qty} />
                            </Form.Group>
                            <Form.Group as={Col} lg="6">
                                <Form.Label>Registration Date</Form.Label>
                                <Form.Control type="date" onChange={(e) => { setReg_dt(e.target.value) }} className="form-control" value={reg_dt} />
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
export default LandabsPage;
