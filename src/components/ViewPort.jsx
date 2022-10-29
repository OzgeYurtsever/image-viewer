
import React, { useState, useEffect } from 'react';
import * as cornerstone from 'cornerstone-core';
import { getExampleImage } from '../utils/imageGenerator';
import { IMG_LIMIT } from '../utils/constants';
import './style.css';

const ViewPort = ({ imageIds, currentSlide}) => {

    useEffect(() => {
        const box = document.getElementById('viewPort-wrapper');
        const domRect = box.getBoundingClientRect();
        // const wrapperHeight = domRect.height;
        const wrapperWidth = domRect.width;
        // const height = imageIds[currentSlide].length ? wrapperHeight / imageIds[currentSlide].length : domRect.height;
        const width = imageIds[currentSlide].length ? wrapperWidth / imageIds[currentSlide].length : domRect.width;

        const displayImages = async () => {
            for (let i = 0; i < imageIds[currentSlide].length; i++) {
                const element = document.getElementById(`dicomImage${currentSlide}${i}`);
                cornerstone.enable(element);
                const imageData = getExampleImage(imageIds[currentSlide][i]).promise;
                const image = await imageData;
                cornerstone.displayImage(element, image);
                element.style.width = width + 'px';
                cornerstone.resize(element);
                
            }
        }
        
        displayImages().then(() => {
        }).catch((err) => console.error(err));
    }, [imageIds.length, imageIds, currentSlide])


    const renderDivs = () => {
        const divs = [];
        for (let i = 0; i < imageIds.length; i++) {
            const display = currentSlide !== i ? {'display' : 'none'} : {};
            for (let k = 0; k < IMG_LIMIT; k++) {
                divs.push((<div key={`img${i}-${k}`} id={`dicomImage${i}${k}`} style={{...display, 'margin': '2px'}}> </div>));
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