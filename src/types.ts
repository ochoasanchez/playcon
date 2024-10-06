type Question = {
  id: number;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
  title: string;
  options: string[];
  answer: string;
};

type Pokemon = {
  id: number;
  name: string;
  image: string;
};

type CardType = {
  id: number;
  type: string;
  image: string;
};

type MemoryCard = {
  id: number;
  attributes: {
    name: string;
    imageUrl: string;
  };
};

type CardsData = {
  cards: {
    data: MemoryCard[];
  };
};

// type ScoreType = {
//     playerId: number,
//     playerName: string,
//     playerCompany: string,
//     scoreValue: number,
//     scoreType: string,
//     game: string
// }

interface TriviaAnswerAttrs {
  options: string[];
}

interface TriviaQuestionAttrs {
  title: string;
  options: TriviaAnswerAttrs;
  answer: string;
}

interface TriviaQuestion {
  attributes: TriviaQuestionAttrs;
}

interface QuestionsData {
  data: TriviaQuestion[];
}

interface TriviaData {
  questions: QuestionsData;
}

type ScoreType = {
  playerId?: number;
  playerName: string;
  playerCompany: string;
  scoreValue: number;
  scoreType: string;
  game: string;
};

type ParticipantType = {
  userId: number;
  userName: string;
  userCompany: string;
  userPhone: string;
  level: number;
  hasPlayed: boolean;
};

interface ScoreAttributes {
  playerId?: number;
  playerName: string;
  playerCompany: string;
  scoreValue: number;
  scoreType: string;
  game: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface ScoreEntry {
  id: number;
  attributes: ScoreAttributes;
}
