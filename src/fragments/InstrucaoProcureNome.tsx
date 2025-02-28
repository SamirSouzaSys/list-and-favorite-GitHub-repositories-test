import React from "react";

const InstrucaoProcureNome = () => {
  return (
    <>
      <div
        className="hidden 
        text-center desktop:grid justify-center desktop:pt-[7rem]"
      >
        <h1
          className="font-poppins text-heading-1
        text-grey-neutral font-semibold"
        >
          Procure pelo Nome ou Nome de Usuário
        </h1>
        <p
          className="font-poppins font-regular text-heading-5
        text-grey-neutral"
        >
          Encontre os repositórios de algum usuário digitando no campo acima
        </p>
        <img
          src="./people_search.svg"
          className="w-[14.375rem] pt-8
          ml-44
        "
        />
      </div>
    </>
  );
};

export default InstrucaoProcureNome;
