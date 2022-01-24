import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Button, Form, Image, Modal, Card, FormGroup } from "react-bootstrap";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Link, useParams } from "react-router-dom";

const DocumentlistPage = () => {
    const [documentlists, setDocumentlists] = useState([]);
    // const [doccategory, setDoccategory] = useState("");
    const [name, setName] = useState("");
    const [picurl, setPicurl] = useState("");
    const [thumb, setThumb] = useState("");
    const [dt, setDt] = useState("");
    const [msg, setMsg] = useState("Data ready");
    const [updateId, setUpdateId] = useState("");
    const [deleteId, setDeleteId] = useState("");

    const [modalHeader, setModalHeader] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [moveModal, setMoveModal] = useState(false);
    const [bigModal, setBigModal] = useState(false);

    const [headerName, setHeaderName] = useState("");
    const [picLength, setPicLength] = useState(0);

    const [bigImage, setBigImage] = useState("");
    const [dropdownArray, setDropdownArray] = useState([]);
    const [dropdownValue, setDropdownValue] = useState("");
    const [moveId, setMoveId] = useState("");

    const { id } = useParams();

    useEffect(() => {
        let url = process.env.REACT_APP_SERVER_URL + "document/list/" + id;
        axios.get(url)
            .then((response) => {
               // console.log(response.data);
                setDocumentlists(response.data);
                setHeaderName(response.data[0].doccategory);
                setPicLength(response.data.length);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [msg,id]);

    const handleClose = () => setShowModal(false);
    const deleteModalClose = () => setDeleteModal(false);
    const moveModalClose = () => setMoveModal(false);
    const bigModalClose = () => setBigModal(false);

    const addNewHandler = () => {        
        setName("");
        setPicurl("");
        setThumb("");
        setDt("");
        setShowModal(true);
        setUpdateId("0");
        setModalHeader("Add New Documentlist");
    }

    const editHandler = (id) => {        
        setName("");
        setPicurl("");
        setThumb("");
        setDt("");
        setShowModal(true);
        setModalHeader("Update Documentlist");
        let url_edit = process.env.REACT_APP_SERVER_URL + "document/edit_list/" + id;
        axios.get(url_edit)
            .then((response) => {
                setName(response.data.name);
                setPicurl(response.data.picurl);
                setThumb(response.data.thumb);
                setDt(response.data.dt);
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
            save_url = process.env.REACT_APP_SERVER_URL + "document/save_list";
        } else {
            save_url = process.env.REACT_APP_SERVER_URL + "document/update_list/" + updateId;
        }
        let obj = {
            doccategory: id,
            name: name,
            picurl: picurl,
            thumb: thumb,
            dt: dt
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

    const deleteHandler = (id) => {
        setDeleteModal(true);
        setMsg("Are you sure?");
        setDeleteId(id);
    }

    const removeHandler = async () => {
        let url_delete = process.env.REACT_APP_SERVER_URL + "document/delete_list/" + deleteId;
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
        if (name && picurl && thumb && dt) {
            return true;
        }        
        if (!name) {
            warn.push(" Name required");
        }
        if (!picurl) {
            warn.push(" Picurl required");
        }
        if (!thumb) {
            warn.push(" Thumb required");
        }
        if (!dt) {
            warn.push(" Dt required");
        }
        let checkWarning = warn.toString();
        setMsg(checkWarning);
    }

    const bigHandler = async (id) => {
        let url_big = process.env.REACT_APP_SERVER_URL + "document/view/" + id;
        await axios.get(url_big)
            .then((response) => {
                setBigImage(response.data.picurl);
            })
            .catch((err) => {
                console.log(err);
            })
        setBigModal(true);
    }

    const moveHandler = async (id) => {
        let url_dropdown = process.env.REACT_APP_SERVER_URL + "document/dropdown";
        await axios.get(url_dropdown)
            .then((response) => {
                setDropdownArray(response.data);
                setDropdownValue(response.data[0]._id);
                setMoveId(id);
            })
            .catch((err) => {
                console.log(err);
            })
        setMoveModal(true);
    }

    const movedHandler = async () => {
        setMsg("");
        let url_moved = process.env.REACT_APP_SERVER_URL + "document/move_list/" + moveId;
        let obj = {
            doccategory: dropdownValue
        }

        await axios.post(url_moved, obj)
            .then((response) => {
                setMsg(response.data.msg);
            })
            .catch((err) => {
                console.log(err);
            })
        setMoveModal(true);
    }

    return (
        <div>
            <Header title={`${headerName}/${picLength}nos.`} />
            <Container fluid>
                <Row>
                    <Col>
                        <Button variant="primary me-1" onClick={addNewHandler}>Add New</Button>
                        <Link className="btn btn-danger" to="/document">Close</Link>
                        <p className="text-primary" style={{ margin: "0px", paddingTop: "10px" }}>{msg}</p>
                    </Col>
                </Row>

                <Row>
                    {
                        documentlists.length ? documentlists.map((documentlist) => {
                            let uri = "";
                            documentlist.thumb ? uri = documentlist.thumb : uri = documentlist.picurl
                            return (
                                <Col xs={12} sm={6} lg={4} key={documentlist._id}>
                                    <Card style={{ width: '100%', marginTop:"30px" }}>
                                        <Card.Img variant="top" src={uri} style={{width:"100%",height:"300px"}} />
                                        <Card.Body>
                                            <Card.Title>{documentlist.name}</Card.Title>
                                            <Card.Text>
                                                {documentlist.dt}
                                            </Card.Text>
                                            <Button variant="secondary me-1" size="sm" onClick={() => { editHandler(documentlist._id) }}> Edit</Button>
                                            <Button variant="danger me-1" size="sm" onClick={() => { deleteHandler(documentlist._id) }} disabled>Delete</Button>
                                            <Button variant="primary me-1" size="sm" onClick={() => { moveHandler(documentlist._id) }}>Move</Button>
                                            <Button variant="success" size="sm" onClick={() => { bigHandler(documentlist._id) }}>Big Size</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )
                        })
                            : null
                    }
                </Row>
            </Container>

            <Modal size="lg" show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalHeader}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row className="mb-3">
                            <Form.Group as={Col} lg="5">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" onChange={(e) => { setName(e.target.value) }} className="form-control" value={name} />
                            </Form.Group>
                            <Form.Group as={Col} lg="3">
                                <Form.Label>Date</Form.Label>
                                <Form.Control type="date" onChange={(e) => { setDt(e.target.value) }} className="form-control" value={dt} />
                            </Form.Group>
                            <Form.Group as={Col} lg="6">
                                <Form.Label>Picurl</Form.Label>
                                <Form.Control type="text" onChange={(e) => { setPicurl(e.target.value) }} className="form-control" value={picurl} />
                            </Form.Group>
                            <Form.Group as={Col} lg="6">
                                <Form.Label>Thumb</Form.Label>
                                <Form.Control type="text" onChange={(e) => { setThumb(e.target.value) }} className="form-control" value={thumb} />
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

            <Modal size="xl" show={bigModal} onHide={bigModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Big Size</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Image src={bigImage} alt="pic" thumbnail style={{ width: "100%" }} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={bigModalClose}>Close</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={moveModal} onHide={moveModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Move</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormGroup controlId="formControlsSelect">
                        <Form.Label>Select Option</Form.Label>
                        <Form.Select onChange={(e) => { setDropdownValue(e.target.value) }} value={dropdownValue} >
                            {
                                dropdownArray.length ? dropdownArray.map((d) => {
                                    return <option value={d._id} key={d._id}>{d.name}</option>
                                })
                                    : null
                            }
                        </Form.Select>
                    </FormGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={moveModalClose}>Close</Button>
                    <Button variant="primary" onClick={movedHandler}>Yes</Button>
                </Modal.Footer>
            </Modal>

            <Footer />
        </div >
    );

};
export default DocumentlistPage;
