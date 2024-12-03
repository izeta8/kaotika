import Layout from "@/components/Layout";
import Link from 'next/link';
import { redirect } from "next/navigation";
import { useRouter } from 'next/router'
import React from "react";
import { FaShoppingCart } from 'react-icons/fa';
import Cart from "@/components/shop/Cart";
import { useState,useEffect } from "react";
import ShopPlayerInfo from "@/components/shop/ShopPlayerInfo";
import { ItemData } from "@/_common/interfaces/ItemData";

type ShopCategoryKeys = "helmets" | "weapons" | "armors" | "shields" | "boots" | "rings" | "ingredients" | "containers";


// Shops item categories
const equipmentCategories = ["helmets", "weapons", "armors", "shields", "boots", "rings"];
const magicalStuffCategories = ["ingredients", "containers"];

interface CartItem extends ItemData {
  quantity: number;
}

const Shop = () => {

  const router = useRouter()

  const [isCartOpen, setIsCartOpen] = useState(false);
  //const [itemsInCart, setItemsInCart] = useState<CartItem[]>([]);
  const [categoryData, setCategoryData] = useState<Array<ItemData>>([]);

  const [currentCategory, setCurrentCategory] = useState<string>('');

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
    {state: "helmets", setter: setHelmets},
    {state: "weapons", setter: setWeapons},
    {state: "armors", setter: setArmors},
    {state: "shields", setter: setShields},
    {state: "boots", setter: setBoots},
    {state: "rings", setter: setRings},
  ];

  const magicalStuffStateSetters = [
    {state: "ingredients", setter: setIngredients},
    {state: "containers", setter: setContainers},
  ]; 

  // ---------------------- //
  // ---- USE EFFECTS ----  //
  // ---------------------- //

  useEffect(() => {

    const currentRoute = router.query.shopType;
    if (!currentRoute) {return}

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
    if (!currentCategory) {return}
    setCategoryData(shopCategories[currentCategory]);
  }, [currentCategory]);
   

  // Load each category data from localStorage into the states.
  useEffect(() => { 
    const currentShopType = isMagicalStuffShop(router) ? magicalStuffStateSetters: equipmentStateSetters;
    currentShopType.forEach(categoryObject => loadLocalStorageIntoStates(categoryObject));
  }, []);


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
    const {state, setter} = categoryObject;
        
    // If the state name or setter is null jump to next iteration
    if (!state || !setter) {return}

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

  //Cart funcions

  const [itemsInCart, setItemsInCart] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') { // Verificar que estamos en el lado del cliente
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

  // ---- RENDER ----  //

  return (  
    <div
      className="relative min-h-screen flex flex-col bg-[#191A1D] bg-repeat-center"
    >
      <Layout>
        <ShopHeader currentCategory={currentCategory} setCurrentCategory={setCurrentCategory} onCartClick={openCart}/>
        <ShopPlayerInfo />
        <ShopContent currentCategory={currentCategory} categoryData={categoryData} addToCart={addToCart}/>  
        <Background />

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
            />
          </div>
        )}
      </Layout> 
    </div>
  );
};

const ShopHeader:React.FC<{onCartClick: Function, currentCategory: string, setCurrentCategory: Function}> = ({onCartClick, currentCategory, setCurrentCategory}) => {
 
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
            equipmentCategories.map(category => <HeaderLink key={category} category={category} currentCategory={currentCategory} setCurrentCategory={setCurrentCategory} /> )
          :
          isMagicalStuffShop(router) ? 
            magicalStuffCategories.map(category => <HeaderLink key={category} category={category} currentCategory={currentCategory} setCurrentCategory={setCurrentCategory} /> )
          :
            null
          }
        </nav>

        {/* Cart Button Section */}
        <div className="flex items-center">
           <button 
            onClick={onCartClick} 
            className="relative bg-amber-500 hover:bg-amber-600 text-black  px-8  py-6  rounded-full transition transform hover:scale-105 focus:outline-none"
          >
            <FaShoppingCart size={27} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </button>
        </div>
        
      </div>

      <img className="w-full px-12" src="/images/shop/buy/header_separator.png" />

    </header>
  );
}

const HeaderLink: React.FC<{category: string, currentCategory: string, setCurrentCategory: Function}> = ({category, currentCategory, setCurrentCategory}) => {
  
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

const ShopContent: React.FC<{ categoryData: Array<ItemData>; currentCategory: string; addToCart: (item: ItemData) => void }> = ({ categoryData, currentCategory, addToCart }) => {
  return (
    <section className='w-full h-full relative z-30 flex justify-center items-center'>
      {/* FILTER AND SORT BY */}
      <ItemsList currentCategory={currentCategory} categoryData={categoryData} addToCart={addToCart} />
    </section>
  );
};


const ItemsList: React.FC<{ categoryData: Array<ItemData>; currentCategory: string; addToCart: (item: ItemData) => void }> = ({ categoryData, currentCategory, addToCart }) => {
  if (categoryData.length === 0) {
    return <h2 className="text-4xl m-10 text-medievalSepia">There are no available items in this category</h2>;
  }

  return (
    <div className="w-11/12 my-10 grid grid-cols-5 gap-8 place-items-center">
      {categoryData.map((item: ItemData, index: number) => (
        <Card key={index} itemData={item} currentCategory={currentCategory} addToCart={addToCart} />
      ))}
    </div>
  );
};


const Card: React.FC<{ itemData: ItemData; currentCategory: string; addToCart: (item: ItemData) => void }> = ({ itemData, currentCategory, addToCart }) => {

  const router = useRouter();

  if (!itemData) {return}

  const {_id, name, description, type, value, modifiers, min_lvl, image, base_percentage, defense} = itemData;
  const image_url = `https://kaotika.vercel.app${image}`;

  if (!name) {return}

  const nameFontSize = name.length > 15 ? 'text-3xl' : 'text-4xl';

  const backgroundPath = isMagicalStuffShop(router) ? 
                          "url('/images/shop/buy/magic_stuff_card_background.png')" : 
                          "url('/images/shop/buy/equipment_card_background.png')";


  const goldLevelGridStyle =  (!value || !min_lvl) ? 
                              `w-1/2 grid-cols-1` :
                              `w-full grid-cols-2`;


  const equipmentTextGradient = "bg-gradient-to-b from-[#FFD0A0] via-[#EED1B4] to-[#B2AF9E]"; 
  const magicalStuffTextGradient = "bg-gradient-to-b from-[#212532] via-[#9CB5EA] to-[#3A3C45]"; 

                                                  
  return (
    <div className="bg-slate-900 w-72 p-6 flex flex-col justify-center items-center relative z-10 select-none" 
      style={{
        height: 420,
        backgroundImage: backgroundPath,
        backgroundRepeat: "no-repeat",
        WebkitBackgroundSize: 'contain',
        backgroundSize: '100%'
      }}
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
            e.currentTarget.title="Image not found"
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
          <CardButton onClick={() => {console.log("HANDLE BUY")}} label="BUY"/> 
          <CardButton onClick={() => addToCart(itemData)} label="ADD TO CART" />
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

const CardButton: React.FC<{onClick: Function, label: string}> = ({onClick, label}) => {

  if (!label || !onClick) {return null;}

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
 
const ItemDataLabel: React.FC<{image: string, data: number, title: string}> = ({ image, data, title }) => {

  if (!data) return null;

  const fontSize = data.toString().length>=5 ? 'text-2xl' : 'text-3xl';

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


export default Shop;  

