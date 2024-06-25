import { Route, Routes } from "react-router-dom"
import { Home } from './pages/Home'
import { Menu } from './pages/Menu'
import { Form } from './pages/Form'
import { Trivia } from './pages/Trivia'
import { Memory } from './pages/MemoryLegacy'
import { Participate } from './pages/Participate'
import { Raffle } from './pages/Raffle'

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
    </Routes>
  )
}

export default App;