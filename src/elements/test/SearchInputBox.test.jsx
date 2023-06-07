import { screen, render, waitFor, fireEvent } from "@testing-library/react";
import SearchInputBox from "elements/SearchInputBox";
import userEvent from "@testing-library/user-event";

test("Search box should display enter query text", async () => {
  const user = userEvent.setup();
  const text = "test search box";
  render(<SearchInputBox />);

  const searchInputBox = screen.getByPlaceholderText("Search...");
  await user.clear(searchInputBox);
  fireEvent.change(searchInputBox, { target: { value: text } });

  await waitFor(() => {
    expect(searchInputBox.value).toBe(text);
  });
});
