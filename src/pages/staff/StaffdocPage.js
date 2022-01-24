import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Button, Form, Card, Modal, Image } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";


const StaffdocPage = () => {
    const [staffdocs, setStaffdocs] = useState([]);

    const [picname, setPicname] = useState("");
    const [picurl, setPicurl] = useState("");

    const [msg, setMsg] = useState("Data ready");
    const [updateId, setUpdateId] = useState("");
    const [deleteId, setDeleteId] = useState("");

    const [mainModalTitle, setMainModalTitle] = useState("");

    const [mainModalShow, setMainModalShow] = useState(false);
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [viewModalShow, setViewModalShow] = useState(false);

    const [staffHeaderName, setStaffHeaderName] = useState("");
    const [staffHeaderPost, setStaffHeaderPost] = useState("");
    const { id2 } = useParams();

    useEffect(() => {
        let url = process.env.REACT_APP_SERVER_URL + "staff/staff_doc/" + id2;
        axios.get(url)
            .then((response) => {
                setStaffdocs(response.data);
            })
            .catch((err) => {
                console.log(err);
            });

        let url_staff = process.env.REACT_APP_SERVER_URL + "staff/view/" + id2;
        axios.get(url_staff)
            .then((response) => {
                //console.log(response.data); 
                setStaffHeaderName(response.data.name);
                setStaffHeaderPost(response.data.joinpost);
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
        setPicname("");
        setPicurl("");
    }


    const addNewHandler = () => {
        clearFnc();
        setMainModalShow(true);
        setUpdateId("0");
        setMainModalTitle("Add New Staffdoc");
    }

    const editHandler = (id) => {
        clearFnc();
        setMainModalShow(true);
        setMainModalTitle("Update Staffdoc");
        let url_edit = process.env.REACT_APP_SERVER_URL + "staff/edit_doc/" + id;
        axios.get(url_edit)
            .then((response) => {
                setPicname(response.data.picname);
                setPicurl(response.data.picurl);
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
            save_url = process.env.REACT_APP_SERVER_URL + "staff/save_doc";
        } else {
            save_url = process.env.REACT_APP_SERVER_URL + "staff/update_doc/" + updateId;
        }
        let obj = {
            staff_id: id2,
            picname: picname,
            picurl: picurl
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
        let url_delete = process.env.REACT_APP_SERVER_URL + "staff/delete_doc/" + deleteId;
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
        let url_view = process.env.REACT_APP_SERVER_URL + "staff/view_doc/" + id;
        await axios.get(url_view)
            .then((response) => {
                setPicname(response.data.picname);
                setPicurl(response.data.picurl);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const validationCheck = () => {
        let warn = [];
        if (picname && picurl) {
            return true;
        }
        if (!picname) {
            warn.push(" Picname required");
        }
        if (!picurl) {
            warn.push(" Picurl required");
        }
        let checkWarning = warn.toString();
        setMsg(checkWarning);
    }

    return (
        <div>
            <Header title="Staffdoc" />

            <Container fluid>
                <Row>
                    <Col>
                        <h4>{staffHeaderName} ({staffHeaderPost})</h4>
                        <Button variant="primary me-1" onClick={addNewHandler}>Add New</Button>
                        <Link className="btn btn-danger" to="/staff">Close</Link>
                        <p className="text-primary" style={{ margin: "0px", paddingTop: "10px" }}>{msg}</p>
                    </Col>
                </Row>
                <Row>
                    {
                        staffdocs.length ? staffdocs.map((staffdoc) => {
                            return (
                                <Col xs={12} sm={6} lg={4} key={staffdoc._id}>
                                    <Card style={{ width: '100%' }}>
                                        <Card.Img variant="top" src={staffdoc.picurl} style={{ width: "100%", height: "300px" }} />
                                        <Card.Body>
                                            <Card.Text>{staffdoc.picname}</Card.Text>
                                            <Button variant="secondary me-1" size="sm" onClick={() => { editHandler(staffdoc._id) }}> Edit</Button>
                                            <Button variant="danger me-1" size="sm" onClick={() => { deleteHandler(staffdoc._id) }}>Delete</Button>
                                            <Button variant="success" size="sm" onClick={() => { viewHandler(staffdoc._id) }}>View</Button>

                                        </Card.Body>
                                    </Card>
                                </Col>
                            )
                        })
                            : null
                    }
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
                                <Form.Label>Picname</Form.Label>
                                <Form.Control type="text" onChange={(e) => { setPicname(e.target.value) }} className="form-control" value={picname} />
                            </Form.Group>
                            <Form.Group as={Col} lg="6">
                                <Form.Label>Picurl</Form.Label>
                                <Form.Control type="text" onChange={(e) => { setPicurl(e.target.value) }} className="form-control" value={picurl} />
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

            <Modal size="lg" show={viewModalShow} onHide={viewModalCloseHandler}>
                <Modal.Header closeButton>
                    <Modal.Title>{picname}</Modal.Title>
                </Modal.Header>
                <Modal.Body>                   
                    <Image src={picurl} alt="Docs" style={{ width: "100%" }} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={viewModalCloseHandler}>Close</Button>
                </Modal.Footer>
            </Modal>

            <Footer />
        </div >
    );

};
export default StaffdocPage;
