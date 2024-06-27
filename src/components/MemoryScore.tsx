import { getResultMessage } from "../helpers/game.helper";
import { ActionButton } from "./ActionButton";

const MemoryScore = ({ timeInMs }: { timeInMs: number }) => {
    const { image, message } = getResultMessage(timeInMs, "memory");

    const timeInSeconds = (timeInMs / 1000).toFixed(3);

    return (        
        <div className="memory-score h-lvh w-full flex flex-col items-center mt-16 px-4 md:px-0 text-center">
            <img src={image} className="w-8/12" alt="Result" />
        <p className="text-3xl">¡Demoraste {timeInSeconds} segundos en completar el reto de memoria!</p>
            <div className="orange-circle mt-12">
                <p className="font-splash text-4xl">{message}</p>
                <div className="flex">
                    <ActionButton url="/memory/scoreboard" text="Ver tabla" className="w-fit"/>
                    <ActionButton url="/menu" text="Volver" className="w-fit" />
                </div>
            </div>
        </div>
    );
};

export default MemoryScore;
