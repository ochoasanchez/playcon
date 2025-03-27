import { useEffect, useState } from "react";
import { ActionButton } from "../components/ActionButton";
import { useParams } from "react-router-dom";
import escudoGanador from "../assets/images/party.png";
import Logo from "../components/Logo";
import useWindowDimensions from "../helpers/app.helper";
import Confetti from "react-confetti";
import Loader from "../components/Loader";
import { getRaffleParticipants } from "../utils/db";

export function Raffle() {
  const [raffleParticipants, setRaffleParticipants] = useState<User[] | null>(null);
  const [raffleWinner, setRaffleWinner] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { tipo } = useParams<{ tipo: "main" | "memory" | "trivia" }>();
  const { width, height } = useWindowDimensions();

  function shuffleArray(array: User[]) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }
  
  async function startRaffle() {
    try {
      setIsLoading(true);
      setRaffleWinner(null); // Reset winner
      
      const participants = await getRaffleParticipants();
      
      if (!participants || participants.length === 0) {
        console.warn('No participants found for raffle');
        return;
      }
  
      const shuffledParticipants = shuffleArray(participants);
      const winner = shuffledParticipants.find(participant => 
        participant.level === "3"
      ) || shuffledParticipants[0];

      setRaffleWinner(winner);
      
    } catch (error) {
      console.error('Error during raffle:', error);
    } finally {
      setTimeout(() => setIsLoading(false), 5000);
    }
  }

  const getRaffleName = () => {
    if (tipo === "main") return "Gran sorteo";
    if (tipo === "memory") return "Sorteo Mikia Memory Challenge";
    return "Sorteo Desafío Mental";
  };

  const getParticipants = async () => {
    try {
      const participantsData = await getRaffleParticipants();
      setRaffleParticipants(participantsData);
    } catch (error) {
      console.error('Error getting participants:', error);
    }
  };

  useEffect(() => {
    getParticipants();
  }, []);

  if (isLoading) {
    return (
      <Loader roulette={true} participants={raffleParticipants} type={tipo} />
    );
  }

  if (raffleWinner && !isLoading) {
    return (
      <main className="animate-fade-in px-6 gap-12">
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
            {tipo === "main" ? raffleWinner.name : raffleWinner.playerName}
          </p>
        </div>
        <img src={escudoGanador} className="w-4/12 py-4" alt="Result" />
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
      <h1 className="text-center text-5xl sm:text-6xl font-bold uppercase">{getRaffleName()}</h1>
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