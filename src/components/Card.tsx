// import classnames from "classnames";
import pokeball from "../assets/images/pokeball.png";
// import "./card.scss";

type CardProps = {
    onClick: (id: number) => void,
    // card: Pokemon,
    card: {
      type: string,
      image: string,
    },
    index: number,
    isInactive?: boolean,
    isFlipped?: boolean,
    isDisabled?: boolean,
  }
  

const Card = ({ onClick, card, index, isInactive, isFlipped, isDisabled} : CardProps) => {
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
      className={`card ${isFlipped && 'is-flipped'} ${isInactive && 'is-inactive'}`}
      onClick={handleClick}
    >
      <div className="card-face card-font-face">
        <img src={pokeball} alt="pokeball" />
      </div>
      <div className="card-face card-back-face">
        <img src={card.image} alt="pokeball" />
      </div>
    </div>
  );
};

export default Card;