import { useRouter } from "next/router"
import { ItemData } from "@/_common/interfaces/ItemData"
import { CartItem } from "@/_common/interfaces/CartItem"
import { Player } from "@/_common/interfaces/Player"
import ItemCard from "../card/ItemCard"

interface ItemsListProps {
  categoryData: ItemData[],
  addToCart: (item: ItemData) => void,
  setProductConfirm: Function,
  setItemModalShown: Function,
  setModalItemData: Function,
  cart: CartItem[],
  setCartAnimating: Function
  playerData: Player | null,
  handleCardHover: Function
}

const ItemsList: React.FC<ItemsListProps> = ({ categoryData, addToCart, setProductConfirm, setItemModalShown, setModalItemData, cart, setCartAnimating, playerData, handleCardHover }) => {

  const router = useRouter();

  if (categoryData.length === 0) {
    return <h2 className="text-4xl m-10 text-medievalSepia mt-5 animate-fadeIn">There are no available items in this category</h2>;
  }

  return (
    <div className="w-full grid grid-cols-4 gap-8 place-items-center">
      {categoryData.map((item: ItemData, index: number) => (
        <ItemCard
          key={item._id}
          itemData={item}
          addToCart={addToCart}
          setProductConfirm={setProductConfirm}
          setItemModalShown={setItemModalShown}
          setModalItemData={setModalItemData}
          isMagicalStuffShop={isMagicalStuffShop(router)}
          setCartAnimating={setCartAnimating}
          isOnCart={isItemOnCart(item, cart)}
          hasEnoughMoney={hasEnoughMoney(playerData, item)}
          handleCardHover={handleCardHover}
        />
      ))}
    </div>
  );
};

// --------------------//
// ----- UTILITY ----- //
// ------------------- //

const isMagicalStuffShop = (router: any): boolean => {
  const currentShopType = router.query.shopType;
  return currentShopType === "magical_stuff";
}

const isItemOnCart = (item: ItemData, cart: CartItem[]): boolean => {
  return cart.some((cartItem: CartItem) => cartItem._id === item._id);
}

const hasEnoughMoney = (playerData: Player | null, item: ItemData) => {
  if (!playerData?.gold || item?.value === undefined) {return false}
  return playerData.gold >= item.value;
}

export default ItemsList;