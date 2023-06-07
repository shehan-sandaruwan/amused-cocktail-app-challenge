import { screen, render, waitFor } from "@testing-library/react";
import CocktailHomePage from "pages/CocktailHomePage";
import userEvent from "@testing-library/user-event";
import { server } from "mocks/server";
import { fetchError, handlers, searchError } from "mocks/handler";

test("Show five random cocktails at initial render", async () => {
  server.use(handlers);
  render(<CocktailHomePage />);

  const cocktailCards = await screen.findAllByRole("img", {
    name: /cocktail$/i,
  });

  await waitFor(() => {
    expect(cocktailCards).toHaveLength(5);
  }, 2000);
});

test('Display "No Favourite Items" message when no favourite cocktails are available', async () => {
  server.use(handlers);
  const user = userEvent.setup();

  render(<CocktailHomePage />);

  const showFavouriteButton = await screen.findByRole("button", {
    name: "Show Favourites",
  });

  await user.click(showFavouriteButton);
  const noFavouriteDisplayMessage = await screen.findByText(
    "No Favourite Items"
  );

  await waitFor(async () => {
    expect(noFavouriteDisplayMessage).toBeInTheDocument();
  });
});

test("Cocktail item should be able to add Favourites", async () => {
  server.use(handlers);
  render(<CocktailHomePage />);

  const addToFavouriteButton = await screen.findAllByRole("img", {
    name: /favourite/i,
  });

  await waitFor(async () => {
    expect(addToFavouriteButton).toHaveLength(5);
  });
});

test("Favourite item should be visible when show favourite button clicked", async () => {
  server.use(handlers);
  const user = userEvent.setup();

  render(<CocktailHomePage />);

  const addToFavouriteButton = await screen.findAllByRole("img", {
    name: /favourite/i,
  });

  await user.click(addToFavouriteButton[0]);
  const showFavouriteButton = await screen.findByRole("button", {
    name: "Show Favourites",
  });

  await user.click(showFavouriteButton);
  const cocktailCards = await screen.findAllByRole("img", {
    name: /heartFill/i,
  });

  await waitFor(async () => {
    expect(cocktailCards).toHaveLength(1);
  });
});

test("Handle errors for fetch cocktails routes", async () => {
  server.use(fetchError);

  render(<CocktailHomePage />);

  const alertsFetch = await screen.findAllByText(
    "There was an error while fetching cocktails. Please try again later."
  );

  await waitFor(() => {
    expect(alertsFetch).toHaveLength(1);
  });
});

test("Handle errors for fetch Searched cocktails routes", async () => {
  server.use(searchError);

  render(<CocktailHomePage />);

  const user = userEvent.setup();

  const searchInput = screen.getByPlaceholderText("Search...");
  await user.type(searchInput, "Quaker");

  const alertsSearch = await screen.findAllByText(
    "There was an issue with fetching searched cocktails. Please try again later."
  );

  await waitFor(() => {
    expect(alertsSearch).toHaveLength(1);
  });
});
