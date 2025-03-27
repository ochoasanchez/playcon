import { useEffect, useState, useRef } from "react";
import RadioInput from "../components/RadioInput";
import { getTriviaQuestionsNew, saveTriviaScore } from "../helpers/trivia.helper";
import TriviaScore from "../components/TriviaScore";
import { ActionButton } from "../components/ActionButton";
import Loader from "../components/Loader";

export function Trivia() {
  const [triviaQuestion, setTriviaQuestion] = useState<any>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchData = () => {
        const questionData = getTriviaQuestionsNew();
        if (questionData) {
          setTriviaQuestion(questionData);
        } else {
          setError(
            "¡Ya llegaste al límite de intentos! <br> Gracias por Participar",
          );
        }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (isCompleted) {
      localStorage.setItem("userHasPlayed", "true");
      const userData = JSON.parse(localStorage.getItem("currentUser") || "{}");

      const scoreData: ScoreType = {
        // playerId: userData.data.id,
        playerName: userData.name,
        playerCompany: userData.company,
        scoreValue: score,
        scoreType: "points",
        game: "trivia",
      };

      saveTriviaScore(scoreData);
    }
  }, [isCompleted, score]);

  const handleOptionChange = (id: string) => {
    setSelectedOption(id);
  };

  const handleNextQuestion = () => {
    if (triviaQuestion && triviaQuestion.attributes.length > 0) {
      const correctAnswer =
        triviaQuestion.attributes[currentQuestionIndex].answer;
      if (selectedOption === correctAnswer) {
        setScore(score + 1);
      }
      setShowFeedback(true);

      // Check if it's the user's first question
      if (currentQuestionIndex === 0) {
        // Get played trivia IDs from localStorage and add the current trivia ID
        const playedTriviaIds = JSON.parse(localStorage.getItem("playedTriviaIds") || "[]");
        playedTriviaIds.push(triviaQuestion.id);
        localStorage.setItem("playedTriviaIds", JSON.stringify(playedTriviaIds));
      }

      timeoutRef.current = setTimeout(() => {
        setShowFeedback(false);
        if (currentQuestionIndex + 1 >= triviaQuestion.attributes.length) {
          setIsCompleted(true);
        } else {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setSelectedOption("");
        }
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

  const htmlError = { __html: error };

  if (error)
    return (
      <main className="gap-24 px-12">
        <p
          className="text-center text-7xl"
          dangerouslySetInnerHTML={htmlError}
        ></p>
        <div className="flex flex-col w-full gap-12">
          <ActionButton url="/menu" text="Volver al menú de juegos" />
          <ActionButton url="/trivia/scoreboard" text="Ver tabla de posiciones" className="btn-alternate"/>
        </div>
      </main>
    );

  if (
    !triviaQuestion ||
    !Array.isArray(triviaQuestion.attributes) ||
    triviaQuestion.attributes.length === 0
  ) {
    console.log("triviaQuestion:", triviaQuestion);
    return <p>No trivia questions available.</p>;
  }

  if (isCompleted) {
    return (
      <TriviaScore
        score={score}
        totalQuestions={triviaQuestion.attributes.length}
      />
    );
  }

  const htmlTitle = {
    __html:
      triviaQuestion.attributes[currentQuestionIndex].title,
  };

  return (
    <main className="gap-8 px-2 sm:px-4">
      <h1 className="text-center text-5xl sm:text-6xl font-bold uppercase">
        Trivia
      </h1>

      <div className="flex flex-col w-full items-center gap-4 px-4">
        <div id="progressBar" className="flex w-full gap-6 md:gap-4">
          {triviaQuestion.attributes.map((_: any, i: any) => (
            <div
              key={i}
              className={`w-full bg-${i <= currentQuestionIndex ? "green-600" : "white"} h-4 rounded-lg`}
            ></div>
          ))}
        </div>

        <p id="currentQuestionIndicator" className="text-2xl sm:text-4xl font-bold uppercase text-green-600">
          Pregunta {currentQuestionIndex + 1} de{" "}
          {triviaQuestion.attributes.length}
        </p>
      </div>

      <div className="px-2">
        <h2
          key={`title-${currentQuestionIndex}`}
          className="animate-slide-in-1 text-center text-3xl sm:text-5xl"
          dangerouslySetInnerHTML={htmlTitle}
        />
      </div>

      <form className="flex min-w-full flex-col gap-y-2 sm:gap-y-4">
        {triviaQuestion.attributes[currentQuestionIndex].options.map((option: any, index: any) => (
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
              triviaQuestion.attributes[currentQuestionIndex].answer
            }
          />
        ))}
        <div className="flex flex-col gap-y-4">
          <ActionButton
            onClick={handleNextQuestion}
            disabled={!selectedOption || showFeedback}
            text={"Siguiente"}
          />
        
          <ActionButton
              url="/menu"
              text={"Volver al menú"}
              className="btn-alternate"
            />

        </div>
      </form>
    </main>
  );
}
