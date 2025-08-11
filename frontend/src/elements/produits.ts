import * as ingredient from "./ingredients";
import {
  Burger,
  Nugget,
  IceCream,
  Drink,
  FinalProductBurger,
  FinalProductDessert,
  FinalProductDrink,
  FinalProductSide,
  FriesSide,
  FinalProductNugget,
  FinalProductBag,
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

function nugget(): FinalProductNugget[] {
  const nombre: number[] = [3, 6, 18];
  const priceNugget: number[] = [4, 6, 15];
  const allNuggets: FinalProductNugget[] = [];
  for (let i = 0; i < nuggetsName.length; i++) {
    const singleNugget: Nugget = {
      nuggetQuantity: nombre[i],
    };
    const finalNugget: FinalProductNugget = {
      name: nuggetsName[i],
      ingredient: singleNugget,
      size: ingredient.size[i].capacity,
      price: priceNugget[i],
      type: "nugget",
    };

    allNuggets.push(finalNugget);
  }
  return allNuggets;
}

export const allNuggets: FinalProductNugget[] = nugget();

export const fishNPan: Burger = {
  bread: ingredient.bread[7].ingredientName,
  meat: ingredient.frying[2].ingredientName,
  cheese: [
    ingredient.cheese[0].ingredientName,
    ingredient.cheese[1].ingredientName,
  ],
  variousIngredient: [
    ingredient.variousIngredient[0].ingredientName,
    ingredient.variousIngredient[1].ingredientName,
  ],
  sauce: [ingredient.sauce[0].ingredientName],
};

export const specialBu: Burger = {
  bread: ingredient.bread[0].ingredientName,
  meat: ingredient.meat[2].ingredientName,
  cheese: [ingredient.cheese[0].ingredientName],
  variousIngredient: [
    ingredient.variousIngredient[2].ingredientName,
    ingredient.variousIngredient[0].ingredientName,
    ingredient.variousIngredient[3].ingredientName,
  ],
  sauce: [ingredient.sauce[1].ingredientName],
};

export const classicBig: Burger = {
  bread: ingredient.bread[1].ingredientName,
  meat: ingredient.meat[4].ingredientName,
  cheese: [ingredient.cheese[1].ingredientName],
  variousIngredient: [
    ingredient.variousIngredient[1].ingredientName,
    ingredient.variousIngredient[0].ingredientName,
    ingredient.variousIngredient[2].ingredientName,
  ],
  sauce: [ingredient.sauce[2].ingredientName],
};

export const primSBuBoeuf: Burger = {
  bread: ingredient.bread[2].ingredientName,
  meat: ingredient.meat[5].ingredientName,
  cheese: [ingredient.cheese[0].ingredientName],
  variousIngredient: [
    ingredient.variousIngredient[1].ingredientName,
    ingredient.variousIngredient[0].ingredientName,
    ingredient.variousIngredient[2].ingredientName,
  ],
  sauce: [
    ingredient.sauce[3].ingredientName,
    ingredient.sauce[4].ingredientName,
  ],
};

export const primSBuPoulet: Burger = {
  bread: ingredient.bread[2].ingredientName,
  meat: ingredient.frying[3].ingredientName,
  cheese: [ingredient.cheese[0].ingredientName],
  variousIngredient: [
    ingredient.variousIngredient[1].ingredientName,
    ingredient.variousIngredient[0].ingredientName,
    ingredient.variousIngredient[2].ingredientName,
  ],
  sauce: [
    ingredient.sauce[3].ingredientName,
    ingredient.sauce[4].ingredientName,
  ],
};

export const primSBuPoisson: Burger = {
  bread: ingredient.bread[2].ingredientName,
  meat: ingredient.frying[1].ingredientName,
  cheese: [ingredient.cheese[0].ingredientName],
  variousIngredient: [
    ingredient.variousIngredient[1].ingredientName,
    ingredient.variousIngredient[0].ingredientName,
    ingredient.variousIngredient[2].ingredientName,
  ],
  sauce: [
    ingredient.sauce[3].ingredientName,
    ingredient.sauce[4].ingredientName,
  ],
};

export const optiBacon: Burger = {
  bread: ingredient.bread[1].ingredientName,
  meat: ingredient.meat[4].ingredientName,
  cheese: [ingredient.cheese[0].ingredientName],
  variousIngredient: [
    ingredient.variousIngredient[4].ingredientName,
    ingredient.variousIngredient[5].ingredientName,
    ingredient.variousIngredient[2].ingredientName,
  ],
  sauce: [
    ingredient.sauce[3].ingredientName,
    ingredient.sauce[5].ingredientName,
  ],
};

export const bigCheeseOrigin: Burger = {
  bread: ingredient.bread[1].ingredientName,
  meat: ingredient.meat[4].ingredientName,
  cheese: [ingredient.cheese[0].ingredientName],
  variousIngredient: [
    ingredient.variousIngredient[5].ingredientName,
    ingredient.variousIngredient[2].ingredientName,
  ],
  sauce: [
    ingredient.sauce[3].ingredientName,
    ingredient.sauce[5].ingredientName,
  ],
};

export const italicain: Burger = {
  bread: ingredient.bread[3].ingredientName,
  meat: ingredient.meat[4].ingredientName,
  cheese: [
    ingredient.cheese[2].ingredientName,
    ingredient.cheese[1].ingredientName,
  ],
  variousIngredient: [ingredient.variousIngredient[1].ingredientName],
  sauce: [ingredient.sauce[0].ingredientName],
};

export const baconBasic: Burger = {
  bread: ingredient.bread[4].ingredientName,
  meat: ingredient.meat[4].ingredientName,
  cheese: [ingredient.cheese[0].ingredientName],
  variousIngredient: [
    ingredient.variousIngredient[4].ingredientName,
    ingredient.variousIngredient[0].ingredientName,
    ingredient.variousIngredient[6].ingredientName,
  ],
  sauce: [ingredient.sauce[0].ingredientName],
};

export const englishTouch: Burger = {
  bread: ingredient.bread[5].ingredientName,
  meat: ingredient.meat[1].ingredientName,
  cheese: [ingredient.cheese[0].ingredientName],
};

export const cheeseOrigin: Burger = {
  bread: ingredient.bread[6].ingredientName,
  meat: ingredient.meat[3].ingredientName,
  cheese: [ingredient.cheese[0].ingredientName],
  variousIngredient: [
    ingredient.variousIngredient[2].ingredientName,
    ingredient.variousIngredient[5].ingredientName,
  ],
  sauce: [
    ingredient.sauce[3].ingredientName,
    ingredient.sauce[5].ingredientName,
  ],
};

export const originBurger: Burger = {
  bread: ingredient.bread[6].ingredientName,
  meat: ingredient.meat[3].ingredientName,
  variousIngredient: [
    ingredient.variousIngredient[5].ingredientName,
    ingredient.variousIngredient[2].ingredientName,
  ],
  sauce: [
    ingredient.sauce[3].ingredientName,
    ingredient.sauce[5].ingredientName,
  ],
};

export const pouce: Burger = {
  bread: ingredient.bread[6].ingredientName,
  meat: ingredient.meat[0].ingredientName,
  cheese: [ingredient.cheese[1].ingredientName],
};

export const goatyWrap: Burger = {
  bread: ingredient.bread[8].ingredientName,
  meat: ingredient.meat[5].ingredientName,
  variousIngredient: [
    ingredient.variousIngredient[0].ingredientName,
    ingredient.variousIngredient[1].ingredientName,
    ingredient.variousIngredient[6].ingredientName,
  ],
  sauce: [ingredient.sauce[0].ingredientName],
};

export const classyWrap: Burger = {
  bread: ingredient.bread[8].ingredientName,
  meat: ingredient.meat[0].ingredientName,
  cheese: [ingredient.cheese[0].ingredientName],
  variousIngredient: [
    ingredient.variousIngredient[4].ingredientName,
    ingredient.variousIngredient[1].ingredientName,
    ingredient.variousIngredient[0].ingredientName,
  ],
  sauce: [ingredient.sauce[0].ingredientName],
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
      bread: "type",
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
        coulisTopping: [
          ingredient.iceCream[i].ingredientName,
          ingredient.iceCream[j].ingredientName,
        ],
        melted: false,
      };
      const singleIC: FinalProductDessert = {
        name: `Glace ${recipeIC.coulisTopping[0]} ${recipeIC.coulisTopping[1]}`,
        ingredient: recipeIC,
        size: 2,
        timeId: 0,
        dateId: 0,
        price: 5,
        type: "glace",
        dessert: "type",
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
      const recipeFrie: FriesSide = {
        side: `${ingredient.size[j].name} ${ingredient.fries[i].ingredientName}`,
        grilled: false,
      };
      const finalFrie: FinalProductSide = {
        name: recipeFrie.side,
        ingredient: recipeFrie,
        size: ingredient.size[j].capacity,
        timeId: 0,
        dateId: 0,
        price: price[j],
        type: "fries",
        side: "type",
      };
      allFries.push(finalFrie);
    }
  }
  return allFries;
}

export const allFries: FinalProductSide[] = getFries();

function getDrink(): FinalProductDrink[] {
  const allDrinks: FinalProductDrink[] = [];
  const price: number[] = [3, 5, 7];

  for (let i = 0; i < price.length; i++) {
    for (let j = 0; j < ingredient.drink.length; j++) {
      const flavour: Drink = {
        flavour: `${ingredient.size[i].name} ${ingredient.drink[j].ingredientName}`,
      };
      const singleDrink: FinalProductDrink = {
        name: flavour.flavour,
        ingredient: flavour,
        size: ingredient.size[i].capacity,
        timeId: 0,
        dateId: 0,
        price: price[i],
        type: "drink",
        drink: "type",
      };
      allDrinks.push(singleDrink);
    }
  }
  return allDrinks;
}

export const allDrinks: FinalProductDrink[] = getDrink();

export const allProducts: (
  | FinalProductBurger
  | FinalProductDessert
  | FinalProductDrink
  | FinalProductSide
  | FinalProductNugget
)[] = [
  ...allNuggets,
  ...allBurgers,
  ...allIceCream,
  ...allDrinks,
    ...allFries,
];

export const productsForRandom: (
  | FinalProductBurger
  | FinalProductDessert
  | FinalProductDrink
  | FinalProductSide
  | FinalProductNugget
)[] = [
  ...allProducts,
    ...allNuggets,
  ...allFries,
  ...allFries,
...allDrinks,
  ...allBurgers,
  ...allBurgers,
];

function getBag(): FinalProductBag[] {
  const allBags: FinalProductBag[] = [];
  const capacity: number[] = [7, 14, 21];

  for (let i = 0; i < ingredient.bag.length; i++) {
    const uniqueBag: FinalProductBag = {
      name: ingredient.bag[i].ingredientName,
      ingredient: {
        capacity: capacity[i],
      },
      size: 0,
      price: 0,
      type: "bag",
      bag: "type",
    };
    allBags.push(uniqueBag)
  }
  return allBags
}

export const allBags: FinalProductBag[] = getBag()