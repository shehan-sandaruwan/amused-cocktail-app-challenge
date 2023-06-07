import { rest } from "msw";

export const handlers = rest.get(
  "https://www.thecocktaildb.com/api/json/v1/1/random.php",
  (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        drinks: [
          {
            idDrink: Math.random().toString(),
            strDrink: "Quaker's Cocktail",
            strCategory: "Ordinary Drink",
            strDrinkThumb:
              "https://www.thecocktaildb.com/images/media/drink/yrqppx1478962314.jpg",
          },
        ],
      })
    );
  }
);

export const searchHandler = rest.get(
  "https://www.thecocktaildb.com/api/json/v1/1/search.php",
  (req, res, ctx) => {
    const query = req.url.searchParams.get("s");

    if (query === "Quaker") {
      return res(
        ctx.status(200),
        ctx.json({
          drinks: [
            {
              idDrink: Math.random().toString(),
              strDrink: "Quaker's Cocktail",
              strCategory: "Ordinary Drink",
              strDrinkThumb:
                "https://www.thecocktaildb.com/images/media/drink/yrqppx1478962314.jpg",
            },
          ],
        })
      );
    } else {
      return res(ctx.status(200), ctx.json({ drinks: [] }));
    }
  }
);

export const searchError = rest.get(
  "https://www.thecocktaildb.com/api/json/v1/1/search.php",
  (req, res, ctx) => {
    return res(ctx.status(500));
  }
);

export const fetchError = rest.get(
  "https://www.thecocktaildb.com/api/json/v1/1/random.php",
  (req, res, ctx) => {
    return res(ctx.status(500));
  }
);
