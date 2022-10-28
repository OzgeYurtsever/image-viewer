
import React, { useState, useEffect } from 'react';
import * as cornerstone from 'cornerstone-core';
import { getExampleImage } from '../utils/imageGenerator';
import './style.css';

const ViewPort = ({ imageIds, currentSlide, getMeasurements, getDataURLs }) => {
    useEffect(() => {
        const box = document.getElementById('viewPort-wrapper');
        const domRect = box.getBoundingClientRect();
        const wrapperHeight = domRect.height;
        const height = imageIds.length ? wrapperHeight / imageIds.length : domRect.height;
        const measurements = [];
        const urls = [];
        imageIds.forEach((id, i) => {
            const element = document.getElementById(`dicomImage${currentSlide}${i}`);
            cornerstone.enable(element);
            const imageData = getExampleImage(id).promise;
            imageData.then(function (image) {
                cornerstone.displayImage(element, image);
                element.style.height = height + 'px';
                cornerstone.resize(element);
                // get rect and send it back to file
                const measurement = element.getBoundingClientRect();
                measurements.push(measurement);

                const query = `#dicomImage${currentSlide}${i} canvas`;
                const canvas = document.querySelector(query);
                let data = canvas.toDataURL();
                console.log(' ---> data');
                console.log(data);
                urls.push(data);

            });
        });
        getMeasurements(measurements);
        
        getDataURLs(urls);
    }, [imageIds, currentSlide])



    return (
        <div id="viewPort-wrapper">
            {
                imageIds.length === 0 ? <div id={`dicomImage${currentSlide}0`}> </div> :
                imageIds.map((el, i) => (<div key={`img${currentSlide}-${i}`} id={`dicomImage${currentSlide}${i}`}> </div>))
            }
        </div>
    );
};

export default ViewPort;