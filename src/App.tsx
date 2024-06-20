import { Route, Routes } from "react-router-dom"
import { Home } from './pages/Home'
import { Menu } from './pages/Menu'
import { Form } from './pages/Form'
import { Trivia } from './pages/Trivia'
import { Memory } from './pages/MemoryLegacy'

function App() {
  return (
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/form" element={<Form />} />
    <Route path="/menu" element={<Menu />} />
      <Route path="/trivia" element={<Trivia />} />
      <Route path="/memory" element={<Memory />} />
    </Routes>
  )
}

export default App;