import { getResultMessage } from "../helpers/game.helper";
import Score from "./Score";

const MemoryScore = ({ timeInMs }: { timeInMs: number }) => {
    const { image, message } = getResultMessage(timeInMs, "memory");

    const timeInSeconds = Math.floor(timeInMs/1000);

    const result = timeInSeconds < 50 ? `¡Demoraste ${timeInSeconds} segundos en completar el reto de memoria!` : '¡Se te agotó el tiempo!';

    return (        
        <Score result={result} image={image} message={message} game="memory" />
    );
};

export default MemoryScore;
