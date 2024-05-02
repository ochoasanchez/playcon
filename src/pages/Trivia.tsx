import { useState } from "react";
import { Link } from "react-router-dom";
import RadioInput from "../components/RadioInput";
import { questions } from '../utils/questions.es.constants';

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
        <div className="h-lvh w-full flex flex-col items-center justify-center px-4 md:px-0">
            {currentQuestionIndex < questions.length ? (
                <>
                    <div id="progressBar" className="flex w-lvw gap-6 md:gap-12 md:px-12">
                        {questions.map((_, i) => (
                            <div
                                key={i}
                                className={`w-full bg-${i <= currentQuestionIndex ? 'yellow-300' : 'white'} h-4 rounded-lg`}
                            ></div>
                        ))}
                    </div>
                    <p className="text-yellow-300 font-bold mt-10 uppercase">Question {currentQuestionIndex + 1} of {questions.length}</p>
                    <h1 key={`title-${currentQuestionIndex}`} className="text-6xl font-bold text-white mt-4 text-left md:text-center animate-slide-in-1">{questions[currentQuestionIndex].question}</h1>
                            {/* <div className={`w-full bg-yellow-300 h-4 rounded-lg`}></div> */}
                            
                    <div className="flex flex-col w-full md:w-8/12 lg:w-3/12 mt-4">
                        <form className="flex flex-col">
                            {questions[currentQuestionIndex].options.map((option, index) => (
                                <RadioInput
                                    key={`${currentQuestionIndex}-${index}`}
                                    id={option}
                                    index={index}
                                    label={option}
                                    selectedOption={selectedOption}
                                    onChange={handleOptionChange}
                                />
                            ))}
                            <button
                                className="bg-orange-500 rounded-md mt-4 py-4 font-bold uppercase animate-slide-in-5"
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
                    <p className="text-6xl opacity-0 animate-fade-in">You got {score} questions right out of {questions.length}</p>
          
                    <Link to="/" className="text-white bg-orange-500 rounded-md mt-4 p-4 font-bold uppercase animate-slide-in-5">Go home</Link>
                </>
            )}
        </div>
    );
}
