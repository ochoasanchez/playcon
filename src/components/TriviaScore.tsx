import { getResultMessage } from "../helpers/game.helper";
import { ActionButton } from "./ActionButton";

const TriviaScore = ({ score, totalQuestions }: { score: number, totalQuestions: number }) => {
    const { image, message } = getResultMessage(score, "trivia");

    return (        
        <div className="trivia-score h-lvh w-full flex flex-col items-center mt-4 px-4 md:px-0 text-center relative">
            <img src={image} className="w-96 mt-40" alt="Result" />
            <p className="text-2xl">Respondiste {score} de {totalQuestions} preguntas correctamente</p>
            <div className="orange-circle">
                <p className="score-message font-bold text-4xl">{message}</p>
                <ActionButton url="/scoreboard/trivia" text="Ver tabla de posiciones" className="bg-white text-orange-500" />
                <ActionButton url="/menu" text="Volver al menú" className="bg-white text-orange-500" />
            </div>
        </div>
    );
};

export default TriviaScore;
