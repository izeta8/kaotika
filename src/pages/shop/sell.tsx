import { Player } from "@/_common/interfaces/Player";
import Layout from "@/components/Layout";
import PlayerInventorySellShop from "@/components/shop/PlayerInventorySellShop";
import Link from 'next/link';
import player from "./FakeTestPlayer";
import SellShopObjectDetails from "@/components/shop/SellShopObjectDetails";


const Sell = () => {


  return (

    <Layout>
      <div className="flex text-medievalSepia bg-cover bg-no-repeat bg-center min-h-screen" style={{ backgroundImage: 'url(/images/shop/background_sell_shop.jpg)' }}>

        <div className="flex-col w-1/2">
          <PlayerInventorySellShop playerData={player} />
          <SellShopObjectDetails />
        </div>

        <div className="flex flex-row w-1/2">

          {/* Botón de Return */}
          <Link
            href="/shop/shopHome"
            className="mt-4 px-6 py-3 text-center text-3xl text-black rounded-lg hover:bg-blue-600 transition max-w-36 max-h-24	"
          >
            Return to Home
          </Link>
        </div>

      </div>
    </Layout>


  );
};


export default Sell;