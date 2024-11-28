import Layout from "@/components/Layout";
import Link from 'next/link';

const Shop = () => {
  return (
    <Layout>  
        <h1 className="text-5xl font-bold mb-8">SHOP</h1>
        {/* Botón de Return */}
        <Link
          href="/shop/shopHome"
          className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Return to Home
        </Link>
    </Layout>
  );
};

export default Shop;
