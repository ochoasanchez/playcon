import icons from "../assets/images/icons.png";
import Nav from "../components/Nav";
import { useEffect, useState } from "react";
import { getMemoryScoreboard } from "../helpers/memory.helper";
import { ActionButton } from "../components/ActionButton";

export function MemoryScoreboard() {
    const [isLoading, setIsloading] = useState(true);
    const [scoreboard, setScoreboard] = useState<ScoreEntry[] | null>(null);

    const getScoreboard = async () => {
        try {
            const scoreboardData = await getMemoryScoreboard();
            setScoreboard(scoreboardData.data);
            setIsloading(false);
        } catch (error) {
            console.error('Error fetching scoreboard:', error);
        }
    }

    useEffect(() => { getScoreboard() }, []);

    if (isLoading) {
        return (
            <p>Loading...</p>
        )
    }

    // Sort the scores by scoreValue in ascending order
    // const sortedScores = scoreboard.sort((a, b) => a.attributes.scoreValue - b.attributes.scoreValue);
    const sortedScores = scoreboard ? scoreboard.sort((a, b) => a.attributes.scoreValue - b.attributes.scoreValue) : [];

    return (
        <div className="h-lvh w-full flex flex-col items-center justify-center px-4 md:px-0 animate-slide-in-1">
            <div className="flex flex-col w-full md:w-10/12 lg:w-8/12 text-center py-6">
                <h1 className="text-6xl font-bold mt-2 uppercase">Tabla de Posiciones</h1>
                <p className="text-3xl mt-8 font-bold">Desafío mental</p>
                <table className="min-w-full mt-12 text-2xl">
                    <thead>
                        <tr>
                            <th className="py-2">Lugar</th>
                            <th className="py-2">Nombre</th>
                            <th className="py-2">Compañía</th>
                            <th className="py-2">Tiempo (s)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedScores.map((score, index) => (
                            <tr key={score.id}>
                                <td className="py-2">{index + 1}</td>
                                <td className="py-2">{score.attributes.playerName}</td>
                                <td className="py-2">{score.attributes.playerCompany}</td>
                                <td className="py-2">{(score.attributes.scoreValue/1000).toFixed(0)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex flex-col w-full md:w-8/12 lg:w-3/12 mt-4 text-center">
                <ActionButton url="/menu" text="Volver" />
                <img src={icons} className="mt-16" alt="Icons" />
                <Nav />
            </div>
        </div>
    )
}