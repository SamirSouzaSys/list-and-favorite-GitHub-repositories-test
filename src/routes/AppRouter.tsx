import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Favorites from "../pages/Favorites";
import Header from "../components/Header";
import Footer from "../components/Footer";

import { GithubUserProvider } from "../context/GithubUser";
import SearchStatus from "../types/SearchStatus";

const AppRouter = () => {
  // const { searchLoadingStatus, setSearchLoadingStatus } = useGithubUser();
  const [searchLoadingStatus, setSearchLoadingStatus] =
    useState<SearchStatus>("initial");

  return (
    <GithubUserProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Header
            searchLoadingStatusProp={searchLoadingStatus}
            setSearchLoadingStatusProp={setSearchLoadingStatus}
          />
          <div className="flex-grow text-black px-6 py-6 mb-20">
            <Routes>
              <Route
                path="/"
                element={
                  <Home
                    searchLoadingStatus={searchLoadingStatus}
                    setSearchLoadingStatus={setSearchLoadingStatus}
                  />
                }
              />
              <Route path="favorites" element={<Favorites />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </GithubUserProvider>
  );
};

export default AppRouter;
