import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import StyleQuiz from "./pages/StyleQuiz";
import Navbar from "./components/Navbar";
import Login from "./pages/Login"


function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<StyleQuiz />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;