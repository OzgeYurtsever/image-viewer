import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import { BsPlus } from "react-icons/bs";
import ViewPort from './ViewPort';
import ImageListModal from './ImageListModal';
import { IMG_LIMIT } from '../utils/constants';
import './style.css';

const Slide = ({ getImageId, imageIds, currentSlide, getMeasurements, getDataURLs }) => {
    const [showImgList, setShowImgList] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            {`Add image`}
        </Tooltip>
    );

    const selectImage = () => {
        const imgIds = [...imageIds];
        imgIds.push(selectedImage);
        getImageId(imgIds);
        setSelectedImage('');
        setShowImgList(false);
    }

    return (
        <div id="slide-wrapper">
            <div id="slide">
                <div id="toolbar">
                    <OverlayTrigger
                        placement="right"
                        delay={{ showImgList: 250, hide: 400 }}
                        overlay={renderTooltip}
                    >
                        <Button id="add-img-btn" variant="secondary" onClick={() => setShowImgList(true)}>
                            <BsPlus />
                        </Button>
                    </OverlayTrigger>
                </div>
                <ViewPort imageIds={imageIds} currentSlide={currentSlide} getMeasurements={getMeasurements} getDataURLs={getDataURLs} />
            </div>
            <ImageListModal 
                show={showImgList}
                onHide={() => setShowImgList(false)}
                setSelectedImage={(id) => setSelectedImage(id)}
                selectImage={selectImage}
            />
        </div>
    );
}

export default Slide;