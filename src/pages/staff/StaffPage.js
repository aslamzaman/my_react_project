import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Button, Form, Table, Modal, Image, ButtonGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import customLib from "../../lib/Lib";


const StaffPage = () => {
    const [staffs, setStaffs] = useState([]);
    const [name, setName] = useState("");
    const [fname, setFname] = useState("");
    const [mname, setMname] = useState("");
    const [gender, setGender] = useState("m");
    const [mobile, setMobile] = useState("");
    const [picurl, setPicurl] = useState("");
    const [db, setDb] = useState("");
    const [joindt, setJoindt] = useState("");
    const [joinpost, setJoinpost] = useState("");
    const [joinsalary, setJoinsalary] = useState("");
    const [joinlocation, setJoinlocation] = useState("");
    const [nid, setNid] = useState("");
    const [address, setAddress] = useState("");
    const [district, setDistrict] = useState("");

    const [msg, setMsg] = useState("Data ready");
    const [updateId, setUpdateId] = useState("");
    const [deleteId, setDeleteId] = useState("");

    const [mainModalTitle, setMainModalTitle] = useState("");

    const [mainModalShow, setMainModalShow] = useState(false);
    const [deleteModalShow, setDeleteModalShow] = useState(false);

    const [districtDropDown, setDistrictDropDown] = useState([]);
    const [postDropDown, setPostDropDown] = useState([]);
    const [unitDropDown, setUnitDropDown] = useState([]);

    useEffect(() => {
        let url = process.env.REACT_APP_SERVER_URL + "staff";
        axios.get(url)
            .then((response) => {
                console.log(response.data);
                setStaffs(response.data);
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

    const dropDownFnc = () => {
        let url_dropdown_dist = process.env.REACT_APP_SERVER_URL + "district/dropdown";
        axios(url_dropdown_dist)
            .then((response) => {
                setDistrictDropDown(response.data);
                setDistrict(response.data[0]._id);
            })
            .catch((err) => {
                console.log(err);
            })

        let url_dropdown_post = process.env.REACT_APP_SERVER_URL + "post/dropdown";
        axios(url_dropdown_post)
            .then((response) => {
                setPostDropDown(response.data);
                setJoinpost(response.data[0]._id);
            })
            .catch((err) => {
                console.log(err);
            })

        let url_dropdown_unit = process.env.REACT_APP_SERVER_URL + "unit/dropdown";
        axios(url_dropdown_unit)
            .then((response) => {
                setUnitDropDown(response.data);
                setJoinlocation(response.data[0]._id);
            })
            .catch((err) => {
                console.log(err);
            })

    }

    const clearFnc = () => {
        setName("");
        setFname("");
        setMname("");
        setMobile("");
        setPicurl("");
        setDb("");
        setJoindt("");
        setJoinpost("");
        setJoinsalary("");
        setJoinlocation("");
        setNid("");
        setAddress("");
        setDistrict("");
    }

    const addNewHandler = () => {
        clearFnc();
        setMainModalShow(true);
        setUpdateId("0");
        setMainModalTitle("Add New Staff");
        dropDownFnc();
    }

    const editHandler = (id) => {
        clearFnc();

        setMainModalShow(true);
        setMainModalTitle("Update Staff");
        dropDownFnc();

        let url_edit = process.env.REACT_APP_SERVER_URL + "staff/edit/" + id;
        axios.get(url_edit)
            .then((response) => {
                setName(response.data.name);
                setFname(response.data.fname);
                setMname(response.data.mname);
                setMobile(response.data.mobile);
                setPicurl(response.data.picurl);
                setDb(response.data.db);
                setJoindt(response.data.joindt);
                setJoinpost(response.data.joinpost);
                setJoinsalary(response.data.joinsalary);
                setJoinlocation(response.data.joinlocation);
                setNid(response.data.nid);
                setAddress(response.data.address);
                setDistrict(response.data.district);

                setMsg("Ready to edit");
                setUpdateId(id);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const saveHandler = async () => {
        if (!validationCheck() === true) { return false; };
        let obj = {};
        let save_url = "";
        if (updateId === "0") {
            save_url = process.env.REACT_APP_SERVER_URL + "staff/save";
        } else {
            save_url = process.env.REACT_APP_SERVER_URL + "staff/update/" + updateId;
        }
        obj = {
            name: name,
            fname: fname,
            mname: mname,
            gender: gender,
            mobile: mobile,
            picurl: picurl,
            db: db,
            joindt: joindt,
            joinpost: joinpost,
            joinsalary: joinsalary,
            joinlocation: joinlocation,
            nid: nid,
            address: address,
            district: district,
            status: 1,
            entrydt: Date.now()
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
        let url_delete = process.env.REACT_APP_SERVER_URL + "staff/delete/" + deleteId;
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
        if (name && fname && mname && mobile && picurl && db && joindt && joinsalary && nid && address) {
            return true;
        }
        if (!name) {
            warn.push(" Name required");
        }
        if (!fname) {
            warn.push(" Fname required");
        }
        if (!mname) {
            warn.push(" Mname required");
        }
        if (!mobile) {
            warn.push(" Mobile required");
        }
        if (!picurl) {
            warn.push(" Picurl required");
        }
        if (!db) {
            warn.push(" Db required");
        }
        if (!joindt) {
            warn.push(" Joindt required");
        }
        if (!joinsalary) {
            warn.push(" Joinsalary required");
        }
        if (!nid) {
            warn.push(" Nid required");
        }
        if (!address) {
            warn.push(" Address required");
        }

        let checkWarning = warn.toString();
        setMsg(checkWarning);
    }

    return (
        <div>
            <Header title="Staff" />
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
                                    <th scope="col"></th>
                                    <th scope="col">Description</th>
                                    <th scope="col" className="text-center"> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    staffs.length ? staffs.map((staff) => {

                                        if (staff.status === 1) {
                                            return (
                                                <tr key={staff._id}>
                                                    <td style={{ width: "120px" }}>
                                                        <Image rounded src={staff.picurl} alt="staff pic" style={{ width: "130px" }} />
                                                    </td>
                                                    <td>
                                                        Name: <strong>{staff.name} ({staff.joinpost})</strong><br />
                                                        Father's Name: {staff.fname},
                                                        Mother's Name: {staff.mname}<br />
                                                        Gender: {staff.gender === 'm' ? 'Male' : 'Female'}<br />
                                                        Date Of Birth: {staff.db}<br />
                                                        Joining Date: {staff.joindt},
                                                        Salary: {staff.joinsalary},
                                                        Location: {staff.joinlocation}<br />
                                                        Address: {staff.address}, {staff.district}<br />
                                                        Mobile: {staff.mobile}, NID Number: {staff.nid} <br />
                                                        <strong>Service Age: {customLib.date_diff(staff.joindt, new Date(), 1)}yrs.</strong>
                                                    </td>
                                                    <td style={{textAlign: "right" }}>
                                                        <ButtonGroup className="me-1">
                                                             <Link className="btn btn-primary btn-sm me-1" to={`/staff/detail/${staff._id}`}>Detail</Link>
                                                             <Link className="btn btn-success btn-sm me-1" to={`/staff/doc/${staff._id}`}>Docs</Link>
                                                            <Button variant="secondary me-1" size="sm" onClick={() => { editHandler(staff._id) }}>Edit</Button>
                                                       </ButtonGroup>
                                                        <ButtonGroup>
                                                            <Button variant="danger me-1" size="sm" onClick={() => { deleteHandler(staff._id) }}>Delete</Button>
                                                            <Button variant="info me-1" size="sm">Terminate</Button>
                                                        </ButtonGroup>
                                                    </td>
                                                </tr>
                                            )
                                        }else{
                                            return null;
                                        }

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
                                <Form.Label>Father's Name</Form.Label>
                                <Form.Control type="text" onChange={(e) => { setFname(e.target.value) }} className="form-control" value={fname} />
                            </Form.Group>
                            <Form.Group as={Col} lg="6">
                                <Form.Label>Mother's Name</Form.Label>
                                <Form.Control type="text" onChange={(e) => { setMname(e.target.value) }} className="form-control" value={mname} />
                            </Form.Group>
                            <Form.Group as={Col} lg="6">
                                <Form.Label>Gender</Form.Label>
                                <Form.Select onChange={(e) => { setGender(e.target.value) }} className="form-control" value={gender}>
                                    <option value="m">Male</option>
                                    <option value="f">Female</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group as={Col} lg="6">
                                <Form.Label>Mobile</Form.Label>
                                <Form.Control type="text" onChange={(e) => { setMobile(e.target.value) }} className="form-control" value={mobile} />
                            </Form.Group>
                            <Form.Group as={Col} lg="6">
                                <Form.Label>Picture Url</Form.Label>
                                <Form.Control type="text" onChange={(e) => { setPicurl(e.target.value) }} className="form-control" value={picurl} />
                            </Form.Group>
                            <Form.Group as={Col} lg="6">
                                <Form.Label>Date Of Birth</Form.Label>
                                <Form.Control type="date" onChange={(e) => { setDb(e.target.value) }} className="form-control" value={db} />
                            </Form.Group>
                            <Form.Group as={Col} lg="6">
                                <Form.Label>Joining Date</Form.Label>
                                <Form.Control type="date" onChange={(e) => { setJoindt(e.target.value) }} className="form-control" value={joindt} />
                            </Form.Group>
                            <Form.Group as={Col} lg="6">
                                <Form.Label>Post</Form.Label>
                                <Form.Select onChange={(e) => { setJoinpost(e.target.value) }} className="form-control" value={joinpost}>
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
                                <Form.Control type="text" onChange={(e) => { setJoinsalary(e.target.value) }} className="form-control" value={joinsalary} />
                            </Form.Group>
                            <Form.Group as={Col} lg="6">
                                <Form.Label>Location</Form.Label>
                                <Form.Select onChange={(e) => { setJoinlocation(e.target.value) }} className="form-control" value={joinlocation}>
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
                                <Form.Label>NID</Form.Label>
                                <Form.Control type="text" onChange={(e) => { setNid(e.target.value) }} className="form-control" value={nid} />
                            </Form.Group>
                            <Form.Group as={Col} lg="6">
                                <Form.Label>Address</Form.Label>
                                <Form.Control type="text" onChange={(e) => { setAddress(e.target.value) }} className="form-control" value={address} />
                            </Form.Group>
                            <Form.Group as={Col} lg="6">
                                <Form.Label>District</Form.Label>
                                <Form.Select onChange={(e) => { setDistrict(e.target.value) }} className="form-control" value={district}>
                                    {
                                        districtDropDown.length ? districtDropDown.map((dist) => {
                                            return (
                                                <option value={dist._id} key={dist._id}>{dist.name}</option>
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

            <Footer />
        </div>
    );

};
export default StaffPage;
