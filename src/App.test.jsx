import { screen, render, waitFor } from "@testing-library/react";
import { server } from "mocks/server";
import { handlers } from "mocks/handler";
import App from "App";

test("Refreshing the page should show new five cocktail items", async () => {
  server.use(handlers);
  render(<App />);

  const cocktailCards = await screen.findAllByRole("card-title");
  await waitFor(() => {
    expect(cocktailCards).toHaveLength(5);
  }, 2000);

  const CocktailNameList_1 = cocktailCards.map((element) => {
    return element.textContent;
  });

  render(<App />);

  const cocktailCardsAfterRerendered = await screen.findAllByRole("card-title");
  await waitFor(() => {
    expect(cocktailCardsAfterRerendered).toHaveLength(5);
  }, 2000);

  const CocktailNameList_2 = cocktailCardsAfterRerendered.map((element) => {
    return element.textContent;
  });

  expect(CocktailNameList_1).not.toContain(CocktailNameList_2);
});
