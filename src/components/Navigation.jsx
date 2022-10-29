import React, { useState, useEffect } from 'react';
// import ListGroup from 'react-bootstrap/ListGroup';


const Navigation = ({ currentSlide, noOfSlides, updateCurrent }) => {
    const [navList, setNavList] = useState([]);

    useEffect(() => {
        const list = [];
        for (let i = 0; i < noOfSlides; i++)
            list.push(<div action className={i === currentSlide? "slide-nav selected" : "slide-nav"} onClick={() => updateCurrent(i)} key={`Slide-${i + 1}`}> {`Slide ${i + 1}`} </div>)
        setNavList(list);
    }, [noOfSlides, currentSlide]);
    return (
        <div className="wrapper">
            {navList}
        </div>
    );

}

export default Navigation;
