import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './styles/display.css';


function Display(props) {
    const [play, setPlay] = useState(false);

    const state = useSelector((state) => state.ProcessReducer);

    return (
        <div className="main">
            <h4>
                Secret Key : <span>jodfwlkdnw24nklds08jdsfwjo02lksnfl815w</span>
            </h4>
            <div className="incoming">
                <h3>Incoming Data</h3>
                <p>{state.cypher}</p>
            </div>
            <div className="decrypt">
                <h3>Decrypted Data</h3>
                <p>{state.message}</p>
            </div>
        </div>
    );
}

export default Display;