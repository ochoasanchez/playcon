import { useEffect, useState } from "react";
import { getMemoryScoreboard } from "../helpers/memory.helper";
import Loader from "../components/Loader";
import { Scoreboard } from "./Scoreboard";

export function MemoryScoreboard() {
  const [isLoading, setIsloading] = useState(true);
  const [scoreboard, setScoreboard] = useState<ScoreAttributes[] | null>(null);

  const getScoreboard = () => {
      const scoreboardData = getMemoryScoreboard();

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
