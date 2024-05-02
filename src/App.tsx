import { Route, Routes } from "react-router-dom"
import { Home } from './pages/Home'
import { Trivia } from './pages/Trivia'
import { Memory } from './pages/Memory'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/trivia" element={<Trivia />} />
      <Route path="/memory" element={<Memory />} />
    </Routes>
  )
}

export default App;