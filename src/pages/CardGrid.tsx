// TODO: Add card component and follow tutorial https://javascript.plainenglish.io/building-a-card-memory-game-in-react-e6400b226b8f

import { useState } from 'react';
// import Card from './Card'; // Assuming Card component is imported from './Card'
import { shuffleCards } from '../utils/fisher-yates-shuffle'; // Assuming shuffleCards function is imported from './shuffleCards'
import Card from '../components/OGCard';

interface Props {
  uniqueCardsArray: Pokemon[]; // Assuming Pokemon is a type defined elsewhere
}

function Memory({ uniqueCardsArray }: Props) {
  const [cards, setCards] = useState<Pokemon[]>(
    () => shuffleCards(uniqueCardsArray.concat(uniqueCardsArray))
  );
  
  const handleCardClick = (index: number) => {
    // We will handle it later
  };

  return (
    <div>
      <header>
        <h3>Play the Flip card game</h3>
        <div>
          Select two cards with same content consequtively to make them vanish
        </div>
      </header>
      <div className="card-container">
        {cards.map((card, index) => (
          <Card
            key={index}
            card={card}
            index={index}
            onClick={handleCardClick}
          />
        ))}
      </div>
    </div>
  );
}

export default Memory;