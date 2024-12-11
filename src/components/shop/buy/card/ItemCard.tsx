import ItemDataContainer from "../itemData/ItemDataContainer";
import CardButton from "./ItemCardButton";
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
  isOnCart: boolean,
  hasEnoughMoney: boolean,
  handleCardHover: Function
}

const ItemCard: React.FC<ItemCardProps> = ({ itemData, addToCart, setProductConfirm, setItemModalShown, setModalItemData, isMagicalStuffShop, setCartAnimating, isOnCart, hasEnoughMoney, handleCardHover }) => {

  const [animatingItemId, setAnimatingItemId] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const cartPosition = { top: 20, left: window.innerWidth - 120 };

  if (!itemData) { return }

  const { name, value, min_lvl, image, isUnique } = itemData;

  // If the item does not have value, we do not want to show it in the shop.
  if (!value || value === 0) { return }

  // If the item is unique, we do not want to show it in the shop.
  if (isUnique) { return }

  if (!name) { return }

  const displayName = name.length >= 18 ? name.substring(0, 15) + '...' : name;

  const backgroundPath = isMagicalStuffShop ?
    "url('/images/shop/buy/magic_stuff_card_background.png')" :
    "url('/images/shop/buy/equipment_card_background.png')";

  const equipmentTextGradient = "bg-gradient-to-b from-[#FFD0A0] via-[#EED1B4] to-[#B2AF9E] bg-clip-text text-transparent ";

  // ---- USE EFFECTS ---- //
  useEffect(() => {
    if (animatingItemId && cardRef.current) {

      if (!cardRef.current) { return }

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
    if (isOnCart) { addToCart(itemData); return }
    setAnimatingItemId(item._id);
  };

  return (

    <>
      <style>
        {shrinkToCartStyles}
      </style>

      <div
        ref={cardRef}
        className={` item-card ${animatingItemId === itemData._id ? 'animate-to-cart' : ''}`}
        onAnimationEnd={() => {
          setAnimatingItemId(null);
          setCartAnimating(true)
        }}
        onMouseEnter={() => handleCardHover(itemData)}
        onMouseLeave={() => handleCardHover(undefined)}
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
            <ItemDataContainer value={value} min_lvl={min_lvl} hasEnoughMoney={hasEnoughMoney} />

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
              style={{ fontSize: 42 }}
              className={`
              whitespace-nowrap font-medium select-text text-center ${isMagicalStuffShop ? "text-[#bccff6]" : equipmentTextGradient}
              [filter:drop-shadow(0px_2px_0_rgba(0,0,0,0.3))_drop-shadow(0px_1px_0_rgba(0,0,0,0.3))_drop-shadow(0px_-1px_0_rgba(0,0,0,0.3))_drop-shadow(0px_0px_2px_rgba(0,0,0,.5))]
              `}
            >
              {displayName}
            </p>

            {/* BUY BUTTONS */}
            <div className="w-full flex flex-row gap-4 justify-center">
              <CardButton onClick={(e) => { e.stopPropagation(); handleBuyClick() }} label="BUY" hasEnoughMoney={hasEnoughMoney} />
              <CardButton onClick={(e) => { e.stopPropagation(); addToCartWithAnimation(itemData) }} label="ADD TO CART" isOnCart={isOnCart} isMagicalStuffShop={isMagicalStuffShop} />
            </div>

          </div>

          <img
            className="absolute w-full h-full top-0 user"
            src="/images/shop/buy/card_frame.png"
            draggable={false}
          />
        </div>
      </div>
    </>
  );
}

//********** TAILWIND CSS *************/
const shrinkToCartStyles = `
  @keyframes shrinkToCart {
    0% {
      transform: scale(1) translate(0, 0);
      opacity: 1;
    }
    100% {
      transform: scale(0.5) translate(var(--translate-x), var(--translate-y));
      opacity: 0;
    }
  }

  .item-card {
    position: relative;
    transition: transform 0.3s ease, opacity 0.3s ease;
  }

  .animate-to-cart {
    animation: shrinkToCart 0.7s ease forwards;
  }
`;

export default ItemCard;