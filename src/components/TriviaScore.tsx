import { getResultMessage } from "../helpers/game.helper";
import Score from "./Score";

const TriviaScore = ({ score, totalQuestions }: { score: number, totalQuestions: number }) => {

    const { image, message } = getResultMessage(score, "trivia");

    const result = `Respondiste ${score} de ${totalQuestions} preguntas correctamente`; 


    return (       
        <Score result={result} message={message} image={image} game="trivia" /> 
    );
};

export default TriviaScore;