import Layout from "@/components/Layout";
import Link from 'next/link';
import { redirect } from "next/navigation";
import { useRouter } from 'next/router'
import React from "react";
import { FaShoppingCart } from 'react-icons/fa';
import Cart from "@/components/shop/Cart";
import { useState,useEffect } from "react";
import ShopPlayerInfo from "@/components/shop/ShopPlayerInfo";

interface ItemData {
  _id: string;
  name: string;
  description: string;
  image: string;
  type: string;
  value?: number;
  modifiers?: any;
  min_lvl?: number;
  effects?: Array<string>;
  profiles?: Array<string>;
  base_percentage?: number;
  defense?: number;
  isUnique?: boolean;
  isActive?: boolean;
  die_faces?: number;
  die_modifier?: number;
  die_num?: number;
}

type ShopCategoryKeys = "helmets" | "weapons" | "armors" | "shields" | "boots" | "rings" | "ingredients" | "containers";

const fakeIngredients = [
  {
    id: 1,
    name: "Vitalis Root",
    quantity: 3,
    price: 70,
  },
  {
    id: 2,
    name: "Fire Blossom",
    quantity: 2,
    price: 120,
  },
  {
    id: 3,
    name: "Fire Blossom",
    quantity: 2,
    price: 120,
  },
  {
    id: 4,
    name: "Fire Blossom",
    quantity: 2,
    price: 120,
  },
];

const fakeEquipment = [
  {
    id: 1,
    name: "Dragonbones Plate",
    price: 32000,
  },
  {
    id: 2,
    name: "Shadowfang Blade",
    price: 15000,
  },
  {
    id: 3,
    name: "Armor",
    price: 12000,
  },
];


// Shops item categories
const equipmentCategories = ["helmets", "weapons", "armors", "shields", "boots", "rings"];
const magicalStuffCategories = ["ingredients", "containers"];

const Shop = () => {

  const router = useRouter()

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [ingredietsInCart,setIngredientsInCart] = useState([]);
  const [equipmentInCart,setEquipmentInCart] = useState([]);

  const [itemModalShown, setItemModalShown] = useState(true);
  const [modalItemData, setModalItemData] = useState<ItemData|undefined>();

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

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

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

  // ---- RENDER ----  //

  return (  
    <div
      className="relative min-h-screen flex flex-col bg-[#191A1D] bg-repeat-center"
    >

      <Layout>

        <div className="relative -mt-2">

          {itemModalShown && (
            <ItemModal 
            itemModalShown={itemModalShown}
            setItemModalShown={setItemModalShown}
            itemData={modalItemData}
            />
          )}

          <ShopHeader 
            currentCategory={currentCategory}
            setCurrentCategory={setCurrentCategory}
            onCartClick={openCart}
          />

          <ShopPlayerInfo />

          <ShopContent 
            categoryData={categoryData}
            setItemModalShown={setItemModalShown}
            setModalItemData={setModalItemData}
          />  

          <Background />

          {isCartOpen && (
            <div className="fixed inset-0 z-40">
              <div
                className="absolute inset-0 bg-black/60 pointer-events-auto"
                onClick={closeCart} // Close modal when clicking outside
              ></div>

              {/* Cart Modal */}
              <Cart
                isOpen={isCartOpen}
                onClose={closeCart}
                ingredients={fakeIngredients}
                equipment={fakeEquipment}
              />
            </div>
          )}
        </div>

      </Layout> 
    </div>
  );
};


// --------------------------- //
// -----   SHOP HEADER   ----- //
// --------------------------- //


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
            onClick={() => onCartClick()} 
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

// -----  LINKS (CATEGORIES)  ----- //

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


// ---------------------------- //
// -----   SHOP CONTENT   ----- //
// ---------------------------- //


const ShopContent: React.FC<{categoryData: Array<ItemData>, setItemModalShown: Function, setModalItemData: Function}> = ({categoryData, setItemModalShown, setModalItemData}) => {

  return (
    <section className='w-full h-full relative z-30 flex justify-center items-center'>    
  
      {/* FILTER AND SORT BY */}
      <ItemsList categoryData = {categoryData} setItemModalShown={setItemModalShown} setModalItemData={setModalItemData} />

    </section>
  );
}


// -------------------------- //
// -----   ITEMS GRID   ----- //
// -------------------------- //


const ItemsList: React.FC<{categoryData: Array<ItemData>, setItemModalShown: Function, setModalItemData: Function}> = ({categoryData, setItemModalShown, setModalItemData}) => {

  if (categoryData.length === 0) {
    return <h2 className="text-4xl m-10 text-medievalSepia">There are no available items in this category</h2>;
  }

  return (
    <div className="w-11/12 my-10 grid grid-cols-5 gap-8 place-items-center"> 
      {categoryData.map((item: ItemData, index: number) => {
         return <Card key={index} itemData={item} setItemModalShown={setItemModalShown} setModalItemData={setModalItemData} />
        })
      }
    </div>
  )
}


// ------------------------- //
// -----   ITEM CARD   ----- //
// ------------------------- //


const Card: React.FC<{itemData: ItemData, setItemModalShown: Function, setModalItemData: Function }> = ({itemData, setItemModalShown, setModalItemData}) => {

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
 
  // ---- UTILITY ---- //

  const handleCartClick = () => {
    setModalItemData(itemData);
    setItemModalShown(true);
  } 
  
  const handleBuy = () => {
    console.log("HANDLE BUY");
  }  

  const handleAddCart = () => {
    console.log("HANDLE ADD TO CART");
  } 
                                                  
  return (
    <div className="bg-slate-900 w-72 p-6 flex flex-col justify-center items-center relative z-10 select-none hover:cursor-pointer hover:-translate-y-4 transition-all" 
      style={{
        height: 420,
        backgroundImage: backgroundPath,
        backgroundRepeat: "no-repeat",
        WebkitBackgroundSize: 'contain',
        backgroundSize: '100%'
      }}
      onClick={() => handleCartClick()}
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
          <CardButton onClick={(e) => {e.stopPropagation(); handleBuy()}} label="BUY"/> 
          <CardButton onClick={(e) => {e.stopPropagation(); handleAddCart()}} label="ADD TO CART"/> 
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

const CardButton: React.FC<{ onClick: React.MouseEventHandler<HTMLButtonElement>, label: string}> = ({onClick, label}) => {

  if (!label || !onClick) {return}

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


// -------------------------- //
// -----   ITEM MODAL   ----- //
// -------------------------- //

   
const ItemModal: React.FC<{itemModalShown: boolean, setItemModalShown: Function, itemData: ItemData | undefined}> = ({itemModalShown, setItemModalShown, itemData}) => {
   
  if (!itemData) {return}
  const router = useRouter();

  // const [isVisible, setIsVisible] = useState(itemModalShown);

  // useEffect(() => {
  //   if (itemModalShown) {
  //     setIsVisible(true);
  //   } else {
  //     // Espera a que la transición termine antes de desmontar
  //     const timer = setTimeout(() => setIsVisible(false), 300); // 300ms coincide con la duración de la transición
  //     return () => clearTimeout(timer);
  //   }
  // }, [itemModalShown]);

  // console.log("itemModalShown");
  // console.log(itemModalShown);


  const {_id, name, description, type, value, modifiers, min_lvl, image, base_percentage, defense} = itemData;

  const image_url = `https://kaotika.vercel.app${image}`; 

  const modalBackgroundImage = isMagicalStuffShop(router) ? "url('/images/shop/buy/magical_stuff_modal_background.png')" : "url('/images/shop/buy/equipment_modal_background.png')";
 
  // Style variables 
  const equipmentTextGradient = "bg-gradient-to-b from-[#FFD0A0] via-[#EED1B4] to-[#B2AF9E]"; 
  const magicalStuffTextGradient = "bg-gradient-to-b from-[#212532] via-[#9CB5EA] to-[#3A3C45]"; 
   
  const dataTextStyle = `text-4xl text-[#EED1B4]`;

  return (
    
    <div 
      onClick={() => setItemModalShown(false)} 
      className={`absolute flex justify-center items-center h-screen pb-32 w-full h-dhv top-0 left-0 bg-black/50 z-50 transition-opacity hover:cursor-pointer ${itemModalShown ? 'opacity-100' : 'opacity-0'} `}> 

      <div 
        onClick={(e) => e.stopPropagation()}
        className='relative flex justify-center items-center hover:cursor-default'
        style={{
          backgroundImage: modalBackgroundImage,
          backgroundPosition: "center",
          backgroundSize: '100%',
          width: 1024,
          height: 683,
        }}
      >
         
        {/* Content Container */}
        <div className="bg-red-500/0 w-3/4 h-3/5 py-3 flex flex-col gap-3">

          {/* Row 1: Title */}
          <div className="bg-blue-500/0 ">

            {/* <h2 className="bg-yellow-700/10 text-center text-6xl py-2">{name}</h2> */}
            <h2 className={`text-7xl py-2 bg-clip-text text-transparent select-text text-center ${isMagicalStuffShop(router) ? magicalStuffTextGradient : equipmentTextGradient}`}>
              {name}
            </h2>
          
          </div>

          {/* Row 2: Itemdata, image, description */}
          <div className="grid grid-cols-3 h-full bg-orange-300/0">

            {/* Item Data */}
            <div className="flex justify-center items-center flex-col ">  
              <div>
                {renderModifiers(modifiers, dataTextStyle)}
                {(defense || base_percentage) && <hr className="w-5/6 mt-2 border-medievalSepia opacity-50 border-dashed"/> }
                {defense && <p className={`${dataTextStyle}`}>{`Defense: ${defense}`}</p>}
                {base_percentage && <p>{`Base Percentage: ${base_percentage}`}</p>}
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
// ----  UTILITY  ---- //
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

const renderModifiers = (modifiers: Record<string, number>, textStyle: string) => {

  if (!modifiers) {return}

  return Object.entries(modifiers)
    .map(([key, value]) => {
      const attribute = key
        ?.split('_')
        .map((word) => capitalizeFirstLetter(word))
        .join(' ');

      if (value !== 0) {
        return <p className={`${textStyle}`}>{`${attribute}: ${value}`}</p>;
      }
      return null;
    });
};

export default Shop;  

