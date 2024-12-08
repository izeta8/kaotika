import { ItemData } from "@/_common/interfaces/ItemData";
import ItemDataContainer from "./ItemDataContainer";
import { Player } from "@/_common/interfaces/Player";
import React from "react";

interface ItemModalProps {
  itemModalShown: boolean,
  setItemModalShown: Function,
  itemData: ItemData | undefined,
  playerData: Player | null
  isMagicalStuffShop: boolean
} 

// Style variables 
const equipmentTextGradient = "bg-gradient-to-b from-[#FFD0A0] via-[#EED1B4] to-[#B2AF9E]"; 
const magicalStuffTextGradient = "bg-gradient-to-b from-[#212532] via-[#9CB5EA] to-[#3A3C45]"; 

const ItemModal: React.FC<ItemModalProps> = ({itemModalShown, setItemModalShown, itemData, playerData, isMagicalStuffShop}) => {
   
  if (!itemData) {return}
  if (!itemData?.value) {return}

  const {name} = itemData;

  const modalBackgroundImage = isMagicalStuffShop 
  ? "url('/images/shop/buy/magical_stuff_modal_background.webp')" 
  : "url('/images/shop/buy/equipment_modal_background.webp')";

  return (
    
    <div 
      onClick={() => setItemModalShown(false)} 
      className={`fixed flex justify-center items-center h-screen pb-28 mt-28 w-full top-0 left-0 bg-black/50 transition-all z-50 ${itemModalShown ? 'opacity-100' : 'opacity-0'} `} 
    > 
    
      <div 
        onClick={(e) => e.stopPropagation()}
        className='relative flex justify-center items-center hover:cursor-default'
        style={{
          backgroundImage: modalBackgroundImage,
          backgroundPosition: "center",
          backgroundSize: '100%',
          backgroundRepeat: 'no-repeat',
          width: 1024,
          height: 690, 
        }} 
      >
         
        {/* Content Container */}
        <div className="relative bg-red-500/0 w-3/4 h-3/5 py-3 flex flex-col gap-3">

          {/* Close Button */}
          <CloseButton setItemModalShown={setItemModalShown} />

          {/* Row 1: Title */}
          <UpperRow name={name} isMagicalStuffShop={isMagicalStuffShop} />

          {/* Row 2: Item Data, Image, Description */}
          <LowerRow itemData={itemData} playerData={playerData} isMagicalStuffShop={isMagicalStuffShop} />

        </div>

      </div>
    </div>
     
  );

}

// ---- Close Button ---- // 

const CloseButton: React.FC<{setItemModalShown: Function}> = ({setItemModalShown}) => {

  return (
    <div 
      className="absolute hover:cursor-pointer -right-3 -top-8 bg-[#523f29]/30 rounded-full border border-medievalSepia w-12 h-12 flex justify-center items-center hover:scale-105 transition-all"
      onClick={() => setItemModalShown(false)}
    >  
      <p className="ml-0.5 text-2xl">X</p>
    </div>
  )

}

// ---- Upper Row ---- // 

interface UpperRowProps {
  name: string, 
  isMagicalStuffShop: boolean
}

const UpperRow: React.FC<UpperRowProps> = ({name, isMagicalStuffShop}) => {

  return (
    <div className="bg-blue-500/0 ">
      <h2 className={`text-7xl py-2 bg-clip-text text-transparent select-text text-center ${isMagicalStuffShop ? magicalStuffTextGradient : equipmentTextGradient}`}>
        {name}
      </h2>
    </div>
  )

}

// ---- Lower Row ---- // 

interface LowerRowProps {
  itemData: ItemData,
  playerData: Player | null,
  isMagicalStuffShop: boolean
}

const LowerRow: React.FC<LowerRowProps> = ({itemData, playerData, isMagicalStuffShop}) => {
  
  const {description, type, value, modifiers, effects, min_lvl, image, base_percentage, defense} = itemData;
    
  const hasModifiers = () => Object.values(modifiers).some(value => value !== 0);
  const hasEffects = () => effects && effects.length>0;

  return (
    <div className="grid grid-cols-3 h-full bg-orange-300/0">

    {/* Item Data */}
    <div className="flex justify-center items-center flex-col ">  

        {!isMagicalStuffShop ? 
          // EQUIPMENT MODAL 
          <div>
            {!hasModifiers ?
              <p className={`text-[#EED1B4] text-3xl italic`}>This item does not have any modifier.</p> 
            :
              renderModifiers(modifiers, playerData, type) 
            }
            {(defense || base_percentage) && <hr className="w-5/6 mt-3 mb-1 border-medievalSepia opacity-30"/> }
            {defense && <p className="text-[#EED1B4] text-3xl">{`Defense: ${defense}`}</p>}
            {base_percentage && <p className="text-[#EED1B4] text-3xl">{`Base Percentage: ${base_percentage}`}</p>}
          </div>
          :
          // SHOP MODAL 
          <div>
            {!hasEffects ?
              <p className={`text-[#EED1B4] text-3xl italic`}>This item does not have any effect.</p> 
            :
              renderEffects(effects, type)
            }
          </div>
        }

    </div>
    
    {/* Image */}
    <div className="flex justify-center items-center flex-col gap-3">
      <img  
        className={`h-56 drop-shadow-[0_10px_10px_rgba(0,0,0,0.45)] select-none ${isMagicalStuffShop ? 'rounded-full border-3 border-[#1e1f23]' : null}`}
        src={image}  
        draggable={false}
        onError={(e) => {
          e.currentTarget.onerror = null; // Prevent infinite loop if fallback also fails
          e.currentTarget.src = "/images/shop/buy/interrogation_sign.png"; // Fallback image
          e.currentTarget.title="Image not found"
        }}
      />
      <ItemDataContainer value={value} min_lvl={min_lvl} />
    </div>

    {/* Description */}
    <div className="flex justify-center items-center bg">
      <p
        className={`text-4xl italic text-balance py-2 bg-clip-text text-transparent select-text text-center ${isMagicalStuffShop ? magicalStuffTextGradient : equipmentTextGradient}`}
      >
        {`"${description}"`}
      </p>
    </div>

  </div>

  )

}


// ----------------------- //
// -----   RENDER   -----  //
// ----------------------- //


// Function to render the modifiers of the modal
const renderModifiers = (modifiers: Record<string, number>, playerData: Player | null, itemType: string) => {

  if (!modifiers) {return}

  const redColor = "text-[#e8513c]";
  const greenColor = "text-[#7cc74e]";

  return Object.entries(modifiers)
    .map(([key, value]) => {

      const attribute = key;
      const formatedAttribute = attribute?.split('_')
                              .map((word) => capitalizeFirstLetter(word))
                              .join(' ');


      let valueDifference; 
       
      if (playerData?.equipment) { 
        const equippedItem = playerData.equipment[itemType];
        if (equippedItem?.modifiers) {
          const playerValue = equippedItem.modifiers[attribute];
          valueDifference = value - playerValue;
        }
      }

      if (value !== 0) {
        return (
          <p  
            key={`${attribute}-p`}
            className="text-[#EED1B4] text-3xl"
          >
            {/* Attribute Name */}
            {`${formatedAttribute}: `}

            {/* Attibute Value */}
            <span   
              className={`${value>0 ? greenColor : redColor}`}
              key={`${attribute}-value`}
            >
              {value}
            </span>
            
            {/* Difference from current stats */} 
            {(valueDifference !== undefined && valueDifference !== null) && (
              valueDifference === 0 ? (
                <span
                  className="text-2xl italic text-gray-300 opacity-60"
                  key={`${attribute}-valueDifference`}
                >
                  (same)
                </span>
              ) : (
                <span
                  className={`${valueDifference > 0 ? greenColor : redColor} text-2xl italic`}
                  key={`${attribute}-valueDifference`}
                >
                  {`(${valueDifference > 0 ? '+' : ''}${valueDifference})`}
                </span>
              )
            )}

          </p>
        )
      }

      return;
    });
};

const renderEffects = (effects: Array<string>, itemType: string) => {

  if (itemType !== "ingredient") { return }

  return (
    
    effects.map(effect => {
      const effectName = capitalizeFirstLetter(effect);

      return (<p  
        key={`${effect}-p`}
        className="text-[#9CB5EA] text-3xl"
        >
          {effectName}
        </p>
      )
    })
  );  
}

// ------------------------ //
// -----   UTILITY   -----  //
// ------------------------ //


// Capitalize first letter of string
function capitalizeFirstLetter(string: string): string {
  if (!string) return ''; // Handle empty string
  return string.charAt(0).toUpperCase() + string.slice(1).replaceAll('_', ' ');
} 

export default ItemModal;
