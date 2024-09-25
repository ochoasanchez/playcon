import { useEffect, useState } from "react";
import { getTriviaScoreboard } from "../helpers/trivia.helper";
import Loader from "../components/Loader";
import { Scoreboard } from "./Scoreboard";

export function TriviaScoreboard() {
  const [isLoading, setIsloading] = useState(true);
  const [scoreboard, setScoreboard] = useState<ScoreEntry[] | null>(null);

  const getScoreboard = async () => {
    try {
      const scoreboardData = await getTriviaScoreboard();
      setScoreboard(scoreboardData.data);
      setIsloading(false);
    } catch (error) {
      console.error("Error fetching scoreboard:", error);
    }
  };

  useEffect(() => {
    getScoreboard();
  }, []);

  if (isLoading) return <Loader />;

  return <Scoreboard scoreboard={scoreboard!} game="trivia" />;
}
