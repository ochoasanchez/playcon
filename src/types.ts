type Question = {
    id: number;
    category: string;
    difficulty: "Easy" | "Medium" | "Hard"; 
    question: string;
    options: string[];
    answer: string;
};