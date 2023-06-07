import { screen, render } from "@testing-library/react";
import CocktailItemCard from "elements/CocktailItemCard";

test("Cocktail item card should display Name, category, and image", () => {
  render(
    <CocktailItemCard
      name="mogito"
      category="clasic"
      imagePath="assets/image1"
    />
  );

  const cocktailImage = screen.getByRole("img", { name: /cocktail$/i });
  expect(cocktailImage).toBeInTheDocument();

  const nameTag = screen.getByText(/mogito/i);
  expect(nameTag).toBeInTheDocument();

  const categoryTag = screen.getByText(/clasic/i);
  expect(categoryTag).toBeInTheDocument();
});
