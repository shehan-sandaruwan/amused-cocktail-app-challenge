import { get } from "./API.Service";

export const getRandomCocktail = async () => {
  const randomCocktails = await get(
    "https://www.thecocktaildb.com/api/json/v1/1/random.php"
  );

  return randomCocktails.data;
};

export const searchCocktailByName = async (query) => {
  const randomCocktails = await get(
    "https://www.thecocktaildb.com/api/json/v1/1/search.php",
    query
  );

  return randomCocktails.data;
};
