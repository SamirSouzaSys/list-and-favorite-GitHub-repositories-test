import React, { useState } from "react";

import ProcureNomeText from "../fragments/ProcureNomeText";
import EncontreRepositoriosText from "../fragments/EncontreRepositoriosText";

const Header = () => {
  const [showText, setShowText] = useState(true);

  const handleSearch = () => {
    setShowText((value) => !value);
  };
  
  return (
    <header className="pt-8 px-[1.3rem] desktop:pt-0 desktop:pr-0">
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
              border-2 rounded pl-4 pr-4 h-10 desktop:w-[41.75rem]
          "
        >
          <input
            placeholder="Buscar usuário"
            className="
              bg-white-background-light text-placeholder 
              max-w-[220px]
              focus:border-transparent focus:outline-none
              "
          />
          <img
            src="./lupa.svg"
            className="w-4"
            onClick={handleSearch}
          />
        </div>
        <div
          className="bg-primary hidden h-20 w-[145px]
          desktop:flex row items-center justify-center gap-2
          "
          onClick={() => alert("Click na lupa")}
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
