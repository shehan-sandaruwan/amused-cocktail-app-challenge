import CocktailHomePageCarousal from "components/CocktailHomePageCarousal";
import CocktailNavbar from "components/CocktailNavbar";
import React, {
  useMemo,
  useState,
  useTransition,
  useDeferredValue,
} from "react";
import { Container } from "react-bootstrap";
import {
  HEADING,
  MAIN_DESCRIPTION,
  SHOW_FAVOURITE,
} from "constant/textConstant";
import SearchInputBox from "elements/SearchInputBox";
import CocktailItemsRenderer from "components/CocktailItemsRenderer";
import CocktailFooter from "components/CocktailFooter";
import { useGetCocktails } from "customhooks/useGetCocktails";
import AlertMessage from "elements/AlertMessage";

const CocktailHomePage = () => {
  const [displayCocktailType, setDisplayCocktailType] = useState("random");
  const [showFavourite, setShowFavourite] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [cocktailItems, apiResponsetWaiting, errorMessage] = useGetCocktails(
    deferredQuery,
    showFavourite
  );

  const cocktailItemRenderer = useMemo(() => {
    return (
      <CocktailItemsRenderer
        type={displayCocktailType}
        cocktailItems={cocktailItems}
        isFavourite={showFavourite}
        apiResponsetWaiting={apiResponsetWaiting}
      />
    );
  }, [displayCocktailType, cocktailItems, showFavourite, apiResponsetWaiting]);

  const onChnageSearchHandler = (event) => {
    event.preventDefault();

    startTransition(() => {
      setQuery(event.target.value);
      setDisplayCocktailType("favourite");
    });
  };

  return (
    <React.Fragment>
      <nav>
        <CocktailNavbar />
      </nav>
      <Container>
        {errorMessage && <AlertMessage message={errorMessage} />}
        <header>
          <CocktailHomePageCarousal />
        </header>
        <main className="cocktail-home-main">
          <h1>{HEADING}</h1>
          <p>{MAIN_DESCRIPTION}</p>
          <SearchInputBox onChnageSearchHandler={onChnageSearchHandler} />
          <button
            onClick={() => {
              setQuery("");
              setShowFavourite(!showFavourite);
            }}
            className={`${showFavourite ? "active" : ""}`}
          >
            {SHOW_FAVOURITE}
          </button>
          <div
            style={{ opacity: isPending ? 0.3 : 1 }}
            className="renderer-wraper"
          >
            {cocktailItemRenderer}
          </div>
        </main>
      </Container>
      <CocktailFooter />
    </React.Fragment>
  );
};

export default CocktailHomePage;
