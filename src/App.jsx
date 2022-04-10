import { useState, useEffect, createContext, useLayoutEffect } from "react";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import GameDetail from "./pages/GameDetail/GameDetail";
import Footer from "./components/Footer/Footer";

export const AppContext = createContext();

function App() {
  const [platformCategory, setPlatformCategory] = useState("all");
  const [genreCategory, setGenreCategory] = useState("all");
  const [sortbyCategory, setSortbyCategory] = useState("relevance");

  const [search, setSearch] = useState("");
  const [allGameList, setAllGameList] = useState([]);
  const [loadingHome, setLoadingHome] = useState(false);
  const [loadingGameDetail, setLoadingGameDetail] = useState("none");

  const filteredGameList = allGameList.filter((name) => {
    return name.title.toLowerCase().includes(search.toLowerCase());
  });

  // useLayoutEffect(() => {
  //   setLoadingGameDetail("none");
  // }, []);

  return (
    <BrowserRouter>
      <AppContext.Provider
        value={{
          platformCategory,
          setPlatformCategory,

          genreCategory,
          setGenreCategory,

          sortbyCategory,
          setSortbyCategory,

          search,
          setSearch,

          allGameList,
          setAllGameList,

          loadingHome,
          setLoadingHome,

          loadingGameDetail,
          setLoadingGameDetail,

          filteredGameList,
        }}
      >
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/game/:id" element={<GameDetail />} />
          </Routes>
          <Footer />
        </div>
      </AppContext.Provider>
    </BrowserRouter>
  );
}

export default App;
