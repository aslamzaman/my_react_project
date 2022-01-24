import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Button, Form, Table, Modal } from "react-bootstrap";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const UnitPage = () => {
    const [units, setUnits] = useState([]);
    const [name, setName] = useState("");
    const [msg, setMsg] = useState("Data ready");
    const [updateId, setUpdateId] = useState("");
    const [deleteId, setDeleteId] = useState("");

    const [mainModalTitle, setMainModalTitle] = useState("");
    const [mainModalShow, setMainModalShow] = useState(false);
    const [deleteModalShow, setDeleteModalShow] = useState(false);

    useEffect(() => {
        let url = process.env.REACT_APP_SERVER_URL + "unit";
        axios.get(url)
            .then((response) => {
                setUnits(response.data);
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
        setName("");
        setMainModalShow(true);
        setUpdateId("0");
        setMainModalTitle("Add New Unit");
    }

    const editHandler = (id) => {
        setName("");
        setMainModalShow(true);
        setMainModalTitle("Update Unit");
        let url_edit = process.env.REACT_APP_SERVER_URL + "unit/edit/" + id;
        axios.get(url_edit)
            .then((response) => {
                setName(response.data.name);
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
            save_url = process.env.REACT_APP_SERVER_URL + "unit/save";
        } else {
            save_url = process.env.REACT_APP_SERVER_URL + "unit/update/" + updateId;
        }
        let obj = {
            name: name
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
        let url_delete = process.env.REACT_APP_SERVER_URL + "unit/delete/" + deleteId;
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
        if (name) {
            return true;
        }
        if (!name) {
            warn.push(" Name required");
        }
        let checkWarning = warn.toString();
        setMsg(checkWarning);
    }

    return (
        <div>
            <Header title="Unit" />
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
                                    <th scope="col">Name</th>
                                    <th scope="col" className="text-center"> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    units.length ? units.map((unit) => {
                                        return (
                                            <tr key={unit._id}>
                                                <td>{unit.name}</td>
                                                <td style={{ width: "140px", textAlign: "right" }}>
                                                    <Button variant="secondary me-1" size="sm" onClick={() => { editHandler(unit._id) }}> Edit</Button>
                                                    <Button variant="danger" size="sm" onClick={() => { deleteHandler(unit._id) }} disabled>Delete</Button>
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
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" onChange={(e) => { setName(e.target.value) }} className="form-control" value={name} />
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
export default UnitPage;
