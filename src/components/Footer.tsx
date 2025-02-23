import React from "react";

const Footer = () => {
  return (
    <div
      className="
        flex w-full
        fixed
        bottom-0 left-0
        desktop:hidden"
    >
      <div
        className="bg-primary h-20 w-full
          flex row items-center justify-center"
        onClick={() => alert("Click na pessoa")}
      >
        <img src="./pessoa.svg" className="w-6" />
      </div>
      <div
        className="bg-white-background-light h-20 w-full
          flex row items-center justify-center"
        onClick={() => alert("Click no coração preenchido")}
      >
        <img src="./coracao-preenchido.svg" className="w-6" />
      </div>
    </div>
  );
};

export default Footer;
