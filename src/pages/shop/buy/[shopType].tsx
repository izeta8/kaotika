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

type ShopCategoryKeys = "helmets" | "weapons" | "armors" | "shields" | "boots" | "rings" | "ingredients" | "containers";

// Shops item categories
const equipmentCategories = ["helmets", "weapons", "armors", "shields", "boots", "rings"];
const magicalStuffCategories = ["ingredients", "containers"];


const Shop = () => {

  const router = useRouter()
  const [loading, setLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [playerData, setPlayerData] = useState<object | null>(null);
  const [playerEmail, setPlayerEmail] = useState<string | null>(null);
  const { data: session } = useSession();

  const [categoryData, setCategoryData] = useState<Array<ItemData>>([]);
  const [productConfirm, setProductConfirm] = useState<object | null>(null);
  const [currentCategory, setCurrentCategory] = useState<string>('');

  const [itemModalShown, setItemModalShown] = useState(true);
  const [modalItemData, setModalItemData] = useState<ItemData|undefined>();

  // ---- SHOP ITEMS ----  //

  const [helmets, setHelmets] = useState<Array<ItemData>>([]);
  const [weapons, setWeapons] = useState<Array<ItemData>>([]);
  const [armors, setArmors] = useState<Array<ItemData>>([]);
  const [shields, setShields] = useState<Array<ItemData>>([]);
  const [boots, setBoots] = useState<Array<ItemData>>([]);
  const [rings, setRings] = useState<Array<ItemData>>([]);

  const [ingredients, setIngredients] = useState<Array<ItemData>>([]);
  const [containers, setContainers] = useState<Array<ItemData>>([]);


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
          console.log(`el player : `, data);
          setPlayerData(data);
          // localStorage.setItem('playerData', JSON.stringify( data ));
          console.log(data, "is the data fetched");
          setLoading(false);
        })
        .catch(error => {
          console.error("Error fetching player:", error);
        });
    }
  }, [playerEmail]);


  ////////////////////////////////////////////////////////////////////////////////


  useEffect(() => {

    const currentRoute = router.query.shopType;
    if (!currentRoute) { return }
    if (!currentRoute) { return }

    // If the current route is not equipment or magical stuff, redirect to equipment.
    if (!["equipment", "magical_stuff"].includes(currentRoute)) {
      router.push("/shop/buy/equipment");
    }

    // Set each shop type's default categories
    const defaultCategory = isMagicalStuffShop(router) ? magicalStuffCategories[0] : equipmentCategories[0];
    setCurrentCategory(defaultCategory);

  }, [router.query.shopType]);


  // Update 'categoryData' state (the displayed category) when the user changes.
  useEffect(() => {
    if (!currentCategory) { return }
    if (!currentCategory) { return }
    setCategoryData(shopCategories[currentCategory]);
  }, [currentCategory]);



  // Load each category data from localStorage into the states.
  useEffect(() => {
    const currentShopType = isMagicalStuffShop(router) ? magicalStuffStateSetters : equipmentStateSetters;
    currentShopType.forEach(categoryObject => loadLocalStorageIntoStates(categoryObject));
  }, []);

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

  // ---- UTILITY ----  //

  const loadLocalStorageIntoStates = (categoryObject): void => {

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
      console.log("No data found in localStorage for key:", currentCategory);
      setter([]);
    }
  }

  const handleConfirmBuy = async (productConfirm) => {
    const products = [];
    console.log('productConfirm before push:', JSON.stringify(productConfirm, null, 2));
    if (!Array.isArray(productConfirm)) {
      products.push(productConfirm);
    } else {
      products.push(...productConfirm);
    }
    console.log('products after push:', JSON.stringify(products, null, 2));
    try {
      const result = await purchaseProduct(playerData?.email, products);
      console.log(result); // logs the inventory and gold after the Promise resolves
      ////////////////////////////////////
      if (result.success) {
        // Update the playerData 
        const updatedPlayerData = {
          ...playerData,
          player: {
            ...playerData.player,
            gold: result.gold, // Update gold with the new value
            inventory: result.inventory, // Update inventory with the new value
          }
        };
        // Save the updated playerData to localStorage
        localStorage.setItem('playerData', JSON.stringify(updatedPlayerData));
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

  const purchaseProduct = async (playerEmail, products) => {
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
        
        alert(result.message); // Show the error message to the user
        return result;
      }

      // Handle the successful purchase case
      console.log('Purchase successful:', result);
      alert('Purchase successful!');
      return result

    } catch (error) {
      console.error('Error during product purchase:', error);
      alert('An error occurred while processing your purchase.');
    }
  };


  //Cart funcions

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
  const increaseItem = (id: string) => {
    setItemsInCart(prevItems =>
      prevItems.map(item =>
        item._id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseItem = (id: string) => {
    setItemsInCart(prevItems =>
      prevItems.map(item =>
        item._id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setItemsInCart(prevItems => prevItems.filter(item => item._id !== id));
  };

  const clearCart = () => setItemsInCart([]);

  const cartItemCount = itemsInCart.reduce((acc, item) => acc + item.quantity, 0);

  // ---- RENDER ----  //

  if (loading) {
    return (<Loading />);
  }

  return (
 
      <Layout>

        <div className="relative -mt-2">
           
          <div className={`transition-all duration-700 ${itemModalShown ? 'blur-sm' : 'blur-none'}`}> 
            <ShopHeader currentCategory={currentCategory} setCurrentCategory={setCurrentCategory} onCartClick={openCart} cartItemCount={cartItemCount} />
            <ShopPlayerInfo gold={playerData?.player.gold} level={playerData?.player.level}/>
            <ShopContent currentCategory={currentCategory} categoryData={categoryData} setProductConfirm={setProductConfirm} addToCart={addToCart} setItemModalShown={setItemModalShown} setModalItemData={setModalItemData} />
            <Background />
          </div>

          {/********** Modals ***********/}

          {itemModalShown && (
            <ItemModal 
              playerData={playerData}
              itemModalShown={itemModalShown}
              setItemModalShown={setItemModalShown}
              itemData={modalItemData}
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
                clearCart={clearCart}
                increaseItem={increaseItem}
                decreaseItem={decreaseItem}
                removeItem={removeItem}
                confirmPurchase={handleConfirmBuy}
              />
            </div>
          )}

          {productConfirm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 shadow-lg w-1/3">
                <h2 className="text-lg font-semibold">Are you sure you want to buy it?</h2>
                <div className="mt-4 flex justify-end gap-4">
                  <button
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
                    onClick={() => handleCancel()}
                  >
                    No
                  </button>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() => handleConfirmBuy(productConfirm)}
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </Layout>
  )
};

// --------------------------- //
// -----   SHOP HEADER   ----- //
// --------------------------- //


const ShopHeader: React.FC<{ onCartClick: Function, currentCategory: string, setCurrentCategory: Function }> = ({ onCartClick, currentCategory, setCurrentCategory, cartItemCount  }) => {

  const router = useRouter();

  return (
    <header className='w-full h-full relative py-4 z-30 flex-col flex justify-center items-center'>
      <div className="container mx-auto flex items-center justify-between">

        {/* Return Button Section */}
        <div className="flex items-center">
          <Link href={'/shop/shopHome'}>
            <span className='text-4xl mx-6 hover:underline hover:cursor-pointer text-medievalSepia'> &lt; Return</span>
          </Link>
        </div>

        {/* Category Buttons Section */}
        <nav className="flex-1 text-center">
          {
            isEquipmentShop(router) ?
              equipmentCategories.map(category => <HeaderLink key={category} category={category} currentCategory={currentCategory} setCurrentCategory={setCurrentCategory} />)
              :
              isMagicalStuffShop(router) ?
                magicalStuffCategories.map(category => <HeaderLink key={category} category={category} currentCategory={currentCategory} setCurrentCategory={setCurrentCategory} />)
                :
                null
          }
        </nav>

        {/* Cart Button Section */}
        <div className="flex items-center">
          <button
            onClick={onCartClick}
            className="relative px-8 py-6 rounded-full transition transform hover:scale-105 focus:outline-none"
          >
            <img
              src="/images/shop/buy/Cart.png" 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 " 
              draggable={false} 
            />
             {/* Badge */}
             {cartItemCount > 0 && (
              <span className="absolute top-[-5px] right-0 inline-flex items-center justify-center w-7 h-7 text-4xl leading-none text-medievalSepia  transform translate-x-1/2 -translate-y-1/2">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>

      </div>

      <img className="w-full px-12" src="/images/shop/buy/header_separator.png" />

    </header>
  );
}

// -----  LINKS (CATEGORIES)  ----- //

const HeaderLink: React.FC<{ category: string, currentCategory: string, setCurrentCategory: Function }> = ({ category, currentCategory, setCurrentCategory }) => {

  const label = category.toUpperCase();

  // Check if the tab is the current category.
  const isSelected = currentCategory === category;

  // Set the styles tabs.
  const commonStyles = "text-3xl mx-6 font-medium text-white hover:cursor-pointer transition-all duration-200";
  const selectedTabStyle = `${commonStyles} underline text-amber-400`;
  const unselectedTabStyle = `${commonStyles} hover:underline hover:text-medievalSepia`;

  return (
    <span onClick={() => setCurrentCategory(category)} className={isSelected ? selectedTabStyle : unselectedTabStyle}>{label}</span>
  )
}


// ---------------------------- //
// -----   SHOP CONTENT   ----- //
// ---------------------------- //


const ShopContent: React.FC<{ categoryData: Array<ItemData>; currentCategory: string; addToCart: (item: ItemData) => void }> = ({ categoryData, currentCategory, addToCart, setProductConfirm, setItemModalShown, setModalItemData }) => {
  return (
    <section className='w-full h-full relative z-30 flex justify-center items-center'>
      {/* FILTER AND SORT BY */}
      <ItemsList currentCategory={currentCategory} categoryData={categoryData} setProductConfirm={setProductConfirm} addToCart={addToCart} setItemModalShown={setItemModalShown} setModalItemData={setModalItemData} />
    </section>
  );
};


// -------------------------- //
// -----   ITEMS GRID   ----- //
// -------------------------- //


const ItemsList: React.FC<{ categoryData: Array<ItemData>; currentCategory: string; addToCart: (item: ItemData) => void; setItemModalShown: Function, setModalItemData: Function }> = ({ categoryData, currentCategory, addToCart, setProductConfirm, setItemModalShown, setModalItemData }) => {
  if (categoryData.length === 0) {
    return <h2 className="text-4xl m-10 text-medievalSepia">There are no available items in this category</h2>;
  }

  return (
    <div className="w-11/12 my-10 grid grid-cols-5 gap-8 place-items-center">
      {categoryData.map((item: ItemData, index: number) => (
        <Card key={index} itemData={item} currentCategory={currentCategory} addToCart={addToCart} setProductConfirm={setProductConfirm} setItemModalShown={setItemModalShown} setModalItemData={setModalItemData} />
      ))}
    </div>
  );
};


// ------------------------- //
// -----   ITEM CARD   ----- //
// ------------------------- //


const Card: React.FC<{ itemData: ItemData; currentCategory: string; addToCart: (item: ItemData) => void ; setItemModalShown: Function, setModalItemData: Function}> = ({ itemData, currentCategory, addToCart, setProductConfirm, setItemModalShown, setModalItemData }) => {

  const router = useRouter();

  if (!itemData) { return }

  const { _id, name, description, type, value, modifiers, min_lvl, image, base_percentage, defense } = itemData;
  const image_url = `https://kaotika.vercel.app${image}`;

  if (!name) { return }

  const nameFontSize = name.length > 15 ? 'text-3xl' : 'text-4xl';

  const backgroundPath = isMagicalStuffShop(router) ?
    "url('/images/shop/buy/magic_stuff_card_background.png')" :
    "url('/images/shop/buy/equipment_card_background.png')";


  const goldLevelGridStyle =  (!value || !min_lvl) ? 
                            `w-1/2 grid-cols-1` :
                            `w-full grid-cols-2`;

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
        <div className={`grid gap-3 place-items-center ${goldLevelGridStyle}`}>

          {value && (
            <ItemDataLabel data={value} image={"/images/icons/gold.png"} title='Value' />
          )}

          {min_lvl && (
            <ItemDataLabel data={min_lvl} image={"/images/icons/level.png"} title='Min. lvl' />
          )}

        </div>

        {/* IMAGE  */}
        <img
          className={`h-44 drop-shadow-2xl ${isMagicalStuffShop(router) ? 'rounded-full border-3 border-[#1e1f23]' : null}`}
          src={image_url}
          draggable={false}
          onError={(e) => {
            e.currentTarget.onerror = null; // Prevent infinite loop if fallback also fails
            e.currentTarget.src = "/images/shop/buy/interrogation_sign.png"; // Fallback image
            e.currentTarget.title = "Image not found"
          }}
        />

        {/* ITEM NAME */}
        <p
          className={`${nameFontSize} font-medium bg-clip-text text-transparent select-text text-center ${isMagicalStuffShop(router) ? magicalStuffTextGradient : equipmentTextGradient}`}
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

// -----  GOLD AND MIN XP CONTANIERS  ----- //

const ItemDataLabel: React.FC<{ image: string, data: number, title: string }> = ({ image, data, title }) => {

  if (!data) return null;

  const fontSize = data.toString().length >= 5 ? 'text-2xl' : 'text-3xl';

  return (

    <div
      className="w-5/6 border rounded border-medievalSepia p-2 bg-black/45 gap-2 flex"
      title={title}
    >
      {image && (
        <img
          className="rounded-full w-6 flex-shrink-0"
          src={image}
          alt="Item"
          draggable={false}
        />
      )}
      <p className={`flex-grow ${fontSize} leading-4 text-center text-white/90 select-none`}>
        {data}
      </p>
    </div>
  );
};


// -------------------------- //
// -----   ITEM MODAL   ----- //
// -------------------------- //

 
const ItemModal: React.FC<{itemModalShown: boolean, setItemModalShown: Function, itemData: ItemData | undefined, playerData: any}> = ({itemModalShown, setItemModalShown, itemData, playerData}) => {
   
  if (!itemData) {return}
  const router = useRouter();

  const {_id, name, description, type, value, modifiers, min_lvl, image, base_percentage, defense} = itemData;

  const image_url = `https://kaotika.vercel.app${image}`; 

  const modalBackgroundImage = isMagicalStuffShop(router) ? "url('/images/shop/buy/magical_stuff_modal_background.png')" : "url('/images/shop/buy/equipment_modal_background.webp')";
 
  // Style variables 
  const equipmentTextGradient = "bg-gradient-to-b from-[#FFD0A0] via-[#EED1B4] to-[#B2AF9E]"; 
  const magicalStuffTextGradient = "bg-gradient-to-b from-[#212532] via-[#9CB5EA] to-[#3A3C45]"; 
   
  const hasModifiers = Object.values(modifiers).some(value => value !== 0);

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
          width: 1024,
          height: 690, 
        }} 
        
      >
         
        {/* Content Container */}
        <div className="relative bg-red-500/0 w-3/4 h-3/5 py-3 flex flex-col gap-3">

          {/* Close Button */}
          <div 
            className="absolute hover:cursor-pointer -right-3 -top-8 bg-[#523f29]/30 rounded-full border border-medievalSepia w-12 h-12 flex justify-center items-center hover:scale-105 transition-all"
            onClick={() => setItemModalShown(false)}
          >  
            <p className="ml-0.5 text-2xl">X</p>
          </div>

          {/* Row 1: Title */}
          <div className="bg-blue-500/0 ">
            <h2 className={`text-7xl py-2 bg-clip-text text-transparent select-text text-center ${isMagicalStuffShop(router) ? magicalStuffTextGradient : equipmentTextGradient}`}>
              {name}
            </h2>
          </div>

          {/* Row 2: Item Data, Image, Description */}
          <div className="grid grid-cols-3 h-full bg-orange-300/0">

            {/* Item Data */}
            <div className="flex justify-center items-center flex-col ">  
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
            </div>
            
            {/* Image */}
            <div className="flex justify-center items-center flex-col gap-3">
              <img  
                className={`h-56 drop-shadow-[0_10px_10px_rgba(0,0,0,0.45)] ${isMagicalStuffShop(router) ? 'rounded-full border-3 border-[#1e1f23]' : null}`}
                src={image_url}  
                draggable={false}
                onError={(e) => {
                  e.currentTarget.onerror = null; // Prevent infinite loop if fallback also fails
                  e.currentTarget.src = "/images/shop/buy/interrogation_sign.png"; // Fallback image
                  e.currentTarget.title="Image not found"
                }}
              />
              <div className={`grid place-items-center grid-cols-2 w-full mb-2`}>
                <ItemDataLabel data={value} image={"/images/icons/gold.png"} title='Value' />
                <ItemDataLabel data={min_lvl} image={"/images/icons/level.png"} title='Min. lvl' /> 
              </div>
            </div>

            {/* Description */}
            <div className="flex justify-center items-center bg">
              <p
                className={`text-4xl italic text-balance py-2 bg-clip-text text-transparent select-text text-center ${isMagicalStuffShop(router) ? magicalStuffTextGradient : equipmentTextGradient}`}
              >
                {`"${description}"`}
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
     
  );

} 

// -------------------------- //
// -----   BACKGROUND   ----- //
// -------------------------- //

const Background = () => {

  return (
    <>
      <img
        className='w-full h-full absolute top-0 opacity-10 z-20'
        style={{
          backgroundColor: '#191A1D',
          backgroundImage: "url('/images/shop/background_pattern.png')",
          backgroundRepeat: "repeat",
          backgroundPosition: "center",
        }}
      />

      <div
        className='w-full h-full absolute top-0 z-10'
        style={{
          backgroundColor: '#191A1D',
        }}
      >
      </div>
    </>
  );

}

// --------------------//
// ----- UTILITY ----- //
// ------------------- //

const isEquipmentShop = (router): boolean => {
  const currentShopType = router.query.shopType;
  return currentShopType === "equipment";
}

const isMagicalStuffShop = (router): boolean => {
  const currentShopType = router.query.shopType;
  return currentShopType === "magical_stuff";
}


// Capitalize first letter of string
function capitalizeFirstLetter(string: string): string {
  if (!string) return ''; // Handle empty string
  return string.charAt(0).toUpperCase() + string.slice(1);
} 

// Function to render the modifiers of the modal
const renderModifiers = (modifiers: Record<string, number>, playerData: any, itemType: string) => {

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
       
      if (playerData?.equipment && playerData?.modifiers) { 
        const equippedItem = playerData.equipment[itemType];
        const playerValue = equippedItem.modifiers[attribute];
        valueDifference = value - playerValue;
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
            {valueDifference && (
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
      return null;
    });
};


export default Shop;
