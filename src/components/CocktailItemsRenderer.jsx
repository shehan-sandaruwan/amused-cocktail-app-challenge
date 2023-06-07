import CocktailItemCard from "elements/CocktailItemCard";
import React, { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";

import "css/cocktailitemsrenderer.css";
import { addOrRemoveFromFavorite } from "utils";

const CocktailItemsRenderer = ({
  type,
  cocktailItems,
  isFavourite,
  apiResponsetWaiting,
}) => {
  const [cocktailList, setCocktailList] = useState([]);

  useEffect(() => {
    setCocktailList(cocktailItems);
  }, [cocktailItems]);

  if (apiResponsetWaiting) {
    return (
      <div
        style={{
          position: "absolute",
          left: "50%",
          transform: "translate(-50%, 0)",
        }}
      >
        <Spinner animation="grow" variant="secondary" />;
      </div>
    );
  }

  if (!apiResponsetWaiting && cocktailItems?.length === 0 && !isFavourite) {
    return <h3>No Data Available</h3>;
  }

  if ((!cocktailList || cocktailList.length === 0) && isFavourite) {
    return <h3>No Favourite Items</h3>;
  }

  const onFavouriteClickHandler = (id) => {
    const modifiedCocktailItems = cocktailList.map((item) => {
      if (item.id === id) {
        item.isFavourite = !item.isFavourite;
        addOrRemoveFromFavorite(item);
      }

      return item;
    });

    setCocktailList(modifiedCocktailItems);

    localStorage.setItem(
      "favouriteList",
      JSON.stringify(modifiedCocktailItems)
    );
  };

  return (
    <div className="cocktail-renderer-wrapper">
      {cocktailList.map((item) => {
        return (
          <CocktailItemCard
            name={item.name}
            category={item.category}
            imagePath={item.imagePath}
            key={item.id}
            type={type}
            isFavourite={item.isFavourite}
            id={item.id}
            onFavouriteClickHandler={onFavouriteClickHandler}
          />
        );
      })}
    </div>
  );
};

export default CocktailItemsRenderer;
