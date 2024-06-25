import { getResultMessage } from "../helpers/game.helper";
import { ActionButton } from "./ActionButton";

const MemoryScore = ({ timeInMs }: { timeInMs: number }) => {
    const { image, message } = getResultMessage(timeInMs, "memory");

    const timeInSeconds = (timeInMs / 1000).toFixed(3);

    return (        
        <div className="memory-score h-lvh w-full flex flex-col items-center justify-center mt-4 px-4 md:px-0 text-center">
            <img src={image} className="w-96" alt="Result" />
            <p className="text-2xl">¡Demoraste {timeInSeconds} segundos en completar el reto de memoria!</p>
            <div className="orange-circle mt-12">
                <p className="font-bold text-4xl">{message}</p>
                <ActionButton url="/menu" text="Volver" />
            </div>
        </div>
    );
};

export default MemoryScore;
