import { useState, useEffect, useRef } from "react";
import Card from "../components/Card";
import { cardsArray as uniqueCardsArray} from '../utils/pokemons.constants';
import Nav from "../components/Nav";

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
    shuffleCards([...uniqueCardsArray, ...uniqueCardsArray])
  );
  const [openCards, setOpenCards] = useState<number[]>([]);
  const [clearedCards, setClearedCards] = useState<{ [key: string]: boolean }>({});
  const [shouldDisableAllCards, setShouldDisableAllCards] = useState<boolean>(false);
  const [moves, setMoves] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);
 
  const localStorageBestScore = localStorage.getItem("bestScore");
  const initialBestScore = localStorageBestScore !== null ? JSON.parse(localStorageBestScore) : Number.POSITIVE_INFINITY;

  const [bestScore, setBestScore] = useState<number>(initialBestScore);


  const timeout = useRef<NodeJS.Timeout | null>(null);

  const disable = () => {
    setShouldDisableAllCards(true);
  };
  const enable = () => {
    setShouldDisableAllCards(false);
  };

  const checkCompletion = () => {
    if (Object.keys(clearedCards).length === uniqueCardsArray.length) {
      setShowModal(true);
      const highScore = Math.min(moves, bestScore);
      setBestScore(highScore);
      localStorage.setItem("bestScore", highScore.toString());
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
      setMoves((moves) => moves + 1);
      disable();
    } else {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
      setOpenCards([index]);
    }
  };

  useEffect(() => {
    let timeoutRef: NodeJS.Timeout | null = null;
    if (openCards.length === 2) {
      timeoutRef = setTimeout(evaluate, 300);
    }
    return () => {
      if (timeoutRef) {
        clearTimeout(timeoutRef);
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
    setShowModal(false);
    setMoves(0);
    setShouldDisableAllCards(false);
    setCards(shuffleCards([...uniqueCardsArray, ...uniqueCardsArray]));
  };

  return (
    <div className="memory flex flex-col items-center justify-center">
      <header className="text-center animate-slide-in-1">
        <h1 className="text-6xl font-bold text-white mt-4 text-left md:text-center">Mikia Memory Challenge</h1>
        <p className="mt-4 text-2xl font-bold">
            Selecciona dos cartas iguales para hacerlas desaparecer
        </p>
      </header>
      <div className="card-container animate-slide-in-2 mt-8">
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
      </div>
      <footer className="mt-4 animate-slide-in-3">
        <div className="flex justify-center gap-x-8 uppercase">
          <div>
            <span className="font-bold">Jugadas:</span> {moves}
          </div>
          {localStorage.getItem("bestScore") && (
            <div>
              <span className="font-bold">Mejor Puntaje:</span> {bestScore}
            </div>
          )}
        </div>
        <div className="flex justify-center">
            <button onClick={handleRestart} className="bg-orange-500 rounded-full px-12 mt-4 p-4 font-bold uppercase animate-slide-in-4 text-2xl">Reiniciar</button>
        </div>
        <Nav />
      </footer>
      { showModal && 
        <>
            <p>¡Completaste el desafío! Jugadas: {moves} | Resultado: {bestScore}</p>
            <button onClick={handleRestart}>RESTART</button>
        </>
      }
    </div>
  );
}