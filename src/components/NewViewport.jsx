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

const NewViewport = ({ imageIds, currentSlide, divs }) => {
  const insertImages = (csDivs) => {
    const imageIds = Object.keys(csDivs);
    const elements = [];
    const promises = [];
    const width = '468px';
    const height= '512px';
    for (let i = 0; i < imageIds.length; i++) {
        const id = imageIds[i].split('/').pop();
        const element = document.getElementById(id);
        elements.push(element);
        cornerstone.enable(element);
        promises.push(cornerstone.loadImage(imageIds[i]));
    }
    Promise.all(promises).then((images) => { 
        images.forEach((image, i) => {
            cornerstone.displayImage(elements[i], image);
            elements[i].style.width = width;
            elements[i].style.height = height;
            cornerstone.resize(elements[i]);
        });
    }).catch(err => {
        console.error(err);
    });
  }

  useEffect(() => {
    if (Object.entries(divs).length > 0) insertImages(divs);
  }, [divs]);

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

