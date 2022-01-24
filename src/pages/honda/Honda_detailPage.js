import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Button, Form, Table, Modal } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const Honda_detailPage = () => {
    const [honda_details, setHonda_details] = useState([]);

    const [dt, setDt] = useState("");
    const [name, setName] = useState("");
    const [designation, setDesignation] = useState("");
    const [mobile, setMobile] = useState("");
    const [new_project, setNew_project] = useState("");
    const [location, setLocation] = useState("");
    const [remarks, setRemarks] = useState("");

    const [msg, setMsg] = useState("Data ready");
    const [updateId, setUpdateId] = useState("");
    const [deleteId, setDeleteId] = useState("");

    const [mainModalTitle, setMainModalTitle] = useState("");

    const [mainModalShow, setMainModalShow] = useState(false);
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [viewModalShow, setViewModalShow] = useState(false);

    const [headerHondaReg, setHeaderHondaReg] = useState("");
    const [headerHondaUnit, setHeaderHondaUnit] = useState("");
    const [headerHondaProject, setHeaderHondaProject] = useState("");

    const { id2 } = useParams(); // honda Id

    useEffect(() => {
        let url = process.env.REACT_APP_SERVER_URL + "honda/honda_detail/" + id2;
        axios.get(url)
            .then((response) => {
                setHonda_details(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
        let url_honda = process.env.REACT_APP_SERVER_URL + "honda/view/" + id2;
        axios.get(url_honda)
            .then((response) => {
                console.log(response.data);
                setHeaderHondaReg(response.data.registration);
                setHeaderHondaUnit(response.data.unit_id.name);
                setHeaderHondaProject(response.data.project_id.name);
            })
            .catch((err) => {
                console.log(err);
            });


    }, [msg, id2]);

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
        setDt("");
        setName("");
        setDesignation("");
        setMobile("");
        setNew_project("");
        setLocation("");
        setRemarks("");
    }



    const addNewHandler = () => {
        clearFnc();
        setMainModalShow(true);
        setUpdateId("0");
        setMainModalTitle("Add New Honda_detail");
    }

    const editHandler = (id) => {
        clearFnc();
        setMainModalShow(true);
        setMainModalTitle("Update Honda_detail");
        let url_edit = process.env.REACT_APP_SERVER_URL + "honda/edit_detail/" + id;
        axios.get(url_edit)
            .then((response) => {
                setDt(response.data.dt);
                setName(response.data.name);
                setDesignation(response.data.designation);
                setMobile(response.data.mobile);
                setNew_project(response.data.new_project);
                setLocation(response.data.location);
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
            save_url = process.env.REACT_APP_SERVER_URL + "honda/save_detail";
        } else {
            save_url = process.env.REACT_APP_SERVER_URL + "honda/update_detail/" + updateId;
        }
        let obj = {
            dt: dt,
            name: name,
            designation: designation,
            mobile: mobile,
            new_project: new_project,
            location: location,
            remarks: remarks,
            honda_id: id2
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
        let url_delete = process.env.REACT_APP_SERVER_URL + "honda/delete_detail/" + deleteId;
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
        let url_view = process.env.REACT_APP_SERVER_URL + "honda/view_detail/" + id;
        await axios.get(url_view)
            .then((response) => {
                setDt(response.data.dt);
                setName(response.data.name);
                setDesignation(response.data.designation);
                setMobile(response.data.mobile);
                setNew_project(response.data.new_project);
                setLocation(response.data.location);
                setRemarks(response.data.remarks);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const validationCheck = () => {
        let warn = [];
        if (dt && name && designation && mobile && new_project && location && remarks) {
            return true;
        }
        if (!dt) {
            warn.push(" Dt required");
        }
        if (!name) {
            warn.push(" Name required");
        }
        if (!designation) {
            warn.push(" Designation required");
        }
        if (!mobile) {
            warn.push(" Mobile required");
        }
        if (!new_project) {
            warn.push(" New_project required");
        }
        if (!location) {
            warn.push(" Location required");
        }
        if (!remarks) {
            warn.push(" Remarks required");
        }

        let checkWarning = warn.toString();
        setMsg(checkWarning);
    }

    return (
        <div>
            <Header title="Honda Detail" />

            <Container fluid>
                <Row>
                    <Col>
                        <p>
                            <strong>Registration No: {headerHondaReg}</strong><br />
                            Unit: {headerHondaUnit} <br />
                            Project: {headerHondaProject}
                        </p>
                        <Button variant="primary me-1" onClick={addNewHandler}>Add New</Button>
                        <Link className="btn btn-danger" to="/honda">Close</Link>

                        <p className="text-primary" style={{ margin: "0px", paddingTop: "10px" }}>{msg}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Table striped bordered hover responsive>
                            <thead className="table-secondary">
                                <tr>
                                    <th scope="col">Date</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Designation</th>
                                    <th scope="col">Mobile</th>
                                    <th scope="col">Project</th>
                                    <th scope="col">Location</th>
                                    <th scope="col">Remarks</th>
                                    <th scope="col" className="text-center"> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    honda_details.length ? honda_details.map((honda_detail) => {
                                        return (
                                            <tr key={honda_detail._id}>
                                                <td>{honda_detail.dt}</td>
                                                <td>{honda_detail.name}</td>
                                                <td>{honda_detail.designation}</td>
                                                <td>{honda_detail.mobile}</td>
                                                <td>{honda_detail.new_project}</td>
                                                <td>{honda_detail.location}</td>
                                                <td>{honda_detail.remarks}</td>
                                                <td style={{ width: "220px", textAlign: "right" }}>
                                                    <Button variant="secondary me-1" size="sm" onClick={() => { editHandler(honda_detail._id) }}> Edit</Button>
                                                    <Button variant="danger me-1" size="sm" onClick={() => { deleteHandler(honda_detail._id) }}>Delete</Button>
                                                    <Button variant="success me-1" size="sm" onClick={() => { viewHandler(honda_detail._id) }}>View</Button>
                                                    <Link className="btn btn-primary btn-sm" to={`/honda/pic/${honda_detail._id}/${id2}`}>Pics</Link>
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
                                <Form.Label>Date</Form.Label>
                                <Form.Control type="date" onChange={(e) => { setDt(e.target.value) }} className="form-control" value={dt} />
                            </Form.Group>
                            <Form.Group as={Col} lg="6">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" onChange={(e) => { setName(e.target.value) }} className="form-control" value={name} />
                            </Form.Group>
                            <Form.Group as={Col} lg="6">
                                <Form.Label>Designation</Form.Label>
                                <Form.Control type="text" onChange={(e) => { setDesignation(e.target.value) }} className="form-control" value={designation} />
                            </Form.Group>
                            <Form.Group as={Col} lg="6">
                                <Form.Label>Mobile</Form.Label>
                                <Form.Control type="text" onChange={(e) => { setMobile(e.target.value) }} className="form-control" value={mobile} />
                            </Form.Group>
                            <Form.Group as={Col} lg="6">
                                <Form.Label>New_project</Form.Label>
                                <Form.Control type="text" onChange={(e) => { setNew_project(e.target.value) }} className="form-control" value={new_project} />
                            </Form.Group>
                            <Form.Group as={Col} lg="6">
                                <Form.Label>Location</Form.Label>
                                <Form.Control type="text" onChange={(e) => { setLocation(e.target.value) }} className="form-control" value={location} />
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

            <Modal show={viewModalShow} onHide={viewModalCloseHandler}>
                <Modal.Header closeButton>
                    <Modal.Title>Detail</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table striped hover bordered>
                        <tbody>
                            <tr>
                                <td><strong>Date</strong></td><td>{dt}</td>
                            </tr>
                            <tr>
                                <td><strong>Name</strong></td><td>{name}</td>
                            </tr>
                            <tr>
                                <td><strong>Designation</strong></td><td>{designation}</td>
                            </tr>
                            <tr>
                                <td><strong>Mobile</strong></td><td>{mobile}</td>
                            </tr>
                            <tr>
                                <td><strong>New_project</strong></td><td>{new_project}</td>
                            </tr>
                            <tr>
                                <td><strong>Location</strong></td><td>{location}</td>
                            </tr>
                            <tr>
                                <td><strong>Remarks</strong></td><td>{remarks}</td>
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
export default Honda_detailPage;
