// import Nav from "../components/Nav";
import { useEffect, useState } from "react";
import { getTriviaScoreboard } from "../helpers/trivia.helper";
// import { ActionButton } from "../components/ActionButton";
import Loader from "../components/Loader";
import { Scoreboard } from "./Scoreboard";

export function TriviaScoreboard() {
    const [isLoading, setIsloading] = useState(true);
    const [scoreboard, setScoreboard] = useState<ScoreEntry[] | null>(null);

    const getScoreboard = async () => {
        try {
            const scoreboardData = await getTriviaScoreboard();
            setScoreboard(scoreboardData.data);
            setIsloading(false);
        } catch (error) {
            console.error('Error fetching scoreboard:', error);
        }
    }

    useEffect(() => { getScoreboard() }, []);

    if (isLoading) return <Loader />;

    // Sort the scores by scoreValue in ascending order
    // const sortedScores = scoreboard ? scoreboard.sort((a, b) => b.attributes.scoreValue - a.attributes.scoreValue) : [];

    return (
        // <main className="animate-slide-in-1 px-6">
        //     {/* <div className="flex flex-col w-full text-center py-6"> */}
        //         <h1 className="main__title font-bold uppercase">Tabla de Posiciones</h1>
        //         <p className="main__subtitle">Desafío Mental</p>
        //         <div className="mt-12 h-4/6 overflow-y-auto w-full">
        //             <table className="w-full">
        //                 <thead>
        //                     <tr className="bg-orange-500 rounded-md text-5xl">
        //                         <th className="py-2">Lugar</th>
        //                         <th className="py-2">Nombre</th>
        //                         <th className="py-2">Compañía</th>
        //                         <th className="py-2">Puntos</th>
        //                     </tr>
        //                 </thead>
        //                 <tbody className="text-5xl text-center">
        //                     {sortedScores.map((score, index) => (
        //                         <tr key={score.id}>
        //                             <td className="py-4">{index + 1}</td>
        //                             <td className="py-4">{score.attributes.playerName}</td>
        //                             <td className="py-4">{score.attributes.playerCompany}</td>
        //                             <td className="py-4">{score.attributes.scoreValue}</td>
        //                         </tr>
        //                     ))}
        //                 </tbody>
        //             </table>
        //         </div>
        //     {/* </div> */}
        //     <div className="flex flex-col w-full md:w-8/12 lg:w-3/12 mt-4 text-center">
        //         <ActionButton url="/menu" text="Volver" />
        //     </div>
        // </main>
        <Scoreboard scoreboard={scoreboard!} game="trivia" />
    )
}
