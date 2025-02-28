import React, { useEffect, useState } from "react";

import ProcureNomeText from "../fragments/ProcureNomeText";
import EncontreRepositoriosText from "../fragments/EncontreRepositoriosText";

import { useLocation, useNavigate } from "react-router-dom";
import SearchStatus from "../types/SearchStatus";
import { usePaginateGHProfileRepos } from "../hooks/useGitHubRepos";

interface HeaderProps {
  searchLoadingStatusProp: SearchStatus;
  setSearchLoadingStatusProp: React.Dispatch<
    React.SetStateAction<SearchStatus>
  >;
}

const Header: React.FC<HeaderProps> = ({
  searchLoadingStatusProp,
  setSearchLoadingStatusProp,
}) => {
  const {
    username,
    setUsername,
    user,
    loadingSearch,
    error,
    fetchGithubData,
    hasMore,
  } = usePaginateGHProfileRepos();

  const [showInstructionText, setShowInstructionText] = useState(true);
  const currentLocation = useLocation();

  const navigate = useNavigate();
  const searchLoadingStatusTrue = searchLoadingStatusProp === "loading";
  const isFavoritePage = String(currentLocation.pathname) === "/favorites";

  const handleSearch = () => {
    if (
      username === "" ||
      searchLoadingStatusTrue ||
      isFavoritePage ||
      (user?.login.toLowerCase() === username.toLowerCase() && !hasMore)
    )
      return;

    setSearchLoadingStatusProp("loading");
  };

  useEffect(() => {
    if (
      searchLoadingStatusProp === "errorNotFoundUser" ||
      searchLoadingStatusProp === "found"
    ) {
      setShowInstructionText(false);
      return;
    }

    if (searchLoadingStatusProp === "initial") {
      setShowInstructionText(true);
    }

    if (searchLoadingStatusProp === "loading") {
      if (user?.login.toLowerCase() !== username.toLowerCase()) {
        fetchGithubData(true);
      } else {
        fetchGithubData();
      }
    }
  }, [searchLoadingStatusProp]);

  useEffect(() => {
    if (username === "") setSearchLoadingStatusProp("initial");
  }, [username]);

  useEffect(() => {
    if (searchLoadingStatusTrue && !loadingSearch) {
      if (error) {
        const errorType = error.toLowerCase().includes("usuário")
          ? "errorNotFoundUser"
          : "errorNotFoundRepo";

        setSearchLoadingStatusProp(errorType);
      } else {
        setSearchLoadingStatusProp("found");
      }
    }
  }, [loadingSearch]);

  const handleFavorites = () => {
    navigate(isFavoritePage ? "/" : "/favorites");
  };

  return (
    <header className="pt-8 pb-0 px-[1.3rem] desktop:pt-0 desktop:pr-0 desktop:border-b desktop:border-border-and-line">
      <div
        className={`desktop:p-0 pb-2 desktop:hidden ${
          showInstructionText ? "" : "hidden"
        }`}
      >
        <ProcureNomeText />
      </div>
      <div
        className={`pb-6 desktop:p-0 desktop:hidden ${
          showInstructionText ? "" : "hidden"
        }`}
      >
        <EncontreRepositoriosText />
      </div>
      <div className="desktop:flex desktop:row desktop:justify-between desktop:items-center">
        <div
          className="flex justify-between border-border-and-line
              border-[1px]  border-solid rounded
              pl-4 pr-4 h-10 desktop:w-[41.75rem]
          "
        >
          <input
            placeholder="Buscar usuário"
            className="
              bg-white-background-light
              text-grey-dark placeholder-placeholder 
              max-w-[220px]
              desktop:max-w-[600px]
              desktop:w-[600px]
              focus:border-transparent focus:outline-none
              "
            value={username}
            onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
              setUsername(event.target.value);
            }}
          />
          <img
            src={`${searchLoadingStatusTrue ? "./loading.gif" : "./lupa.svg"}`}
            className={`w-4 ${searchLoadingStatusTrue ? "h-4 mt-3" : ""}`}
            onClick={handleSearch}
          />
        </div>
        <div
          className={`bg-primary hidden h-20 w-[145px]
          desktop:flex row items-center justify-center gap-2
        ${
          isFavoritePage
            ? "aria-selected:bg-primary-dark aria-selected:shadow-lg"
            : ""
        }`}
          aria-selected={isFavoritePage}
          onClick={handleFavorites}
        >
          <img
            src="./coracao-nao-preenchido-borda-branca.svg"
            className="w-6"
          />
          <div
            className="font-poppins font-regular text-paragraph-md
          text-white-background-light font-normal"
          >
            Favoritos
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
