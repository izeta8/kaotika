import ItemDataContainer from "./ItemDataContainer";
import { ItemData } from "@/_common/interfaces/ItemData";

const ItemCard: React.FC<{ itemData: ItemData; currentCategory: string; addToCart: (item: ItemData) => void ; setItemModalShown: Function, setModalItemData: Function, isMagicalStuffShop: boolean}> = ({ itemData, currentCategory, addToCart, setProductConfirm, setItemModalShown, setModalItemData, isMagicalStuffShop }) => {

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


  // ---- UTILITY ---- //

  const handleCardClick = () => {
    setModalItemData(itemData);
    setItemModalShown(true);
  } 

  const handleBuyClick = () => {
    setProductConfirm(itemData);
  };

  return (
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
          <CardButton onClick={(e) => {e.stopPropagation(); addToCart(itemData)}} label="ADD TO CART" />
        </div>

      </div>

      <img
        className="absolute w-full h-full top-0 user"
        src="/images/shop/buy/card_frame.png"
        draggable={false}
      />
    </div>
  );

} 


// -----  CARD BUTTON  ----- //

const CardButton: React.FC<{ onClick:  React.MouseEventHandler<HTMLButtonElement>, label: string }> = ({ onClick, label }) => {

  if (!label || !onClick) { return null; }

  const fontSize = label.length > 8 ? 'text-md' : 'text-xl';

  return (
    <button
      onClick={onClick}
      className="bg-[#1E1E1E] leading-7 border rounded hover:bg-medievalSepia transition-all border-medievalSepia/60"
    >
      <p
        className={`${fontSize} py-2 px-4 text-white/90 hover:text-[#1E1E1E] transition-all duration-500 `}
      >{label}</p>
    </button>
  )

}
 
export default ItemCard;