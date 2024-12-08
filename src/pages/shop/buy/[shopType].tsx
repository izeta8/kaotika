import Layout from "@/components/Layout";
import Link from 'next/link';
import { redirect } from "next/navigation";
import { useRouter } from 'next/router'
import React from "react";
import { useSession, signOut } from 'next-auth/react';
import { FaShoppingCart } from 'react-icons/fa';
import Cart from "@/components/shop/Cart";
import { useState, useEffect } from "react";
import ShopPlayerInfo from "@/components/shop/ShopPlayerInfo";
import { ItemData } from "@/_common/interfaces/ItemData";
import { CartItem } from "@/_common/interfaces/CartItem";
import Loading from "@/components/Loading";

// Shop Components
import Confirm from "@/components/shop/Confirm";
import ItemModal from "@/components/shop/buy/ItemModal";
import ShopBackground from "@/components/shop/buy/ShopBackground";
import ItemCard from "@/components/shop/buy/ItemCard"; 
import ShopHeader from "@/components/shop/buy/ShopHeader"; 
import { Player } from "@/_common/interfaces/Player";

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
    if (session?.user?.email) {
      setLoading(true);
      setPlayerEmail(session.user.email);
    }
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
    if (isEquipmentShop(router)) {
      setItemsInCart(prevItems => {
        if (prevItems.find(cartItem => cartItem._id === item._id)) {
          return prevItems;
        } else {
          return [...prevItems, { ...item, quantity: 1 }];
        }
      });
    } else if (isMagicalStuffShop(router)) {
      setItemsInCart(prevItems => {
        const itemInCart = prevItems.find(cartItem => cartItem._id === item._id);
        if (itemInCart) {
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

  // ---- RENDER ----  //

  if (loading) {
    return (<Loading />);
  }

  return (
 
      <Layout>

        <div className="relative -mt-2 min-h-screen">
           
          <div className={`relative transition-all min-h-screen duration-200 ${itemModalShown || productConfirm ? 'blur-sm' : 'blur-none'}`}> 
            <ShopHeader 
              currentCategory={currentCategory}
              setCurrentCategory={setCurrentCategory}
              onCartClick={openCart} 
              cartItemCount={cartItemCount}
              isMagicalStuffShop={isMagicalStuffShop(router)}
              isCartAnimating={cartAnimating}
            />
            <ShopContent 
              categoryData={categoryData}
              setProductConfirm={setProductConfirm}
              addToCart={addToCart}
              setItemModalShown={setItemModalShown}
              setModalItemData={setModalItemData}
              setCartAnimating={setCartAnimating}
            />
            <ShopBackground />
          </div>

          <ShopPlayerInfo gold={playerData?.gold} level={playerData?.level}/>
          
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
}

const ShopContent: React.FC<ShopContentProps> = ({ categoryData, addToCart, setProductConfirm, setItemModalShown, setModalItemData, setCartAnimating }) => {
  return (
    <section className='w-full h-full relative z-30 flex justify-center items-center'>

      {/* FILTER AND SORT BY */}
      <ItemsList 
        categoryData={categoryData}
        setProductConfirm={setProductConfirm}
        addToCart={addToCart}
        setItemModalShown={setItemModalShown}
        setModalItemData={setModalItemData}
        setCartAnimating={setCartAnimating}
      />
    
    </section>
  );
};


// -------------------------- //
// -----   ITEMS GRID   ----- //
// -------------------------- //

interface ItemsListProps { 
  categoryData: Array<ItemData>,
  addToCart: (item: ItemData) => void,
  setProductConfirm: Function,
  setItemModalShown: Function,
  setModalItemData: Function 
} 

const ItemsList: React.FC<ItemsListProps> = ({ categoryData, addToCart, setProductConfirm, setItemModalShown, setModalItemData, setCartAnimating }) => {
     
  const router = useRouter();
   
  if (categoryData.length === 0) {
    return <h2 className="text-4xl m-10 text-medievalSepia">There are no available items in this category</h2>;
  }

  return (
    <div className="w-11/12 my-10 grid grid-cols-5 gap-8 place-items-center">
      {categoryData.map((item: ItemData, index: number) => (
        <ItemCard 
          key={index}
          itemData={item}
          addToCart={addToCart}
          setProductConfirm={setProductConfirm}
          setItemModalShown={setItemModalShown}
          setModalItemData={setModalItemData} 
          isMagicalStuffShop={isMagicalStuffShop(router)}
          setCartAnimating={setCartAnimating} />
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
