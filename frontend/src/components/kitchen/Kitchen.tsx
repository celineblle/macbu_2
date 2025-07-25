import React from "react";
import Fries from "./Fries";
import Nugget from "./Nugget";
import AssemblyKitchen from "./AssemblyKitchen";
import Grill from "./Grill";
import "../../style/Kitchen.css";

function Kitchen() {
  return (
    <div id="kitchenComponent">
      <Fries />
      <Nugget />
      <AssemblyKitchen />
      <Grill />
    </div>
  );
}

export default Kitchen;
