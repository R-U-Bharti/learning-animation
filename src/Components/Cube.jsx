import { useEffect, useRef, useState } from 'react';
import './Cube.css'

const Cube = () => {

    const faceStyle = "absolute size-[200px] flex items-center justify-center text-white"
    const [angle, setAngle] = useState(0);
    const cubeRef = useRef(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setAngle((prev) => (prev + 90) % 360);
        }, 2000); // Rotate every 2s

        return () => clearInterval(interval);
    }, []);

    return (
        <div className='h-screen w-screen flex justify-center items-center'>
            <div className="cube-container size-[200px]"
                ref={cubeRef}
                style={{ transform: `rotateY(${angle}deg)` }}
            >
                <div className={faceStyle + " front"}>Front</div>
                <div className={faceStyle + " back"}>Back</div>
                <div className={faceStyle + " right"}>Right</div>
                <div className={faceStyle + " left"}>Left</div>
                <div className={faceStyle + " top"}>Top</div>
                <div className={faceStyle + " bottom"}>Bottom</div>
            </div>
        </div>
    )
}

export default Cube