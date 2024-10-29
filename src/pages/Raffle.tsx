import { useEffect, useState } from "react";
import { getRaffleParticipants } from "../helpers/raffle.helper";
import { ActionButton } from "../components/ActionButton";
import { useParams } from "react-router-dom";
import escudoGanador from "../assets/images/escudo-ganador.gif";
import Logo from "../components/Logo";
import useWindowDimensions from "../helpers/app.helper";
import Confetti from "react-confetti";
import Loader from "../components/Loader";

export function Raffle() {

  function shuffleArray(array: any) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  function startRaffle() {
    if (raffleParticipants && raffleParticipants.length > 0) {
      setIsLoading(true);
      
      const shuffledParticipants = shuffleArray([...raffleParticipants]);
      
      const winner = tipo === 'main' 
        ? shuffledParticipants.find((participant: any) => participant.level === "3") || shuffledParticipants[0]
        : shuffledParticipants[0];
      
      setRaffleWinner(winner);
      setTimeout(() => setIsLoading(false), 5000);
    }
  }
  
  const [raffleParticipants, setRaffleParticipants] = useState<any>(null);
  const [raffleWinner, setRaffleWinner] = useState<any>(null);
  const [raffleWinnerName, setRaffleWinnerName] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { tipo } = useParams<{ tipo: "main" | "memory" | "trivia" }>();
  const { width, height } = useWindowDimensions();

  const getRaffleName = (tipo?: "main" | "memory" | "trivia") => {
    if (tipo === "main") return "Gran sorteo";
    if (tipo === "memory") return "Sorteo Mikia Memory Challenge";
    return "Sorteo Desafío Mental";
  };

  const getParticipants = () => {
      const participantsData = getRaffleParticipants(tipo);
      setRaffleParticipants(participantsData);
  };

  const getRaffleWinnerName = () => {
    if (raffleWinner !== null) {
      if (tipo === "main") {
        return setRaffleWinnerName(raffleWinner.name);
      }
      return setRaffleWinnerName(raffleWinner.playerName);
    }
  };

  useEffect(() => {
    getParticipants();
  }, []);

  useEffect(() => {
    getRaffleWinnerName();
  }, [raffleWinner]);

  if (isLoading) {
    return (
      <Loader roulette={true} participants={raffleParticipants} type={tipo} />
    );
  }

  if (!isLoading && raffleWinner) {
    return (
      <main className="animate-fade-in px-6 gap-8">
        <Confetti
          width={width}
          height={height}
          gravity={0.05}
          numberOfPieces={840}
        />
        <Logo />
        <p className="text-center text-5xl sm:text-5xl font-bold uppercase">El ganador es</p>
        <div className="rounded-xl bg-orange-500 p-4 text-white">
          <p className="text-center text-6xl sm:text-7xl font-bold uppercase">
            {raffleWinnerName}
          </p>
        </div>
        <img src={escudoGanador} className="ml-20 w-8/12 -mt-12" alt="Result" />
        <ActionButton
          url="/sorteo"
          text="Volver al menú"
          className="btn-alternate"
        />
      </main>
    );
  }

  return (
    <main className="animate-fade-in gap-12 px-4">
      <Logo />
      <h1 className="text-center text-5xl sm:text-6xl font-bold uppercase">{getRaffleName(tipo)}</h1>
      <p className="text-center text-3xl sm:text-5xl font-bold mt-4">
        ¿Será que hoy es tu día de suerte? <br />
        Vamos a descubrirlo...
      </p>
      <div className="flex w-full flex-col gap-6">
        <ActionButton onClick={startRaffle} text="Empezar" />
      </div>
    </main>
  );
}
