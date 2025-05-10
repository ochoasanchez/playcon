import { useState, useEffect, useRef } from "react";
import Card from "../components/Card";
import { cardsArray as uniqueCardsArray } from "../utils/memory-cards.constants";
import { saveMemoryScore } from "../helpers/memory.helper";
import { ActionButton } from "../components/ActionButton";
import MemoryScore from "../components/MemoryScore";
import { MainTitle } from "../components/MainTitle";

interface CardType {
  id: number;
  type: string;
  image: string;
}

function shuffleCards<T>(array: T[]): T[] {
  const length = array.length;
  for (let i = length; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * i);
    const currentIndex = i - 1;
    const temp = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temp;
  }
  return array;
}

export function Memory() {
  const [cards, setCards] = useState<CardType[]>(() =>
    shuffleCards([...uniqueCardsArray, ...uniqueCardsArray]),
  );
  const [openCards, setOpenCards] = useState<number[]>([]);
  const [clearedCards, setClearedCards] = useState<{ [key: string]: boolean }>(
    {},
  );
  const [shouldDisableAllCards, setShouldDisableAllCards] =
    useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeout = useRef<NodeJS.Timeout | null>(null);

  const disable = () => {
    setShouldDisableAllCards(true);
  };

  const enable = () => {
    setShouldDisableAllCards(false);
  };

  const checkCompletion = () => {
    if (Object.keys(clearedCards).length === uniqueCardsArray.length) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      setIsCompleted(true);
    }
  };

  const evaluate = () => {
    const [first, second] = openCards;
    enable();
    if (cards[first].type === cards[second].type) {
      setClearedCards((prev) => ({ ...prev, [cards[first].type]: true }));
      setOpenCards([]);
      return;
    }

    timeout.current = setTimeout(() => {
      setOpenCards([]);
    }, 500);
  };

  const handleCardClick = (index: number) => {
    if (openCards.length === 1) {
      setOpenCards((prev) => [...prev, index]);
      disable();
    } else {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
      setOpenCards([index]);
      if (startTime === null) {
        const start = Date.now();
        setStartTime(start);
        intervalRef.current = setInterval(() => {
          const elapsed = Date.now() - start;
          setElapsedTime(elapsed);
          if (elapsed >= 50000) {
            setIsCompleted(true);
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
            }
          }
        }, 10);
      }
    }
  };

  useEffect(() => {
    if (openCards.length === 2) {
      timeout.current = setTimeout(evaluate, 300);
    }
    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, [openCards]);

  useEffect(() => {
    checkCompletion();
  }, [clearedCards]);

  const checkIsFlipped = (index: number) => {
    return openCards.includes(index);
  };

  const checkIsInactive = (card: CardType) => {
    return Boolean(clearedCards[card.type]);
  };

  const handleRestart = () => {
    setClearedCards({});
    setOpenCards([]);
    setIsCompleted(false);
    setShouldDisableAllCards(false);
    setCards(shuffleCards([...uniqueCardsArray, ...uniqueCardsArray]));
    setStartTime(null);
    setElapsedTime(0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  useEffect(() => {
    if (isCompleted && elapsedTime < 50000) {
      const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

      localStorage.setItem("userHasPlayed", "true");

      const scoreData: ScoreType = {
        // playerId: currentUser.data.id,
        playerName: currentUser.name,
        playerCompany: currentUser.company,
        scoreValue: elapsedTime,
        scoreType: "time",
        game: "memory",
      };

      saveMemoryScore(scoreData);
    }
  }, [isCompleted]);

  if (isCompleted) return <MemoryScore timeInMs={elapsedTime} />;

  return (
    <main className="memory gap- sm:gap-6">
      <div className="flex flex-col gap-6">
        <MainTitle text="Reto de Memoria" size="large"/>
        {/* <h1 className="text-center text-5xl sm:text-6xl font-bold">
          Reto de Memoria
        </h1> */}

        <p className="text-center text-3xl sm:text-4xl">
          Revela todos los pares de cartas
          <br />
          en menos de <span className="text-yellow-300 font-bold">50 segundos</span>
        </p>
      </div>

      <div className="flex w-full items-center justify-center gap-x-2 sm:gap-x-4">
        <ActionButton
          url="/menu"
          text="Volver"
          variant="alternate"
          className="w-min px-2"
        />

        <ActionButton
          onClick={handleRestart}
          text="Reiniciar"
          className="w-min px-4"
        />

        {/* <p className={`text-5xl bg-green p-8 rounded-full ${elapsedTime > 30000 ? 'text-red-500' : 'text-white'}`}><span className="font-bold uppercase">Tiempo:</span> {(elapsedTime / 1000).toFixed(0)} s</p> */}
        {/* <p className="text-6xl text-red-500 bg-green p-6 rounded-full"><span className="font-bold uppercase">Tiempo:</span> {(elapsedTime / 1000).toFixed(0)} s</p> */}
      </div>

      <div className="card-container mt-4">
        {cards.map((card, index) => (
          <Card
            key={index}
            card={card}
            index={index}
            isDisabled={shouldDisableAllCards}
            isInactive={checkIsInactive(card)}
            isFlipped={checkIsFlipped(index)}
            onClick={handleCardClick}
          />
        ))}
        <div
          className={`flex items-center justify-center font-bold rounded-full px-4 py-6 text-4xl text-white ${
            elapsedTime > 40000 
              ? "bg-red-500" 
              : elapsedTime > 30000 
                ? "bg-yellow-400" 
                : "bg-green-500"
          }`}
        >
          {elapsedTime === 0 ? (
            <span className="text-xl sm:text-xl font-normal text-center">Toca una carta<br /> para empezar</span>
          ) : (
            `${(elapsedTime / 1000).toFixed(0)} s`
          )}
        </div>
      </div>
    </main>
  );
}
