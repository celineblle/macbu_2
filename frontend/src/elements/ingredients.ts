import { Ingredient, Size } from "../interfaces/produitsInterfaces";

export const bread: Ingredient[] = [
  {
    nom: "Pain sésame 3 tranches",
    price: 30,
    quantity: 30,
  },
  {
    nom: "Grand pain sésame",
    price: 20,
    quantity: 20,
  },
  {
    nom: "Moyen pain sésame",
    price: 20,
    quantity: 30,
  },
  {
    nom: "Pain carré ciabatta",
    price: 30,
    quantity: 20,
  },
  {
    nom: "Pain carré bacon",
    price: 30,
    quantity: 20,
  },
  {
    nom: "Pain muffin",
    price: 40,
    quantity: 40,
  },
  {
    nom: "Petit pain bun",
    price: 40,
    quantity: 40,
  },
  {
    nom: "Moyen pain bun",
    price: 50,
    quantity: 30,
  },
  {
    nom: "Galette wrap",
    price: 40,
    quantity: 40,
  },
];

export const frying: Ingredient[] = [
  {
    nom: "Nugget poulet",
    price: 40,
    quantity: 30,
  },
  {
    nom: "Grand poisson pané",
    price: 40,
    quantity: 20,
  },
  {
    nom: "Petit steak poulet pané",
    price: 25,
    quantity: 20,
  },
  {
    nom: "Grand steak poulet pané",
    price: 35,
    quantity: 20,
  },
  {
    nom: "Palet chêvre",
    price: 20,
    quantity: 20,
  },
];

export const sauce: Ingredient[] = [
  {
    nom: "Tartare",
    price: 7,
    quantity: 20,
  },
  {
    nom: "Spécial Bu",
    price: 9,
    quantity: 20,
  },
  {
    nom: "Abricot",
    price: 8,
    quantity: 20,
  },
  {
    nom: "Ketchup",
    price: 6,
    quantity: 20,
  },
  {
    nom: "Ranch",
    price: 7,
    quantity: 20,
  },
  {
    nom: "Moutarde",
    price: 6,
    quantity: 20,
  },
];

export const cheese: Ingredient[] = [
  {
    nom: "Cheddar",
    price: 18,
    quantity: 20,
  },
  {
    nom: "Emmental",
    price: 18,
    quantity: 20,
  },
  {
    nom: "Mozzarella",
    price: 25,
    quantity: 20,
  },
];

export const meat: Ingredient[] = [
  {
    nom: "Jambon",
    price: 40,
    quantity: 20,
  },
  {
    nom: "Oeuf",
    price: 30,
    quantity: 20,
  },
  {
    nom: "Grand steak plat",
    price: 110,
    quantity: 50,
  },
  {
    nom: "Petit steak plat",
    price: 100,
    quantity: 50,
  },
  {
    nom: "Grand gros steak",
    price: 130,
    quantity: 50,
  },
  {
    nom: "Moyen gros steak",
    price: 120,
    quantity: 50,
  },
];

export const variousIngredient: Ingredient[] = [
  {
    nom: "Salade",
    price: 6,
    quantity: 20,
  },
  {
    nom: "Tomates",
    price: 6,
    quantity: 20,
  },
  {
    nom: "Oignons",
    price: 6,
    quantity: 20,
  },
  {
    nom: "Pickles",
    price: 8,
    quantity: 20,
  },
  {
    nom: "Bacon",
    price: 10,
    quantity: 20,
  },
  {
    nom: "Cornichons",
    price: 6,
    quantity: 20,
  },
  {
    nom: "Oignon frit",
    price: 7,
    quantity: 20,
  },
];

export const freshProduct: Ingredient[] = [
  {
    nom: "Petite salade",
    price: 20,
    quantity: 30,
  },
  {
    nom: "Légumes",
    price: 15,
    quantity: 30,
  },
  {
    nom: "Boisson yaourt",
    price: 12,
    quantity: 30,
  },
  {
    nom: "Fruits",
    price: 12,
    quantity: 30,
  },
];

export const iceCream: Ingredient[] = [
  {
    nom: "Coulis caramel",
    price: 20,
    quantity: 40,
  },
  {
    nom: "Coulis chocolat",
    price: 20,
    quantity: 40,
  },
  {
    nom: "Eclats cacahuète",
    price: 15,
    quantity: 20,
  },
  {
    nom: "Eclats choco-caramel",
    price: 20,
    quantity: 20,
  },
  {
    nom: "Eclat biscuit-chocolat",
    price: 15,
    quantity: 20,
  },
  {
    nom: "Eclat cacahuète-chocolat",
    price: 20,
    quantity: 20,
  },
];

export const fries: Ingredient[] = [
  {
    nom: "Frite",
    price: 15,
    quantity: 100,
  },
  {
    nom: "Potatoe",
    price: 20,
    quantity: 100,
  },
];

export const drink: Ingredient[] = [
  {
    nom: "Eau",
    price: 10,
    quantity: 40,
  },
  {
    nom: "Eau gazeuse",
    price: 12,
    quantity: 40,
  },
  {
    nom: "Limonade",
    price: 15,
    quantity: 40,
  },
  {
    nom: "Cola",
    price: 20,
    quantity: 40,
  },
  {
    nom: "Orange gazeuse",
    price: 20,
    quantity: 40,
  },
  {
    nom: "Jus d'orange",
    price: 15,
    quantity: 40,
  },
  {
    nom: "Jus multifruit",
    price: 15,
    quantity: 40,
  },
  {
    nom: "Thé glacé",
    price: 17,
    quantity: 40,
  },
];

export const bag: Ingredient[] = [
  {
    nom: "Petit sac",
    price: 40,
    quantity: 500,
  },
  {
    nom: "Moyen sac",
    price: 50,
    quantity: 500,
  },
  {
    nom: "Grand sac",
    price: 40,
    quantity: 250,
  },
];

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
