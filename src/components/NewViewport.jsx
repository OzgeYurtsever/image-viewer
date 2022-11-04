import React, { useState } from 'react';
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
  console.log(" ----> here in new viewport <----");
  return (<CornerstoneViewport
    tools={toolsArr}
    // imageIds={imageIds}
    imageIds={imageIds[currentSlide]}
    style={{ minWidth: '100%', height: '512px', flex: '1' }}
  />)
};

export default NewViewport;

