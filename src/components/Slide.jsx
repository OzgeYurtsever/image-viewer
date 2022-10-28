import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import { BsPlus } from "react-icons/bs";
import ViewPort from './ViewPort';
import ImageListModal from './ImageListModal';
import ImageLimitModal from './ImageLimitModal';

import { IMG_LIMIT } from '../utils/constants';
import './style.css';

const Slide = ({ addSlide, getImageId, imageIds, currentSlide, getMeasurements, getDataURLs }) => {
    const [showImgList, setShowImgList] = useState(false);
    const [showLimitList, setShowLimitList] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            {`Add image`}
        </Tooltip>
    );


    const openModal = () => {
        if (imageIds[currentSlide].length < IMG_LIMIT) setShowImgList(true)
        else setShowLimitList(true);
    }

    const selectImage = (i) => {
        if (selectedImage) {
            const imgIds = [...imageIds[currentSlide]];
            if (typeof i === 'number') {
                console.log("should be here, ", i);
                imgIds[i] = selectedImage; 
            }
            else if (imgIds.length < IMG_LIMIT) {
                imgIds.push(selectedImage)
            };
            console.log(imgIds);
            getImageId(imgIds);
            setSelectedImage('');
            setShowImgList(false);
        }
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
                        <Button id="add-img-btn" variant="secondary" onClick={openModal}>
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
            <ImageLimitModal 
                show={showLimitList}
                onHide={() => setShowLimitList(false)}
                showModal={() => setShowImgList(true)}
                // setSelectedImage={(id) => setSelectedImage(id)}
                selectImage={selectImage}
                addSlide={addSlide}
            />
        </div>
    );
}

export default Slide;