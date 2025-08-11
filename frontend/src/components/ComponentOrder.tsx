import React from "react";

function ComponentOrder(orderArray: [number, string[]][]) {
  return orderArray.map((order) => (
    <ul key={order[0]} className="readyOrder uniqueProductOrder">
      <li>N° de commande : {order[0]}</li>
      <ul>
        {order[1].map((product) => (
          <li>{product}</li>
        ))}
      </ul>
    </ul>
  ));
}

export default ComponentOrder;
