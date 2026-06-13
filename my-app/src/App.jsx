import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import StyleQuiz from "./pages/StyleQuiz";
import Navbar from "./components/Navbar";
import Login from "./pages/Login"
import Footer from "./components/footer";
import OutfitMatcher from "./components/OutfitMatcher";


function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<StyleQuiz />} />
        <Route path="/login" element={<Login />} />
        <Route path="/matcher" element={<OutfitMatcher />} />
      </Routes>

        <Footer/>
    </>

  
  );
}

export default App;