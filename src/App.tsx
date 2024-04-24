import { Route, Routes } from "react-router-dom"
import { Home } from './pages/Home'
import { Trivia } from './pages/Trivia'

function App() {
  return (
    <Routes>
    <Route path="/" element={<Home />} />
      <Route path="/trivia" element={<Trivia />} />
    </Routes>
  )
}

export default App;