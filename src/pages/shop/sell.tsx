import { Player } from "@/_common/interfaces/Player";
import Layout from "@/components/Layout";
import PlayerInventorySellShop from "@/components/shop/PlayerInventorySellShop";
import Link from 'next/link';
import player from "./FakeTestPlayer";
import SellShopObjectDetails from "@/components/shop/SellShopObjectDetails";
import SellerDialogueBox from "@/components/shop/SellerDialgueBox";
import { Button } from "@nextui-org/button";
import KaotikaButton from "@/components/KaotikaButton";
import ShopPlayerInfo from "@/components/shop/ShopPlayerInfo";


const Sell = () => {


  return (

    <Layout>
      <div className="flex text-medievalSepia bg-cover bg-no-repeat bg-center min-h-screen" style={{ backgroundImage: 'url(/images/shop/background_sell_shop.jpg)' }}>

        <div className="flex-col w-1/2">
          <PlayerInventorySellShop playerData={player} />
          <SellShopObjectDetails />
        </div>

        <div className="flex flex-col w-1/2">

          <div className="flex flex-row-reverse">

            {/* Botón de Return */}
            <Link
              href="/shop/shopHome"
              className=" bg-darkSepia w-full text-black text-3xl py-2 px-4 mb-4 mt-4 mr-8 rounded hover:bg-medievalSepia text-center transition max-w-64 max-h-24"
            >
              Return to Home
            </Link>

          </div>

          <div className="flex flex-row  place-content-end">
            <SellerDialogueBox phrase="Welcome to the best trade shop of the continent!!!" />
          </div>

          <div className="flex flex-row items-center">
            <div className="mt-20 px-6">
              <KaotikaButton text="KEEP IT" />
            </div>
            <div className="mt-20 px-6">
              <KaotikaButton text="SELL IT" />
            </div>
            <ShopPlayerInfo />
          </div>


        </div>

      </div>
    </Layout>


  );
};


export default Sell;