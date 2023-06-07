import axios from "axios";

//www.thecocktaildb.com/api/json/v1/1/random.php

export const get = async (url, query) => {
  let response;
  if (query) {
    response = await axios.get(url, {
      params: {
        s: query,
      },
    });
  } else {
    response = await axios.get(url);
  }

  return response;
};
