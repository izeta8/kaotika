import Layout from "@/components/Layout";
import Link from 'next/link';

const Sell = () => {
  return (
  
    <Layout>
      <div className="flex flex-col text-medievalSepia bg-cover bg-no-repeat bg-center h-full" style={{ backgroundImage: 'url(/images/shop/background_sell_shop.jpg)'}}>
     
       <h1 className="text-5xl font-bold mb-8">SELL</h1>
        {/* Botón de Return */}
        <Link
          href="/shop/shopHome"
          className="mt-4 px-6 py-3 text-center text-3xl text-black rounded-lg hover:bg-blue-600 transition max-w-36	"
        >
          Return to Home
        </Link>
        </div>
  </Layout>
  
  
  );
};


export default Sell;