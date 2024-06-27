import { Route, Routes } from "react-router-dom"
import { Home } from './pages/Home'
import { Menu } from './pages/Menu'
import { Form } from './pages/Form'
import { Trivia } from './pages/Trivia'
import { Memory } from './pages/MemoryLegacy'
import { Participate } from './pages/Participate'
import { Raffle } from './pages/Raffle'
import { MemoryScoreboard } from './pages/MemoryScoreboard'
import { TriviaScoreboard } from './pages/TriviaScoreboard'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/form" element={<Form />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/trivia" element={<Trivia />} />
      <Route path="/memory" element={<Memory />} />
      <Route path="/participate" element={<Participate />} />
      <Route path="/sorteo" element={<Raffle />} />
      <Route path="/memory/scoreboard" element={<MemoryScoreboard />} />
      <Route path="/trivia/scoreboard" element={<TriviaScoreboard />} />
    </Routes>
  )
}

export default App;