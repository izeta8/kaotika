import Layout from "@/components/Layout";
import Link from 'next/link';
import Image from "next/image";
import { useEffect } from "react";

const ShopHome = () => {

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <Layout>
      <Background />
       <div className="relative z-30 flex flex-row items-start justify-center h-screen bg-transparent pt-20 space-x-10 sm:space-x-20">
        <EquipmentShop />  
        <SellItem />
        <MagicalStuffShop />
      </div>
    </Layout>
  );
};

const EquipmentShop = () => {
  return (
    <Link
      href="/shop/buy/equipment"
      className="flex items-center justify-center text-white rounded-lg transition transform hover:scale-105 px-4 py-2"
    >
      <Image
        src="/images/shop/Equipment_buy_button.png" 
        alt="Equipment"
        width={309}
        height={100}
        className="mr-2"
        draggable={false}
      />
    </Link>
  );
}

const MagicalStuffShop = () => {
  return (
    <Link
      href="/shop/buy/magical-stuff"
      className="flex items-center justify-center text-white rounded-lg transition transform hover:scale-105 px-4 py-2"
    >
      <Image
        src="/images/shop/Magical_stuff_button.png" 
        alt="Magical Stuff"
        width={300}
        height={100}
        className="mr-2"
        draggable={false}
      />
    </Link>
  );
}

const SellItem = () => {
  return (
    <Link
      href="/shop/sell"
      className="flex items-center justify-center text-white rounded-lg transition transform hover:scale-105 px-4 py-2"
    >
      <Image
        src="/images/shop/Sell_item_button.png" 
        alt="Sell item"
        width={282}
        height={100}
        className="mr-2"
        draggable={false}
      />
    </Link>
  );
}

const Background = () => {
  return (
    <>
      <div
        className='w-full h-full absolute top-0 opacity-20 z-10'
        style={{
          backgroundColor: '#191A1D',
          backgroundImage: "url('/images/shop/background_pattern.png')",
          backgroundRepeat: "repeat", 
          backgroundPosition: "center", 
          backgroundSize: '8%',
        }}
      />
      <div
        className='w-full h-full absolute top-0 z-0'
        style={{
          backgroundColor: '#191A1D',
        }}
      />
    </>
  );
}

export default ShopHome;


