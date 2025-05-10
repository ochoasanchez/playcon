import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Menu } from "./pages/Menu";
import { Form } from "./pages/Form";
import { Trivia } from "./pages/Trivia";
import { Memory } from "./pages/MemoryLegacy";
import { RaffleMenu } from "./pages/RaffleMenu";
import { Raffle } from "./pages/Raffle";
import { MemoryScoreboard } from "./pages/MemoryScoreboard";
import { TriviaScoreboard } from "./pages/TriviaScoreboard";
import { Clear } from "./pages/Clear";
import { Dashboard } from "./pages/Dashboard";
import { Sync } from "./pages/Sync";
import { Users } from "./pages/Users";
import { Participate } from "./pages/Participate";
import { Onboarding } from "./pages/Onboarding";
import { SpinningWheel } from "./pages/Wheel";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Onboarding />} />
      <Route path="/start" element={<Home />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/form" element={<Form />} />
      <Route path="/form/:player" element={<Form />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/trivia" element={<Trivia />} />
      <Route path="/memory" element={<Memory />} />
      <Route path="/wheel" element={<SpinningWheel />} />
      <Route path="/sorteo" element={<RaffleMenu />} />
      <Route path="/sorteo/:tipo" element={<Raffle />} />
      <Route path="/memory/scoreboard" element={<MemoryScoreboard />} />
      <Route path="/trivia/scoreboard" element={<TriviaScoreboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/participate" element={<Participate />} />
      <Route path="/sync" element={<Sync />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/users" element={<Users />} />
      <Route path="/clear" element={<Clear />} />
    </Routes>
  );
}

export default App;
