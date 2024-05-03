import { Route, Routes } from "react-router-dom"
import { Home } from './pages/Home'
import { Form } from './pages/Form'
import { Trivia } from './pages/Trivia'
import { Memory } from './pages/Memory'

function App() {
  return (
    <Routes>
    <Route path="/" element={<Home />} />
      <Route path="/form" element={<Form />} />
      <Route path="/trivia" element={<Trivia />} />
      <Route path="/memory" element={<Memory />} />
    </Routes>
  )
}

export default App;