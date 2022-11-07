import React, { useState, useEffect } from 'react';
import * as cornerstone from 'cornerstone-core';
import _ from 'lodash';
import PptxGenJS from 'pptxgenjs';
import Navbar from 'react-bootstrap/Navbar';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import { BsDownload, BsFileEarmarkPlus, BsTrash } from 'react-icons/bs';
import Navigation from './Navigation';
import Slide from './Slide';
import { IMG_LIMIT } from '../utils/constants';

const File = () => {
    const [slides, setSlides] = useState([[]]);
    const [downloadableIndeces, setDownloadableIndeces] = useState({});
    const [currentSlide, setCurrentSlide] = useState(0);
    const [divs, setDivs] = useState({});
    const [showAlert, setShowAlert] = useState(false)

    const getImageId = (ids) => {
        const clonedSlides = _.cloneDeep(slides);
        clonedSlides[currentSlide] = ids;
        setSlides(clonedSlides);
    }

    const createDivs = () => {
        const newDivs = {};
        for (let i = 0; i < slides[currentSlide].length; i++) {
            const imageId = slides[currentSlide][i];
            const id = slides[currentSlide][i].split('/').pop();
            if (!divs[imageId]) newDivs[imageId] = (<div key={id} id={id} className="inner"> </div>);
        }
        setDivs({...divs, ...newDivs});
    }

    const deleteDivs = () => {
        const newDivs = { ...divs }; 
        for (let i = 0; i < slides[currentSlide].length; i++) {
            const imageId = slides[currentSlide][i];
            const id = imageId.split('/').pop();
            if (newDivs[imageId]) delete newDivs[imageId];
        }
        setDivs(newDivs);
    }

    const getDownloadableIndeces = checked => {
        const newIndeces = {...downloadableIndeces};
        if (!checked && newIndeces[currentSlide]) {
            delete newIndeces[currentSlide];
            deleteDivs();
        } else {
            newIndeces[currentSlide]= checked;
            createDivs();
        }
        setDownloadableIndeces(newIndeces);
    }

    const addSlide = () => {
        shiftDownloadableOnInsert();
        const clonedSlides = _.cloneDeep(slides);
        if (slides.length - 1 === currentSlide) clonedSlides.push([]);
        else clonedSlides.splice(currentSlide + 1, 0, []);
        setSlides(clonedSlides);
        setCurrentSlide(currentSlide + 1);
    }

    const shiftDownloadableOnDelete = () => {
        const newIndeces = {};
        const keys = Object.keys(downloadableIndeces);
        keys.forEach((index) => {
            if (index < currentSlide) newIndeces[index] = true;
            else if (index > currentSlide) newIndeces[index - 1] = true;         
        setDownloadableIndeces(newIndeces);
        });
    }

    const shiftDownloadableOnInsert = () => {
        const newIndeces = {};
        const keys = Object.keys(downloadableIndeces);
        keys.forEach((index) => {
            const intIndex= parseInt(index);
            if (intIndex <= currentSlide) newIndeces[intIndex] = true;
            else if (intIndex > currentSlide) newIndeces[intIndex + 1] = true;         
        });
        setDownloadableIndeces(newIndeces);
    }

    const deleteSlide = () => {
        shiftDownloadableOnDelete();
        if (slides.length > 1) {
            const clonedSlides = _.cloneDeep(slides);
            if (slides.length - 1 === currentSlide) clonedSlides.pop();
            else clonedSlides.splice(currentSlide, 1);
            setSlides(clonedSlides);
            if (currentSlide > 0) setCurrentSlide(currentSlide - 1);
        }
    }

    const downloadSlides = () => {
        const downloadables = Object.keys(downloadableIndeces);
        if (downloadables.length === 0) {
            setShowAlert(true);
        } else {        
            let pptx = new PptxGenJS();
            const maxY = 404;
            const maxX = 720;
            const margin = 2;
            const singleImage = { x: 0, y: 0, w: '90%', h: '90%' };
            downloadables.forEach((index, k) => {
                slides[index].forEach((imageId, i) => {
                    const pptSlide = pptx.addNewSlide();
                    pptSlide.background = { color: 'e2e3e' };
                    const id = imageId.split('/').pop();
                    const div = document.getElementById(id);
                    const canvas = div.children[0];        
                    let data = canvas.toDataURL();
                    let coordinates = singleImage;
                    pptSlide.addImage({ data, ...coordinates });
                });
            });
            pptx.writeFile({ fileName: 'Image-viewer-slides.pptx' });
        }
    }


    return (
        <div>
            <Navbar bg='dark' variant='dark'>
                <Container>
                    <Navbar.Brand>Image Viewer</Navbar.Brand>
                </Container>
                <Col sm={6}> </Col>
                <Col sm={4}>
                    <ButtonGroup className='me-4'>
                        <OverlayTrigger
                            placement={'bottom'}
                            overlay={
                                <Tooltip> Add slide </Tooltip>
                            }
                        >
                            <Button variant='secondary'>
                                <BsFileEarmarkPlus onClick={addSlide} />
                            </Button>
                        </OverlayTrigger>
                    </ButtonGroup>
                    <ButtonGroup className='me-4'>
                        <OverlayTrigger
                            placement={'bottom'}
                            overlay={
                                <Tooltip> Delete slide </Tooltip>
                            }
                        >
                            <Button variant='secondary'>
                                <BsTrash onClick={deleteSlide} />
                            </Button>
                        </OverlayTrigger>
                    </ButtonGroup>
                    <ButtonGroup className='me-4'>
                        <OverlayTrigger
                            placement={'bottom'}
                            overlay={
                                <Tooltip> Download slides </Tooltip>
                            }
                        >
                            <Button variant='secondary'>
                                <BsDownload onClick={downloadSlides} />
                            </Button>
                        </OverlayTrigger>
                    </ButtonGroup>
                </Col>
            </Navbar>
            <div id="downloadable-imgs" className="outer">{Object.values(divs)}</div>
            <header className='App-header'>
                <Container className='h-100'>
                    <Row className='h-100 align-items-center'>
                        <Alert show={showAlert} variant="danger" onClose={() => setShowAlert(false)} dismissible>
                            Please upload images to slides and select the slides you want to download
                         </Alert>
                        <Col md={2} className='h-100'>
                            <Row className='h-100'>
                                <Navigation 
                                    currentSlide={currentSlide} 
                                    noOfSlides={slides.length} 
                                    updateCurrent={(i) => setCurrentSlide(i)} />
                            </Row>
                        </Col>
                        <Col md={10} className='h-100 align-items-center'>
                            <Slide
                                addSlide={addSlide}
                                getImageId={getImageId}
                                imageIds={slides}
                                currentSlide={currentSlide}
                                getDownloadableIndeces={getDownloadableIndeces}
                                divs={divs}
                                downloadableIndeces={downloadableIndeces}
                            />
                            
                        </Col>
                    </Row>
                </Container>
            </header>
        </div>
    );
};

export default File;