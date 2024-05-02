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