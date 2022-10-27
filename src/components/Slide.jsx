import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Tooltip from 'react-bootstrap/Tooltip'
import { BsPlus } from "react-icons/bs";
import ViewPort from './ViewPort';
import { IMG_LIMIT } from '../utils/constants'
import './style.css';

const imageList = ['example://1', 'example://2'];

const Slide = ({ getImageId, imageIds, currentSlide }) => {
    const [show, setShow] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            {`Add image ${imageIds.length + 1}/${IMG_LIMIT}`}
        </Tooltip>
    );

    const selectImage = () => {
        const imgIds = [...imageIds];
        imgIds.push(selectedImage);
        getImageId(imgIds);
        setSelectedImage('');
        setShow(false);
    }

    return (
        <div id="slide-wrapper">
            <div id="slide">
                <div id="toolbar">
                    <OverlayTrigger
                        placement="right"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderTooltip}
                    >
                        <Button id="add-img-btn" variant="secondary" onClick={() => setShow(true)}>
                            <BsPlus />
                        </Button>
                    </OverlayTrigger>
                </div>
                <ViewPort imageIds={imageIds} currentSlide={currentSlide}/>
            </div>
            <Modal size="sm" show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Available Images</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {imageList.map((imgId, i) => (
                            <Form.Check
                                key={`checkimgId-${i + 1}`}
                                type="radio"
                                label={imgId}
                                name="images"
                                onClick={() => setSelectedImage(imgId)}
                            />
                        ))}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setShow(false)} variant="secondary">Cancel</Button>
                    <Button onClick={() => selectImage()} variant="primary">Done</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Slide;