import axios from "axios";
import { saveScore } from "./game.helper";

const strapiUrl = import.meta.env.VITE_STRAPI_URL;

const getMemoryCards = async () => {
  let config = {
    headers: {
      Authorization: "Bearer " + import.meta.env.VITE_STRAPI_TOKEN,
    },
  };

  try {
    const response = await axios.get(
      `${strapiUrl}/api/memory-games?populate=cards`,
      config,
    );

    const cards = response.data.data[0].attributes.cards.data;
    console.log(cards);

    return cards;
  } catch (error) {
    console.log(error);
  }
};

const getMemoryScoreboard = () => {
  const memoryScoreboard = JSON.parse(localStorage.getItem("memoryScoreboard") || "[]");

  console.log(memoryScoreboard);
  
  return memoryScoreboard;
};

const saveMemoryScore = (scoreData: ScoreType) => {

  const score: { data: ScoreType; game: "trivia" | "memory" } = {
    data: scoreData,
    game: "memory"
  }

  saveScore(score);

}

export { getMemoryCards, saveMemoryScore, getMemoryScoreboard };
