import React from "react";
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';

const NavbarComponent = () => {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" >
            <Container fluid>
                <Navbar.Brand href="/">Aslam</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">                        
                        <Nav.Link href="/code">Code</Nav.Link>
                        <Nav.Link href="/converter">Converter</Nav.Link>
                        <NavDropdown title="CMES" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="/bayprostab">Bayprostab</NavDropdown.Item>
                            <NavDropdown.Item href="/document">Document</NavDropdown.Item>
                            <NavDropdown.Item href="/octen">Octen</NavDropdown.Item>
                            <NavDropdown.Item href="/post">Post</NavDropdown.Item>
                            <NavDropdown.Item href="/project">Project</NavDropdown.Item>
                            <NavDropdown.Item href="/staff">Staff</NavDropdown.Item>
                            <NavDropdown.Item href="/honda">Honda</NavDropdown.Item>
                           
                            <NavDropdown.Item href="/unit">Unit</NavDropdown.Item>
                            <NavDropdown.Item href="/land">Land</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Construction" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="/bfs">Brick Flat Solling</NavDropdown.Item>
                            <NavDropdown.Item href="/bw">Brick Works</NavDropdown.Item>
                            <NavDropdown.Item href="/ccw">CC Works</NavDropdown.Item>
                            <NavDropdown.Item href="/rccw">RCC Works</NavDropdown.Item>
                            <NavDropdown.Item href="/pw">Plaster Works</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>     
                    </Nav>
                    <Nav>
                        <Nav.Link href="#deets">More deets</Nav.Link>
                        <Nav.Link eventKey={2} href="#memes">
                            Dank memes
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    )
}

export default NavbarComponent;