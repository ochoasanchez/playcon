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
        const questionData: TriviaData | null = await getTriviaQuestions();
        if (questionData) {
          setTriviaQuestion(questionData);
        } else {
          setError(
            "¡Ya llegaste al límite de intentos! <br> Gracias por Participar",
          );
        }
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
      }, 5000);
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
  // const htmlError = { __html: "Ya llegaste al límite de intentos <br> ¡Gracias por participar!" }

  if (error)
    return (
      <main className="gap-24 px-12">
        <p
          className="text-center text-7xl"
          dangerouslySetInnerHTML={htmlError}
        ></p>
        {/* <p className="text-7xl text-center" dangerouslySetInnerHTML={htmlError}></p> */}
        {/* <p className="text-7xl text-center">Error fetching trivia questions:</p> */}
        <ActionButton url="/menu" text="Volver al menú de juegos" />
      </main>
    );

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
        score={score}
        totalQuestions={triviaQuestion.questions.data.length}
      />
    );
  }

  const htmlTitle = {
    __html:
      triviaQuestion.questions.data[currentQuestionIndex].attributes.title,
  };

  return (
    <main className="gap-24 px-12">
      <h1 className="main__title uppercase">
        ¡Descubramos
        <br /> cuánto sabes!
      </h1>

      <div className="flex flex-col items-center gap-12">
        <div id="progressBar" className="flex w-lvw gap-6 md:gap-12 md:px-12">
          {triviaQuestion.questions.data.map((_, i) => (
            <div
              key={i}
              className={`w-full bg-${i <= currentQuestionIndex ? "yellow-300" : "white"} h-4 rounded-lg`}
            ></div>
          ))}
        </div>

        <p className="text-5xl uppercase text-yellow-300">
          Pregunta {currentQuestionIndex + 1} de{" "}
          {triviaQuestion.questions.data.length}
        </p>
      </div>

      <div className="px-12">
        <h2
          key={`title-${currentQuestionIndex}`}
          className="animate-slide-in-1 text-center text-7xl"
          dangerouslySetInnerHTML={htmlTitle}
        />
      </div>

      <form className="flex min-w-full flex-col gap-y-6">
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
        <ActionButton
          onClick={handleNextQuestion}
          disabled={!selectedOption || showFeedback}
          text={"Siguiente"}
          className="animate-slide-in-5 rounded-md"
        />
      </form>
      <Nav />
    </main>
  );
}
