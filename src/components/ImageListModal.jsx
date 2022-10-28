import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const imageList = ['example://1', 'example://2'];

const ImageListModal = ({ show, onHide, setSelectedImage, selectImage }) => {
    return (<Modal size="sm" show={show} onHide={onHide}>
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
            <Button onClick={onHide} variant="secondary">Cancel</Button>
            <Button onClick={selectImage} variant="primary">Done</Button>
        </Modal.Footer>
    </Modal>)
}

export default ImageListModal;
