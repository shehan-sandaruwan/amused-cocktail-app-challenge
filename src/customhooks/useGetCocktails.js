import {
  ERROR_FETCH_COCKTAILS,
  ERROR_FETCH_SEARCHED_COCKTAILS,
} from "constant/textConstant";
import { useEffect, useState } from "react";
import {
  getRandomCocktail,
  searchCocktailByName,
} from "service/cocktail-api-service";
import { searchFromFavourite } from "utils";

export function useGetCocktails(query, isFavourite) {
  const [cocktailItems, setCockTailItems] = useState([]);
  const [apiResponsetWaiting, setApiResponseWaiting] = useState(false);
  const [initialRenderedCocktails, setInitialRenderedCocktails] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const request_count = 5;

  useEffect(() => {
    if (isFavourite) {
      searchedItemFromFavouriteList();
    } else if (!query && !initialRenderedCocktails.length) {
      fetchFiveRandomCocktail();
    } else if (query) {
      fetchCocktailByQueryName(query);
    } else {
      setCockTailItems(initialRenderedCocktails);
    }
  }, [query, isFavourite]);

  const searchedItemFromFavouriteList = () => {
    const newList = searchFromFavourite(query);

    setCockTailItems(newList);
  };

  const fetchFiveRandomCocktail = () => {
    const getCocktailrequestArray = [];
    const fetchedCocktailItemsArray = [];
    let count = 0;

    while (count < request_count) {
      getCocktailrequestArray.push(getRandomCocktail());
      count++;
    }

    setErrorMessage("");
    setApiResponseWaiting(true);
    Promise.all(getCocktailrequestArray)
      .then((multyResp) => {
        multyResp.forEach((item) => {
          const newItem = {
            name: item.drinks[0].strDrink,
            category: item.drinks[0].strCategory,
            imagePath: item.drinks[0].strDrinkThumb,
            id: item.drinks[0].idDrink,
            isFavourite: false,
          };

          fetchedCocktailItemsArray.push(newItem);
        });
        setApiResponseWaiting(false);
        setCockTailItems(fetchedCocktailItemsArray);
        setInitialRenderedCocktails(fetchedCocktailItemsArray);
      })
      .catch((error) => {
        setApiResponseWaiting(false);
        setErrorMessage(ERROR_FETCH_COCKTAILS);
      });
  };

  const fetchCocktailByQueryName = (query) => {
    const fetchedCocktailItemsArray = [];
    setErrorMessage("");
    setApiResponseWaiting(true);
    searchCocktailByName(query)
      .then((searchedItems) => {
        searchedItems?.drinks?.forEach((item) => {
          const newItem = {
            name: item.strDrink,
            category: item.strCategory,
            imagePath: item.strDrinkThumb,
            id: item.idDrink,
            isFavourite: false,
          };

          fetchedCocktailItemsArray.push(newItem);
        });

        setApiResponseWaiting(false);
        setCockTailItems(fetchedCocktailItemsArray);
      })
      .catch((error) => {
        setApiResponseWaiting(false);
        setErrorMessage(ERROR_FETCH_SEARCHED_COCKTAILS);
      });
  };

  return [cocktailItems, apiResponsetWaiting, errorMessage];
}
