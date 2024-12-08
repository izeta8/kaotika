import ItemDataContainer from "./ItemDataContainer";
import { ItemData } from "@/_common/interfaces/ItemData";
import { useState, useRef, useEffect } from "react";

type ItemCardProps = {
  itemData: ItemData, 
  addToCart: (item: ItemData) => void,
  setProductConfirm: Function,
  setItemModalShown: Function,
  setModalItemData: Function,
  isMagicalStuffShop: boolean,
  setCartAnimating: Function,
  isOnCart: boolean
} 
 
const ItemCard: React.FC<ItemCardProps> = ({ itemData, addToCart, setProductConfirm, setItemModalShown, setModalItemData, isMagicalStuffShop, setCartAnimating, isOnCart }) => {

  const [animatingItemId, setAnimatingItemId] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const cartPosition = { top: 20, left: window.innerWidth - 120 };

  if (!itemData) { return }

  const { _id, name, description, type, value, modifiers, min_lvl, image, base_percentage, defense, isUnique } = itemData;

  // If the item does not have value, we do not want to show it in the shop.
  if (!value || value === 0 ) { return }

  // If the item is unique, we do not want to show it in the shop.
  if (isUnique ) { return }

  if (!name) { return }

  const nameFontSize = name.length > 15 ? 'text-3xl' : 'text-4xl';

  const backgroundPath = isMagicalStuffShop ?
    "url('/images/shop/buy/magic_stuff_card_background.png')" :
    "url('/images/shop/buy/equipment_card_background.png')";

  const equipmentTextGradient = "bg-gradient-to-b from-[#FFD0A0] via-[#EED1B4] to-[#B2AF9E]";
  const magicalStuffTextGradient = "bg-gradient-to-b from-[#212532] via-[#9CB5EA] to-[#3A3C45]";

  // ---- USE EFFECTS ---- //

  useEffect(() => {
    if (animatingItemId && cardRef.current) {
      const cardRect = cardRef.current.getBoundingClientRect();

      // Calculate the translation values from the card to the fixed cart position
      const translateX = cartPosition.left - cardRect.left;
      const translateY = cartPosition.top - cardRect.top;

      // Set CSS custom properties for animation
      document.documentElement.style.setProperty('--translate-x', `${translateX}px`);
      document.documentElement.style.setProperty('--translate-y', `${translateY}px`);

      // Trigger the animation state
      setCartAnimating(true);

      setTimeout(() => {
          // After scaling animation is complete, add the item to the cart
          addToCart(itemData);
          setCartAnimating(false); // Reset the animation state
        }, 1000); // Duration of the scaling animation (adjust as needed)
    }
  }, [animatingItemId]);


  // ---- UTILITY ---- //

  const handleCardClick = () => {
    setModalItemData(itemData);
    setItemModalShown(true);
  } 

  const handleBuyClick = () => {
    setProductConfirm(itemData);
  };

  const addToCartWithAnimation = (item: ItemData) => {
    if (isOnCart) {addToCart(itemData); return}
    setAnimatingItemId(item._id);
  };

  return (

    <div
    ref={cardRef}
    className={`item-card ${animatingItemId === itemData._id ? 'animate-to-cart' : ''}`}
    onAnimationEnd={() => {
      setAnimatingItemId(null);
      setCartAnimating(true)
    }}
    >
    
    <div className="bg-slate-900 w-72 p-6 flex flex-col justify-center items-center relative z-10 select-none hover:cursor-pointer hover:-translate-y-4 transition-all" 
      style={{
        height: 420,
        backgroundImage: backgroundPath,
        backgroundRepeat: "no-repeat",
        WebkitBackgroundSize: 'contain',
        backgroundSize: '100%'
      }}
      onClick={() => handleCardClick()}
    >

      <div className="flex flex-col justify-center items-center gap-3 z-30">

        {/* GOLD & MIN. LEVEL */}
        <ItemDataContainer value={value} min_lvl={min_lvl} />

        {/* IMAGE  */}
        <img
          className={`h-44 drop-shadow-2xl ${isMagicalStuffShop ? 'rounded-full border-3 border-[#1e1f23]' : null}`}
          src={image}
          draggable={false}
          onError={(e) => {
            e.currentTarget.onerror = null; // Prevent infinite loop if fallback also fails
            e.currentTarget.src = "/images/shop/buy/interrogation_sign.png"; // Fallback image
            e.currentTarget.title = "Image not found"
          }}
        />

        {/* ITEM NAME */}
        <p
          className={`${nameFontSize} font-medium bg-clip-text text-transparent select-text text-center ${isMagicalStuffShop ? magicalStuffTextGradient : equipmentTextGradient}`}
        >
          {name}
        </p>

        {/* BUY BUTTONS */}
        <div className="w-full flex flex-row gap-4">
          <CardButton onClick={(e) => {e.stopPropagation(); handleBuyClick()}} label="BUY" />
          <CardButton onClick={(e) => {e.stopPropagation(); addToCartWithAnimation(itemData)}} label="ADD TO CART" isOnCart={isOnCart} isMagicalStuffShop={isMagicalStuffShop}/>
        </div>

      </div>

      <img
        className="absolute w-full h-full top-0 user"
        src="/images/shop/buy/card_frame.png"
        draggable={false}
      />
    </div>
  </div>
  );

} 

// -----  CARD BUTTON  ----- //

interface CardButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>,
  label: string,
  isOnCart?: boolean
  isMagicalStuffShop?: boolean
}

const CardButton: React.FC<CardButtonProps> = ({ onClick, label, isOnCart = false, isMagicalStuffShop = false }) => {

  if (!label || !onClick) { return null }

  const fontSize = label.length > 8 ? 'text-md' : 'text-xl';

  const blackBackground = "bg-[#1E1E1E] hover:bg-medievalSepia";
  const sepiaBackground = "bg-medievalSepia";

  const sepiaText = "text-white/90 hover:text-[#1E1E1E]";
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
      className={`${backgroundClass} leading-7 border rounded transition-all border-medievalSepia/60`}
    >
      <p
        className={`${fontSize} ${textColorClass} py-2 px-4 transition-all duration-500`}
      >{displayText}</p>
    </button>
  )

}

export default ItemCard;