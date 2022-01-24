import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Button, Form, Table, Modal } from "react-bootstrap";
import {Link, useParams} from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const StaffdetailPage = () => {
    const [staffdetails, setStaffdetails] = useState([]);

    const [dt, setDt] = useState("");
    const [post, setPost] = useState("");
    const [salary, setSalary] = useState("");
    const [location, setLocation] = useState("");
    const [remarks, setRemarks] = useState("");
 
    const [msg, setMsg] = useState("Data ready");
    const [updateId, setUpdateId] = useState("");
    const [deleteId, setDeleteId] = useState("");

    const [mainModalTitle, setMainModalTitle] = useState("");

    const [mainModalShow, setMainModalShow] = useState(false);
    const [deleteModalShow, setDeleteModalShow] = useState(false);

    const [postDropDown, setPostDropDown] = useState([]);
    const [unitDropDown, setUnitDropDown] = useState([]);

    const {id2} = useParams();
    // const [staffdetailDropDown, setStaffdetailDropDown] = useState([]);

    useEffect(() => {
        let url = process.env.REACT_APP_SERVER_URL + "staff/staff_detail/"+ id2;
        axios.get(url)
            .then((response) => {
                setStaffdetails(response.data);
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

    const clearFnc = () => {
        setDt("");
        setLocation("");
        setRemarks("");
    }

    const dropDownFnc = () => {
           let url_dropdown_post = process.env.REACT_APP_SERVER_URL + "post/dropdown";
        axios(url_dropdown_post)
            .then((response) => {
                setPostDropDown(response.data);
                setPost(response.data[0]._id);
            })
            .catch((err) => {
                console.log(err);
            })

        let url_dropdown_unit = process.env.REACT_APP_SERVER_URL + "unit/dropdown";
        axios(url_dropdown_unit)
            .then((response) => {
                setUnitDropDown(response.data);
                setLocation(response.data[0]._id);
            })
            .catch((err) => {
                console.log(err);
            })
    }


    const addNewHandler = () => {
        clearFnc();        
        setMainModalShow(true);
        setUpdateId("0");
        setMainModalTitle("Add New Staffdetail");
        dropDownFnc();
    }

    const editHandler = (id) => {
        clearFnc();
        setMainModalShow(true);
        setMainModalTitle("Update Staffdetail");
        dropDownFnc();
        let url_edit = process.env.REACT_APP_SERVER_URL + "staff/edit_detail/" + id;
        axios.get(url_edit)
            .then((response) => {
                setDt(response.data.dt);
                setPost(response.data.post);
                setSalary(response.data.salary);
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
            save_url = process.env.REACT_APP_SERVER_URL + "staff/save_detail";
        } else {
            save_url = process.env.REACT_APP_SERVER_URL + "staff/update_detail/" + updateId;
        }
        let obj = {
            dt: dt,
            staff_id: id2,
            post: post,
            salary: salary,
            location: location,
            remarks: remarks,
            entry: Date.now()
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
        let url_delete = process.env.REACT_APP_SERVER_URL + "staff/delete_detail/" + deleteId;
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
        if (dt && salary) {
            return true;
        }
        if (!dt) {
            warn.push(" Dt required");
        }
        if (!salary) {
            warn.push(" Salary required");
        }
        let checkWarning = warn.toString();
        setMsg(checkWarning);
    }

    return (
        <div>
            <Header title="Staff Detail" />

            <Container fluid>
                <Row>
                    <Col>
                        <Button variant="primary me-1" onClick={addNewHandler}>Add New</Button>
                        <Link className="btn btn-danger" to="/staff">Close</Link>
                        <p className="text-primary" style={{ margin: "0px", paddingTop: "10px" }}>{msg}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Table striped bordered hover responsive>
                            <thead className="table-secondary">
                                <tr>
                                    <th scope="col">Date</th>
                                    <th scope="col">Post</th>
                                    <th scope="col">Salary</th>
                                    <th scope="col">Location</th>
                                    <th scope="col">Remarks</th>
                                    <th scope="col" className="text-center"> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    staffdetails.length ? staffdetails.map((staffdetail) => {
                                        return (
                                            <tr key={staffdetail._id}>
                                                <td>{staffdetail.dt}</td>
                                                <td>{staffdetail.post}</td>
                                                <td>{staffdetail.salary}</td>
                                                <td>{staffdetail.location}</td>
                                                <td>{staffdetail.remarks}</td>
                                                <td style={{ width: "180px", textAlign: "right" }}>
                                                    <Button variant="secondary me-1" size="sm" onClick={() => { editHandler(staffdetail._id) }}> Edit</Button>
                                                    <Button variant="danger me-1" size="sm" onClick={() => { deleteHandler(staffdetail._id) }}>Delete</Button>
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
                                <Form.Label>Post</Form.Label>
                                <Form.Select onChange={(e) => { setPost(e.target.value) }} className="form-control" value={post}>
                                    {
                                        postDropDown.length ? postDropDown.map((post) => {
                                            return (
                                                <option value={post._id} key={post._id}>{post.name}</option>
                                            )
                                        })
                                            : null
                                    }
                                </Form.Select>
                            </Form.Group>
                            <Form.Group as={Col} lg="6">
                                <Form.Label>Salary</Form.Label>
                                <Form.Control type="number" onChange={(e) => { setSalary(e.target.value) }} className="form-control" value={salary} />
                            </Form.Group>
                            <Form.Group as={Col} lg="6">
                                <Form.Label>Location</Form.Label>
                                <Form.Select onChange={(e) => { setLocation(e.target.value) }} className="form-control" value={location}>
                                    {
                                        unitDropDown.length ? unitDropDown.map((unit) => {
                                            return (
                                                <option value={unit._id} key={unit._id}>{unit.name}</option>
                                            )
                                        })
                                            : null
                                    }
                                </Form.Select>
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
export default StaffdetailPage;
