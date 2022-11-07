import React, {useState, useRef} from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CornerstoneViewport from "react-cornerstone-viewport";
import { uploadFile } from 'react-s3';
import { Buffer } from "buffer";
import { v4 as uuidv4 } from 'uuid';
import { keys } from '../utils/keys';

Buffer.from("anything", "base64");
window.Buffer = window.Buffer || require("buffer").Buffer;


const ImageListModal = ({ show, onHide, selectImage, currentSlide }) => {
    const [imageIds, setImageIds] = useState([]);
    const elementRef = useRef();


    const renameFile = (file, uid) => {
        const { name } = file;
        Object.defineProperty(file, 'name', {
            writable: true,
            value: `${uid}-${name}`
        });
    }

    const generateConfig = (dirName) => {
        const { REACT_APP_ACCESS_ID, REACT_APP_ACCESS_KEY } = process.env;
        const { AWS_ACCESS_ID, AWS_ACCESS_KEY } = keys;
        const config = {
            bucketName: 'dicom-store',
            // dirName:'dicoms',
            region: 'us-east-2',
            accessKeyId: REACT_APP_ACCESS_ID || AWS_ACCESS_ID,
            secretAccessKey: REACT_APP_ACCESS_KEY || AWS_ACCESS_KEY,
        }
        return { ...config, dirName };
    }

    const handleDisplayFileDetails = async (e) => {
        
        try {
            const files = Object.values(e.target.files);
            const uploadPromises = [];
            // const base64Promises = [];
            const configDicom = generateConfig('dicoms');
            // const configPNG = generateConfig('img');

            files.forEach((file, index) => {
                const uid = uuidv4(); 
                renameFile(file, uid);
                uploadPromises.push(uploadFile(file, configDicom));
                // base64Promises.push(toBase64(file));
            });
            const data = await Promise.all(uploadPromises);
            const imgIds = data.map((el) => el.location.replace('https://', 'dicomweb://'));
            // const base64Arr = await Promise.all(base64Promises);
            // base64ToPNG(base64Arr[0]);
            setImageIds(imgIds);
        } catch (err) {
            console.error(err)
        }

    };

    return (<Modal size='sm' show={show} onHide={onHide}>
        <Modal.Header closeButton>
            <Modal.Title>Available Images</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form ref={elementRef} id="upload-imgs" encType="multipart/form-data">
                <input
                    type='file'
                    name='myFile'
                    multiple={true}
                    onChange={(e) => handleDisplayFileDetails(e)}

                />
            </form>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={onHide} letiant='secondary'>Cancel</Button>
            <Button onClick={() => { selectImage(imageIds); onHide();}} letiant='primary'>Done</Button>
        </Modal.Footer>
    </Modal>)
}

export default ImageListModal;
