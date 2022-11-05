import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Store, { updateStore } from '../utils/imageStore'

const ImageListModal = ({ show, onHide, setSelectedImage, selectImage, currentSlide }) => {
    const [imageMap, setImageMap] = useState({});

    const toBase64 = async (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    const handleDisplayFileDetails = async (e) => {
        const { files } = e.target;
        let map = {};
        for (let i = 0; i < files.length; i++) {
            // const path = `example://slide${currentSlide+1}-${files[i].name}`;
            const path = `slide${currentSlide+1}-${files[i].name}`
            console.log(path);
            map[path] = toBase64(files[i]);
        }
        const promises = Object.values(map);
        const paths = Object.keys(map);
        map = {};
        Promise.all(promises).then((res) => {
            paths.forEach((el, i) => {
                map[el] = res[i];
            });
        
        }).catch((err) => console.error(err));
        setImageMap(map);
    };

    return (<Modal size='sm' show={show} onHide={onHide}>
        <Modal.Header closeButton>
            <Modal.Title>Available Images</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Control
                    type='file'
                    name='images'
                    multiple={true}
                    onClick={() => console.log(" onClick")}
                    onChange={(e) => handleDisplayFileDetails(e)}

                />
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={onHide} variant='secondary'>Cancel</Button>
            <Button onClick={() => { selectImage(imageMap); onHide();}} variant='primary'>Done</Button>
        </Modal.Footer>
    </Modal>)
}

export default ImageListModal;
