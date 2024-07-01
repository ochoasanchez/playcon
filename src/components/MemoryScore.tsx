import { getResultMessage } from "../helpers/game.helper";
import Score from "./Score";

const MemoryScore = ({ timeInMs }: { timeInMs: number }) => {
    const { image, message } = getResultMessage(timeInMs, "memory");

    const timeInSeconds = Math.floor(timeInMs/1000);

    const result = `¡Demoraste ${timeInSeconds} segundos en completar el reto de memoria!`

    return (        
        <Score result={result} image={image} message={message} game="memory" />
    );
};

export default MemoryScore;
