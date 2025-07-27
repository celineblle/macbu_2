export interface Ingredient {
  ingredientName: string;
  price: number;
  quantity: number;
  currentStocks: number;
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
}

export interface Side {
  side: string;
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
}

export interface FinalProductBurger {
  name: string;
  ingredient: Burger | Nugget;
  size: number;
  price: number;
  type: string;
}

export interface FinalProductSide {
  name: string;
  ingredient: Side;
  size: number;
  timeId: number;
  timeObject: number;
  price: number;
  type: string;
}

export interface FinalProductDessert {
  name: string;
  ingredient: IceCream;
  size: number;
  timeId: number;
  timeObject: number;
  price: number;
  type: string;
}

export interface FinalProductDrink {
  name: string;
  ingredient: Drink;
  size: number;
  timeId: number;
  timeObject: number;
  price: number;
  type: string;
}


