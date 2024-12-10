import Layout from "@/components/Layout";
import { useRouter } from 'next/router'
import React from "react";
import { useSession } from 'next-auth/react';
import Cart from "@/components/shop/Cart";
import { useState, useEffect } from "react";
import ShopPlayerInfo from "@/components/shop/ShopPlayerInfo";
import { ItemData } from "@/_common/interfaces/ItemData";
import { CartItem } from "@/_common/interfaces/CartItem";
import Loading from "@/components/Loading";

// Shop Components
import { renderEquipmentItemData, renderEffects } from "@/components/shop/buy/ItemModal";
import { Info } from "@/components/shop/ShopPlayerInfo";
import Confirm from "@/components/shop/Confirm";
import ItemModal from "@/components/shop/buy/ItemModal";
import ShopBackground from "@/components/shop/buy/ShopBackground";
import ItemCard from "@/components/shop/buy/ItemCard"; 
import ShopHeader from "@/components/shop/buy/ShopHeader"; 
import { Player } from "@/_common/interfaces/Player";
import CartButton from "@/components/shop/buy/CartButton";

export type ShopCategories = "helmets" | "weapons" | "armors" | "shields" | "boots" | "rings" | "ingredients" | "containers";

// Shops item categories
const equipmentCategories: ShopCategories[] = ["helmets", "weapons", "armors", "shields", "boots", "rings"];
const magicalStuffCategories: ShopCategories[] = ["ingredients", "containers"];

const Shop = () => {

  const router = useRouter()
  const [loading, setLoading] = useState(true);
  const [playerData, setPlayerData] = useState<Player | null>(null);
  const [playerEmail, setPlayerEmail] = useState<string | null>(null);
  const { data: session } = useSession();

  const [categoryData, setCategoryData] = useState<ItemData[]>([]);
  const [productConfirm, setProductConfirm] = useState<CartItem[] | null>(null);
  const [currentCategory, setCurrentCategory] = useState<ShopCategories | undefined>(undefined);

  const [itemModalShown, setItemModalShown] = useState(false);
  const [modalItemData, setModalItemData] = useState<ItemData | undefined>();

  const [hoveredCard, setHoveredCard] = useState<ItemData|undefined>(undefined);
  
  // ---- CART ----  //

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartAnimating, setCartAnimating] = useState(false);

  const [itemsInCart, setItemsInCart] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        try {
          const parsedCart: CartItem[] = JSON.parse(storedCart);
          return parsedCart;
        } catch (error) {
          console.error("Error al cargar el carrito desde localStorage:", error);
        }
      }
    }
    return [];
  });

  // ---- SHOP ITEMS ----  //

  const [helmets, setHelmets] = useState<ItemData[]>([]);
  const [weapons, setWeapons] = useState<ItemData[]>([]);
  const [armors, setArmors] = useState<ItemData[]>([]);
  const [shields, setShields] = useState<ItemData[]>([]);
  const [boots, setBoots] = useState<ItemData[]>([]);
  const [rings, setRings] = useState<ItemData[]>([]);

  const [ingredients, setIngredients] = useState<ItemData[]>([]);
  const [containers, setContainers] = useState<ItemData[]>([]);

  // ---- SHOP CATEGORIES VARIABLES FOR MAPPING  ----  //

  const shopCategories: Record<string, ItemData[]> = {
    helmets,
    weapons,
    armors,
    shields,
    boots,
    rings,
    ingredients,
    containers,
  };

  const equipmentStateSetters = [
    { state: "helmets", setter: setHelmets },
    { state: "weapons", setter: setWeapons },
    { state: "armors", setter: setArmors },
    { state: "shields", setter: setShields },
    { state: "boots", setter: setBoots },
    { state: "rings", setter: setRings },
    { state: "helmets", setter: setHelmets },
    { state: "weapons", setter: setWeapons },
    { state: "armors", setter: setArmors },
    { state: "shields", setter: setShields },
    { state: "boots", setter: setBoots },
    { state: "rings", setter: setRings },
  ];

  const magicalStuffStateSetters = [
    { state: "ingredients", setter: setIngredients },
    { state: "containers", setter: setContainers },
  ];

  // ---------------------- //
  // ---- USE EFFECTS ----  //
  // ---------------------- //

  ////////////////////////////////////////////////////////////////////////////////

  // ---- FETCH PLAYER ---- //

  useEffect(() => {
    setPlayerEmail('ander.zubizarreta@ikasle.aeg.eus');
    // if (session?.user?.email) {
    //   setLoading(true);
      // setPlayerEmail(session.user.email);
    // }
  }, [session]);

  useEffect(() => {
    if (playerEmail) {
      setLoading(true)
      // Fetch data using the playerId
      fetch(`/api/shop/player?playerEmail=${playerEmail}`)
        .then(response => response.json())
        .then(data => {
          console.log(`el player : `, data.player);
          setPlayerData(data.player);
          // localStorage.setItem('playerData', JSON.stringify( data ));
          console.log(data.player, "is the data fetched");
          setLoading(false);
        })
        .catch(error => {
          console.error("Error fetching player:", error);
        });
    }
  }, [playerEmail]);


  ////////////////////////////////////////////////////////////////////////////////

  // ---- LOAD ITEMS DATA ---- //

  useEffect(() => {

    const currentRoute = Array.isArray(router.query.shopType) ? router.query.shopType[0] : router.query.shopType;
    if (!currentRoute) { return }

    // If the current route is not equipment or magical stuff, redirect to equipment.
    if (!["equipment", "magical_stuff"].includes(currentRoute)) {
      router.push("/shop/buy/equipment");
    }

    // Load the local storage data into the states
    const currentShopType = isMagicalStuffShop(router) ? magicalStuffStateSetters : equipmentStateSetters;
    currentShopType.forEach(categoryObject => loadLocalStorageIntoStates(categoryObject));

    // Set each shop type's default categories
    const defaultCategory = isMagicalStuffShop(router) ? magicalStuffCategories[0] : equipmentCategories[0];
    setCurrentCategory(defaultCategory);

  }, [router.query.shopType]);

  // Update 'categoryData' state (the displayed category) when the user changes.
  useEffect(() => {
    if (!currentCategory) { return }
    setCategoryData(shopCategories[currentCategory]);
  }, [currentCategory]);

  ////////////////////////////////////////////////////////////////////////////////

  // ---- MODALS STYLE BEHAVIOUR  ---- //

  // Disable scroll when the item modal shows.
  useEffect(() => {
    if (itemModalShown) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [itemModalShown]);

  // Handle cart
  useEffect(() => {
    if (isCartOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isCartOpen]);

  ////////////////////////////////////////////////////////////////////////////////

  // ---- BUY FUNCTIONS ---- //

  const handleConfirmBuy = async (productConfirm: CartItem[]) => {

    const products = [];
    console.log('productConfirm before push:', JSON.stringify(productConfirm, null, 2));
    if (!Array.isArray(productConfirm)) {
      products.push(productConfirm);
    } else {
      products.push(...productConfirm);
    }
    console.log('products after push:', JSON.stringify(products, null, 2));
    console.log("dame el email" + playerData?.email);

    try {

      if (!playerData?.email) {throw new Error("[Client Error] Playerdata state does not have a email currently!")}

      const result = await purchaseProduct(playerData?.email, products);
      console.log(result); // logs the inventory and gold after the Promise resolves
      ////////////////////////////////////
      if (result.success) {
        // Update the playerData
        const updatedPlayerData = {
          ...playerData,    // Spread all properties of playerData
          gold: result.gold,        // Override the gold property
          inventory: result.inventory // Override the inventory property
        };
        // Save the updated playerData to localStorage
        // localStorage.setItem('playerData', JSON.stringify(updatedPlayerData));
        setPlayerData(updatedPlayerData);
      }
      ////////////////////////////////////
      setProductConfirm(null);
    } catch (error) {
      console.error('Error during purchase:', error);
    }
  };

  const handleCancel = () => {
    setProductConfirm(null);
  };
  const handleBuyClick = () => {
    setProductConfirm(productConfirm);
  };

  ////////////////////////////////////////////////////////////////////////////////

  // ---- CART FUNCTIONS ---- //

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(itemsInCart));
  }, [itemsInCart]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const addToCart = (item: ItemData) => {

    const isInCart = isItemOnCart(item, itemsInCart);

    if (isEquipmentShop(router)) {

      setItemsInCart(prevItems => {
        return !isInCart
          ? [...prevItems, { ...item, quantity: 1 }] // If is not in the cart, the item is added to the array and put the quantity attribute
          : prevItems.filter((cartItem) => cartItem._id !== item._id); // If is in the cart, remove from the array.
      });

    }

    if (isMagicalStuffShop(router)) {

      setItemsInCart(prevItems => {

        if (isInCart) {
          return prevItems.map(cartItem =>
            cartItem._id === item._id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          );
        } else {
          return [...prevItems, { ...item, quantity: 1 }];
        }
      });
    }

  };

  const cartItemCount = itemsInCart.reduce((acc, item) => acc + item.quantity, 0);

  ////////////////////////////////////////////////////////////////////////////////

  // Update Item Preview (Left Column)

  const handleCardHover = (itemData: ItemData | undefined) => {
    setHoveredCard(itemData);
  }

  ////////////////////////////////////////////////////////////////////////////////

  // ---- RENDER ----  //

  if (loading) {
    return (<Loading />);
  }

  return (

      <Layout>

        <div className="relative -mt-2 min-h-screen">

          {/* <div className={`relative transition-all min-h-screen duration-200 ${itemModalShown || productConfirm ? 'blur-sm' : 'blur-none'}`}>  */}
          <div className={`relative transition-all min-h-screen duration-200`}>

            <ShopHeader
              currentCategory={currentCategory}
              setCurrentCategory={setCurrentCategory}
              isMagicalStuffShop={isMagicalStuffShop(router)}
            />

            <ShopContent
              categoryData={categoryData}
              setProductConfirm={setProductConfirm}
              addToCart={addToCart}
              setItemModalShown={setItemModalShown}
              setModalItemData={setModalItemData}
              cart={itemsInCart}
              setCartAnimating={setCartAnimating}
              playerData={playerData} 
              hoveredCard={hoveredCard} 
              handleCardHover={handleCardHover}
              
            />
            <ShopBackground />

            {/* Print image of the modal background to load it instantly. */}
            {isMagicalStuffShop(router) ?
              <img src="/images/shop/buy/magical_stuff_modal_background.webp"></img>
              :
              <img src="/images/shop/buy/equipment_modal_background.webp"></img>
            }

          </div>

          {/* Cart Button Wrapper */}
          <CartButton
            cartItemCount={cartItemCount}
            onCartClick={openCart}
            isCartAnimating={cartAnimating}
          />

          {/********** Modals ***********/}

          {itemModalShown && (
            <ItemModal
              playerData={playerData}
              itemModalShown={itemModalShown}
              setItemModalShown={setItemModalShown}
              itemData={modalItemData}
              isMagicalStuffShop={isMagicalStuffShop(router)}
            />
          )}

          {isCartOpen && (
            <div className="fixed inset-0 z-50">
              <div
                className="absolute inset-0 bg-black/60 pointer-events-auto"
                onClick={closeCart} // Close modal when clicking outside
              ></div>

              {/* Cart Modal */}
              <Cart
                isOpen={isCartOpen}
                onClose={closeCart}
                cartItems={itemsInCart}
                setItemsInCart={setItemsInCart}
                confirmPurchase={handleConfirmBuy}
                playerData={playerData}
              />
            </div>
          )}

          {productConfirm && (
             <Confirm isOpen={handleBuyClick} onCancel={handleCancel} onConfirm={handleConfirmBuy} product={productConfirm}/>
          )}

        </div>
      </Layout>
  )
};


// ---------------------------- //
// -----   SHOP CONTENT   ----- //
// ---------------------------- //

interface ShopContentProps {
  categoryData: Array<ItemData>,
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
    <section className='w-full h-full relative z-30 flex justify-center items-center'>

      <div className="w-11/12 flex flex-row flex-wrap">


        {/* UPPER ROW: Filter and Sort By */}
        <div className="w-full mb-3 bg-slate-800/10 flex flex-row justify-center items-center">
          <p>FILTROS</p>
          <input type="text" placeholder="Filter" className="text-black text-3xl p-1" />
          <button className="text-black text-3xl p-1 border border-sepia bg-slate-500">Sort By</button>
        </div>

        {/* LOWER ROW: Filter and Sort By */}
        <div className="relative w-full bg-blue-800/0 grid grid-cols-[350px_1fr]">

          {/* LEFT COLUMN: Items Preview */}
          <div className="w-[350px] px-3 bg-orange-500/0 relative">

            {/* Items Preview Column */}
            <div
                className="sticky top-60 w-full h-[85vh] bg-red-700/0 flex items-center flex-col gap-5"
              >

                <div className="w-full h-4/6 bg-[#1E1E1E] border-sepia border-2 p-5 rounded-sm flex items-center flex-col">

                  {hoveredCard?.name && (
                    <h2
                      className="text-4xl text-center underline text-medievalSepia pt-5 animate-fadeIn"
                    >
                      {hoveredCard?.name}
                    </h2>
                  )}

                  <div className="flex items-center flex-grow">
                    
                    {hoveredCard ? 

                      !isMagicalStuffShop(router) ? 
                        // EQUIPMENT MODAL 
                        <div className="animate-fadeIn">
                          {renderEquipmentItemData(hoveredCard?.modifiers, hoveredCard?.defense, hoveredCard?.base_percentage, playerData, hoveredCard.type)} 
                        </div>
                        :
                        // SHOP MODAL 
                        <div>
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
                  <Info imagePath={"/images/icons/level.png"} label={11} />
                  <Info imagePath={"/images/icons/level.png"} label={11} />
                </div>

          

            </div>

          </div>

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


// -------------------------- //
// -----   ITEMS GRID   ----- //
// -------------------------- //

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
    return <h2 className="text-4xl m-10 text-medievalSepia mt-5">There are no available items in this category</h2>;
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

const isEquipmentShop = (router: any): boolean => {
  const currentShopType = router.query.shopType;
  return currentShopType === "equipment";
}

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

const loadLocalStorageIntoStates = (categoryObject: {state: string, setter: Function}): void => {

  // Desestructurize the loop's current state name and setter.
  const { state, setter } = categoryObject;

  // If the state name or setter is null jump to next iteration
  if (!state || !setter) { return }

  // Get current iteration object's value from localstorage
  const localStorageData = localStorage.getItem(state);

  // If it exists, use its setter to set the localstorage's value into the state.
  if (localStorageData) {
    try {
      const parsedData = JSON.parse(localStorageData); // Parse the JSON string
      if (Array.isArray(parsedData)) {
        setter(parsedData);
      } else {
        console.warn("Data in localStorage is not an array:", parsedData);
        setter([]);
      }
    } catch (error) {
      console.error("Failed to parse localStorage data:", error);
      setter([]);
    }
  } else {
    console.log("No data found in localStorage for key:", state);
    setter([]);
  }
}

const purchaseProduct = async (playerEmail: string, products: Array<ItemData>) => {

  try {
    const response = await fetch('/api/shop/confirmPurchase', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ playerEmail, products }),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      // Handle the case where the purchase fails due to business logic (e.g., low level or insufficient funds)
      console.log('Purchase failed:', result.error); 

      return result;
    }

    // Handle the successful purchase case
    console.log('Purchase successful:', result);
    return result

  } catch (error) {
    console.error('Error during product purchase:', error);
  }
};

export default Shop;
