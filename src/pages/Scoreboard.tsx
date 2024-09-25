import { ActionButton } from "../components/ActionButton";

export function Scoreboard({
  scoreboard,
  game,
}: {
  scoreboard: ScoreEntry[];
  game: "memory" | "trivia";
}) {
  const sortedScores =
    game === "memory"
      ? scoreboard.sort(
          (a, b) => a.attributes.scoreValue - b.attributes.scoreValue,
        )
      : scoreboard.sort(
          (a, b) => b.attributes.scoreValue - a.attributes.scoreValue,
        );
  const scoreType = game === "memory" ? "Tiempo (s)" : "Puntos";

  const getRowClassName = (scoreValue: number) => {
    if (game === "memory" && scoreValue / 1000 <= 15) return "bg-teal-500";
    if (game === "memory" && scoreValue / 1000 <= 25) return "bg-teal-600";
    if (game === "memory" && scoreValue / 1000 < 50) return "bg-teal-700";
    if (game === "trivia" && scoreValue === 0) return "bg-teal-800";
    if (game === "trivia" && scoreValue < 3) return "bg-teal-700";
    if (game === "trivia" && scoreValue < 5) return "bg-teal-600";
    if (game === "trivia" && scoreValue === 5) return "bg-teal-500";
    return "bg-teal-900";
  };

  const getFullGameName = () => {
    if (game === "memory") return "Mikia Memory Challenge";
    if (game === "trivia") return "Desafío Mental";
    return "";
  };

  return (
    <main className="animate-slide-in-1 px-12">
      <h1 className="main__title font-bold uppercase">Tabla de Posiciones</h1>
      <p className="main__subtitle">{getFullGameName()}</p>
      <div className="mt-12 h-4/6 w-full overflow-y-auto">
        <table className="w-full">
          <thead className="table__head">
            <tr className="rounded-md bg-orange-500 text-5xl">
              <th className="py-2">Lugar</th>
              <th className="py-2">Nombre</th>
              <th className="py-2">Compañía</th>
              <th className="py-2">{scoreType}</th>
            </tr>
          </thead>
          <tbody className="text-center text-5xl">
            {sortedScores.map((score, index) => (
              <tr
                key={score.id}
                className={`${getRowClassName(score.attributes.scoreValue)} border-b-2 border-white last:border-none`}
              >
                <td className="py-4">{index + 1}</td>
                <td className="py-4">{score.attributes.playerName}</td>
                <td className="py-4">{score.attributes.playerCompany}</td>
                <td className="py-4">
                  {game === "memory"
                    ? (score.attributes.scoreValue / 1000).toFixed(0)
                    : score.attributes.scoreValue}
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
