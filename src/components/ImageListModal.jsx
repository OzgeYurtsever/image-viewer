import React, {useState, useRef} from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CornerstoneViewport from "react-cornerstone-viewport";
import { uploadFile } from 'react-s3';
import { Buffer } from "buffer";
import { v4 as uuidv4 } from 'uuid';
Buffer.from("anything", "base64");
window.Buffer = window.Buffer || require("buffer").Buffer;
 
const ImageListModal = ({ show, onHide, selectImage, currentSlide }) => {
    const [imageIds, setImageIds] = useState([]);
    const elementRef = useRef();

    const toBase64 = async (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    const handleDisplayFileDetails = async (e) => {
        const { REACT_APP_ID, REACT_APP_KEY } = process.env;

        const config = {
            bucketName: 'dicom-store',
            dirName:'dicoms',
            region: 'us-east-2',
            accessKeyId: REACT_APP_ID,
            secretAccessKey: REACT_APP_KEY,
        }

        // handle multiple upload

        
        try {
            const uid = uuidv4(); 
            const { name } = e.target.files[0];
            Object.defineProperty(e.target.files[0], 'name', {
                writable: true,
                value: `${uid}-${name}`
            });
            const data = await uploadFile(e.target.files[0], config);
            const imgId = data.location.replace('https://', 'dicomweb://');
            setImageIds([imgId]);
        } catch (err) {
            console.error(err)
        }

    };

    return (<Modal size='lg' show={show} onHide={onHide}>
        <Modal.Header closeButton>
            <Modal.Title>Available Images</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form ref={elementRef} id="upload-imgs" encType="multipart/form-data">
                <input
                    type='file'
                    name='myFile'
                    multiple={true}
                    onClick={() => console.log(" onClick")}
                    onChange={(e) => handleDisplayFileDetails(e)}

                />
            </form>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={onHide} variant='secondary'>Cancel</Button>
            <Button onClick={() => { selectImage(imageIds); onHide();}} variant='primary'>Done</Button>
        </Modal.Footer>
    </Modal>)
}

export default ImageListModal;
