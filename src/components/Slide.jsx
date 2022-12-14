import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import { BsPlus } from 'react-icons/bs';
import Viewport from './NewViewport';
import ImageListModal from './ImageListModal';
// import ImageLimitModal from './ImageLimitModal';

import { IMG_LIMIT } from '../utils/constants';
import './style.css';

const Slide = ({ addSlide, getImageId, imageIds, currentSlide, getDownloadableIndeces, divs, downloadableIndeces }) => {
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
                <div style={{'width':'65%'}}> {`Slide ${currentSlide + 1}`}</div>
                    {imageIds[currentSlide].length === 0 && <OverlayTrigger
                        placement='left'
                        delay={{ showImgList: 250, hide: 400 }}
                        overlay={renderTooltip}
                    >
                        <Button 
                            id='add-img-btn' 
                            variant='secondary' 
                            onClick={openModal} 
                            // style={{'display': imageIds[currentSlide].length > 0 ? 'none' : 'block'}}
                        >
                            <BsPlus />
                        </Button>
                    </OverlayTrigger>}
                    {imageIds[currentSlide].length > 0 && <div id="downloadable">
                        <label style={{"fontSize":"0.9rem"}}>Add to presentation</label>
                        <input
                            type='checkbox'
                            label='Add to presentation'
                            checked={downloadableIndeces[currentSlide]}
                            // name='downloadable'
                            id='downloadable-check'
                            onChange={(e) => getDownloadableIndeces(e.target.checked)}
                        />
                    </div>}
                </div>
                <Viewport imageIds={imageIds} currentSlide={currentSlide} divs={divs} />
            </div>
            <ImageListModal 
                show={showImgList}
                onHide={() => setShowImgList(false)}
                setSelectedImage={(id) => setSelectedImage(id)}
                selectImage={selectImage}
            />
            {/* <ImageLimitModal 
                show={showLimitList}
                onHide={() => setShowLimitList(false)}
                showModal={() => setShowImgList(true)}
                addSlide={addSlide}
                setReplaceImg={setReplaceImg}
            /> */}
        </div>
    );
}

export default Slide;