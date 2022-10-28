
import React, { useState, useEffect } from 'react';
import * as cornerstone from 'cornerstone-core';
import { getExampleImage } from '../utils/imageGenerator';
import { IMG_LIMIT } from '../utils/constants';
import './style.css';

const ViewPort = ({ imageIds, currentSlide, getMeasurements, getDataURLs }) => {
    useEffect(() => {
        const box = document.getElementById('viewPort-wrapper');
        const domRect = box.getBoundingClientRect();
        const wrapperHeight = domRect.height;
        const height = imageIds[currentSlide].length ? wrapperHeight / imageIds[currentSlide].length : domRect.height;
        let measurements = localStorage.getItem('measurements');
        measurements = JSON.parse(measurements);
        let urls = localStorage.getItem('dataURLs');
        urls = JSON.parse(urls);
        const displayImages = async () => {
            for (let i = 0; i < imageIds[currentSlide].length; i++) {
                const element = document.getElementById(`dicomImage${currentSlide}${i}`);
                cornerstone.enable(element);
                const imageData = getExampleImage(imageIds[currentSlide][i]).promise;
                const image = await imageData;
                cornerstone.displayImage(element, image);
                element.style.height = height + 'px';
                cornerstone.resize(element);

                const measurement = element.getBoundingClientRect();
                measurements[currentSlide].push(measurement);

                const query = `#dicomImage${currentSlide}${i} canvas`;
                const canvas = document.querySelector(query);
                let data = canvas.toDataURL();
                urls[currentSlide].push(data);
            }
        }

        displayImages().then(() => {
            localStorage.setItem('measurements', JSON.stringify(measurements));
            localStorage.setItem('dataURLs', JSON.stringify(urls));
        }).catch((err) => console.error(err));
    }, [imageIds, currentSlide])


    const renderDivs = () => {
        const divs = [];
        for (let i = 0; i < imageIds.length; i++) {
            const display = currentSlide !== i ? {'display' : 'none'} : null;
            for (let k = 0; k < IMG_LIMIT; k++) {
                divs.push((<div key={`img${i}-${k}`} id={`dicomImage${i}${k}`} style={display}> </div>));
            }
        }
        return divs;
    }


    return (
        <div id="viewPort-wrapper">
            {
                renderDivs()
            }
        </div>
    );
};

export default ViewPort;