import { useEffect, useState, useRef } from "react";
import RadioInput from "../components/RadioInput";
import Nav from "../components/Nav";
import { getTriviaQuestions, sendTriviaData } from "../helpers/trivia.helper";
import TriviaScore from "../components/TriviaScore";
import { ActionButton } from "../components/ActionButton";
import Loader from "../components/Loader";

export function Trivia() {
  const [triviaQuestion, setTriviaQuestion] = useState<TriviaData | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const questionData: TriviaData = await getTriviaQuestions();
        setTriviaQuestion(questionData);
      } catch (error) {
        console.error("Error fetching trivia questions:", error);
        setError("Error fetching trivia questions.");
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (isCompleted) {
      localStorage.setItem("userHasPlayed", "true");
      const userData = JSON.parse(localStorage.getItem("userData") || "{}");

      const scoreData: ScoreType = {
        playerId: userData.data.id,
        playerName: userData.data.attributes.name,
        playerCompany: userData.data.attributes.company,
        scoreValue: score,
        scoreType: "points",
        game: "trivia",
      };

      sendTriviaData(scoreData);
    }
  }, [isCompleted, score]);

  const handleOptionChange = (id: string) => {
    setSelectedOption(id);
  };

  const handleNextQuestion = () => {
    if (triviaQuestion && triviaQuestion.questions.data.length > 0) {
      const correctAnswer =
        triviaQuestion.questions.data[currentQuestionIndex].attributes.answer;
      if (selectedOption === correctAnswer) {
        setScore(score + 1);
      }
      setShowFeedback(true);
      timeoutRef.current = setTimeout(() => {
        setShowFeedback(false);
        if (currentQuestionIndex + 1 >= triviaQuestion.questions.data.length) {
          setIsCompleted(true);
        } else {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setSelectedOption("");
        }
      // }, 5000);
      }, 1000);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  if (isLoading) return <Loader />;

  if (error) return <p>{error}</p>;

  if (
    !triviaQuestion ||
    !Array.isArray(triviaQuestion.questions.data) ||
    triviaQuestion.questions.data.length === 0
  ) {
    console.log("triviaQuestion:", triviaQuestion);
    return <p>No trivia questions available.</p>;
  }

  if (isCompleted) {
    return (
      <TriviaScore
        score={4}
        totalQuestions={triviaQuestion.questions.data.length}
      />
    );
  }

  return (
    <main className="gap-24 px-12">
      <h1 className="main__title uppercase">¡Descubramos<br /> cuánto sabes!</h1>

      <div className="flex flex-col items-center gap-12">
        <div id="progressBar" className="flex w-lvw gap-6 md:gap-12 md:px-12">
          {triviaQuestion.questions.data.map((_, i) => (
            <div
              key={i}
              className={`w-full bg-${
                i <= currentQuestionIndex ? "yellow-300" : "white"
              } h-4 rounded-lg`}
            ></div>
          ))}
        </div>

        <p className="text-yellow-300 text-5xl uppercase">
          Pregunta {currentQuestionIndex + 1} de{" "}
          {triviaQuestion.questions.data.length}
        </p>
      </div>

      <div className="px-12">
        <h2
          key={`title-${currentQuestionIndex}`}
          className="text-7xl font-bold text-center animate-slide-in-1"
        >
          {triviaQuestion.questions.data[currentQuestionIndex].attributes.title}
        </h2>
      </div>

        <form className="flex flex-col gap-y-6 min-w-full">
          {triviaQuestion.questions.data[
            currentQuestionIndex
          ].attributes.options.options.map((option, index) => (
            <RadioInput
              key={`${currentQuestionIndex}-${index}`}
              id={option}
              index={index}
              label={option}
              selectedOption={selectedOption}
              onChange={handleOptionChange}
              showFeedback={showFeedback}
              isCorrect={
                option ===
                triviaQuestion.questions.data[currentQuestionIndex].attributes
                  .answer
              }
            />
          ))}
          <ActionButton onClick={handleNextQuestion} disabled={!selectedOption || showFeedback} text={"Siguiente"} className="rounded-md animate-slide-in-5" />
        </form>
        <Nav />
    </main>
  );
}
