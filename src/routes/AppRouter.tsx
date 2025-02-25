import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Favorites from "../pages/Favorites";
import Header from "../components/Header";
import Footer from "../components/Footer";

import SearchStatus from "../types/SearchStatus";

const AppRouter = () => {
  const [searchText, setSearchText] = useState("");
  const [searchLoadingStatus, setSearchLoadingStatus] =
    useState<SearchStatus>("initial");

  useEffect(() => {
    if (searchText === "") setSearchLoadingStatus("initial");
  }, [searchText]);

  useEffect(() => {
    if (searchLoadingStatus === "loading")
      setTimeout(() => {
        const randomNumber = Math.floor(Math.random() * 10);
        const isEven = randomNumber % 2 === 0;

        setSearchLoadingStatus(isEven ? "found" : "notFound");
      }, 500);
  }, [searchLoadingStatus]);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header
          searchText={searchText}
          setSearchText={setSearchText}
          searchLoadingStatus={searchLoadingStatus}
          setSearchLoadingStatus={setSearchLoadingStatus}
        />

        <div className="flex-grow text-red-500 px-6 py-6 mb-20">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  searchText={searchText}
                  searchLoadingStatus={searchLoadingStatus}
                />
              }
            />
            <Route path="favorites" element={<Favorites />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
};

export default AppRouter;
