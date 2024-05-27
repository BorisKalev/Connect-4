import { useState } from "react";
import "./App.css";
import Connect4 from "./Components/Connect4";
import Modal from "./Components/Modal";

function App() {
  return (
    <>
      <Connect4>
        <Modal></Modal>
      </Connect4>
    </>
  );
}

export default App;
