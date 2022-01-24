import React, { useState } from "react";
import server from './ServerString';
import router from './RouteString';
import modelstr from "./ModelString";
import singlePage from "./singlePage";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const CodeIndex = () => {
  const [tbl, setTbl] = useState("item");
  const [fld, setFld] = useState("name, fname, mname, address, mobile");
  const [result, setResult] = useState("");
  const [fileName, setFileName] = useState("");


  const titleCase = (str) => {
    let st = "";
    if (tbl === "") {
      st = "/";
    } else {
      st = str;
    }
    return st
      .split(' ')
      .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }


  const ResultServerHandler = () => {
    setResult(server(tbl, fld));
    setFileName('index.js');
  };

  const ResultRouterHandler = () => {
    setResult(router(tbl, fld));
    setFileName(titleCase(tbl) + 'Route.js');
  };

  const ResultModelHandler = () => {
    setResult(modelstr(tbl, fld));
    setFileName(titleCase(tbl) + 'Model.js');
  }


  const ResultSingleHandler = () => {
    setResult(singlePage(tbl, fld));
    setFileName(titleCase(tbl) + 'Page.js');
  }


  return (
    <div>
      <Header title="Code" />
      <Container fluid>
        <Row>
          <Col xs={12} lg={5}>
            <Form className="mb-3">
              <Form.Group>
                <Form.Label>Table Name</Form.Label>
                <Form.Control type="text" onChange={(e) => { setTbl(e.target.value); }} value={tbl} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Fields</Form.Label>
                <Form.Control type="text" onChange={(e) => { setFld(e.target.value); }} value={fld} />
              </Form.Group>
            </Form>
            <Button variant="primary me-1" onClick={ResultSingleHandler}>Page</Button>
            <Button variant="secondary me-1" onClick={ResultServerHandler}>Server</Button>
            <Button variant="info me-1" onClick={ResultRouterHandler}>Router</Button>
            <Button variant="success me-2" onClick={ResultModelHandler}>Model</Button>
            <Button variant="secondary me-2" onClick={() => { setResult(Date.now()); setFileName('Unique Name'); }}>Unique Name</Button>
            <Button variant="danger" onClick={() => { setResult("0858301~0858500,0917101~0917200,0930701~0930800,0963401~0963500"); setFileName('Prizebond'); }}>Prizebond</Button>
            <br /><br />
            <p>app.use("/{tbl}", require("./src/router/{titleCase(tbl)}Route"));</p>
            <p>import {titleCase(tbl)}Page from "../pages/{tbl}/{titleCase(tbl)}Page";</p>
            <p>&lt;Route path="/{tbl}" element=&#123;&lt;{titleCase(tbl)}Page /&gt;&#125;&nbsp;/></p>
          </Col>


          <Col xs={12} lg={7}>
            <Form.Group>
              <Form.Label>{fileName}</Form.Label>
              <textarea onChange={(e) => { setResult(e.target.value); }} className="form-control" rows="20" value={result}></textarea>
            </Form.Group>
          </Col>
        </Row>
      </Container>

      <Footer />
    </div>
  )
}

export default CodeIndex
