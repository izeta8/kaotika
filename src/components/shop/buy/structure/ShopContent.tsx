import { ItemData } from "@/_common/interfaces/ItemData"
import { CartItem } from "@/_common/interfaces/CartItem"
import { Player } from "@/_common/interfaces/Player"
import { useRouter } from "next/router"
import ItemPreview from "../ItemPreview"
import { renderEquipmentItemData, renderEffects } from "@/components/shop/buy/ItemModal";
import ItemsList from "./ItemsList"

interface ShopContentProps {
  categoryData: ItemData[],
  addToCart: (item: ItemData) => void,
  setProductConfirm: Function,
  setItemModalShown: Function,
  setModalItemData: Function,
  cart: CartItem[],
  setCartAnimating: Function,
  playerData: Player | null,
  hoveredCard: ItemData | undefined,
  handleCardHover: Function
}


const ShopContent: React.FC<ShopContentProps> = ({ categoryData, addToCart, setProductConfirm, setItemModalShown, setModalItemData, cart, setCartAnimating, playerData, hoveredCard, handleCardHover }) => {
 
  const router = useRouter();

  return (
    <section className='w-full h-full relative z-30 flex justify-center items-center mb-8  animate-fadeIn'>

      <div className="w-11/12 flex flex-row flex-wrap">


        {/* UPPER ROW: Filter and Sort By */}
        <div className="w-full mb-3 bg-slate-800/10 flex flex-row justify-center items-center">
          {/* <p>FILTROS</p>
          <input type="text" placeholder="Filter" className="text-black text-3xl p-1" />
          <button className="text-black text-3xl p-1 border border-sepia bg-slate-500">Sort By</button> */}
          <div className="h-8"></div> 
        </div>

        {/* LOWER ROW: Filter and Sort By */}
        <div className={`relative w-full bg-blue-800/0 grid ${categoryData.length > 0 ? "grid-cols-[350px_1fr]" : "grid-cols-1"}`}>

          {categoryData.length > 0 && (
            <>
              {/* LEFT COLUMN: Items Preview */}
              <div className="w-[350px] px-3 bg-orange-500/0 relative">
                        
              <ItemPreview 
                hoveredCard={hoveredCard}
                isMagicalStuffShop={isMagicalStuffShop(router)}
                renderEquipmentItemData={renderEquipmentItemData}
                renderEffects={renderEffects}
                playerData={playerData}                          
                />
              </div>
            </>
          )}

          {/* RIGHT COLUMN: Shop */}
          <div>
            <div className="px-10 flex justify-center">
              {/* Items list */}
              <ItemsList
                categoryData={categoryData}
                setProductConfirm={setProductConfirm}
                addToCart={addToCart}
                setItemModalShown={setItemModalShown}
                setModalItemData={setModalItemData}
                cart={cart}
                setCartAnimating={setCartAnimating}
                playerData={playerData}
                handleCardHover={handleCardHover}
              />
            </div>
          </div>  

        </div>

      </div>


    </section>
  );
};

// --------------------//
// ----- UTILITY ----- //
// ------------------- //

const isMagicalStuffShop = (router: any): boolean => {
  const currentShopType = router.query.shopType;
  return currentShopType === "magical_stuff";
}


export default ShopContent;