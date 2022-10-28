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
    const [currentSlide, setCurrentSlide] = useState(0);

    const getImageId = (ids) => {
        const clonedSlides = _.cloneDeep(slides);
        clonedSlides[currentSlide] = ids;
        setSlides(clonedSlides);
    }

    const addSlide = () => {
        const clonedSlides = _.cloneDeep(slides);
        if (slides.length - 1 === currentSlide) clonedSlides.push([]);
        else clonedSlides.splice(currentSlide + 1, 0, []);
        setSlides(clonedSlides);
        setCurrentSlide(currentSlide + 1);
    }

    const deleteSlide = () => {
        if (slides.length > 1) {
            const clonedSlides = _.cloneDeep(slides);
            if (slides.length - 1 === currentSlide) clonedSlides.pop();
            else clonedSlides.splice(currentSlide, 1);
            setSlides(clonedSlides);
            if (currentSlide > 0 )setCurrentSlide(currentSlide - 1); 
        }
    }

    const downloadSlides = () => {
        let pptx = new PptxGenJS();
        const maxY = 404;
        const maxX = 720;
        const margin = 2;
        const singleImage = { x: 0, y: 0, w: '100%', h: '100%' };
        const doubleImage1 = { x: 0, y: 0, w: '50%', h: '100%' };
        const doubleImage2 = { x: '51%', y: 0, w: '49%', h: '100%' };

        slides.forEach((slide, index) => {
            const pptSlide = pptx.addNewSlide();
            pptSlide.background = { color: "e2e3e5" };
            const size = slide.length;
            slide.forEach((image, i) => {
                const query = `#dicomImage${index}${i} canvas`;
                const canvas = document.querySelector(query);
                let data = canvas.toDataURL();
                let coordinates = {};
                if (size === 1) coordinates = singleImage;
                else {
                    coordinates = (i === 0) ? doubleImage1 : doubleImage2;
                }
                
                pptSlide.addImage({ data, ...coordinates });
            });
        });
        pptx.writeFile({ fileName: 'Image-viewer-slides.pptx' });
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
                                <BsTrash onClick={deleteSlide} />
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
                            <Slide 
                                addSlide={addSlide} 
                                getImageId={getImageId} 
                                imageIds={slides} 
                                currentSlide={currentSlide} 
                            />
                        </Col>
                    </Row>
                </Container>
            </header>
        </div>
    );
};

export default File;