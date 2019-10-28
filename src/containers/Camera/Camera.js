import React from 'react';
import Webcam from "react-webcam";
// import axios from "../../axios";

const videoConstraints = {
    width: 780,
    height: 600,
    facingMode: "user"
};

const camera = () => {
    const webcamRef = React.useRef(null);

    const capture = React.useCallback(
        () => {
            const imageSrc = webcamRef.current.getScreenshot();
            console.log(imageSrc);
        },
        [webcamRef]
    );

    return (
        <div>
            <Webcam
                audio={false}
                height={720}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={1280}
                videoConstraints={videoConstraints}
            />
            <button onClick={capture}>Capture photo</button>
        </div>
    );
};

export default camera;
