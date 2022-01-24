import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Button, Form, Table, Modal } from "react-bootstrap";
import {Link} from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import customLib from "../../lib/Lib";

const HondaPage = () => {
    const [hondas, setHondas] = useState([]);

    const [registration, setRegistration] = useState("");
    const [reg_dt, setReg_dt] = useState("");
    const [chassis, setChassis] = useState("");
    const [engine, setEngine] = useState("");
    const [unit_id, setUnit_id] = useState("");
    const [project_id, setProject_id] = useState("");

    const [msg, setMsg] = useState("Data ready");
    const [updateId, setUpdateId] = useState("");
    const [deleteId, setDeleteId] = useState("");

    const [mainModalTitle, setMainModalTitle] = useState("");

    const [mainModalShow, setMainModalShow] = useState(false);
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [viewModalShow, setViewModalShow] = useState(false);

    const [unitDropDown, setUnitDropDown] = useState([]);
    const [projectDropDown, setProjectDropDown] = useState([]);

    useEffect(() => {
        let url = process.env.REACT_APP_SERVER_URL + "honda";
        axios.get(url)
            .then((response) => {
                setHondas(response.data);
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
        setRegistration("");
        setReg_dt("");
        setChassis("");
        setEngine("");
        setUnit_id("");
        setProject_id("");
    }

    /*----------------- Dropdown -----------------  */
    const dropDownFnc = () => {
        let url_unit_dropdown = process.env.REACT_APP_SERVER_URL + "unit/dropdown";
        axios(url_unit_dropdown)
            .then((response) => {
                setUnitDropDown(response.data);
                setUnit_id(response.data[0]._id);
            })
            .catch((err) => {
                console.log(err);
            })

        let url_project_dropdown = process.env.REACT_APP_SERVER_URL + "project/dropdown";
        axios(url_project_dropdown)
            .then((response) => {
                setProjectDropDown(response.data);
                setProject_id(response.data[0]._id);
            })
            .catch((err) => {
                console.log(err);
            })

    }


    const addNewHandler = () => {
        clearFnc();
        dropDownFnc();
        setMainModalShow(true);
        setUpdateId("0");
        setMainModalTitle("Add New Honda");
    }

    const editHandler = (id) => {
        clearFnc();
        dropDownFnc();
        setMainModalShow(true);
        setMainModalTitle("Update Honda");
        let url_edit = process.env.REACT_APP_SERVER_URL + "honda/edit/" + id;
        axios.get(url_edit)
            .then((response) => {
                setRegistration(response.data.registration);
                setReg_dt(response.data.reg_dt);
                setChassis(response.data.chassis);
                setEngine(response.data.engine);
                setUnit_id(response.data.unit_id);
                setProject_id(response.data.project_id);
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
            save_url = process.env.REACT_APP_SERVER_URL + "honda/save";
        } else {
            save_url = process.env.REACT_APP_SERVER_URL + "honda/update/" + updateId;
        }
        let obj = {
            registration: registration,
            reg_dt: reg_dt,
            chassis: chassis,
            engine: engine,
            unit_id: unit_id,
            project_id: project_id
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
        let url_delete = process.env.REACT_APP_SERVER_URL + "honda/delete/" + deleteId;
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
        let url_view = process.env.REACT_APP_SERVER_URL + "honda/view/" + id;
        await axios.get(url_view)
            .then((response) => {
                setRegistration(response.data.registration);
                setReg_dt(response.data.reg_dt);
                setChassis(response.data.chassis);
                setEngine(response.data.engine);
                setUnit_id(response.data.unit_id.name);
                setProject_id(response.data.project_id.name);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const validationCheck = () => {
        let warn = [];
        if (registration && reg_dt && chassis && engine && unit_id && project_id) {
            return true;
        }
        if (!registration) {
            warn.push(" Registration required");
        }
        if (!reg_dt) {
            warn.push(" Reg_dt required");
        }
        if (!chassis) {
            warn.push(" Chassis required");
        }
        if (!engine) {
            warn.push(" Engine required");
        }
        if (!unit_id) {
            warn.push(" Unit_id required");
        }
        if (!project_id) {
            warn.push(" Project_id required");
        }
        let checkWarning = warn.toString();
        setMsg(checkWarning);
    }

    return (
        <div>
            <Header title="Honda" />

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
                                    <th scope="col">Registration</th>
                                    <th scope="col">Reg. Date</th>
                                    <th scope="col">Chassis No.</th>
                                    <th scope="col">Engine No.</th>
                                    <th scope="col">Unit</th>
                                    <th scope="col">Project</th>
                                    <th scope="col">Age</th>
                                    <th scope="col" className="text-center"> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    hondas.length ? hondas.map((honda) => {
                                        let age = customLib.date_diff(honda.reg_dt,new Date(),1);
                                        return (
                                            <tr key={honda._id}>
                                                <td>{honda.registration}</td>
                                                <td>{honda.reg_dt}</td>
                                                <td>{honda.chassis}</td>
                                                <td>{honda.engine}</td>
                                                <td>{honda.unit}</td>
                                                <td>{honda.project}</td>
                                                <td>{age}</td>
                                                <td style={{ width: "270px", textAlign: "right" }}>
                                                    <Button variant="secondary me-1" size="sm" onClick={() => { editHandler(honda._id) }}> Edit</Button>
                                                    <Button variant="danger me-1" size="sm" onClick={() => { deleteHandler(honda._id) }}>Delete</Button>
                                                    <Button variant="success me-1" size="sm" onClick={() => { viewHandler(honda._id) }}>View</Button>
                                                    <Link className="btn btn-primary btn-sm" to={`/honda/detail/${honda._id}`}>Detail</Link>
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
                                <Form.Label>Registration</Form.Label>
                                <Form.Control type="text" onChange={(e) => { setRegistration(e.target.value) }} className="form-control" value={registration} />
                            </Form.Group>
                            <Form.Group as={Col} lg="6">
                                <Form.Label>Registration Date</Form.Label>
                                <Form.Control type="date" onChange={(e) => { setReg_dt(e.target.value) }} className="form-control" value={reg_dt} />
                            </Form.Group>
                            <Form.Group as={Col} lg="6">
                                <Form.Label>Chassis No.</Form.Label>
                                <Form.Control type="text" onChange={(e) => { setChassis(e.target.value) }} className="form-control" value={chassis} />
                            </Form.Group>
                            <Form.Group as={Col} lg="6">
                                <Form.Label>Engine No.</Form.Label>
                                <Form.Control type="text" onChange={(e) => { setEngine(e.target.value) }} className="form-control" value={engine} />
                            </Form.Group>
                            <Form.Group as={Col} lg="6">
                                <Form.Label>Unit</Form.Label>
                                <Form.Select onChange={(e) => { setUnit_id(e.target.value) }} className="form-control" value={unit_id}>
                                    {
                                        unitDropDown.length ? unitDropDown.map((unit) => {
                                            return (
                                                <option key={unit._id} value={unit._id}>{unit.name}</option>
                                            )
                                        })
                                            : null
                                    }
                                </Form.Select>
                            </Form.Group>
                            <Form.Group as={Col} lg="6">
                                <Form.Label>Project</Form.Label>
                                <Form.Select onChange={(e) => { setProject_id(e.target.value) }} className="form-control" value={project_id}>
                                    {
                                        projectDropDown.length ? projectDropDown.map((project) => {
                                            return (
                                                <option key={project._id} value={project._id}>{project.name}</option>
                                            )
                                        })
                                            : null
                                    }
                                </Form.Select>
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
                                <td><strong>Registration</strong></td><td>{registration}</td>
                            </tr>
                            <tr>
                                <td><strong>Reg_dt</strong></td><td>{reg_dt}</td>
                            </tr>
                            <tr>
                                <td><strong>Chassis</strong></td><td>{chassis}</td>
                            </tr>
                            <tr>
                                <td><strong>Engine</strong></td><td>{engine}</td>
                            </tr>
                            <tr>
                                <td><strong>Unit_id</strong></td><td>{unit_id}</td>
                            </tr>
                            <tr>
                                <td><strong>Project_id</strong></td><td>{project_id}</td>
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
export default HondaPage;
