import * as ingredient from "./ingredients";
import {
  Burger,
  Nugget,
  IceCream,
  Side,
  Drink,
  FinalProductBurger,
  FinalProductDessert,
  FinalProductDrink,
  FinalProductSide,
} from "../interfaces/produitsInterfaces";

export const nuggetsName: string[] = [
  "Boite de 3 nuggets",
  "Boite de 6 nuggets",
  "Boite de 18 nuggets",
];

export const burgersName: string[] = [
  "Fish N Pan",
  "Special Bu",
  "Classic Big",
  "Prim'S Bu boeuf",
  "Prim'S Bu poulet",
  "Prim'S Bu poisson",
  "Opti Bacon",
  "Big Cheese Origin",
  "Italicain",
  "Bacon Basic",
  "English Touch",
  "Cheese Origin",
  "Origin Burger",
  "Pouce",
  "Goaty Wrap",
  "Classy Wrap",
];

function nugget(): FinalProductBurger[] {
  const nombre: number[] = [3, 6, 18];
  const priceNugget: number[] = [4, 6, 15];
  const allNuggets: FinalProductBurger[] = [];
  for (let i = 0; i < nuggetsName.length; i++) {
    const singleNugget: Nugget = {
      nuggetQuantity: nombre[i],
    };
    const finalNugget: FinalProductBurger = {
      name: nuggetsName[i],
      ingredient: singleNugget,
      size: ingredient.size[i].capacity,
      timeId: 0,
      timeObject: 0,
      price: priceNugget[i],
      type: "nugget",
    };

    allNuggets.push(finalNugget);
  }
  return allNuggets;
}

export const allNuggets: FinalProductBurger[] = nugget();

export const fishNPan: Burger = {
  bread: ingredient.bread[7].nom,
  meat: ingredient.frying[2].nom,
  cheese: [ingredient.cheese[0].nom, ingredient.cheese[1].nom],
  variousIngredient: [
    ingredient.variousIngredient[0].nom,
    ingredient.variousIngredient[1].nom,
  ],
  sauce: [ingredient.sauce[0].nom],
};

export const specialBu: Burger = {
  bread: ingredient.bread[0].nom,
  meat: ingredient.meat[2].nom,
  cheese: [ingredient.cheese[0].nom],
  variousIngredient: [
    ingredient.variousIngredient[2].nom,
    ingredient.variousIngredient[0].nom,
    ingredient.variousIngredient[3].nom,
  ],
  sauce: [ingredient.sauce[1].nom],
};

export const classicBig: Burger = {
  bread: ingredient.bread[1].nom,
  meat: ingredient.meat[4].nom,
  cheese: [ingredient.cheese[1].nom],
  variousIngredient: [
    ingredient.variousIngredient[1].nom,
    ingredient.variousIngredient[0].nom,
    ingredient.variousIngredient[2].nom,
  ],
  sauce: [ingredient.sauce[2].nom],
};

export const primSBuBoeuf: Burger = {
  bread: ingredient.bread[2].nom,
  meat: ingredient.meat[5].nom,
  cheese: [ingredient.cheese[0].nom],
  variousIngredient: [
    ingredient.variousIngredient[1].nom,
    ingredient.variousIngredient[0].nom,
    ingredient.variousIngredient[2].nom,
  ],
  sauce: [ingredient.sauce[3].nom, ingredient.sauce[4].nom],
};

export const primSBuPoulet: Burger = {
  bread: ingredient.bread[2].nom,
  meat: ingredient.frying[3].nom,
  cheese: [ingredient.cheese[0].nom],
  variousIngredient: [
    ingredient.variousIngredient[1].nom,
    ingredient.variousIngredient[0].nom,
    ingredient.variousIngredient[2].nom,
  ],
  sauce: [ingredient.sauce[3].nom, ingredient.sauce[4].nom],
};

export const primSBuPoisson: Burger = {
  bread: ingredient.bread[2].nom,
  meat: ingredient.frying[1].nom,
  cheese: [ingredient.cheese[0].nom],
  variousIngredient: [
    ingredient.variousIngredient[1].nom,
    ingredient.variousIngredient[0].nom,
    ingredient.variousIngredient[2].nom,
  ],
  sauce: [ingredient.sauce[3].nom, ingredient.sauce[4].nom],
};

export const optiBacon: Burger = {
  bread: ingredient.bread[1].nom,
  meat: ingredient.meat[4].nom,
  cheese: [ingredient.cheese[0].nom],
  variousIngredient: [
    ingredient.variousIngredient[4].nom,
    ingredient.variousIngredient[5].nom,
    ingredient.variousIngredient[2].nom,
  ],
  sauce: [ingredient.sauce[3].nom, ingredient.sauce[5].nom],
};

export const bigCheeseOrigin: Burger = {
  bread: ingredient.bread[1].nom,
  meat: ingredient.meat[4].nom,
  cheese: [ingredient.cheese[0].nom],
  variousIngredient: [
    ingredient.variousIngredient[5].nom,
    ingredient.variousIngredient[2].nom,
  ],
  sauce: [ingredient.sauce[3].nom, ingredient.sauce[5].nom],
};

export const italicain: Burger = {
  bread: ingredient.bread[3].nom,
  meat: ingredient.meat[4].nom,
  cheese: [ingredient.cheese[2].nom, ingredient.cheese[1].nom],
  variousIngredient: [ingredient.variousIngredient[1].nom],
  sauce: [ingredient.sauce[0].nom],
};

export const baconBasic: Burger = {
  bread: ingredient.bread[4].nom,
  meat: ingredient.meat[4].nom,
  cheese: [ingredient.cheese[0].nom],
  variousIngredient: [
    ingredient.variousIngredient[4].nom,
    ingredient.variousIngredient[0].nom,
    ingredient.variousIngredient[6].nom,
  ],
  sauce: [ingredient.sauce[0].nom],
};

export const englishTouch: Burger = {
  bread: ingredient.bread[5].nom,
  meat: ingredient.meat[1].nom,
  cheese: [ingredient.cheese[0].nom],
};

export const cheeseOrigin: Burger = {
  bread: ingredient.bread[6].nom,
  meat: ingredient.meat[3].nom,
  cheese: [ingredient.cheese[0].nom],
  variousIngredient: [
    ingredient.variousIngredient[2].nom,
    ingredient.variousIngredient[5].nom,
  ],
  sauce: [ingredient.sauce[3].nom, ingredient.sauce[5].nom],
};

export const originBurger: Burger = {
  bread: ingredient.bread[6].nom,
  meat: ingredient.meat[3].nom,
  variousIngredient: [
    ingredient.variousIngredient[5].nom,
    ingredient.variousIngredient[2].nom,
  ],
  sauce: [ingredient.sauce[3].nom, ingredient.sauce[5].nom],
};

export const pouce: Burger = {
  bread: ingredient.bread[6].nom,
  meat: ingredient.meat[0].nom,
  cheese: [ingredient.cheese[1].nom],
};

export const goatyWrap: Burger = {
  bread: ingredient.bread[8].nom,
  meat: ingredient.meat[6].nom,
  variousIngredient: [
    ingredient.variousIngredient[0].nom,
    ingredient.variousIngredient[1].nom,
    ingredient.variousIngredient[6].nom,
  ],
  sauce: [ingredient.sauce[0].nom],
};

export const classyWrap: Burger = {
  bread: ingredient.bread[8].nom,
  meat: ingredient.meat[0].nom,
  cheese: [ingredient.cheese[0].nom],
  variousIngredient: [
    ingredient.variousIngredient[4].nom,
    ingredient.variousIngredient[1].nom,
    ingredient.variousIngredient[0].nom,
  ],
  sauce: [ingredient.sauce[0].nom],
};

const burgersRecipes: Burger[] = [
  fishNPan,
  specialBu,
  classicBig,
  primSBuBoeuf,
  primSBuPoulet,
  primSBuPoisson,
  optiBacon,
  bigCheeseOrigin,
  italicain,
  baconBasic,
  englishTouch,
  cheeseOrigin,
  originBurger,
  pouce,
  goatyWrap,
  classyWrap,
];

function getAllBurger(): FinalProductBurger[] {
  const burgerPrice: number[] = [
    8, 8, 12, 5, 5, 5, 12, 15, 15, 12, 6, 6, 6, 4, 10, 10,
  ];
  const burgerSize: number[] = [3, 3, 3, 2, 2, 2, 3, 3, 3, 3, 1, 1, 1, 1, 3, 3];
  const allBurgers: FinalProductBurger[] = [];
  for (let i = 0; i < burgersName.length; i++) {
    const singleBurger = {
      name: burgersName[i],
      ingredient: burgersRecipes[i],
      size: burgerSize[i],
      timeId: 0,
      timeObject: 0,
      price: burgerPrice[i],
      type: "burger",
    };
    allBurgers.push(singleBurger);
  }
  return allBurgers;
}

export const allBurgers: FinalProductBurger[] = getAllBurger();

function getIceCream(): FinalProductDessert[] {
  const allIceCream: FinalProductDessert[] = [];
  for (let i = 0; i < 2; i++) {
    for (let j = 2; j < ingredient.iceCream.length; j++) {
      const recipeIC: IceCream = {
        coulisTopping: [ingredient.iceCream[i].nom, ingredient.iceCream[j].nom],
      };
      const singleIC: FinalProductDessert = {
        name: `Glace ${recipeIC.coulisTopping[0]} ${recipeIC.coulisTopping[1]}`,
        ingredient: recipeIC,
        size: 2,
        timeId: 0,
        timeObject: 0,
        price: 5,
        type: "glace",
      };
      allIceCream.push(singleIC);
    }
  }
  return allIceCream;
}

export const allIceCream: FinalProductDessert[] = getIceCream();

function getFries(): FinalProductSide[] {
  const price = [4, 6, 8];
  const allFries: FinalProductSide[] = [];

  for (let i = 0; i < ingredient.fries.length; i++) {
    for (let j = 0; j < price.length; j++) {
      const recipeFrie: Side = {
        side: `${ingredient.size[j].name} ${ingredient.fries[i].nom}`,
      };
      const finalFrie: FinalProductSide = {
        name: recipeFrie.side,
        ingredient: recipeFrie,
        size: ingredient.size[j].capacity,
        timeId: 0,
        timeObject: 0,
        price: price[j],
        type: "fries",
      };
      allFries.push(finalFrie);
    }
  }
  return allFries;
}

export const allFries: FinalProductSide[] = getFries();

export const salad: Side = {
  side: ingredient.freshProduct[0].nom,
};

export const vegetable: Side = {
  side: ingredient.freshProduct[1].nom,
};

export const drinkingYaourt: Side = {
  side: ingredient.freshProduct[2].nom,
};

export const fruits: Side = {
  side: ingredient.freshProduct[3].nom,
};

function getFreshSide(): FinalProductSide[] {
  const allFreshSide: FinalProductSide[] = [];
  const recipeSide: Side[] = [salad, vegetable, drinkingYaourt, fruits];
  const price: number[] = [3, 3, 3, 3];
  const size: number[] = [1, 1, 1, 1];

  for (let i = 0; i < recipeSide.length; i++) {
    const singleSide: FinalProductSide = {
      name: recipeSide[i].side,
      ingredient: recipeSide[i],
      size: size[i],
      timeId: 0,
      timeObject: 0,
      price: price[i],
      type: "side",
    };
    allFreshSide.push(singleSide);
  }

  return allFreshSide;
}

export const allFreshSide: FinalProductSide[] = getFreshSide();

function getDrink(): FinalProductDrink[] {
  const allDrinks: FinalProductDrink[] = [];
  const price: number[] = [3, 5, 7];

  for (let i = 0; i < price.length; i++) {
    for (let j = 0; j < ingredient.drink.length; j++) {
      const flavour: Drink = {
        flavour: `${ingredient.size[i].name} ${ingredient.drink[j].nom}`,
      };
      const singleDrink: FinalProductDrink = {
        name: flavour.flavour,
        ingredient: flavour,
        size: ingredient.size[i].capacity,
        timeId: 0,
        timeObject: 0,
        price: price[i],
        type: "drink",
      };
      allDrinks.push(singleDrink);
    }
  }
  return allDrinks;
}

export const allDrinks: FinalProductDrink[] = getDrink();

export const allSide: FinalProductSide[] = [...allFries, ...allFreshSide];

export const allProducts: (
  | FinalProductBurger
  | FinalProductDessert
  | FinalProductDrink
  | FinalProductSide
)[] = [...allNuggets, ...allBurgers, ...allIceCream, ...allDrinks, ...allSide];

export const productsForRandom: (
  | FinalProductBurger
  | FinalProductDessert
  | FinalProductDrink
  | FinalProductSide
)[] = [...allProducts, ...allNuggets, ...allBurgers, ...allBurgers];
