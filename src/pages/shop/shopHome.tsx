import Layout from "@/components/Layout";
import Link from 'next/link';

const ShopHome = () => {
  console.log("home page");

  return (
    <Layout>
        <h1 className="text-5xl font-bold mb-8">Welcome to Shop</h1>
        <div className="flex space-x-4">
          {/* Button 1: Equipment */}
          <Link
            href="/shop/buy/equipment"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Equipment
          </Link>

          {/* Button 2: Magical Stuff */}
          <Link
            href="/shop/buy/magical-stuff"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Magical Stuff
          </Link>

          {/* Button 3: Sell */}
          <Link
            href="/shop/sell"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Sell
          </Link>
        </div>
    </Layout>
  );
};

export default ShopHome;

