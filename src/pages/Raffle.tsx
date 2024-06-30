import { useEffect, useState } from "react";
import { getRaffleParticipants } from "../helpers/raffle.helper";
import { ActionButton } from "../components/ActionButton";
import { useParams } from "react-router-dom";
import logo from "../assets/images/logo-blanco.png";
import escudoFeliz from "../assets/images/escudo-feliz.gif";
import Logo from "../components/Logo";

export function Raffle() {
    const [raffleParticipants, setRaffleParticipants] = useState<any>(null);
    const [raffleWinner, setRaffleWinner] = useState<any>(null);
    const [raffleWinnerName, setRaffleWinnerName] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);

    const { tipo } = useParams<{ tipo: 'main' | 'memory' | 'trivia' }>();

    console.log(tipo);
    // debugger;

    const getRaffleName = (tipo?: 'main' | 'memory' | 'trivia') => {
        if (tipo === 'main') return 'Gran sorteo';
        if (tipo === 'memory') return 'Sorteo Mikia Memory Challenge';
        return 'Sorteo Desafío Mental';
    }



    // const raffleType = getRaffleType();

    const getParticipants = async () => {
        try {
            const participantsData = await getRaffleParticipants(tipo);
            // debugger;
            setRaffleParticipants(participantsData);
        } catch (error) {
            console.error('Error fetching participants:', error);
        }
    };

    const getRaffleWinnerName = () => {
        if (raffleWinner !== null) {
            if (tipo === 'main') {
                return setRaffleWinnerName(raffleWinner.attributes.name);
            }
            return setRaffleWinnerName(raffleWinner.attributes.playerName);
        }

    }

    useEffect(() => { getParticipants() }, []);

    
    useEffect(() => { getRaffleWinnerName() }, [raffleWinner]);

    const startRaffle = () => {
        // debugger;
        if (raffleParticipants && raffleParticipants.data.length > 0) {
            // debugger;
            setIsLoading(true);

            const winner = raffleParticipants.data[Math.floor(Math.random() * raffleParticipants.data.length)];
            setRaffleWinner(winner);
            // debugger;
            setTimeout(() => {
                setIsLoading(false)
            }, 3000);
        }
    };

    return (
        <main className="px-12">
            {isLoading && <p>Loading...</p>}
            {!isLoading && raffleWinner ? (
                <>
                    <Logo />
                    <p className="main__subtitle uppercase mt-8">El ganador es</p>
                    <div className="bg-orange-500 text-white p-4 mt-8 rounded-md">
                        <p className="text-9xl font-bold uppercase">{raffleWinnerName}</p>
                    </div>
                    <img src={escudoFeliz} className="w-8/12" alt="Result" />
                    <ActionButton url="/sorteo" text="Volver al menu"  className="btn-alternate" />
                </>
            ) : (
                <>
                    <Logo />
                    <h1 className="main__title font-bold uppercase w-10/12">{getRaffleName(tipo)}</h1>
                    <p className="main__subtitle mt-8 font-bold">¿Será que hoy es tu día de suerte? <br />Vamos a descubrirlo...</p> 
                    {/* <div className="flex flex-col w-full md:w-8/12 lg:w-6/12 text-center mt-4 animate-slide-in-2"> */}
                    <ActionButton onClick={startRaffle} text="Empezar" />
                    <ActionButton url="/sorteo" text="Volver" className="btn-alternate" />
                    {/* </div> */}
                </>
            )}
        </main>
    );
}
