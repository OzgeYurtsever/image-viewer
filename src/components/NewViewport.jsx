import React, { useState, useEffect } from 'react';
import * as cornerstone from 'cornerstone-core';
import CornerstoneViewport from "react-cornerstone-viewport";;

const toolsArr = [
  // Mouse
  {
    name: 'Wwwc',
    mode: 'active',
    modeOptions: { mouseButtonMask: 1 },
  },
  {
    name: 'Zoom',
    mode: 'active',
    modeOptions: { mouseButtonMask: 2 },
  },
  {
    name: 'Pan',
    mode: 'active',
    modeOptions: { mouseButtonMask: 4 },
  },
  // Scroll
  { name: 'StackScrollMouseWheel', mode: 'active' },
  // Touch
  { name: 'PanMultiTouch', mode: 'active' },
  { name: 'ZoomTouchPinch', mode: 'active' },
  { name: 'StackScrollMultiTouch', mode: 'active' },
];

const NewViewport = ({ imageIds, currentSlide }) => {
  useEffect(() => {
    // const box = document.getElementById('viewPort-wrapper');
    // const domRect = box.getBoundingClientRect();
    // // const wrapperHeight = domRect.height;
    // const wrapperWidth = domRect.width;
    // // const height = imageIds[currentSlide].length ? wrapperHeight / imageIds[currentSlide].length : domRect.height;
    // const width = imageIds[currentSlide].length ? wrapperWidth / imageIds[currentSlide].length : domRect.width;

    // const displayImages = async () => {
        // for (let i = 0; i < imageIds[currentSlide].length; i++) {
        //     const element = document.getElementById(`dicomImage${currentSlide}${i}`);
        //     cornerstone.enable(element);
            // const imageData = getExampleImage(imageIds[currentSlide][i]).promise;
            // const image = await imageData;
            // cornerstone.displayImage(element, image);
            // element.style.width = width + 'px';
            // cornerstone.resize(element);
            
    //     }
    // }
    
    // displayImages().then(() => {
    // }).catch((err) => console.error(err));
}, [imageIds])

  return (
    imageIds[currentSlide].length > 0 && 
      <CornerstoneViewport
        tools={toolsArr}
        imageIds={imageIds[currentSlide]}
        isStackPrefetchEnabled={true}
        style={{ minWidth: '100%', height: '512px', flex: '1' }}
    />
  )
};

export default NewViewport;

