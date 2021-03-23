import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './styles/display.scss';
import Lottie from 'react-lottie';
import animationData from "../loading.json";


function Display(props) {
    const [play, setPlay] = useState(false);
    const state = useSelector((state) => state.ProcessReducer);

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    return (
        <div className="main">
            <h4>
                Secret Key : <span>jodfwlkdnw24nklds08jdsfwjo02lksnfl815w</span>
            </h4>
            <div className="incoming">
                <h3>Incoming Data</h3>
                <p>{state.cypher}</p>
            </div>
            <Lottie
                options={defaultOptions}
                height={150}
                width={150}
                isStopped={play}
            />
            <div className="decrypt">
                <h3>Decrypted Data</h3>
                <p>{state.message}</p>
            </div>
        </div>
    );
}

export default Display;