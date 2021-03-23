import React, { useState } from 'react';
import { useSelector } from 'react-redux';


function Display(props) {
    const [play, setPlay] = useState(false);

    const state = useSelector((state) => state.ProcessReducer);

    return (
        <div className="main">
            <h4>
                Secret Key : 
            </h4>
            <div className="incoming">
                <h3>Incoming Data</h3>
                <p>{state.cypher}</p>
            </div>
            <div className="decrypt">
                <h3>Decrypted Data</h3>
                <p>{state.text}</p>
            </div>
        </div>
    );
}

export default Display;