import { useState, useEffect, useRef } from "react";
import Card from "../components/Card";
import Nav from "../components/Nav";
import getMemoryCards from "../helpers/memory.helper";

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
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [openCards, setOpenCards] = useState<number[]>([]);
  const [clearedCards, setClearedCards] = useState<{ [key: string]: boolean }>({});
  const [shouldDisableAllCards, setShouldDisableAllCards] = useState<boolean>(false);
  const [moves, setMoves] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const localStorageBestScore = localStorage.getItem("bestScore");
  const initialBestScore = localStorageBestScore !== null ? JSON.parse(localStorageBestScore) : Number.POSITIVE_INFINITY;
  const [bestScore, setBestScore] = useState<number>(initialBestScore);

  const timeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const memoryCards = await getMemoryCards();
        setCards(shuffleCards([...memoryCards, ...memoryCards]));
        console.log('Fetched data:', memoryCards); // Debugging statement
        // debugger;
        setLoading(false);
      } catch (error) {
        console.error('Error fetching memory cards:', error);
        setError("Error fetching memory cards.");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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

  const disable = () => {
    setShouldDisableAllCards(true);
  };

  const enable = () => {
    setShouldDisableAllCards(false);
  };

  const checkCompletion = () => {
    if (Object.keys(clearedCards).length === cards.length / 2) {
      setShowModal(true);
      const highScore = Math.min(moves, bestScore);
      setBestScore(highScore);
      localStorage.setItem("bestScore", highScore.toString());
    }
  };

  // check properties :/

  const evaluate = () => {
    const [first, second] = openCards;
    enable();
    if (cards[first].attributes.name === cards[second].attributes.name) {
      setClearedCards((prev) => ({ ...prev, [cards[first].attributes.name]: true }));
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

  const checkIsFlipped = (index: number) => {
    return openCards.includes(index);
  };

  const checkIsInactive = (card: MemoryCard) => {
    return Boolean(clearedCards[card.attributes.name]);
  };

  const handleRestart = () => {
    setClearedCards({});
    setOpenCards([]);
    setShowModal(false);
    setMoves(0);
    setShouldDisableAllCards(false);
    setCards(shuffleCards([...cards.slice(0, cards.length / 2), ...cards.slice(0, cards.length / 2)]));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="memory flex flex-col items-center justify-center">
      <header className="text-center animate-slide-in-1">
        <h1 className="text-6xl font-bold text-white mt-4 text-left md:text-center">Mikia Memory Challenge</h1>
        <p className="mt-4 text-lg">
          Selecciona dos cartas iguales para hacerlas desaparecer
        </p>
      </header>
      <div className="card-container animate-slide-in-2">
        {cards.map((card, index) => (
          <Card
            key={card.id}
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
          <button onClick={handleRestart} className="bg-orange-500 rounded-md mt-4 p-4 font-bold uppercase animate-slide-in-4">Reiniciar</button>
        </div>
        <Nav />
      </footer>
      {showModal &&
        <>
          <p>You completed the challenge! Moves: {moves} | Score: {bestScore}</p>
          <button onClick={handleRestart}>RESTART</button>
        </>
      }
    </div>
  );
}
