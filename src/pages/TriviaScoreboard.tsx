import { useEffect, useState } from "react";
import { getTriviaScoreboard } from "../helpers/trivia.helper";
import Loader from "../components/Loader";
import { Scoreboard } from "./Scoreboard";

export function TriviaScoreboard() {
  const [isLoading, setIsloading] = useState(true);
  const [scoreboard, setScoreboard] = useState<ScoreAttributes[] | null>(null);

  const getScoreboard = () => {
    try {
      const scoreboardData = getTriviaScoreboard();
      setScoreboard(scoreboardData);
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
