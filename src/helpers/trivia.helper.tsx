import { sendScore, saveScore } from "../helpers/game.helper";
import { trivias } from "../utils/questions.constants";

const getTriviaQuestionsNew = () => {
  const triviaList = trivias;
  
  // Get played trivia IDs from localStorage
  let playedTriviaIds = JSON.parse(
    localStorage.getItem("playedTriviaIds") || "[]",
  );
  if (!Array.isArray(playedTriviaIds)) {
    playedTriviaIds = [];
  }

  // Find an unplayed trivia
  const unplayedTrivia = triviaList.find(
    (trivia: any) => !playedTriviaIds.includes(trivia.id),
  );

  if (unplayedTrivia) {
    // Save the unplayed trivia ID to localStorage
    playedTriviaIds.push(unplayedTrivia.id);
    localStorage.setItem("playedTriviaIds", JSON.stringify(playedTriviaIds));
    return unplayedTrivia;
  } else {
    // If all trivia questions have been played
    return null;
  }
  
}

const getTriviaScoreboard = () => {
  const triviaScoreboard = JSON.parse(localStorage.getItem("triviaScoreboard") || "[]");

  return triviaScoreboard.data;
};

const sendTriviaData = async (scoreData: ScoreType) => {
  try {
    const response = await sendScore({ data: scoreData });
    console.log("Data submitted successfully:", response.data);
  } catch (error) {
    console.error("Error submitting data:", error);
    throw error;
  }
};

const saveTriviaScore = (scoreData: ScoreType) => {

  const score: { data: ScoreType; game: "trivia" | "memory" } = {
    data: scoreData,
    game: "trivia"
  }

  saveScore(score);

}

export { getTriviaQuestionsNew, sendTriviaData, saveTriviaScore, getTriviaScoreboard };
