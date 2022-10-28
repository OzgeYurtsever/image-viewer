import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { IMG_LIMIT, LIMIT_MAP } from '../utils/constants';

const imageList = ['example://1', 'example://2'];

const ImageListModal = ({ addSlide, show, onHide, showModal, setSelectedImage, selectImage }) => {
    const [slideIndex, setSlideIndex] = useState(null);

    const replaceSelected = (i) => {
        setSlideIndex(i);
        showModal();
    }

    const formOptions = () => {
        const nodes = [];
        for (let i = 0; i < IMG_LIMIT; i++) {
            nodes.push(
                <Form.Check
                        key={`checkimgId-${i + 1}`}
                        type="radio"
                        label={`Replace image ${i + 1}`}
                        name="images"
                        onClick={showModal}
                    />
            )
        }
        nodes.push(
            <Form.Check
            type="radio"
            label='Create a new slide'
            name="images"
            onClick={() => {
                addSlide();
                onHide();
            }}
        />
        )
        return nodes;
    }

    return (<Modal size="sm" show={show} onHide={onHide}>
        <Modal.Header closeButton>
            <Modal.Title>{`${LIMIT_MAP[IMG_LIMIT]} images per slide`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
               {formOptions()}
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={onHide} variant="secondary">Cancel</Button>
            <Button onClick={() => {selectImage(slideIndex); onHide()}} variant="primary">Done</Button>
        </Modal.Footer>
    </Modal>)
}

export default ImageListModal;
