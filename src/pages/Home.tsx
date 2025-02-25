import React from "react";
import searchStatus from "../types/SearchStatus";
import NenhumUsuarioEncontrado from "../fragments/NenhumUsuarioEncontrado";
import InstrucaoProcureNome from "../fragments/InstrucaoProcureNome";

interface HomeProps {
  searchText: string;
  searchLoadingStatus: searchStatus;
}

const Home: React.FC<HomeProps> = ({ searchText, searchLoadingStatus }) => {
  return (
    <>
      {searchLoadingStatus === "initial" && <InstrucaoProcureNome />}
      {searchLoadingStatus === "loading" && "Loading"}
      {searchLoadingStatus === "notFound" && (
        <NenhumUsuarioEncontrado searchText={searchText} />
      )}
      {searchLoadingStatus === "found" && "Found"}
      <br />
      <br />
      <br />
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel illum
      voluptatum nam quisquam maxime nihil assumenda, obcaecati ad?
      {/*
      Dolore,
      totam unde? Magnam reprehenderit aut nam aspernatur velit. Soluta, odio
      error.
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel illum
      voluptatum nam quisquam maxime nihil assumenda, obcaecati ad? Dolore,
      totam unde? Magnam reprehenderit aut nam aspernatur velit. Soluta, odio
      error. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel illum
      voluptatum nam quisquam maxime nihil assumenda, obcaecati ad? Dolore,
      totam unde? Magnam reprehenderit aut nam aspernatur velit. Soluta, odio
      error. */}
    </>
  );
};

export default Home;
