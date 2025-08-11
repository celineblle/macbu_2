export interface Ingredient {
  ingredientName: string;
  price: number;
  quantity: number;
  currentStocks: number;
  timerId: number;
  dateId: number;
}

export interface Size {
  name: string;
  capacity: number;
}

export interface Burger {
  bread: string;
  meat: string;
  cheese?: string[];
  variousIngredient?: string[];
  sauce?: string[];
}

export interface Nugget {
  nuggetQuantity: number;
}

export interface IceCream {
  coulisTopping: [string, string];
  melted: boolean;
}

export interface FriesSide {
  side: string;
  grilled: boolean;
}

export interface Drink {
  flavour: string;
}

export interface Bag {
  capacity: number;
}

export interface FinalProductBag {
  name: string;
  ingredient: Bag;
  size: number;
  price: number;
  type: string;
  bag: string;
}

export interface FinalProductNugget {
  name: string;
  ingredient: Nugget;
  size: number;
  price: number;
  type: string;
}

export interface FinalProductBurger {
  name: string;
  ingredient: Burger;
  size: number;
  price: number;
  type: string;
  bread: string;
}

export interface FinalProductSide {
  name: string;
  ingredient: FriesSide;
  size: number;
  timeId: number;
  dateId: number;
  price: number;
  type: string;
  side: string;
}

export interface FinalProductDessert {
  name: string;
  ingredient: IceCream;
  size: number;
  timeId: number;
  dateId: number;
  price: number;
  type: string;
  dessert: string;
}

export interface FinalProductDrink {
  name: string;
  ingredient: Drink;
  size: number;
  timeId: number;
  dateId: number;
  price: number;
  type: string;
  drink: string;
}
