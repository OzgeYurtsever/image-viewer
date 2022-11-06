import React, { useState } from 'react';
import CornerstoneViewport from "react-cornerstone-viewport";;

// const ids = [
//   'dicomweb://s3.amazonaws.com/lury/PTCTStudy/1.3.6.1.4.1.25403.52237031786.3872.20100510032220.11.dcm',
//   'dicomweb://s3.amazonaws.com/lury/PTCTStudy/1.3.6.1.4.1.25403.52237031786.3872.20100510032220.12.dcm',
// ];

const ids = ['dicomweb://dicom-store.s3.us-east-2.amazonaws.com/dicoms/image-00004.dcm'];
// 'dicomweb://dicom-store.s3.us-east-2.amazonaws.com/dicoms/image-00004.dcm'
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
  const [tools, setTools] = useState(
    [
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
      { name: 'PanMultiTouch', mode: 'active'},
      { name: 'ZoomTouchPinch', mode: 'active'},
      { name: 'StackScrollMultiTouch', mode: 'active'}
    ]
  );
  return (
    imageIds[currentSlide].length > 0 && 
      <CornerstoneViewport
        tools={tools}
        imageIds={imageIds[currentSlide]}
        isStackPrefetchEnabled={true}
        style={{ minWidth: '100%', height: '512px', flex: '1' }}
    />
  )
};

export default NewViewport;

