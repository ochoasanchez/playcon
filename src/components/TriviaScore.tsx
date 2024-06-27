import { getResultMessage } from "../helpers/game.helper";
import { ActionButton } from "./ActionButton";

const TriviaScore = ({ score, totalQuestions }: { score: number, totalQuestions: number }) => {
    const { image, message } = getResultMessage(score, "trivia");

    return (        
        <div className="trivia-score h-lvh w-full flex flex-col items-center mt-4 px-4 md:px-0 text-center relative">
            <img src={image} className="w-8/12 mt-12" alt="Result" />
            <p className="text-3xl">Respondiste {score} de {totalQuestions} preguntas correctamente</p>
            <div className="orange-circle">
                <p className="score-message font-splash text-4xl">{message}</p>
                <div className="flex">
                    <ActionButton url="/trivia/scoreboard" text="Ver tabla" className="w-fit"/>
                    <ActionButton url="/menu" text="Volver" className="w-fit" />
                </div>
            </div>
        </div>
    );
};

export default TriviaScore;
