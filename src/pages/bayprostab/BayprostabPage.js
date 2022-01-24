import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import customLib from "../../lib/Lib";
import data from "./Data";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const BayprostabPage = () => {
    const [dt, setDt] = useState(customLib.dateFormat(new Date(), "-"));
    const [opt, setOpt] = useState("0");
    const [mnth, setMnth] = useState("2");
    const [yr, setYr] = useState("2021");
    const [msg, setMsg] = useState("Ready");
    const [lnk, setLnk] = useState("/");
    const [btn_show, setBtn_show] = useState(false);

    useEffect(() => {
        let dt = new Date();
        let fy = dt.getFullYear();
        let cm = dt.getMonth();
        setMnth(cm);
        setYr(fy);
    }, []);


    const styleBn = {
        fontFamily: "SutonnyMJ",
        fontSize: 15
    }

    const createHandler = () => {
        let x = data.bayprostab(opt, dt, mnth, yr);
        console.log(x);
        axios
            .post(x.server_url, x.obj)
            .then((response) => {
                console.log(response);
                setLnk(x.download_lnk);
                setBtn_show(true);
                setMsg("Ready to dowload")
            })
            .catch((err) => {
                console.log(err);
            })
    }


    return (
        <div>
            <Header title="Bayprostab" />
            <Container>
                <Row>
                    <Col>
                        <p className="text-primary">{msg}</p>
                        <Form.Control type="date" onChange={(e) => { setDt(e.target.value) }} className="form-control" value={dt} />
                        <Form.Select onChange={(e) => { setOpt(e.target.value); setBtn_show(false); }} className="form-control" style={styleBn} value={opt}>
                            <option value="0">রওশনা বেগম (বুয়া) এর মাসিক বেতন</option>
                            <option value="1">গাড়ি ভাড়া ও গ্যারেজ ভাড়া</option>
                        </Form.Select>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Select onChange={(e) => { setMnth(e.target.value); setBtn_show(false); }} className="form-control" style={styleBn} value={mnth}>
                            <option value="0"> জানুয়ারি</option>
                            <option value="1">ফেব্রুয়ারি</option>
                            <option value="2">মার্চ</option>
                            <option value="3">এপ্রিল</option>
                            <option value="4">মে</option>
                            <option value="5">জুন</option>
                            <option value="6">জুলাই</option>
                            <option value="7">আগস্ট</option>
                            <option value="8">সেপ্টেম্বর</option>
                            <option value="9">অক্টোবর</option>
                            <option value="10">নভেম্বর</option>
                            <option value="11">ডিসেম্বর</option>
                        </Form.Select>
                    </Col>
                    <Col>
                        <Form.Select onChange={(e) => { setYr(e.target.value); setBtn_show(false); }} className="form-control" style={styleBn} value={yr}>
                            <option value="2021">২০২১</option>
                            <option value="2022">২০২২</option>
                            <option value="2023">২০২৩</option>
                            <option value="2024">২০২৪</option>
                            <option value="2025">২০২৫</option>
                            <option value="2026">২০২৬</option>
                            <option value="2027">২০২৭</option>
                        </Form.Select>

                    </Col>
                </Row>
                <Row className="mt-2">
                    <Col>
                        <Button variant="primary me-1" onClick={createHandler}>Create</Button>
                        {
                            btn_show
                                ? <a className="btn btn-secondary" href={lnk} target="_blank" rel="noreferrer">Download</a>
                                : null
                        }
                    </Col>
                </Row>
            </Container>
            <Footer />
        </div>
    );

};
export default BayprostabPage;
