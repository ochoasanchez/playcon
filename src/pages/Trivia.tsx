import { useState } from "react";
import { Link } from "react-router-dom";
import RadioInput from "../components/RadioInput";
import { questions } from '../assets/questions.constants';

export function Trivia() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState("");
    const [score, setScore] = useState(0);

    const handleOptionChange = (id: string) => {
        setSelectedOption(id);
    };

    const handleNextQuestion = () => {
        // Check if selected option is correct before moving on
        const correctAnswer = questions[currentQuestionIndex].answer;
        if (selectedOption === correctAnswer) {
            setScore(score + 1);
        }
        // Move on to next question and reset selected option
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption("");
    }

    return (
        <div className="h-lvh w-full flex flex-col items-center justify-center">
            {currentQuestionIndex < questions.length ? (
                <>
                    <div id="progressBar" className="flex w-lvw gap-12 px-12">
                        {questions.map((_, i) => (
                            <div
                                key={i}
                                className={`w-full bg-${i <= currentQuestionIndex ? 'yellow-300' : 'white'} h-4 rounded-lg`}
                            ></div>
                        ))}
                    </div>
                    <p className="text-yellow-300 font-bold mt-10 uppercase">Question {currentQuestionIndex + 1} of {questions.length}</p>
                    <h1 className="text-6xl font-bold text-white mt-4">{questions[currentQuestionIndex].question}</h1>

                    <div className="flex flex-col w-3/12 mt-4">
                        <form className="flex flex-col">
                            {questions[currentQuestionIndex].options.map((option, index) => (
                                <RadioInput
                                    key={index}
                                    id={option}
                                    label={option}
                                    selectedOption={selectedOption}
                                    onChange={handleOptionChange}
                                />
                            ))}
                            <button
                                className="bg-orange-500 rounded-md mt-4 py-4 font-bold uppercase"
                                onClick={handleNextQuestion}
                                disabled={!selectedOption}
                            >
                                Next
                            </button>
                            <p className="text-xl text-center mt-4">Score: {score}</p>
                        </form>
                    </div>
                </>
            ) : (
                <>
                    <p className="text-6xl">You got {score} questions right out of {questions.length}</p>
                    <Link to="/" className="text-white mt-4">Go home</Link>
                </>
            )}
        </div>
    );
}
