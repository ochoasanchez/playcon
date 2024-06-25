import { useEffect, useState } from "react";
import RadioInput from "../components/RadioInput";
import Nav from "../components/Nav";
import { getTriviaQuestions, sendTriviaData } from "../helpers/trivia.helper";
import TriviaScore from "../components/TriviaScore";

export function Trivia() {
  const [triviaQuestion, setTriviaQuestion] = useState<TriviaData | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const questionData: TriviaData = await getTriviaQuestions();

        setTriviaQuestion(questionData);

        // setLoading(false);
      } catch (error) {
        console.error('Error fetching trivia questions:', error);

        setError("Error fetching trivia questions.");
        
        // setLoading(false);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (isCompleted) {
      localStorage.setItem('userHasPlayed', "true");
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');

      const scoreData: ScoreType = {
        playerId: userData.data.id,
        playerName: userData.data.attributes.name,
        playerCompany: userData.data.attributes.company,
        scoreValue: score,
        scoreType: "points",
        game: "trivia"
      };

      sendTriviaData(scoreData);
    }
  }, [isCompleted, score]);

  const handleOptionChange = (id: string) => {
    setSelectedOption(id);
  };

  const handleNextQuestion = () => {
    if (triviaQuestion && triviaQuestion.questions.data.length > 0) {
      const correctAnswer = triviaQuestion.questions.data[currentQuestionIndex].attributes.answer;
      if (selectedOption === correctAnswer) {
        setScore(score + 1);
      }
      if (currentQuestionIndex + 1 >= triviaQuestion.questions.data.length) {
        setIsCompleted(true);
      } else {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption("");
      }
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!triviaQuestion || !Array.isArray(triviaQuestion.questions.data) || triviaQuestion.questions.data.length === 0) {
    console.log('triviaQuestion:', triviaQuestion);
    return <p>No trivia questions available.</p>;
  }

  if (isCompleted) {
    return <TriviaScore score={score} totalQuestions={triviaQuestion.questions.data.length} />;
  }

  return (
    <div className="h-lvh w-full flex flex-col items-center justify-center px-4 md:px-0">

      <h1 className="text-6xl font-bold">¡Descubramos <br />cuánto sabes!</h1>

      <p className="text-2xl mt-4">La velocidad será tu ventaja para ganar</p>

      <div id="progressBar" className="flex w-lvw gap-6 md:gap-12 md:px-12 mt-12">
        {triviaQuestion.questions.data.map((_, i) => (
          <div
            key={i}
            className={`w-full bg-${i <= currentQuestionIndex ? 'yellow-300' : 'white'} h-4 rounded-lg`}
          ></div>
        ))}
      </div>

      <p className="text-yellow-300 font-bold mt-4 text-xl uppercase">Pregunta {currentQuestionIndex + 1} de {triviaQuestion.questions.data.length}</p>
      
      <h1 key={`title-${currentQuestionIndex}`} className="text-6xl font-bold text-white mt-8 text-left md:text-center animate-slide-in-1">{triviaQuestion.questions.data[currentQuestionIndex].attributes.title}</h1>
      
      <div className="flex flex-col w-full md:w-8/12 lg:w-3/12">
        <form className="flex flex-col">
          {triviaQuestion.questions.data[currentQuestionIndex].attributes.options.options.map((option, index) => (
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
            type="button"
            className="bg-orange-500 rounded-md mt-4 py-4 font-bold uppercase animate-slide-in-5 text-2xl"
            onClick={handleNextQuestion}
            disabled={!selectedOption}
          >
            Siguiente
          </button>
        </form>
        <Nav />
      </div>

    </div>
  );
}
