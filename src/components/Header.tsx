import React, { useEffect, useState } from "react";

import ProcureNomeText from "../fragments/ProcureNomeText";
import EncontreRepositoriosText from "../fragments/EncontreRepositoriosText";

import { useLocation, useNavigate } from "react-router-dom";
import SearchStatus from "../types/SearchStatus";

interface HeaderProps {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  searchLoadingStatus: SearchStatus;
  setSearchLoadingStatus: React.Dispatch<React.SetStateAction<SearchStatus>>;
}

const Header: React.FC<HeaderProps> = ({
  searchText,
  setSearchText,
  searchLoadingStatus,
  setSearchLoadingStatus,
}) => {
  const [showText, setShowText] = useState(true);

  const currentLocation = useLocation();

  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchText === "") return;

    setSearchLoadingStatus("loading");
  };

  useEffect(() => {
    if (searchLoadingStatus === "notFound" || searchLoadingStatus === "found") {
      setShowText(false);
      return;
    }

    if (searchLoadingStatus === "initial") {
      setShowText(true);
    }
  }, [searchLoadingStatus]);

  const handleFavorites = () => {
    navigate(
      String(currentLocation.pathname) === "/favorites" ? "/" : "/favorites"
    );
  };

  return (
    <header className="pt-8 pb-0 px-[1.3rem] desktop:pt-0 desktop:pr-0 desktop:border-b desktop:border-border-and-line">
      <div
        className={`desktop:p-0 pb-2 desktop:hidden ${
          showText ? "" : "hidden"
        }`}
      >
        <ProcureNomeText />
      </div>
      <div
        className={`pb-6 desktop:p-0 desktop:hidden ${
          showText ? "" : "hidden"
        }`}
      >
        <EncontreRepositoriosText />
      </div>
      <div className="desktop:flex desktop:row desktop:justify-between desktop:items-center">
        <div
          className="flex justify-between border-border-and-line
              border-[1px] rounded pl-4 pr-4 h-10 desktop:w-[41.75rem] border-solid
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
            value={searchText}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setSearchText(event.target.value)
            }
          />
          <img src="./lupa.svg" className="w-4" onClick={handleSearch} />
        </div>
        <div
          className="bg-primary hidden h-20 w-[145px]
          desktop:flex row items-center justify-center gap-2
          "
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
