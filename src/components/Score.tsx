// import { getResultMessage } from "../helpers/game.helper";
import { ActionButton } from "./ActionButton";
// import $ from 'jquery';
// import '../utils/confetti.js';

const Score = ({ result, message, image, game }: { result: string, message: string, image: string, game: 'memory' | 'trivia' }) => {

    // const { image, message } = getResultMessage(score, "trivia");

    return (        
        <div id="confetti" className="trivia-score h-lvh w-full flex flex-col items-center px-4 md:px-0 text-center relative">
            <div className="flex flex-col items-center justify-center h-3/6">
                <img src={image} className="w-7/12" alt="Result" />
                <p className="text-6xl w-10/12">{result}</p>
            </div>
            <div className="orange-circle flex">
                <div className="w-8/12 pt-8">
                {/* interlineado menor*/}
                    <p className="score-message font-splash text-9xl animate-bounce">{message}</p>
                </div>
                <div className="flex mt-4">
                    <ActionButton url={`/${game}/scoreboard`} text="Tabla de posiciones" className="w-fit bg-white text-orange-500"/>
                    <ActionButton url="/menu" text="Volver" className="w-fit bg-white text-orange-500 ml-4" />
                </div>
            </div>
        </div>
    );
};

export default Score;