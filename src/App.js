import "./App.css";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import MainPage from "./Pages/Mainpage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/feeds" element={<MainPage />} />
      </Routes>
    </div>
  );
}

export default App;
