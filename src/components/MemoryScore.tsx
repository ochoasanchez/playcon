import { getResultMessage } from "../helpers/game.helper";
// import { ActionButton } from "./ActionButton";
import Score from "./Score";

const MemoryScore = ({ timeInMs }: { timeInMs: number }) => {
    const { image, message } = getResultMessage(timeInMs, "memory");

    const timeInSeconds = (timeInMs / 1000).toFixed(3);

    const result = `¡Demoraste ${timeInSeconds} segundos en completar el reto de memoria!`

    return (        
        <Score result={result} image={image} message={message} game="memory" />
        // <div className="h-lvh w-full flex flex-col items-center px-4 md:px-0 text-center">
        //     <img src={image} className="w-8/12 mt-6" alt="Result" />
        // <p className="text-4xl">¡Demoraste {timeInSeconds} segundos en completar el reto de memoria!</p>
        //     <div className="orange-circle flex pt-12">
        //         <div className="w-8/12">
        //             <p className="score-message font-splash text-9xl">{message}</p>
        //         </div>
        //         <div className="flex">
        //             <ActionButton url="/memory/scoreboard" text="Ver tabla" className="w-fit bg-white text-orange-500"/>
        //             <ActionButton url="/menu" text="Volver" className="w-fit bg-white text-orange-500 ml-4" />
        //         </div>
        //     </div>
        // </div>
    );
};

export default MemoryScore;
