import { Routes, Route } from "react-router-dom";

import "./App.css";
import SearchPage from "./pages/SearchPage";
import HomePage from "./pages/HomePage";

function App() {

  return (
    <div className="app">

      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>

    </div>
  );
}

export default App;
