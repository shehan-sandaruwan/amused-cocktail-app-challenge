export let favouriteList = [];

export const addOrRemoveFromFavorite = (item) => {
  const existingItemIndex = favouriteList.findIndex(
    (_item) => _item.id === item.id
  );

  if (existingItemIndex > -1 && !item.isFavourite) {
    const newFavouriteList = favouriteList.slice(
      existingItemIndex,
      existingItemIndex + 1
    );
    favouriteList = newFavouriteList;
  } else if (item.isFavourite) {
    favouriteList.push(item);
  }
};

export const getFovouriteList = () => {
  return favouriteList;
};

export const searchFromFavourite = (query) => {
  if (query) {
    const searchedFavouriteList = favouriteList.filter((item) =>
      item.name.includes(query)
    );
    return searchedFavouriteList;
  }

  return favouriteList;
};
