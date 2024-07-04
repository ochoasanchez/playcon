import { useState } from "react";
import icons from "../assets/images/icons-white.svg";
import { useNavigate } from "react-router-dom";


export default function FooterIcons({clickable = false} : {clickable?: boolean}) {
    const [clickCount, setClickCount] = useState(0);
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

    const navigate = useNavigate();

    const handleClick = () => {
        if (clickCount + 1 === 3) {
            navigate("/sorteo");
        }

        setClickCount((prevCount) => prevCount + 1);

        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        const newTimeoutId = setTimeout(() => {
            setClickCount(0);
        }, 5000) as NodeJS.Timeout;

        setTimeoutId(newTimeoutId);
    };

    if (clickable) {
        return <img id="clicker" className="opacity-30" src={icons} onClick={handleClick} />;
    }

    // if (clickable) {
    //     return (
    //         <>
    //         <img id="clicker" className="opacity-50" src={icons} onClick={handleClick} />;
    //         <img id="clicker"  src={icons2} onClick={handleClick} />;
    //         </>
    //     );
    // }


    return <img className="opacity-30" src={icons} />;
}
