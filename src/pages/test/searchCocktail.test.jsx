import { screen, render, waitFor } from "@testing-library/react";
import CocktailHomePage from "pages/CocktailHomePage";
import userEvent from "@testing-library/user-event";
import { server } from "mocks/server";
import { handlers, searchHandler } from "mocks/handler";

test("Search by query, should returns cocktail items", async () => {
  server.use(handlers);
  render(<CocktailHomePage />);

  const cocktailCards = await screen.findAllByRole("img", {
    name: /cocktail$/i,
  });

  await waitFor(() => {
    expect(cocktailCards).toHaveLength(5);
  }, 2000);

  server.use(searchHandler);

  const user = userEvent.setup();

  const searchInput = screen.getByPlaceholderText("Search...");
  await user.type(searchInput, "Quaker");

  let searchedCocktailItem;

  await waitFor(async () => {
    searchedCocktailItem = screen.getByText(/Quaker/i);
    expect(searchedCocktailItem).toBeInTheDocument();
  });
});
