import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Button, Form, Table, Modal } from "react-bootstrap";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const PostPage = () => {
    const [posts, setPosts] = useState([]);
    const [name, setName] = useState("");
    const [shortname, setShortname] = useState("");
    const [msg, setMsg] = useState("Data ready");
    const [updateId, setUpdateId] = useState("");
    const [deleteId, setDeleteId] = useState("");

    const [mainModalTitle, setMainModalTitle] = useState("");
    const [mainModalShow, setMainModalShow] = useState(false);
    const [deleteModalShow, setDeleteModalShow] = useState(false);

    useEffect(() => {
        let url = process.env.REACT_APP_SERVER_URL + "post";
        axios.get(url)
            .then((response) => {
                setPosts(response.data);
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
        setShortname("");
        setMainModalShow(true);
        setUpdateId("0");
        setMainModalTitle("Add New Post");
    }

    const editHandler = (id) => {
        setName("");
        setShortname("");
        setMainModalShow(true);
        setMainModalTitle("Update Post");
        let url_edit = process.env.REACT_APP_SERVER_URL + "post/edit/" + id;
        axios.get(url_edit)
            .then((response) => {
                setName(response.data.name);
                setShortname(response.data.shortname);
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
            save_url = process.env.REACT_APP_SERVER_URL + "post/save";
        } else {
            save_url = process.env.REACT_APP_SERVER_URL + "post/update/" + updateId;
        }
        let obj = {
            name: name,
            shortname: shortname
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
        let url_delete = process.env.REACT_APP_SERVER_URL + "post/delete/" + deleteId;
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
        if (name && shortname) {
            return true;
        }
        if (!name) {
            warn.push(" Name required");
        }
        if (!shortname) {
            warn.push(" Shortname required");
        }
        let checkWarning = warn.toString();
        setMsg(checkWarning);
    }

    return (
        <div>
            <Header title="Post" />
            
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
                                    <th scope="col">Shortname</th>
                                    <th scope="col" className="text-center"> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    posts.length ? posts.map((post) => {
                                        return (
                                            <tr key={post._id}>
                                                <td>{post.name}</td>
                                                <td>{post.shortname}</td>
                                                <td style={{ width: "140px", textAlign: "right" }}>
                                                    <Button variant="secondary me-1" size="sm" onClick={() => { editHandler(post._id) }}> Edit</Button>
                                                    <Button variant="danger" size="sm" onClick={() => { deleteHandler(post._id) }} disabled>Delete</Button>
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
                                <Form.Label>Shortname</Form.Label>
                                <Form.Control type="text" onChange={(e) => { setShortname(e.target.value) }} className="form-control" value={shortname} />
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
export default PostPage;
