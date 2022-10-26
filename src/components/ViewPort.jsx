
import React, { useState, useEffect } from 'react';
import * as cornerstone from 'cornerstone-core'
import { getExampleImage } from '../utils/imageGenerator'

const ViewPort = ({ imageId, nodeId }) => {

    const uploadPicture = imageId => {
        const element = document.getElementById('dicomImage');
        cornerstone.enable(element);
        const imageData = getExampleImage(imageId).promise;
        imageData.then(function (image) {
            cornerstone.displayImage(element, image);
        });
    }
    useEffect(() => {
        // const element = document.getElementById('dicomImage1');
        // cornerstone.enable(element);
        // const imageData = getExampleImage('example://0').promise;
        // imageData.then(function (image) {
        //     cornerstone.displayImage(element, image);
        // });
    }, []);

    return (
        <div id="viewPort-wrapper">
            <div id="dicomImage1"> </div>
            <div id="dicomImage2"> </div>
        </div>
    );
};

export default ViewPort;