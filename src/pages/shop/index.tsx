import Layout from "@/components/Layout";
import Link from 'next/link';
import Image from "next/image";
import { useRouter } from 'next/router';
import { useState, useEffect } from "react";
import Loading from "@/components/Loading";
import ShopBackground from "@/components/shop/buy/ShopBackground";

const ShopHome = () => {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const products: string[] = ['armors', 'artifacts', 'boots', 'helmets', 'ingredients', 'rings', 'shields', 'weapons'];

  useEffect(() => {
    const fetchProducts = async () => {

      // Check if products are already stored in localStorage
      const storedProducts = products.every(product => {
        const storedData = localStorage.getItem(product);
        return storedData !== null;
      });
  
      if (storedProducts) {
        console.log("localStorage of the Shop has data");
        setLoading(false);
        return;
      }

      try {
        console.log("fetching Shop products");
        const response = await fetch('/api/shop/products');
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        const keys = Object.keys(data); //get the main names of the objects
        keys.forEach(key => {
          localStorage.setItem(key, JSON.stringify(data[key]));
        });
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    
  }, []);
  

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Show loading spinner while loading
  if (loading) return <Loading />;

  {/* Error state */}
  {error && <p className="text-xl text-red-500">Error: {error}</p>}


  return (
    <Layout>
      <ShopBackground />
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
        width={300}
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
      href="/shop/buy/magical_stuff"
      className="flex items-center justify-center text-white rounded-lg transition transform hover:scale-105 px-4 py-1"
    >
      <Image
        src="/images/shop/Magical_stuff_button.png" 
        alt="Magical Stuff"
        width={299}
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
        width={290}
        height={100}
        className="mr-2"
        draggable={false}
      />
    </Link>
  );
}

export default ShopHome;


