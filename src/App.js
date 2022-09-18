import "./App.css";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import MainPage from "./Pages/Mainpage";
import NGOsPage from "./Pages/NgoPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/feeds" element={<MainPage />} />
        <Route path="/ngo" element={<NGOsPage />} />
      </Routes>
    </div>
  );
}

export default App;
