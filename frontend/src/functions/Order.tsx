import { productsForRandom, allDrinks, allDessert, allAdultSide, allChildSide, allBurgers } from "../elements/produits";
import {
  Menu,
  ChildMenu,
  Order,
} from "../interfaces/compositionElementsInterfaces";
import {
  FinalProductBurger,
  FinalProductDessert,
  FinalProductDrink,
  FinalProductNugget,
  FinalProductSide,
} from "../interfaces/produitsInterfaces";
import { size } from "../elements/ingredients";

  // TOOL VARIABLE
  const limitSizeCommande: number = 8;
  const allProductArraySize: number = productsForRandom.length;
  const neutralTemplate: string = "Vide";
  const childSize: number = size[0].capacity;

  // TOOL OBJECT TEMPLATE
  const emptyBurger: FinalProductBurger = {
    name: neutralTemplate,
    ingredient: {
      bread: neutralTemplate,
      meat: neutralTemplate,
    },
    size: 0,
    price: 0,
    type: neutralTemplate,
    bread: neutralTemplate,
  };

  const emptySide: FinalProductSide = {
    name: neutralTemplate,
    ingredient: {
      side: neutralTemplate,
    },
    size: 0,
    timeId: 0,
    dateId: 0,
    price: 0,
    type: neutralTemplate,
    side: neutralTemplate,
  };

  const emptyDrink: FinalProductDrink = {
    name: neutralTemplate,
    ingredient: {
      flavour: neutralTemplate,
    },
    size: 0,
    timeId: 0,
    dateId: 0,
    price: 0,
    type: neutralTemplate,
    drink: neutralTemplate,
  };

  const emptyDessert: FinalProductDessert = {
    name: neutralTemplate,
    ingredient: {
      coulisTopping: [neutralTemplate, neutralTemplate],
      melted: false,
    },
    size: 0,
    timeId: 0,
    dateId: 0,
    price: 0,
    type: neutralTemplate,
    dessert: neutralTemplate,
  };

  const menuTemplate: Menu = {
    sandwich: emptyBurger,
    side: emptySide,
    drink: emptyDrink,
    dateId: 0,
  };

  const menuChildTemplate: ChildMenu = {
    sandwich: emptyBurger,
    side: emptySide,
    drink: emptyDrink,
    dessert: emptyDessert,
    dateId: 0, 
  };

  // GET RADOM NUMBER & PRODUCT
  function getRadomNumber(max: number): number {
    let random: number = Math.floor(Math.random() * max);
    if (random <= 1) {
      random = 2;
    }
    return random;
  }

  function getRamdomProductForRawOrder(
    tailleCommande: number
  ): (
    | FinalProductBurger
    | FinalProductDessert
    | FinalProductDrink
    | FinalProductSide
    | FinalProductNugget
  )[] {
    const rawsProductsOrder: (
      | FinalProductBurger
      | FinalProductDessert
      | FinalProductDrink
      | FinalProductSide
      | FinalProductNugget
    )[] = [];
    for (let i = 0; i < tailleCommande; i++) {
      const randomProductIndex = getRadomNumber(allProductArraySize);
      rawsProductsOrder.push(productsForRandom[randomProductIndex]);
    }
    return rawsProductsOrder;
  }

  // SORTING FUNCTIONS
  function sortingBurgerFromRawOrder(
    rawsProductsOrder: (
      | FinalProductBurger
      | FinalProductDessert
      | FinalProductDrink
      | FinalProductSide
      | FinalProductNugget
    )[]
  ) {
    const onlyBurger: FinalProductBurger[] = [];
    const onlyChildBurger: FinalProductBurger[] = [];
    for (let i = 0; i < rawsProductsOrder.length; i++) {
      const currentProduct = rawsProductsOrder[i];
      if ("bread" in currentProduct) {
        if (currentProduct.size === childSize) {
          onlyChildBurger.push(currentProduct);
          rawsProductsOrder.splice(i, 1);
        } else {
          onlyBurger.push(currentProduct);
          rawsProductsOrder.splice(i, 1);
        }
      }
    }
    return {
      onlyBurger,
      onlyChildBurger,
    };
  }

  function sortingSideAndDrinkFromRawOrder(
    rawsProductsOrder: (
      | FinalProductBurger
      | FinalProductDessert
      | FinalProductDrink
      | FinalProductSide
      | FinalProductNugget
    )[]
  ) {
    const onlySide: FinalProductSide[] = [];
    const onlyDrink: FinalProductDrink[] = [];
    const onlyChildDessert: FinalProductDessert[] = [];
    for (let i = 0; i < rawsProductsOrder.length; i++) {
      const currentProduct = rawsProductsOrder[i];
      if ("side" in currentProduct) {
        onlySide.push(currentProduct);
        rawsProductsOrder.splice(i, 1);
      } else if ("drink" in currentProduct) {
        onlyDrink.push(currentProduct);
        rawsProductsOrder.splice(i, 1);
      } else if ("dessert" in currentProduct && currentProduct.size === childSize) {
        onlyChildDessert.push(currentProduct);
      }
    }
    return { onlySide, onlyDrink, onlyChildDessert };
  }

  function sortAllIngredient(
    rawsProductsOrder: (
      | FinalProductBurger
      | FinalProductDessert
      | FinalProductDrink
      | FinalProductSide
      | FinalProductNugget
    )[]
  ) {
    //sorting order to get burgers
    const { onlyBurger, onlyChildBurger } =
      sortingBurgerFromRawOrder(rawsProductsOrder);

    // sorting order to get side and drink
    const { onlySide, onlyDrink, onlyChildDessert } =
      sortingSideAndDrinkFromRawOrder(rawsProductsOrder);

    return {
      onlyBurger,
      onlyChildBurger,
      onlyDrink,
      onlySide,
      onlyChildDessert,
    };
  }

  // CREATE AND COMPLETED MENUS
  function initializeMenuWithBurger(
    burgerArray: FinalProductBurger[],
    menuTemplate: Menu | ChildMenu,
    limitMenuNumber: number
  ): (Menu | ChildMenu)[] {
    const initializedMenu: (Menu | ChildMenu)[] = [];
    let limitMenuWithExistingBurger: number = 0
    let limitMenuWithGeneratedBurger: number = 0
    if(burgerArray.length > limitMenuNumber) {
      limitMenuWithExistingBurger = limitMenuNumber;
    } else {
      limitMenuWithExistingBurger = burgerArray.length
      limitMenuWithGeneratedBurger = limitMenuNumber - burgerArray.length
    }

    // create menu with existing burger
    for (let i = 0; i < limitMenuWithExistingBurger; i++) {
      const menuTemplateCopy = structuredClone(menuTemplate);
      menuTemplateCopy.sandwich = burgerArray[i];
      menuTemplateCopy.dateId = Date.now()
      initializedMenu.push(menuTemplateCopy);
    }

    // create menu with generated burger
    for(let i = 0; i < limitMenuWithGeneratedBurger; i++) {
      const menuTemplateCopy = structuredClone(menuTemplate);
      const newBurger = getNewUniqueProduct(allBurgers, 2)
      if(newBurger !== undefined && "bread" in newBurger) {
        menuTemplateCopy.sandwich = newBurger
        menuTemplateCopy.dateId = Date.now()
        initializedMenu.push(menuTemplateCopy);
      }
    }

    return initializedMenu;
  }

  function getNewUniqueProduct(
    allProductArray:
      | FinalProductDessert[]
      | FinalProductDrink[]
      | FinalProductSide[]
      | FinalProductBurger[],
    burgerSize: number
  ): FinalProductDessert | FinalProductDrink | FinalProductSide | FinalProductBurger | undefined {
    const i = 0;
    while (i < 1) {
      const newProductIndex: number = getRadomNumber(
        allProductArray.length - 1
      );
      const newProduct = allProductArray[newProductIndex];
      if (newProduct.size === burgerSize) {
        return newProduct;
      }
    }
  }

  function finishToCompleteEmptyMenu(
    menuArray: (Menu | ChildMenu)[],
    property: string,
    allProductArray:
      | FinalProductDessert[]
      | FinalProductDrink[]
      | FinalProductSide[]
  ) {
    for (let i = 0; i < menuArray.length; i++) {
      if (menuArray[i][property].name === neutralTemplate) {
        const newProduct = getNewUniqueProduct(
          allProductArray,
          menuArray[i].sandwich.size
        );
        if (newProduct !== undefined && property in newProduct) {
          menuArray[i][property] = newProduct;
        }
      }
    }
  }

  function completeMenuWitchSizeMatch(
    productArray: FinalProductDrink[] | FinalProductSide[] | FinalProductDessert[],
    menuArray: (Menu | ChildMenu)[]
  ) {
    if (productArray !== undefined && productArray.length > 0) {
      const property: string = "side" in productArray[0] ? "side" : "drink";
      for (let i = 0; i < menuArray.length; i++) {
        const currentBurgerSize: number = menuArray[i].sandwich.size;
        const productToAdd = productArray.find(
          (product) => product.size === currentBurgerSize
        );
        const productIndex = productArray.findIndex(
          (product) => product.size === currentBurgerSize
        );
        if (productToAdd !== undefined) {
          if (property in productToAdd) {
            menuArray[i][property] = productToAdd;
            productArray.splice(productIndex, 1);
          }
        }
      }
    }
  }

  function determiningNumberOfMenu(
    burgerArray: FinalProductBurger[],
    sideArray: FinalProductSide[],
    drinkArray: FinalProductDrink[]
  ): number {
    if (
      burgerArray.length === 0 ||
      (sideArray.length === 0 && drinkArray.length === 0)
    ) {
      return 0;
    } else {
      let allLength: number[] = [sideArray.length, drinkArray.length];
      allLength = allLength.filter((length) => length !== 0);
      allLength.sort();
      return allLength[1];
    }
  }

  function createMenus(
    type: string,
    onlyBurger: FinalProductBurger[],
    onlyDrink: FinalProductDrink[],
    onlySide: FinalProductSide[],
    onlyChildDessert: FinalProductDessert[]
  ): Menu[] | ChildMenu[] | undefined {
    const rightMenuTemplate =
      type === "child" ? menuChildTemplate : menuTemplate;
    const rigthSideArray = type === "child" ? allChildSide : allAdultSide;
    const numberMenu: number = determiningNumberOfMenu(
      onlyBurger,
      onlySide,
      onlyDrink
    );
    if (numberMenu > 0) {
      const builtMenu: Menu[] | ChildMenu[] = initializeMenuWithBurger(
        onlyBurger,
        rightMenuTemplate,
        numberMenu
      );

      completeMenuWitchSizeMatch(onlyDrink, builtMenu);
      completeMenuWitchSizeMatch(onlySide, builtMenu);
      finishToCompleteEmptyMenu(builtMenu, "drink", allDrinks);
      finishToCompleteEmptyMenu(builtMenu, "side", rigthSideArray);
      if (type === "child") {
        completeMenuWitchSizeMatch(onlyChildDessert, builtMenu );
        finishToCompleteEmptyMenu(builtMenu, "dessert", allDessert)
      }
      return builtMenu;
      

    } else {
      return undefined;
    }
  }

  // GET PRICES AND SIZES
  function getPricesAndSizesOfMenus(
    menuArray: Menu[] | ChildMenu[],
    finalOrder: Order
  ) {
    const menuReduction: number = "dessert" in menuArray[0] ? 7 : 5
    for (let i = 0; i < menuArray.length; i++) {
      const currentMenu = menuArray[i];
      finalOrder.price =
        finalOrder.price +
        currentMenu.drink.price +
        currentMenu.sandwich.price +
        currentMenu.side.price - menuReduction;
      finalOrder.size =
        finalOrder.size +
        currentMenu.drink.size +
        currentMenu.sandwich.size +
        currentMenu.side.size;
      if ("dessert" in currentMenu) {
        finalOrder.price = finalOrder.price + currentMenu.dessert.price;
        finalOrder.size = finalOrder.size + currentMenu.dessert.size;
      }
    }
    finalOrder.products = [...finalOrder.products, ...menuArray];
  }

  function getPricesAndSizesFromRawsIngredient(
    rawsIngredientArray: (
      | FinalProductBurger
      | FinalProductDessert
      | FinalProductDrink
      | FinalProductSide
      | FinalProductNugget
    )[],
    finalOrder: Order
  ) {
    if(rawsIngredientArray !== undefined && rawsIngredientArray.length !== 0) {

    
    for (let i = 0; i < rawsIngredientArray.length; i++) {
      finalOrder.price = finalOrder.price + rawsIngredientArray[i].price;
      finalOrder.size = finalOrder.size + rawsIngredientArray[i].size;
      finalOrder.products.push(rawsIngredientArray[i]);
    }
}
  }

  // START RAW PRODUCT CREATION
export  function generateRamdomOrders() {
    const tailleCommande: number = getRadomNumber(limitSizeCommande);
    // get raws ingredients
    const rawsProductsOrder: (
      | FinalProductBurger
      | FinalProductDessert
      | FinalProductDrink
      | FinalProductSide
      | FinalProductNugget
    )[] = getRamdomProductForRawOrder(tailleCommande);

    const { onlyBurger, onlyChildBurger, onlyDrink, onlySide, onlyChildDessert } =
      sortAllIngredient(rawsProductsOrder);

      // create menu
    const adultMenu = createMenus("", onlyBurger, onlyDrink, onlySide, []);
    const childMenu = createMenus(
      "child",
      onlyChildBurger,
      onlyDrink,
      onlySide, onlyChildDessert
    );
    const finalOrder: Order = {
      products: [],
      size: 0,
      price: 0,
      dateId: Date.now(),
    };

    if (adultMenu !== undefined) {
      getPricesAndSizesOfMenus(adultMenu, finalOrder);
    }
    if (childMenu !== undefined) {
      getPricesAndSizesOfMenus(childMenu, finalOrder);
    }
    getPricesAndSizesFromRawsIngredient(rawsProductsOrder, finalOrder);
    getPricesAndSizesFromRawsIngredient(onlyBurger, finalOrder)
    getPricesAndSizesFromRawsIngredient(onlyChildBurger, finalOrder)
    getPricesAndSizesFromRawsIngredient(onlyDrink, finalOrder)
    getPricesAndSizesFromRawsIngredient(onlySide, finalOrder)
    getPricesAndSizesFromRawsIngredient(onlyChildDessert, finalOrder)
    return finalOrder;
  }