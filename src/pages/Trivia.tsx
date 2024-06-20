import { useEffect, useState } from "react";
import RadioInput from "../components/RadioInput";
import Nav from "../components/Nav";
import {getTriviaQuestions} from "../helpers/trivia.helper";
import TriviaScore from "../components/TriviaScore";

interface TriviaAnswerAttrs {
  options: string[];
}

// Define the structure of the trivia question data
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

export function Trivia() {
  const [triviaQuestion, setTriviaQuestion] = useState<TriviaData | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const questionData: TriviaData = await getTriviaQuestions();
        // console.log('Fetched data:', questionData); // Debugging statement
        setTriviaQuestion(questionData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching trivia questions:', error);
        setError("Error fetching trivia questions.");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleOptionChange = (id: string) => {
    setSelectedOption(id);
  };

  const handleNextQuestion = () => {
    if (triviaQuestion && triviaQuestion.questions.data.length > 0) {
      const correctAnswer = triviaQuestion.questions.data[currentQuestionIndex].attributes.answer;
      if (selectedOption === correctAnswer) {
        setScore(score + 1);
      }
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption("");
    }
  };

  const sendScoreData = async () => {
    
    // try {
    //   setLoading(true);
    //   const response = await axios.post('http://localhost:1337/scores', scoreData, {
    //     headers: {
    //       Authorization: `Bearer your-auth-token-here`, // Replace with your actual token
    //     },
    //   });
    //   console.log('Data sent successfully:', response.data);
    //   setLoading(false);
    // } catch (error) {
    //   console.error('Error sending score data:', error);
    //   setError('Error sending score data.');
    //   setLoading(false);
    // }
  };

  // Loading state
  if (loading) {
    return <p>Loading...</p>;
  }

  // Error state
  if (error) {
    return <p>{error}</p>;
  }

  // No trivia questions available or invalid state
  if (!triviaQuestion || !Array.isArray(triviaQuestion.questions.data) || triviaQuestion.questions.data.length === 0) {
    console.log('triviaQuestion:', triviaQuestion); // Debugging statement
    return <p>No trivia questions available.</p>;
  }

  // Handling all questions answered
  if (currentQuestionIndex >= triviaQuestion.questions.data.length) {
    sendScore();
    return <TriviaScore score={score} totalQuestions={triviaQuestion.questions.data.length} />;
  }

  // All questions answered
  if (currentQuestionIndex >= triviaQuestion.questions.data.length) {
    
    const fetchData = async () => {
      try {
        const questionData: TriviaData = await getTriviaQuestions();
        // console.log('Fetched data:', questionData); // Debugging statement
        setTriviaQuestion(questionData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching trivia questions:', error);
        setError("Error fetching trivia questions.");
        setLoading(false);
      }
    };

    fetchData();

    return <TriviaScore score={score} totalQuestions={triviaQuestion.questions.data.length}/>;
  }

  // Render trivia questions and options
    console.log('triviaQuestion:', triviaQuestion); // Debugging statement
    // debugger;

    
  return (
    <div className="h-lvh w-full flex flex-col items-center justify-center px-4 md:px-0">
      
      <h1 className="text-6xl font-bold mt-8">¡Descubramos <br />cuánto sabes!</h1>
      <p className="text-3xl mt-6 font-bold">La velocidad será tu ventaja para ganar</p>
      <div id="progressBar" className="flex w-lvw gap-6 md:gap-12 md:px-12 mt-12">
        {triviaQuestion.questions.data.map((_, i) => (
          <div
            key={i}
            className={`w-full bg-${i <= currentQuestionIndex ? 'yellow-300' : 'white'} h-4 rounded-lg`}
          ></div>
        ))}
      </div>
      <p className="text-yellow-300 font-bold mt-10 uppercase">Pregunta {currentQuestionIndex + 1} de {triviaQuestion.questions.data.length}</p>
      <h1 key={`title-${currentQuestionIndex}`} className="text-6xl font-bold text-white mt-4 text-left md:text-center animate-slide-in-1">{triviaQuestion.questions.data[currentQuestionIndex].attributes.title}</h1>
          
      <div className="flex flex-col w-full md:w-8/12 lg:w-3/12 mt-2">
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
          {/* <p className="text-xl text-center mt-4 uppercase">Puntos: {score}</p> */}
        </form>
        <Nav />
      </div>
    </div>
  );
}
