
import React, { useState, useEffect } from 'react';
import * as cornerstone from 'cornerstone-core'
import { getExampleImage } from '../utils/imageGenerator'

const ViewPort = ({ imageIds }) => {

    useEffect(() => {
        imageIds.forEach((id, i) => {
            const element = document.getElementById(`dicomImage${i+1}`);
            cornerstone.enable(element);
            const imageData = getExampleImage(id).promise;
            imageData.then(function (image) {
                cornerstone.displayImage(element, image);
            });
        });
    }, [imageIds])

    return (
        <div id="viewPort-wrapper">
            <div id="dicomImage1"> </div>
            <div id="dicomImage2"> </div>
        </div>
    );
};

export default ViewPort;