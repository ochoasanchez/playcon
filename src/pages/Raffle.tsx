import { useEffect, useState } from "react";
import { getRaffleParticipants } from "../helpers/raffle.helper";
import { ActionButton } from "../components/ActionButton";

export function Raffle() {
    const [raffleParticipants, setRaffleParticipants] = useState<any>(null);
    const [raffleWinner, setRaffleWinner] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);

    const getParticipants = async () => {
        try {
            const participantsData = await getRaffleParticipants();
            setRaffleParticipants(participantsData);
        } catch (error) {
            console.error('Error fetching participants:', error);
        }
    };

    useEffect(() => { getParticipants() }, []);

    const startRaffle = () => {
        if (raffleParticipants && raffleParticipants.data.length > 0) {
            setIsLoading(true);

            const winner = raffleParticipants.data[Math.floor(Math.random() * raffleParticipants.data.length)];
            setRaffleWinner(winner);

            setTimeout(() => {
                setIsLoading(false)
            }, 3000);
        }
    };

    return (
        <div className="h-lvh w-full flex flex-col items-center justify-center px-4 md:px-0 animate-slide-in-1">
            {isLoading && <p>Loading...</p>}
            {!isLoading && raffleWinner ? (
                <>
                    <p className="text-4xl font-bold animate-bounce">El ganador es: {raffleWinner.attributes.userName}</p>
                    <ActionButton url="/menu" text="Volver al menu" />
                </>
            ) : (
                <>
                    <div className="flex flex-col w-full md:w-10/12 lg:w-8/12 text-center py-6">
                        <h1 className="text-6xl font-bold mt-2 uppercase">Sorteo <br /> Principal</h1>
                        {/* <p className="text-3xl mt-8 font-bold">Regístrate ahora y gana un<br /> premio sensacional</p> */}
                    </div>
                    <div className="flex flex-col w-full md:w-8/12 lg:w-3/12 mt-4 text-center">
                        <ActionButton onClick={startRaffle} text="Empezar rifa" />
                    </div>
                </>
            )}
        </div>
    );
}
