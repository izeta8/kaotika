import { ItemData } from "@/_common/interfaces/ItemData";
import { Player } from "@/_common/interfaces/Player";
import { LevelDisplay } from "../sell/SellPlayerInfo";
import GoldDisplay from "../GoldDisplay";

interface ItemPreviewProps {
  hoveredCard: ItemData | undefined,
  isMagicalStuffShop: boolean,
  renderEquipmentItemData: Function,
  renderEffects: Function,
  playerData: Player | null
}


const ItemPreview: React.FC<ItemPreviewProps> = ({hoveredCard, isMagicalStuffShop, renderEquipmentItemData, renderEffects, playerData }) => {

  return (
    
    <div
        className="sticky top-60 w-full h-[85vh] bg-red-700/0 flex items-center flex-col gap-5"
      >

        <div className={`w-full h-4/6 bg-[#1E1E1E] border-sepia border-2 p-5 rounded-sm flex items-center flex-col ${isMagicalStuffShop ? "justify-center gap-8" : null}`}>

          {hoveredCard?.name && (
            <h2
              className={`text-4xl text-center underline text-medievalSepia animate-fadeIn ${!isMagicalStuffShop ? "pt-10" : null}`}
            >
              {hoveredCard?.name}
            </h2>
          )}

          <div className={`flex items-center ${!isMagicalStuffShop ? "flex-grow" : null}`}>
            
            {hoveredCard ? 

              !isMagicalStuffShop ? 

                // EQUIPMENT MODAL 
                <div className="animate-fadeIn">
                  {renderEquipmentItemData(hoveredCard?.modifiers, hoveredCard?.defense, hoveredCard?.base_percentage, playerData, hoveredCard.type)} 
                </div>
                :
                // SHOP MODAL 
                <div className="animate-fadeIn text-[#EED1B4]">
                  {renderEffects(hoveredCard?.effects, hoveredCard?.type)}
                </div>

            : 
              <p className="text-4xl text-medievalSepia text-center italic text-balance animate-fadeIn">Hover an item to see its stats.</p>   
            }

          </div>

        </div>

        <div
          className="w-full flex flex-row gap-4 justify-center items-center"
        >
          {playerData?.level && (<LevelDisplay level={playerData?.level} />)}
          {playerData?.gold && (<GoldDisplay gold={playerData?.gold} />)}
        </div>


    </div>

  )

}


export default ItemPreview;