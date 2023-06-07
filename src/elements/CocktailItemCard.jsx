import React from "react";
import Card from "react-bootstrap/Card";
import "css/cocktailitemcard.css";
import heart from "assets/heart.svg";
import heartFill from "assets/heart-fill.svg";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const CocktailItemCard = ({
  imagePath,
  name,
  category,
  type,
  id,
  isFavourite,
  onFavouriteClickHandler,
}) => {
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {`${isFavourite ? "Remove from" : "Add to"} favourite items`}
    </Tooltip>
  );

  return (
    <Card className="cocktail-item-card" role="cocktail-item-card">
      <Card.Img variant="top" src={imagePath} alt={`${name} cocktail`} />
      <Card.Body>
        <Card.Title role="card-title">{name}</Card.Title>
        <Card.Text>{category}</Card.Text>
        <OverlayTrigger
          placement="right"
          delay={{ show: 250, hide: 400 }}
          overlay={renderTooltip}
        >
          <div
            onClick={() => onFavouriteClickHandler(id)}
            className="favourite-icon"
          >
            <img
              src={isFavourite ? heartFill : heart}
              alt={`${isFavourite ? "heartFill" : "heart"} favourite`}
            />
          </div>
        </OverlayTrigger>
      </Card.Body>
    </Card>
  );
};

export default CocktailItemCard;
