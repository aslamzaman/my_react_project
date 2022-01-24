import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Button, Form, Table, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const DocumentPage = () => {
    const [documents, setDocuments] = useState([]);
    const [name, setName] = useState("");
    const [msg, setMsg] = useState("Data ready");
    const [updateId, setUpdateId] = useState("");
    const [deleteId, setDeleteId] = useState("");

    const [modalHeader, setModalHeader] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

    useEffect(() => {
        let url = process.env.REACT_APP_SERVER_URL + "document";
        axios.get(url)
            .then((response) => {
                setDocuments(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [msg]);

    const handleClose = () => setShowModal(false);
    const deleteModalClose = () => setDeleteModal(false);

    const addNewHandler = () => {
        setName("");
        setShowModal(true);
        setUpdateId("0");
        setModalHeader("Add New Document");
    }

    const editHandler = (id) => {
        setName("");
        setShowModal(true);
        setModalHeader("Update Document");
        let url_edit = process.env.REACT_APP_SERVER_URL + "document/edit/" + id;
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
            save_url = process.env.REACT_APP_SERVER_URL + "document/save";
        } else {
            save_url = process.env.REACT_APP_SERVER_URL + "document/update/" + updateId;
        }
        let obj = {
            name: name
        }
        await axios.post(save_url, obj)
            .then((response) => {
                setMsg(response.data.msg);
                setShowModal(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const deleteHandler = async (id) => {
        setDeleteModal(true);
        setMsg("Are you sure?");
        setDeleteId(id);
    }

    const removeHandler = async () => {
        let url_delete = process.env.REACT_APP_SERVER_URL + "document/delete/" + deleteId;
        await axios.delete(url_delete)
            .then((response) => {
                setMsg(response.data.msg);
                setDeleteModal(false);
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
            <Header title="Document" />
            
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
                                    documents.length ? documents.map((document) => {
                                        return (
                                            <tr key={document._id}>
                                                <td>{document.name}</td>
                                                <td style={{ width: "270px", textAlign: "right" }}>
                                                    <Button variant="secondary me-1" size="sm" onClick={() => { editHandler(document._id) }}> Edit</Button>
                                                    <Button variant="danger me-1" size="sm" onClick={() => { deleteHandler(document._id) }} disabled>Delete</Button>
                                                    <Link className="btn btn-success btn-sm" size="sm" to={`/document/list/${document._id}`}>View</Link>
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



            <Modal size="lg" show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalHeader}</Modal.Title>
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
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={saveHandler}>Save Changes</Button>
                </Modal.Footer>
            </Modal>


            <Modal show={deleteModal} onHide={deleteModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className="text-danger text-center">{msg}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={deleteModalClose}>Close</Button>
                    <Button variant="primary" onClick={removeHandler}>Yes</Button>
                </Modal.Footer>
            </Modal>

            <Footer />
        </div>
    );

};
export default DocumentPage;
