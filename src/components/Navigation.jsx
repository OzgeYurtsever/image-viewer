import React, { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';


const Navigation = ({ noOfSlides, updateCurrent }) => {
    const [navList, setNavList] = useState([]);

    useEffect(() => {
        const list = [];
        for (let i = 0; i < noOfSlides; i++)
            list.push(<ListGroup.Item action onClick={() => updateCurrent(i)} variant="secondary" key={`Slide-${i + 1}`}> {`Slide ${i + 1}`} </ListGroup.Item>)
        setNavList(list);
    }, [noOfSlides]);
    return (

        <ListGroup>
            {navList}
        </ListGroup>



    );

}

export default Navigation;
