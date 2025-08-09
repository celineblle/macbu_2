import { Ingredient, Size } from "../interfaces/produitsInterfaces";
import { SectionRawIngredients } from "../interfaces/compositionElementsInterfaces";

export const frying: Ingredient[] = [
  {
    ingredientName: "Nugget poulet",
    price: 40,
    quantity: 30,
    currentStocks: 0,
    timerId: 0,
    dateId: 0,
  },
  {
    ingredientName: "Grand poisson pané",
    price: 40,
    quantity: 20,
    currentStocks: 0,
    timerId: 0,
    dateId: 0,
  },
  {
    ingredientName: "Petit steak poulet pané",
    price: 25,
    quantity: 20,
    currentStocks: 0,
    timerId: 0,
    dateId: 0,
  },
  {
    ingredientName: "Grand steak poulet pané",
    price: 35,
    quantity: 20,
    currentStocks: 0,
    timerId: 0,
    dateId: 0,
  },
  {
    ingredientName: "Palet chêvre",
    price: 20,
    quantity: 20,
    currentStocks: 0,
    timerId: 0,
    dateId: 0,
  },
];

export const fryingSection: SectionRawIngredients = {
  sectionName: "frying",
  title: "Friture",
  productionArray: frying,
};

export const bread: Ingredient[] = [
  {
    ingredientName: "Pain sésame 3 tranches",
    price: 30,
    quantity: 30,
    currentStocks: 10,
    timerId: 0,
    dateId: 0,
  },
  {
    ingredientName: "Grand pain sésame",
    price: 20,
    quantity: 20,
    currentStocks: 30,
    timerId: 0,
    dateId: 0,
  },
  {
    ingredientName: "Moyen pain sésame",
    price: 20,
    quantity: 30,
    currentStocks: 10,
    timerId: 0,
    dateId: 0,
  },
  {
    ingredientName: "Pain carré ciabatta",
    price: 30,
    quantity: 20,
    currentStocks: 10,
    timerId: 0,
    dateId: 0,
  },
  {
    ingredientName: "Pain carré bacon",
    price: 30,
    quantity: 20,
    currentStocks: 10,
    timerId: 0,
    dateId: 0,
  },
  {
    ingredientName: "Pain muffin",
    price: 40,
    quantity: 40,
    currentStocks: 10,
    timerId: 0,
    dateId: 0,
  },
  {
    ingredientName: "Petit pain bun",
    price: 40,
    quantity: 40,
    currentStocks: 10,
    timerId: 0,
    dateId: 0,
  },
  {
    ingredientName: "Moyen pain bun",
    price: 50,
    quantity: 30,
    currentStocks: 10,
    timerId: 0,
    dateId: 0,
  },
  {
    ingredientName: "Galette wrap",
    price: 40,
    quantity: 40,
    currentStocks: 10,
    timerId: 0,
    dateId: 0,
  },
];

export const breadSection: SectionRawIngredients = {
  sectionName: "bread",
  title: "Pain",
  productionArray: bread,
};

export const sauce: Ingredient[] = [
  {
    ingredientName: "Tartare",
    price: 7,
    quantity: 20,
    currentStocks: 10,
    timerId: 0,
    dateId: 0,
  },
  {
    ingredientName: "Spécial Bu",
    price: 9,
    quantity: 20,
    currentStocks: 10,
    timerId: 0,
    dateId: 0,
  },
  {
    ingredientName: "Abricot",
    price: 8,
    quantity: 20,
    currentStocks: 10,
    timerId: 0,
    dateId: 0,
  },
  {
    ingredientName: "Ketchup",
    price: 6,
    quantity: 20,
    currentStocks: 10,
    timerId: 0,
    dateId: 0,
  },
  {
    ingredientName: "Ranch",
    price: 7,
    quantity: 20,
    currentStocks: 10,
    timerId: 0,
    dateId: 0,
  },
  {
    ingredientName: "Moutarde",
    price: 6,
    quantity: 20,
    currentStocks: 10,
    timerId: 0,
    dateId: 0,
  },
];

export const sauceSection: SectionRawIngredients = {
  sectionName: "sauce",
  title: "Sauce",
  productionArray: sauce,
};

export const cheese: Ingredient[] = [
  {
    ingredientName: "Cheddar",
    price: 18,
    quantity: 20,
    currentStocks: 10,
    timerId: 0,
    dateId: 0,
  },
  {
    ingredientName: "Emmental",
    price: 18,
    quantity: 20,
    currentStocks: 10,
    timerId: 0,
    dateId: 0,
  },
  {
    ingredientName: "Mozzarella",
    price: 25,
    quantity: 20,
    currentStocks: 10,
    timerId: 0,
    dateId: 0,
  },
];

export const cheeseSection: SectionRawIngredients = {
  sectionName: "cheese",
  title: "Fromage",
  productionArray: cheese,
};

export const meat: Ingredient[] = [
  {
    ingredientName: "Jambon",
    price: 40,
    quantity: 20,
    currentStocks: 0,
    timerId: 0,
    dateId: 0,
  },
  {
    ingredientName: "Oeuf",
    price: 30,
    quantity: 20,
    currentStocks: 0,
    timerId: 0,
    dateId: 0,
  },
  {
    ingredientName: "Grand steak plat",
    price: 110,
    quantity: 50,
    currentStocks: 0,
    timerId: 0,
    dateId: 0,
  },
  {
    ingredientName: "Petit steak plat",
    price: 100,
    quantity: 50,
    currentStocks: 0,
    timerId: 0,
    dateId: 0,
  },
  {
    ingredientName: "Grand gros steak",
    price: 130,
    quantity: 50,
    currentStocks: 0,
    timerId: 0,
    dateId: 0,
  },
  {
    ingredientName: "Moyen gros steak",
    price: 120,
    quantity: 50,
    currentStocks: 0,
    timerId: 0,
    dateId: 0,
  },
];

export const meatSection: SectionRawIngredients = {
  sectionName: "meat",
  title: "Viande",
  productionArray: meat,
};

export const variousIngredient: Ingredient[] = [
  {
    ingredientName: "Salade",
    price: 6,
    quantity: 20,
    currentStocks: 10,
    timerId: 0,
    dateId: 0,
  },
  {
    ingredientName: "Tomates",
    price: 6,
    quantity: 20,
    currentStocks: 10,
    timerId: 0,
    dateId: 0,
  },
  {
    ingredientName: "Oignons",
    price: 6,
    quantity: 20,
    currentStocks: 10,
    timerId: 0,
    dateId: 0,
  },
  {
    ingredientName: "Pickles",
    price: 8,
    quantity: 20,
    currentStocks: 10,
    timerId: 0,
    dateId: 0,
  },
  {
    ingredientName: "Bacon",
    price: 10,
    quantity: 20,
    currentStocks: 10,
    timerId: 0,
    dateId: 0,
  },
  {
    ingredientName: "Cornichons",
    price: 6,
    quantity: 20,
    currentStocks: 10,
    timerId: 0,
    dateId: 0,
  },
  {
    ingredientName: "Oignon frit",
    price: 7,
    quantity: 20,
    currentStocks: 10,
    timerId: 0,
    dateId: 0,
  },
];

export const variousIngredientSection: SectionRawIngredients = {
  sectionName: "variousIngredient",
  title: "Ingrédient",
  productionArray: variousIngredient,
};

export const iceCream: Ingredient[] = [
  {
    ingredientName: "Coulis caramel",
    price: 20,
    quantity: 40,
    currentStocks: 10,
    timerId: 0,
    dateId: 0,
  },
  {
    ingredientName: "Coulis chocolat",
    price: 20,
    quantity: 40,
    currentStocks: 10,
    timerId: 0,
    dateId: 0,
  },
  {
    ingredientName: "Eclats cacahuète",
    price: 15,
    quantity: 20,
    currentStocks: 10,
    timerId: 0,
    dateId: 0,
  },
  {
    ingredientName: "Eclats choco-caramel",
    price: 20,
    quantity: 20,
    currentStocks: 10,
    timerId: 0,
    dateId: 0,
  },
  {
    ingredientName: "Eclats biscuit-chocolat",
    price: 15,
    quantity: 20,
    currentStocks: 10,
    timerId: 0,
    dateId: 0,
  },
  {
    ingredientName: "Eclats cacahuète-chocolat",
    price: 20,
    quantity: 20,
    currentStocks: 10,
    timerId: 0,
    dateId: 0,
  },
];

export const iceCreamSection: SectionRawIngredients = {
  sectionName: "iceCream",
  title: "Glace",
  productionArray: iceCream,
};

export const fries: Ingredient[] = [
  {
    ingredientName: "Frite",
    price: 15,
    quantity: 100,
    currentStocks: 0,
    timerId: 0,
    dateId: 0,
  },
  {
    ingredientName: "Potatoe",
    price: 20,
    quantity: 100,
    currentStocks: 0,
    timerId: 0,
    dateId: 0,
  },
];

export const friesSection: SectionRawIngredients = {
  sectionName: "fries",
  title: "Frite",
  productionArray: fries,
};

export const drink: Ingredient[] = [
  {
    ingredientName: "Eau",
    price: 10,
    quantity: 40,
    currentStocks: 10,
    timerId: 0,
    dateId: 0,
  },
  {
    ingredientName: "Eau gazeuse",
    price: 12,
    quantity: 40,
    currentStocks: 10,
    timerId: 0,
    dateId: 0,
  },
  {
    ingredientName: "Limonade",
    price: 15,
    quantity: 40,
    currentStocks: 10,
    timerId: 0,
    dateId: 0,
  },
  {
    ingredientName: "Cola",
    price: 20,
    quantity: 40,
    currentStocks: 10,
    timerId: 0,
    dateId: 0,
  },
  {
    ingredientName: "Orange gazeuse",
    price: 20,
    quantity: 40,
    currentStocks: 0,
    timerId: 0,
    dateId: 0,
  },
  {
    ingredientName: "Jus d'orange",
    price: 15,
    quantity: 40,
    currentStocks: 0,
    timerId: 0,
    dateId: 0,
  },
  {
    ingredientName: "Jus multifruit",
    price: 15,
    quantity: 40,
    currentStocks: 0,
    timerId: 0,
    dateId: 0,
  },
  {
    ingredientName: "Thé glacé",
    price: 17,
    quantity: 40,
    currentStocks: 0,
    timerId: 0,
    dateId: 0,
  },
];

export const drinkSection: SectionRawIngredients = {
  sectionName: "drink",
  title: "Boisson",
  productionArray: drink,
};

export const bag: Ingredient[] = [
  {
    ingredientName: "Petit sac",
    price: 40,
    quantity: 500,
    currentStocks: 10,
    timerId: 0,
    dateId: 0,
  },
  {
    ingredientName: "Moyen sac",
    price: 50,
    quantity: 500,
    currentStocks: 10,
    timerId: 0,
    dateId: 0,
  },
  {
    ingredientName: "Grand sac",
    price: 40,
    quantity: 250,
    currentStocks: 10,
    timerId: 0,
    dateId: 0,
  },
];

export const bagSection: SectionRawIngredients = {
  sectionName: "bag",
  title: "Sac",
  productionArray: bag,
};

export const size: Size[] = [
  {
    name: "Petit",
    capacity: 1,
  },
  {
    name: "Moyen",
    capacity: 2,
  },
  {
    name: "Grand",
    capacity: 3,
  },
];

export const allProductsArray: SectionRawIngredients[] = [
  fryingSection,
  breadSection,
  sauceSection,
  cheeseSection,
  meatSection,
  variousIngredientSection,
  friesSection,
  iceCreamSection,
  drinkSection,
  bagSection,
];
