import pollo from "../assets/images/icono-pollo.svg";
import cerdo from "../assets/images/icono-cerdo.svg";
import fabrica from "../assets/images/icono-fabrica.svg";
import { useNavigate } from "react-router-dom";


export default function FooterIcons({clickable = false} : {clickable?: boolean}) {
    const navigate = useNavigate();

    const handleClickTrivia = () => {
        navigate("/trivia/scoreboard");
    };

    const handleClickMemory = () => {
        navigate("/memory/scoreboard");
    };

    const handleClickRaffle = () => {
        navigate("/sorteo");
    };

    if (clickable) {
        return (
            <div className="flex gap-x-12">
                {/* <img className="opacity-30 w-36" src={pollo} onClick={handleClickTrivia}/>
                <img className="opacity-30 w-36" src={cerdo} onClick={handleClickMemory}/> */}
                <img className="opacity-30 w-36" src={pollo} onClick={handleClickRaffle}/>
                <img className="opacity-30 w-36" src={cerdo} onClick={handleClickRaffle}/>
                <img className="opacity-30 w-36" src={fabrica} onClick={handleClickRaffle}/>
            </div>
        )
    }

    return (
        <div className="flex gap-x-12">
            <img className="opacity-30 w-36" src={pollo} />
            <img className="opacity-30 w-36" src={cerdo} />
            <img className="opacity-30 w-36" src={fabrica} />
        </div>
    )
}
