// import { getResultMessage } from "../helpers/game.helper";
import { ActionButton } from "./ActionButton";
import { MainTitle } from "./MainTitle";
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
      className="trivia-score relative flex h-lvh w-full flex-col items-center px-4 text-center md:px-0 bg-zinc-50"
    >
      <div className="flex h-3/5 gap-y-6 flex-col items-center justify-center">
        <img src={image} className="w-6/12" alt="Result" />
        <p className="w-10/12 text-5xl sm:text-5xl text-emerald-700 font-semibold">{result}</p>
      </div>
      <div className="score-circle flex h-2/5 gap-y-8 bg-emerald-500 justify-between">
        <div className="w-8/12 pt-16">
          <MainTitle text={message} />
        </div>
        <div className="flex gap-x-4">
          <ActionButton
            url={`/${game}/scoreboard`}
            text="Tabla de posiciones"
            className="w-fit"
            variant="alternate"
          />
          <ActionButton
            url="/menu"
            text="Volver"
          />
        </div>
      </div>
    </div>
  );
};

export default Score;
