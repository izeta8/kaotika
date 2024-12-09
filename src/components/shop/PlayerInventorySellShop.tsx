import { Armor } from "@/_common/interfaces/Armor";
import { Artifact } from "@/_common/interfaces/Artifact";
import { Boot } from "@/_common/interfaces/Boot";
import { Helmet } from "@/_common/interfaces/Helmet";
import { Ingredient } from "@/_common/interfaces/Ingredients";
import { Player } from "@/_common/interfaces/Player";
import { Ring } from "@/_common/interfaces/Ring";
import { Shield } from "@/_common/interfaces/Shield";
import { Weapon } from "@/_common/interfaces/Weapon";
import { GRID_NUMBER } from "@/constants/constants";
import { useState } from "react";

interface Props {
    playerData?: Player;
    setSelectedItemToSell?: (item: Helmet | Armor | Weapon | Artifact | Ring | Boot | Shield | Ingredient) => void;
    setHoverItemToSell?: (item: Helmet | Armor | Weapon | Artifact | Ring | Boot | Shield | Ingredient | null) => void;
  }

const PlayerInventorySellShop: React.FC<Props> = ({playerData, setSelectedItemToSell, setHoverItemToSell}) => {

  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null); // Track timeout for hover

  const handleMouseEnter = (item: Helmet | Armor | Weapon | Artifact | Ring | Boot | Shield | Ingredient | null) => {
    if (hoverTimeout) clearTimeout(hoverTimeout); // Clear previous timeout
    const timeout = setTimeout(() => {
      setHoverItemToSell?.(item); // Set the hover item after 1 second
    }, 500); 
    setHoverTimeout(timeout);
  };

  const handleMouseLeave = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout); // Clear timeout when mouse leaves
    }
    setHoverItemToSell?.(null); // Remove hover item immediately
  };
       
        return (
        <div className="w-10/12 p-4">
          <div className="w-full h-full bg-black/70">
            <div className="grid grid-cols-12 grid-rows-5 flex-grow">
              {
                playerData?.inventory.helmets.map(helmet => {
                  return (
                    <div key={helmet._id} className="flex justify-center items-center bg-black/30 aspect-square" style={{ 'border': '3px ridge #000000' }}>
                      <img src={helmet.image} alt={helmet.name} className="w-full h-auto" 
                      onClick={() => setSelectedItemToSell?.(helmet)}
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
                    <div key={weapon._id} className="flex justify-center items-center bg-black/30 aspect-square" style={{ 'border': '3px ridge #000000' }}>
                      <img src={weapon.image} alt={weapon.name} className="w-full h-auto" 
                      onClick={() => setSelectedItemToSell?.(weapon)}
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
                    <div key={armor._id} className="flex justify-center items-center bg-black/30 aspect-square" style={{ 'border': '3px ridge #000000' }}>
                      <img src={armor.image} alt={armor.name} className="w-full h-auto" 
                      onClick={() => setSelectedItemToSell?.(armor)}
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
                    <div key={shield._id} className="flex justify-center items-center bg-black/30 aspect-square" style={{ 'border': '3px ridge #000000' }}>
                      <img src={shield.image} alt={shield.name} className="w-full h-auto" 
                      onClick={() => setSelectedItemToSell?.(shield)} 
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
                    <div key={artifact._id} className="flex justify-center items-center bg-black/30 aspect-square" style={{ 'border': '3px ridge #000000' }}>
                      <img src={artifact.image} alt={artifact.name} className="w-full h-auto" 
                      onClick={() => setSelectedItemToSell?.(artifact)} 
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
                    <div key={boot._id} className="flex justify-center items-center bg-black/30 aspect-square" style={{ 'border': '3px ridge #000000' }}>
                      <img src={boot.image} alt={boot.name} className="w-full h-auto" 
                      onClick={() => setSelectedItemToSell?.(boot)} 
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
                    <div key={ring._id} className="flex justify-center items-center bg-black/30 aspect-square" style={{ 'border': '3px ridge #000000' }}>
                      <img src={ring.image} alt={ring.name} className="w-full h-auto" 
                      onClick={() => setSelectedItemToSell?.(ring)} 
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
                    <div key={ingredient._id} className="flex justify-center items-center bg-black/30 aspect-square" style={{ 'border': '3px ridge #000000' }}>
                      <img src={ingredient.image} alt={ingredient.name} className="w-full h-auto" 
                      onClick={() => setSelectedItemToSell?.(ingredient)}
                      onMouseEnter={() => handleMouseEnter(ingredient)} 
                      onMouseLeave={() => handleMouseLeave()}  
                      />
                    </div>
                  )
                })
              }
              
              {
                Array.from({
                  length:
                    GRID_NUMBER
                    - playerData?.inventory.helmets.length!!
                    - playerData?.inventory.weapons.length!!
                    - playerData?.inventory.armors.length!!
                    - playerData?.inventory.shields.length!!
                    - playerData?.inventory.artifacts.length!!
                    - playerData?.inventory.boots.length!!
                    - playerData?.inventory.rings.length!!
                    - playerData?.inventory.healing_potions.length!!
                    - playerData?.inventory.antidote_potions.length!!
                    - playerData?.inventory.enhancer_potions.length!!
                }).map((element, index) => <div key={index} className="flex justify-center items-center bg-black/30 aspect-square" style={{ 'border': '3px ridge #000000' }}></div>)
              }


            </div>
          </div>
        </div>
    );
}


export default  PlayerInventorySellShop;