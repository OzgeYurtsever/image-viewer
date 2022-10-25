
import React, { useState, useEffect } from 'react';
import * as cornerstone from 'cornerstone-core'
import { getExampleImage } from '../utils/imageGenerator'

const ViewPort = ({ imageId, nodeId }) => {
    useEffect(() => {
        const imageId = 'example://0';
        const element = document.getElementById('dicomImage');
        cornerstone.enable(element);
        const imageData = getExampleImage(imageId).promise;
        imageData.then(function (image) {
            cornerstone.displayImage(element, image);
        });

    }, []);



    return (
        <div>
        </div>
    );
};

export default ViewPort;