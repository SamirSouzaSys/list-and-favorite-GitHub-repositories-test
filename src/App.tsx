import React from "react";

import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow text-red-500 px-6 py-6 mb-20">

        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Vel illum voluptatum nam quisquam maxime nihil assumenda, obcaecati ad?
        Dolore, totam unde? Magnam reprehenderit aut nam aspernatur velit.
        Soluta, odio error.
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Vel illum voluptatum nam quisquam maxime nihil assumenda, obcaecati ad?
        Dolore, totam unde? Magnam reprehenderit aut nam aspernatur velit.
        Soluta, odio error.
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Vel illum voluptatum nam quisquam maxime nihil assumenda, obcaecati ad?
        Dolore, totam unde? Magnam reprehenderit aut nam aspernatur velit.
        Soluta, odio error.
      </div>
      <Footer />
    </div>
  );
}

export default App;
