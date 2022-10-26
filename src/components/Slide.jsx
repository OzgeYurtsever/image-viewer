import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { BsPlus } from "react-icons/bs";
import ViewPort from './ViewPort';
import './style.css';

const Slide = () => {

    return (
        <div id="slide-wrapper">
            <div id="slide">
                <div id="toolbar">
                    <Button id="add-img-btn" variant="secondary">
                        <BsPlus />
                    </Button>
                </div>
                <ViewPort />
            </div>
        </div>
    );
}

export default Slide;