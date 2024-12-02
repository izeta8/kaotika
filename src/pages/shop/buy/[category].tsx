import Layout from "@/components/Layout";
import Link from 'next/link';
import { useRouter } from 'next/router'
import armors from '../../../data/armors.json'
import React from "react";
import { FaShoppingCart } from 'react-icons/fa';
import Cart from "@/components/shop/Cart";
import { useState,useEffect } from "react";

const Shop = () => {

  const router = useRouter()
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [ingredietsInCart,setIngredientsInCart] = useState([]);
  const [equipmentInCart,setEquipmentInCart] = useState([]);

   const openCart = () => setIsCartOpen(true);
   const closeCart = () => setIsCartOpen(false);

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

  const addToCart = (item) => {
    setEquipmentInCart((prev) => {
      const existingItem = prev.find((equipment) => equipment.id === item._id.$oid);
  
      if (existingItem) {
        // Incrementa la cantidad si el artículo ya está en el carrito
        return prev.map((equipment) =>
          equipment.id === item._id.$oid
            ? { ...equipment, quantity: equipment.quantity + 1 }
            : equipment
        );
      } else {
        // Añade el artículo al carrito
        return [
          ...prev,
          {
            id: item._id.$oid,
            name: item.name,
            price: item.value,
            quantity: 1,
          },
        ];
      }
    });
  };


  return (  
    <div
      className="relative min-h-screen flex flex-col bg-[#191A1D] bg-repeat-center"
    >
      <Layout>
        <ShopHeader onCartClick={openCart}/>
        <ShopContent addToCart={addToCart} /> 
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
              ingredients={ingredietsInCart}
              equipment={equipmentInCart}
              className="relative z-50 pointer-events-auto"
            />
          </div>
        )}
      </Layout> 
    </div>
  );
};


const ShopHeader = ({onCartClick}) => {

  return (
    <header className='w-full h-full relative py-4 z-30 flex-col flex justify-center items-center'>
      <div className="container mx-auto flex items-center justify-between">

        <div className="flex items-center"> 
          <Link href={'/shop/shopHome'}>
            <span className='text-4xl mx-6 hover:underline hover:cursor-pointer text-medievalSepia'> &lt; Return</span>
          </Link> 
        </div>

        <nav className="flex-1 text-center">  
          <HeaderLink page="helmets" />   
          <HeaderLink page="weapons" />   
          <HeaderLink page="armors" />   
          <HeaderLink page="shields" />   
          <HeaderLink page="boots" />   
          <HeaderLink page="rings" />   
        </nav>

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

const HeaderLink: React.FC<{page: string}> = ({page}) => {
  
  const router = useRouter();
  const link = `/shop/buy/${page}`;
  const label = page.toUpperCase(); 

  // Check if the tab is the current category.
  const isSelected = router.query.category == page;

  // Set the styles tabs.
  const commonStyles = "text-3xl mx-6 font-medium text-white hover:cursor-pointer transition-all duration-200";
  const selectedTabStyle = `${commonStyles} underline text-amber-400`;
  const unselectedTabStyle = `${commonStyles} hover:underline hover:text-medievalSepia`;

  return (
    <Link href={link}>
      <span className={isSelected ? selectedTabStyle : unselectedTabStyle}>{label}</span>
    </Link>
  )
}

const ShopContent = ({addToCart}) => {
  return (
    <section className='w-full h-full relative z-30 flex justify-center items-center'>    

      {/* FILTER AND SORT BY */}
      <ItemsList addToCart={addToCart} />

    </section>
  );
}

const ItemsList = ({addToCart}) => {
  return (
    <div className="w-11/12 my-10 grid grid-cols-5 gap-8 place-items-center"> 
      {armors.map((item, index) => {
         return <Card key={index} itemData={item} addToCart={addToCart} />;
        })
      }
    </div>
  )
}

const Card = ({itemData,addToCart}) => {

  if (!itemData) {return}

  const {_id, name, description, type, value, modifiers, min_lvl, image, base_percentage, defense} = itemData;
  const image_url = `https://kaotika.vercel.app/${image}`;

  if (!name) {return}

  const nameFontSize = name.length > 15 ? 'text-3xl font-' : 'text-4xl';

  return (
    <div className="bg-slate-900 w-72 p-6 flex flex-col justify-center items-center relative z-10" 
      style={{
        backgroundImage: "url('/images/shop/buy/equipment_card_background.png')",
        backgroundRepeat: "no-repeat",
        WebkitBackgroundSize: 'contain',
        backgroundSize: '100%'
      }}
    > 
       
      <div className="flex flex-col justify-center items-center gap-3 z-30"> 

        <div className="w-full grid grid-cols-2 gap-3 place-items-center">
          <ItemDataLabel data={value} image={"/images/icons/gold.png"} /> 
          <ItemDataLabel data={min_lvl} image={"/images/icons/level.png"} /> 
        </div>

        <img  
          className="h-44 drop-shadow-2xl"
          src={image_url}  
          draggable={false}
        />

        <p 
          className={`${nameFontSize} font-medium bg-gradient-to-b from-[#FFD0A0] via-[#EED1B4] to-[#B2AF9E] bg-clip-text text-transparent text-center bg-red-900`}
        >
          {name}
        </p>

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
 
const ItemDataLabel: React.FC<{image: string, data: number}> = ({ image, data }) => {

  if (!data) return null;

  const fontSize = data.toString().length>=5 ? 'text-2xl' : 'text-3xl';

  return (
    
    <div className="w-5/6 border rounded border-medievalSepia p-2 bg-black/45 gap-2 flex">
      {image && (
        <img
          className="rounded-full w-6 flex-shrink-0"
          src={image}
          alt="Item"
          draggable={false}
        />
      )}
      <p className={`flex-grow ${fontSize} leading-4 text-center text-white/90`}>
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
 

export default Shop;  

