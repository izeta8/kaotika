
interface CardButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>,
  label: string,
  isOnCart?: boolean
  isMagicalStuffShop?: boolean,
  hasEnoughMoney?: boolean,
}

const CardButton: React.FC<CardButtonProps> = ({ onClick, label, isOnCart = false, isMagicalStuffShop = false, hasEnoughMoney = true }) => {

  if (!label || !onClick) { return null }

  const fontSize = label.length > 8 ? 'text-md' : 'text-xl';

  const disabledButtonStyle = "opacity-50";

  const blackBackground = `bg-[#1E1E1E] ${hasEnoughMoney ? 'hover:bg-medievalSepia' : null}`;
  const sepiaBackground = "bg-medievalSepia";

  const sepiaText = `text-white/90 ${hasEnoughMoney ? 'hover:text-[#1E1E1E]' : null}`;
  const blackText = "text-[#1E1E1E]";

  const backgroundClass = (isOnCart && !isMagicalStuffShop) ? sepiaBackground : blackBackground;
  const textColorClass = (isOnCart && !isMagicalStuffShop) ? blackText : sepiaText;

  let displayText = label;
  // If is the equipment page and the item is on the cart change the text to "REMOVE CART".
  if (label === "ADD TO CART" && isOnCart && !isMagicalStuffShop) {
    displayText = "REMOVE CART";
  }

  return (
    <button
      onClick={onClick}
      disabled={!hasEnoughMoney}
      className={`${backgroundClass} ${!hasEnoughMoney ? disabledButtonStyle : null} leading-7 border rounded transition-all border-medievalSepia/60`}
    >
      <p
        className={`${fontSize} ${textColorClass} py-2 px-4 transition-all duration-500`}
      >{displayText}</p>
    </button>
  )

}

export default CardButton;