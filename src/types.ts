type Question = {
    id: number;
    category: string;
    difficulty: "Easy" | "Medium" | "Hard"; 
    question: string;
    options: string[];
    answer: string;
};

type Pokemon = {
    id: number;
    name: string;
    image: string;
}

type CardType = {
    id: number;
    type: string;
    image: string;
}

type MemoryCard = {
    id: number;
    attributes: {
        name: string;
        imageUrl: string;
    }
}

type CardsData = {
    cards: {
        data: MemoryCard[],
    }
}

type ScoreType = {
    playerId: number,
    playerName: string,
    playerCompany: string,
    scoreValue: number,
    scoreType: string, 
    game: string 
}