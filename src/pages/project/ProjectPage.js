import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Button, Form, Table, Modal } from "react-bootstrap";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const ProjectPage = () => {
    const [projects, setProjects] = useState([]);

    const [name, setName] = useState("");
    const [short_name, setShort_name] = useState("");

    const [msg, setMsg] = useState("Data ready");
    const [updateId, setUpdateId] = useState("");
    const [deleteId, setDeleteId] = useState("");

    const [mainModalTitle, setMainModalTitle] = useState("");

    const [mainModalShow, setMainModalShow] = useState(false);
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [viewModalShow, setViewModalShow] = useState(false);


    useEffect(() => {
        let url = process.env.REACT_APP_SERVER_URL + "project";
        axios.get(url)
            .then((response) => {
                setProjects(response.data);
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
    const viewModalCloseHandler = () => {
        setViewModalShow(false);
    }

    const clearFnc = () => {
        setName("");
        setShort_name("");
    }

    const addNewHandler = () => {
        clearFnc();
        setMainModalShow(true);
        setUpdateId("0");
        setMainModalTitle("Add New Project");
    }

    const editHandler = (id) => {
        clearFnc();
        setMainModalShow(true);
        setMainModalTitle("Update Project");
        let url_edit = process.env.REACT_APP_SERVER_URL + "project/edit/" + id;
        axios.get(url_edit)
            .then((response) => {
                setName(response.data.name);
                setShort_name(response.data.short_name);
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
            save_url = process.env.REACT_APP_SERVER_URL + "project/save";
        } else {
            save_url = process.env.REACT_APP_SERVER_URL + "project/update/" + updateId;
        }
        let obj = {
            name: name,
            short_name: short_name
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

    const deleteHandler = (id) => {
        setDeleteModalShow(true);
        setMsg("Are you sure?");
        setDeleteId(id);
    }

    const removeHandler = async () => {
        let url_delete = process.env.REACT_APP_SERVER_URL + "project/delete/" + deleteId;
        await axios.delete(url_delete)
            .then((response) => {
                setMsg(response.data.msg);
                setDeleteModalShow(false);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const viewHandler = async (id) => {
        clearFnc();
        setViewModalShow(true);
        let url_view = process.env.REACT_APP_SERVER_URL + "project/view/" + id;
        await axios.get(url_view)
            .then((response) => {
                setName(response.data.name);
                setShort_name(response.data.short_name);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const validationCheck = () => {
        let warn = [];
        if (name && short_name) {
            return true;
        }
        if (!name) {
            warn.push(" Name required");
        }
        if (!short_name) {
            warn.push(" Short_name required");
        }
        let checkWarning = warn.toString();
        setMsg(checkWarning);
    }

    return (
        <div>
            <Header title="Project" />

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
                                    <th scope="col">Short_name</th>
                                    <th scope="col" className="text-center"> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    projects.length ? projects.map((project) => {
                                        return (
                                            <tr key={project._id}>
                                                <td>{project.name}</td>
                                                <td>{project.short_name}</td>
                                                <td style={{ width: "180px", textAlign: "right" }}>
                                                    <Button variant="secondary me-1" size="sm" onClick={() => { editHandler(project._id) }}> Edit</Button>
                                                    <Button variant="danger me-1" size="sm" onClick={() => { deleteHandler(project._id) }} disabled>Delete</Button>
                                                    <Button variant="success" size="sm" onClick={() => { viewHandler(project._id) }}>View</Button>
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
                            <Form.Group as={Col} lg="6">
                                <Form.Label>Short_name</Form.Label>
                                <Form.Control type="text" onChange={(e) => { setShort_name(e.target.value) }} className="form-control" value={short_name} />
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

            <Modal show={viewModalShow} onHide={viewModalCloseHandler}>
                <Modal.Header closeButton>
                    <Modal.Title>Detail</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table striped hover bordered>
                        <tbody>
                            <tr>
                                <td><strong>Name</strong></td><td>{name}</td>
                            </tr>
                            <tr>
                                <td><strong>Short_name</strong></td><td>{short_name}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={viewModalCloseHandler}>Close</Button>
                </Modal.Footer>
            </Modal>

            <Footer />
        </div>
    );

};
export default ProjectPage;
