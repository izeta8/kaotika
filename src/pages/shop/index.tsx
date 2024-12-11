import Layout from "@/components/Layout";
import Link from 'next/link';
import Image from "next/image";
import { useRouter } from 'next/router';
import { useState, useEffect } from "react";
import Loading from "@/components/Loading";
import ShopBackground from "@/components/shop/ShopBackground";

const imageStyles = "mx-20 transition transform hover:scale-105";

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
      <div className="relative z-30 w-full h-screen pb-32">
        <div className="h-full flex flex-row items-center justify-center">
          <EquipmentShop />  
          <SellItem />
          <MagicalStuffShop />
        </div>
      </div>
      <ShopBackground />
    </Layout>
  );
};

const EquipmentShop = () => {
  return (
    <Link
      href="/shop/buy/equipment"
      className={imageStyles}
    >
      <Image
        src="/images/shop/buy_equipment_image.png" 
        alt="Equipment"
        width={300}
        height={100}
        draggable={false}
      />
    </Link>
  );
}

const MagicalStuffShop = () => {
  return (
    <Link
      href="/shop/buy/magical_stuff"
      className={imageStyles}
    >
      <Image
        src="/images/shop/buy_magical_stuff_image.png" 
        alt="Magical Stuff"
        width={300}
        height={100}
        draggable={false}
      />
    </Link>
  );
}

const SellItem = () => {
  return (
    <Link
      href="/shop/sell"
      className={imageStyles}
    >
      <Image
        src="/images/shop/sell_image.png" 
        alt="Sell item"
        width={300}
        height={100}
        draggable={false}
      />
    </Link>
  );
}

export default ShopHome;


