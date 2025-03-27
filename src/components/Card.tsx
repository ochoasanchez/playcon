// import classnames from "classnames";
import logo from "../assets/images/logo-fc.png";
// import "./card.scss";

type CardProps = {
  onClick: (id: number) => void;
  card: CardType;
  // card: MemoryCard,
  index: number;
  isInactive?: boolean;
  isFlipped?: boolean;
  isDisabled?: boolean;
};

const Card = ({
  onClick,
  card,
  index,
  isInactive,
  isFlipped,
  isDisabled,
}: CardProps) => {
  const handleClick = () => {
    !isFlipped && !isDisabled && onClick(index);
  };

  return (
    <div
      // TODO: Condition class names
      //   className={classnames("card", {
      //     "is-flipped": isFlipped,
      //     "is-inactive": isInactive
      //   })}
      className={`card ${isFlipped && "is-flipped"} ${isInactive && "is-inactive"}`}
      onClick={handleClick}
    >
      <div className="card-face card-front-face">
        <img src={logo} alt="Logo de la app" className="opacity-75"/>
      </div>
      <div className="card-face card-back-face">
        <img src={card.image} alt={card.type} className="rounded-3xl" />
        {/* <img src={card.attributes.imageUrl} alt={card.attributes.name} /> */}
      </div>
    </div>
  );
};

export default Card;
