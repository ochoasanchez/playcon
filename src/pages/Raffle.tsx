import { useEffect, useState } from "react";
import { getRaffleParticipants } from "../helpers/raffle.helper";
import { ActionButton } from "../components/ActionButton";
import { useParams } from "react-router-dom";
import escudoGanador from "../assets/images/escudo-ganador.gif";
import Logo from "../components/Logo";
import useWindowDimensions from '../helpers/app.helper';
import Confetti from 'react-confetti';
import Loader from "../components/Loader";

export function Raffle() {
  const [raffleParticipants, setRaffleParticipants] = useState<any>(null);
  const [raffleWinner, setRaffleWinner] = useState<any>(null);
  const [raffleWinnerName, setRaffleWinnerName] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { tipo } = useParams<{ tipo: 'main' | 'memory' | 'trivia' }>();
  const { width, height } = useWindowDimensions();

  const getRaffleName = (tipo?: 'main' | 'memory' | 'trivia') => {
    if (tipo === 'main') return 'Gran sorteo';
    if (tipo === 'memory') return 'Sorteo Mikia Memory Challenge';
    return 'Sorteo Desafío Mental';
  }

  const getParticipants = async () => {
    try {
      const participantsData = await getRaffleParticipants(tipo);
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
    if (raffleParticipants && raffleParticipants.data.length > 0) {
      setIsLoading(true);

      const winner = raffleParticipants.data[Math.floor(Math.random() * raffleParticipants.data.length)];
      setRaffleWinner(winner);
      setTimeout(() => {
        setIsLoading(false)
      }, 7000);
    }
  };

  if (true) {
    return (
        <Loader roulette={true} />
    );
  }

  if (!isLoading && raffleWinner) {
    return (
      <main className="px-12 animate-fade-in">
        <Confetti
          width={width}
          height={height}
          gravity={0.03}
          numberOfPieces={840}
        />
        <Logo />
        <p className="main__subtitle uppercase mt-8">El ganador es</p>
        <div className="bg-orange-500 text-white p-4 mt-8 rounded-xl">
          <p className="text-9xl font-bold uppercase text-center">{raffleWinnerName}</p>
        </div>
        <img src={escudoGanador} className="w-10/12 ml-24" alt="Result" />
        <ActionButton url="/sorteo" text="Volver al menu" className="btn-alternate" />
      </main>
    );
  }

  return (
    <main className="px-12 gap-20 animate-fade-in">
      <Logo />
      <h1 className="main__title font-bold uppercase">{getRaffleName(tipo)}</h1>
      <p className="main__subtitle mt-8 font-bold">¿Será que hoy es tu día de suerte? <br />Vamos a descubrirlo...</p>
      <div className="flex flex-col w-full gap-12">
        <ActionButton onClick={startRaffle} text="Empezar" />
        <ActionButton url="/sorteo" text="Volver" className="btn-alternate" />
      </div>
    </main>
  );
}
