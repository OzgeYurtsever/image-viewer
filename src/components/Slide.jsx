import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import { BsPlus } from 'react-icons/bs';
import Viewport from './NewViewport';
import ImageListModal from './ImageListModal';
import ImageLimitModal from './ImageLimitModal';

import { IMG_LIMIT } from '../utils/constants';
import './style.css';

const Slide = ({ addSlide, getImageId, imageIds, currentSlide }) => {
    const [showImgList, setShowImgList] = useState(false);
    const [showLimitList, setShowLimitList] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [replaceImg, setReplaceImg] = useState(null);

    const renderTooltip = (props) => (
        <Tooltip id='button-tooltip' {...props}>
            {`Add image`}
        </Tooltip>
    );

    const openModal = () => {
        if (imageIds[currentSlide].length < IMG_LIMIT) setShowImgList(true)
        else setShowLimitList(true);
    }

    const selectImage = (imgs) => {
        getImageId(imgs);
    }

    return (
        <div className='wrapper'>
            <div id='slide'>
                <div id='toolbar'>
                <div style={{'width':'90%'}}> {`Slide ${currentSlide + 1}`}</div>
                    <OverlayTrigger
                        placement='left'
                        delay={{ showImgList: 250, hide: 400 }}
                        overlay={renderTooltip}
                    >
                        <Button id='add-img-btn' variant='secondary' onClick={openModal}>
                            <BsPlus />
                        </Button>
                    </OverlayTrigger>
                </div>
                <Viewport imageIds={imageIds} currentSlide={currentSlide} />
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
                addSlide={addSlide}
                setReplaceImg={setReplaceImg}
            />
        </div>
    );
}

export default Slide;