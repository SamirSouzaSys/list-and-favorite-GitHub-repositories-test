import React from "react";

interface NenhumUsuarioEncontradoProps {
  searchText: string;
}

const NenhumUsuarioEncontrado: React.FC<NenhumUsuarioEncontradoProps> = ({
  searchText,
}) => {
  return (
    <>
      <div className="text-center pt-3 desktop:hidden">
        <h4
          className="font-poppins text-heading-4
          text-primary font-semibold "
        >
          "{searchText}"
        </h4>

        <h4
          className="font-poppins text-heading-4
        text-grey-neutral font-semibold pt-1"
        >
          Nenhum usuário encontrado
        </h4>
        <p
          className="font-poppins font-regular text-paragraph-md
        text-grey-neutral pt-1"
        >
          Verifique se a escrita está correta ou tente novamente
        </p>
      </div>

      <div
        className="hidden 
        text-center desktop:grid justify-center desktop:pt-[7rem]"
      >
        <h4
          className="font-poppins text-heading-1
          text-primary font-semibold hidden desktop:block"
        >
          "{searchText}"
        </h4>
        <h4
          className="font-poppins text-heading-1
        text-grey-neutral font-semibold"
        >
          Nenhum usuário encontrado
        </h4>
        <p
          className="font-poppins font-regular text-heading-5
        text-grey-neutral"
        >
          Verifique se a escrita está correta ou tente novamente
        </p>
        <img src="./people_not_found.svg"
        className="w-[24.938rem] pt-8 ml-8"/>

      </div>
    </>
  );
};

export default NenhumUsuarioEncontrado;
