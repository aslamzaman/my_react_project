import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Button, Form, Modal, Image, Card } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const HondapicPage = () => {
    const [hondapics, setHondapics] = useState([]);

    const [pic_url, setPic_url] = useState("");

    // view page
    const [pic_name, setPic_name] = useState("");
    const [pic_post, setPic_post] = useState("");

    const [msg, setMsg] = useState("Data ready");
    const [updateId, setUpdateId] = useState("");
    const [deleteId, setDeleteId] = useState("");

    const [mainModalTitle, setMainModalTitle] = useState("");

    const [mainModalShow, setMainModalShow] = useState(false);
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [viewModalShow, setViewModalShow] = useState(false);

    const { id2, id3 } = useParams();  // honda_detail_id, honda_id


    useEffect(() => {
        console.log(id3)
        let url = process.env.REACT_APP_SERVER_URL + "honda/honda_pic/" + id2 + "/" + id3;
        axios.get(url)
            .then((response) => {
                setHondapics(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [msg, id2, id3]);

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
        setPic_url("");
    }


    const addNewHandler = () => {
        clearFnc();
        setMainModalShow(true);
        setUpdateId("0");
        setMainModalTitle("Add New Hondapic");
    }

    const editHandler = (id) => {
        clearFnc();
        setMainModalShow(true);
        setMainModalTitle("Update Hondapic");
        let url_edit = process.env.REACT_APP_SERVER_URL + "honda/edit_pic/" + id;
        axios.get(url_edit)
            .then((response) => {
                setPic_url(response.data.pic_url);
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
            save_url = process.env.REACT_APP_SERVER_URL + "honda/save_pic";
        } else {
            save_url = process.env.REACT_APP_SERVER_URL + "honda/update_pic/" + updateId;
        }
        let obj = {
            honda_detail_id: id2,
            honda_id: id3,
            pic_url: pic_url
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
        let url_delete = process.env.REACT_APP_SERVER_URL + "honda/delete_pic/" + deleteId;
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
        let url_view = process.env.REACT_APP_SERVER_URL + "honda/view_pic/" + id;
        await axios.get(url_view)
            .then((response) => {
                setPic_url(response.data.pic_url);
                setPic_name(response.data.honda_detail_id.name);
                setPic_post(response.data.honda_detail_id.designation);
                
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const validationCheck = () => {
        let warn = [];
        if (pic_url) {
            return true;
        }

        if (!pic_url) {
            warn.push(" Pic_url required");
        }
        let checkWarning = warn.toString();
        setMsg(checkWarning);
    }

    return (
        <div>
            <Header title="Honda Docs" />

            <Container fluid>
                <Row>
                    <Col>
                        <Button variant="primary me-1" onClick={addNewHandler}>Add New</Button>
                        <Link className="btn btn-danger" to={`/honda/detail/${id3}`}>Close</Link>
                        <p className="text-primary" style={{ margin: "0px", paddingTop: "10px" }}>{msg}</p>
                    </Col>
                </Row>
                <Row>
                    {
                        hondapics.length ? hondapics.map((hondapic) => {
                            return (
                                <Col xs={12} sm={6} lg={4} key={hondapic._id}>
                                    <Card style={{ width: '100%' }}>
                                        <Card.Img variant="top" src={hondapic.pic_url} style={{ width: "100%", height: "300px" }} />
                                        <Card.Body>
                                            <Card.Text>{hondapic.name} ({hondapic.designation})</Card.Text>
                                            <Button variant="secondary me-1" size="sm" onClick={() => { editHandler(hondapic._id) }}> Edit</Button>
                                            <Button variant="danger me-1" size="sm" onClick={() => { deleteHandler(hondapic._id) }}>Delete</Button>
                                            <Button variant="success" size="sm" onClick={() => { viewHandler(hondapic._id) }}>View</Button>
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
                            <Form.Group as={Col} lg="12">
                                <Form.Label>Docs Url</Form.Label>
                                <Form.Control type="text" onChange={(e) => { setPic_url(e.target.value) }} className="form-control" value={pic_url} />
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
                    <Modal.Title>{pic_name} ({pic_post})</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Image src={pic_url} alt="Docs" style={{ width: "100%" }} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={viewModalCloseHandler}>Close</Button>
                </Modal.Footer>
            </Modal>

            <Footer />
        </div>
    );

};
export default HondapicPage;
