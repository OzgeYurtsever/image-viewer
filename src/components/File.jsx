import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BsDownload, BsFileEarmarkPlus, BsTrash } from "react-icons/bs";
import Navigation from './Navigation';
import Slide from './Slide';


const File = () => {
    const [slides, setSlides] = useState([[]]);

    return (
        <div>
            {/* <Navbar style={{ background: '#E2E3E5' }}> */}
            <Navbar bg="dark" variant="dark">
                {/* <Container> */}
                {/* <Row> */}
                <Container>
                    <Navbar.Brand>Image Viewer</Navbar.Brand>
                </Container>
                <Col sm={8}> </Col>
                <Col sm={4}>
                    <ButtonGroup className="me-4">
                        <Button variant="secondary">
                            <BsFileEarmarkPlus />
                        </Button>
                    </ButtonGroup>
                    <ButtonGroup className="me-4">
                        <Button variant="secondary">
                            <BsTrash />
                        </Button>
                    </ButtonGroup>
                    <ButtonGroup className="me-4">
                        <Button variant="secondary">
                            <BsDownload />
                        </Button>
                    </ButtonGroup>
                </Col>
            </Navbar>
            <header className="App-header">
                <Container className="h-100">
                    <Row className="h-100 align-items-center">
                        <Col md={2} className="h-100">
                            <Row className="h-100">
                                <Navigation noOfSlides={slides.length} />
                            </Row>
                        </Col>
                        <Col md={10} className="h-100 align-items-center">
                            <Slide />

                        </Col>
                    </Row>
                </Container>
            </header>
        </div>
    );
};

export default File;