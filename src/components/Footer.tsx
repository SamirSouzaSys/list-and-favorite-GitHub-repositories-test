import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

type pageOptions = "profiles" | "favorites";

const SelectBgColorAndIcon = {
  selected: {
    backgroundColor: "bg-primary",
    icons: {
      person: "pessoa-selecionada.svg",
      heart: "coracao-selecionado.svg",
    },
  },
  notSelected: {
    backgroundColor: "bg-white-background-light",
    icons: {
      person: "pessoa-nao-selecionada.svg",
      heart: "coracao-nao-selecionado.svg",
    },
  },
};

const Footer = () => {
  const currentLocation = useLocation();

  const [selectedOption, setSelectedOption] = useState<pageOptions>("profiles");

  const navigate = useNavigate();

  const handleSelectedOption = (option: pageOptions) => {
    if (option === selectedOption) return;

    setSelectedOption(option);

    navigate(option === "favorites" ? "/favorites" : "/");
  };

  useEffect(() => {
    setSelectedOption(
      String(currentLocation.pathname) === "/favorites"
        ? "favorites"
        : "profiles"
    );
  }, [currentLocation]);

  return (
    <div
      className="
        flex w-full
        fixed
        bottom-0 left-0
        desktop:hidden
        h-[4.313rem]
        drop-shadow-[2px_2px_4px_rgba(0,0,0,0.15)]
        "
    >
      <div
        className={`${
          selectedOption === "profiles"
            ? SelectBgColorAndIcon.selected.backgroundColor
            : SelectBgColorAndIcon.notSelected.backgroundColor
        } bg-primary 
         w-full flex row items-center justify-center`}
        onClick={() => handleSelectedOption("profiles")}
      >
        <img
          src={`${
            selectedOption === "profiles"
              ? SelectBgColorAndIcon.selected.icons.person
              : SelectBgColorAndIcon.notSelected.icons.person
          }`}
          className="w-5"
        />
      </div>
      <div
        className={`${
          selectedOption === "favorites"
            ? SelectBgColorAndIcon.selected.backgroundColor
            : SelectBgColorAndIcon.notSelected.backgroundColor
        }
        w-full flex row items-center justify-center
        `}
        onClick={() => handleSelectedOption("favorites")}
      >
        <img
          src={`${
            selectedOption === "favorites"
              ? SelectBgColorAndIcon.selected.icons.heart
              : SelectBgColorAndIcon.notSelected.icons.heart
          }`}
          className="w-6"
        />
      </div>
    </div>
  );
};

export default Footer;
