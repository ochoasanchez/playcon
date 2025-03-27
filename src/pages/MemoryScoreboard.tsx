import { useEffect, useState } from "react";
import { getMemoryScores } from "../utils/db";
// import { getMemoryScoreboard } from "../helpers/memory.helper";
import Loader from "../components/Loader";
import { Scoreboard } from "./Scoreboard";

export function MemoryScoreboard() {
  const [isLoading, setIsloading] = useState(true);
  const [scoreboard, setScoreboard] = useState<ScoreType[] | null>(null);

  const getScoreboard = async () => {
      const scoreboardData = await getMemoryScores();

      setScoreboard(scoreboardData);
      setIsloading(false);
  };

  useEffect(() => {
    getScoreboard();
  }, []);

  if (isLoading) return <Loader />;

  return (
    <Scoreboard scoreboard={scoreboard!} game="memory" />
  );
}
