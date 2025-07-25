import React from "react";
import Office from "./components/office/Office";
import Kitchen from "./components/kitchen/Kitchen";
import Counter from "./components/counter/Counter";
import "./style/App.css";

function App() {
  return (
    <div id="homePage">
      <Office />
      <Kitchen />
      <Counter />
    </div>
  );
}

export default App;
