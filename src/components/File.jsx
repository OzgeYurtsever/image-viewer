import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import PptxGenJS from "pptxgenjs";
import Navbar from 'react-bootstrap/Navbar';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BsDownload, BsFileEarmarkPlus, BsTrash } from "react-icons/bs";
import Navigation from './Navigation';
import Slide from './Slide';

const File = () => {
    const [slides, setSlides] = useState([[]]);
    const [measurements, setMeasurements] = useState([[]]);
    const [dataURLs, setDataURLs] = useState([[]]);
    const [currentSlide, setCurrentSlide] = useState(0);


    useEffect(() => {
        localStorage.setItem('dataURLs', JSON.stringify([[]]));
        localStorage.setItem('measurements', JSON.stringify([[]]));

    });
    const getImageId = (ids) => {
        const clonedSlides = _.cloneDeep(slides);
        clonedSlides[currentSlide] = ids;
        setSlides(clonedSlides);
    }

    const getMeasurements = (data) => {
        const clonedMeasurements = _.cloneDeep(measurements);
        clonedMeasurements[currentSlide] = data;
        setMeasurements(clonedMeasurements);
    }

    const getDataURLs = (urls) => {
        console.log(" ---> urls", urls)
        let dataURLs = localStorage.getItem('dataURLs');
        dataURLs = JSON.parse(dataURLs);
        dataURLs[currentSlide] = urls;
        localStorage.setItem('dataURLs', JSON.stringify(dataURLs));
    }

    const addSlide = () => {
        const clonedSlides = _.cloneDeep(slides);
        if (slides.length - 1 === currentSlide) clonedSlides.push([]);
        else clonedSlides.splice(currentSlide + 1, 0, []);
        setSlides(clonedSlides);
        setCurrentSlide(currentSlide + 1);
    }

    const downloadSlides = () => {
        let pptx = new PptxGenJS();
        // iterate over the slides 
        slides.forEach((slide, index) => {
            const pptSlide = pptx.addNewSlide();
            pptSlide.background = { color: "de4509" };
            slide.forEach((image, i) => {
                pptSlide.addImage({ data: dataURLs[index][i] });
            });
        });
        pptx.writeFile({ fileName: 'Browser-PowerPoint-Demo.pptx' });
    }

    return (
        <div>
            {/* <Navbar style={{ background: '#E2E3E5' }}> */}
            <Navbar bg="dark" variant="dark">
                {/* <Container> */}
                {/* <Row> */}
                <Container>
                    <Navbar.Brand>Image Viewer</Navbar.Brand>
                </Container>
                <Col sm={6}> </Col>
                <Col sm={4}>
                    <ButtonGroup className="me-4">
                        <OverlayTrigger
                            placement={'bottom'}
                            overlay={
                                <Tooltip> Add slide </Tooltip>
                            }
                        >
                            <Button variant="secondary">
                                <BsFileEarmarkPlus onClick={addSlide} />
                            </Button>
                        </OverlayTrigger>
                    </ButtonGroup>
                    <ButtonGroup className="me-4">
                        <OverlayTrigger
                            placement={'bottom'}
                            overlay={
                                <Tooltip> Delete slide </Tooltip>
                            }
                        >
                            <Button variant="secondary">
                                <BsTrash />
                            </Button>
                        </OverlayTrigger>
                    </ButtonGroup>
                    <ButtonGroup className="me-4">
                        <OverlayTrigger
                            placement={'bottom'}
                            overlay={
                                <Tooltip> Download slides </Tooltip>
                            }
                        >
                            <Button variant="secondary">
                                <BsDownload onClick={downloadSlides} />
                            </Button>
                        </OverlayTrigger>
                    </ButtonGroup>
                </Col>
            </Navbar>
            <header className="App-header">
                <Container className="h-100">
                    <Row className="h-100 align-items-center">
                        <Col md={2} className="h-100">
                            <Row className="h-100">
                                <Navigation noOfSlides={slides.length} updateCurrent={(i) => setCurrentSlide(i)} />
                            </Row>
                        </Col>
                        <Col md={10} className="h-100 align-items-center">
                            <Slide getImageId={getImageId} imageIds={slides[currentSlide]} currentSlide={currentSlide} getMeasurements={getMeasurements} getDataURLs={getDataURLs} />
                        </Col>
                    </Row>
                </Container>
            </header>
        </div>
    );
};

export default File;