import { ActionButton } from "../components/ActionButton";
import Logo from "../components/Logo";
import { MainSubtitle } from "../components/MainSubitle";
import { MainTitle } from "../components/MainTitle";

export function Scoreboard({
  scoreboard,
  game,
}: {
  scoreboard: ScoreAttributes[];
  game: "memory" | "trivia";
}) {

  const sortedScores =
    game === "memory"
      ? scoreboard.sort(
          (a, b) => a.scoreValue - b.scoreValue,
        )
      : scoreboard.sort(
          (a, b) => b.scoreValue - a.scoreValue,
        );
  const scoreType = game === "memory" ? "Tiempo (s)" : "Puntos";

  const getRowClassName = (scoreValue: number) => {
    if (game === "memory") {
      const scoreValueInSeconds = scoreValue / 1000;
      if (scoreValueInSeconds <= 15) return "bg-teal-500";
      if (scoreValueInSeconds <= 25) return "bg-teal-600";
      if (scoreValueInSeconds < 50) return "bg-teal-700";
      return "bg-teal-900";
    }
  
    if (game === "trivia") {
      if (scoreValue === 0) return "bg-teal-800";
      if (scoreValue < 3) return "bg-teal-700";
      if (scoreValue < 5) return "bg-teal-600";
      if (scoreValue === 5) return "bg-teal-500";
      return "bg-teal-900"; 
    }
  
    return "bg-teal-900"; 
  };

  const getFullGameName = () => {
    if (game === "memory") return "Mikia Memory Challenge";
    if (game === "trivia") return "Desafío Mental";
    return "";
  };

  return (
    <main className="animate-slide-in-1 px-4 sm:px-6 gap-4">
      <Logo />
      <MainTitle text={getFullGameName()} />
      <MainSubtitle text="Tabla de posiciones" />
      <div className="mt-2 sm:mt-4 h-3/6 w-full overflow-y-auto">
        <table className="w-full">
          <thead className="table__head">
            <tr className="rounded-md bg-orange-500 text-2xl sm:text-3xl">
              <th className="p-2">#</th>
              <th className="py-2">Nombre</th>
              <th className="py-2">Compañía</th>
              <th className="py-2">{scoreType}</th>
            </tr>
          </thead>
          <tbody className="text-center text-2xl sm:text-3xl">
            {sortedScores.map((score, index) => (
              <tr
                key={`key-${index + 1}`}
                className={`${getRowClassName(score.scoreValue)} border-b-2 border-white last:border-none`}
              >
                <td className="py-4">{index + 1}</td>
                <td className="py-4">{score.playerName}</td>
                <td className="py-4">{score.playerCompany}</td>
                <td className="py-4">
                  {game === "memory"
                    ? (score.scoreValue / 1000).toFixed(0)
                    : score.scoreValue}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ActionButton url="/menu" text="Volver" />
    </main>
  );
}
