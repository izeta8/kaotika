import { ItemData } from "@/_common/interfaces/ItemData";
import { Player } from "@/_common/interfaces/Player";
import { useState } from "react";

interface Props {
  playerData: Player;
  setSelectedItemToSell: (item: ItemData | null) => void;
  setHoverItemToSell: (item: ItemData | null) => void;
  selectedItemToSell: ItemData
}

const PlayerInventorySellShop: React.FC<Props> = ({ playerData, setSelectedItemToSell, setHoverItemToSell, selectedItemToSell }) => {

  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null); // Track timeout for hover

  const GRID_NUMBER_INVENTORY_SELL_SHOP = 72;

  const handleItemClick = (item: ItemData) => {
    if (selectedItemToSell === item) {
      // Deselect the item if it is already selected
      setSelectedItemToSell(null);
      setHoverItemToSell(null);
    } else {
      // Otherwise, select the new item
      setSelectedItemToSell(item);
    }
  };

  const handleMouseEnter = (item: ItemData) => {
    if (hoverTimeout) clearTimeout(hoverTimeout); // Clear previous timeout
    const timeout = setTimeout(() => {
      setHoverItemToSell(item); // Set the hover item after 1 second
    }, 200);
    setHoverTimeout(timeout);
  };

  const handleMouseLeave = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout); // Clear timeout when mouse leaves
    }
    setHoverItemToSell(null); // Remove hover item immediately
  };

  // Tailwind class logic to add animation to the selected item
  const getItemClass = (item: ItemData) => {
    return item === selectedItemToSell
      ? "border-4 animate-borderMovement transform scale-90 transition-all duration-300"
      : "border-3 border-black"; // Default border when not selected
  };

  const containerStyle = "flex justify-center items-center bg-black/30 aspect-square hover:cursor-pointer";

  return (
    <div className="w-10/12 p-4">
      {/* Inject the custom animation style for snake-like border effect */}
      <div className="w-full h-full bg-black/70">
        <div className="grid grid-cols-12 grid-rows-5 flex-grow">
          {
            playerData?.inventory.helmets.map(helmet => {
              return (
                <div key={helmet._id} className={`${containerStyle} ${getItemClass(helmet)}`} >
                  <img src={helmet.image} alt={helmet.name} className="w-full h-auto"
                    onClick={() => handleItemClick(helmet)}
                    onMouseEnter={() => handleMouseEnter(helmet)}
                    onMouseLeave={() => handleMouseLeave()}
                  />
                </div>
              )
            })
          }
          {
            playerData?.inventory.weapons.map(weapon => {
              return (
                <div key={weapon._id} className={`${containerStyle} ${getItemClass(weapon)}`} >
                  <img src={weapon.image} alt={weapon.name} className="w-full h-auto"
                    onClick={() => handleItemClick(weapon)}
                    onMouseEnter={() => handleMouseEnter(weapon)}
                    onMouseLeave={() => handleMouseLeave()}
                  />
                </div>
              )
            })
          }
          {
            playerData?.inventory.armors.map(armor => {
              return (
                <div key={armor._id} className={`${containerStyle} ${getItemClass(armor)}`} >
                  <img src={armor.image} alt={armor.name} className="w-full h-auto"
                    onClick={() => handleItemClick(armor)}
                    onMouseEnter={() => handleMouseEnter(armor)}
                    onMouseLeave={() => handleMouseLeave()}
                  />
                </div>
              )
            })
          }
          {
            playerData?.inventory.shields.map(shield => {
              return (
                <div key={shield._id} className={`${containerStyle} ${getItemClass(shield)}`} >
                  <img src={shield.image} alt={shield.name} className="w-full h-auto"
                    onClick={() => handleItemClick(shield)}
                    onMouseEnter={() => handleMouseEnter(shield)}
                    onMouseLeave={() => handleMouseLeave()}
                  />
                </div>
              )
            })
          }
          {
            playerData?.inventory.artifacts.map(artifact => {
              return (
                <div key={artifact._id} className={`${containerStyle} ${getItemClass(artifact)}`} >
                  <img src={artifact.image} alt={artifact.name} className="w-full h-auto"
                    onClick={() => handleItemClick(artifact)}
                    onMouseEnter={() => handleMouseEnter(artifact)}
                    onMouseLeave={() => handleMouseLeave()}
                  />
                </div>
              )
            })
          }
          {
            playerData?.inventory.boots.map(boot => {
              return (
                <div key={boot._id} className={`${containerStyle} ${getItemClass(boot)}`} >
                  <img src={boot.image} alt={boot.name} className="w-full h-auto"
                    onClick={() => handleItemClick(boot)}
                    onMouseEnter={() => handleMouseEnter(boot)}
                    onMouseLeave={() => handleMouseLeave()}
                  />
                </div>
              )
            })
          }
          {
            playerData?.inventory.rings.map(ring => {
              return (
                <div key={ring._id} className={`${containerStyle} ${getItemClass(ring)}`} >
                  <img src={ring.image} alt={ring.name} className="w-full h-auto"
                    onClick={() => handleItemClick(ring)}
                    onMouseEnter={() => handleMouseEnter(ring)}
                    onMouseLeave={() => handleMouseLeave()}
                  />
                </div>
              )
            })
          }
          {
            playerData?.inventory.ingredients.map(ingredient => {
              return (
                <div key={ingredient._id} className={`relative ${containerStyle} ${getItemClass(ingredient)}`}
              >
                <img
                  src={ingredient.image}
                  alt={ingredient.name}
                  className="w-full h-auto"
                  onClick={() => handleItemClick(ingredient)}
                  onMouseEnter={() => handleMouseEnter(ingredient)}
                  onMouseLeave={() => handleMouseLeave()}
                  draggable={false}
                />
                <span className="absolute bottom-0 right-0 text-white text-5xl" onClick={() => handleItemClick(ingredient)}
                  onMouseEnter={() => handleMouseEnter(ingredient)}
                  onMouseLeave={() => handleMouseLeave()}>
                  {ingredient.qty}
                </span>
              </div>
            )
            })
          }

          {
            Array.from({
              length:
                GRID_NUMBER_INVENTORY_SELL_SHOP
                - playerData?.inventory.helmets.length!!
                - playerData?.inventory.weapons.length!!
                - playerData?.inventory.armors.length!!
                - playerData?.inventory.shields.length!!
                - playerData?.inventory.artifacts.length!!
                - playerData?.inventory.boots.length!!
                - playerData?.inventory.rings.length!!
                - playerData?.inventory.ingredients.length!!
            }).map((element, index) => <div key={index} className="flex justify-center items-center bg-black/30 aspect-square" style={{ 'border': '3px ridge #000000' }}></div>)
          }

        </div>
      </div>
    </div>
  );
}

export default PlayerInventorySellShop;
