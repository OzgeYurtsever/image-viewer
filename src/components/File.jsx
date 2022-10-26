import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BsDownload, BsFillFileEarmarkPlusFill, BsTrashFill } from "react-icons/bs";
import Navigation from './Navigation';


const File = () => {
    const [slides, setSlides] = useState([[], [], []]);

    return (
        <div>
            <Navbar bg="light">
                {/* <Container> */}
                {/* <Row> */}
                <Col sm={8}> </Col>
                <Col sm={4}>
                    <ButtonGroup className="me-4">
                        <Button variant="secondary">
                            <BsFillFileEarmarkPlusFill />
                        </Button>
                    </ButtonGroup>
                    <ButtonGroup className="me-4">
                        <Button variant="secondary">
                            <BsTrashFill />
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
                        <Col md={3} className="h-100">
                            <Navigation noOfSlides={slides.length}/>
                        </Col>
                        <Col md={9} className="h-100 align-items-center">
                            <div> col 2 </div>

                        </Col>
                    </Row>
                </Container>
            </header>
        </div>
    );
};

export default File;