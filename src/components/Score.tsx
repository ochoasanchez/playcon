// import { getResultMessage } from "../helpers/game.helper";
import { ActionButton } from "./ActionButton";
// import $ from 'jquery';
// import '../utils/confetti.js';

const Score = ({
  result,
  message,
  image,
  game,
}: {
  result: string;
  message: string;
  image: string;
  game: "memory" | "trivia";
}) => {
  // const { image, message } = getResultMessage(score, "trivia");

  return (
    <div
      id="confetti"
      className="trivia-score relative flex h-lvh w-full flex-col items-center px-4 text-center md:px-0"
    >
      <div className="flex h-3/5 flex-col items-center justify-center">
        <img src={image} className="w-8/12" alt="Result" />
        <p className="w-10/12 text-5xl lg:text-7xl">{result}</p>
      </div>
      <div className="orange-circle flex h-2/5 gap-y-8">
        <div className="w-8/12 pt-16">
          <p className="score-message font-splash animate-bounce text-5xl lg:text-9xl">
            {message}
          </p>
        </div>
        <div className="flex">
          <ActionButton
            url={`/${game}/scoreboard`}
            text="Tabla de posiciones"
            className="w-fit bg-white text-orange-500"
          />
          <ActionButton
            url="/menu"
            text="Volver"
            className="ml-4 w-fit bg-white text-orange-500"
          />
        </div>
      </div>
    </div>
  );
};

export default Score;
