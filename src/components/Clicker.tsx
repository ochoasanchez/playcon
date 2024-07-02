import { useState } from "react";
import icons from "../assets/images/icons.png";
// import icons from "../assets/images/icons-white.svg";
import { useNavigate } from "react-router-dom";


export default function Clicker() {
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

    return <img id="clicker" src={icons} onClick={handleClick} />;
}
