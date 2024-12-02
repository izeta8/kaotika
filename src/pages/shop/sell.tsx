import { Player } from "@/_common/interfaces/Player";
import Layout from "@/components/Layout";
import PlayerInventorySellShop from "@/components/shop/PlayerInventorySellShop";
import { GRID_NUMBER } from "@/constants/constants";
import Link from 'next/link';
import player from "./FakeTestPlayer";
import SellShopObjectDetails from "@/components/shop/SellShopObjectDetails";
import { useState } from "react";


const Sell = () => {


  return (

    <Layout>
      <div className="flex flex-col text-medievalSepia bg-cover bg-no-repeat bg-center min-h-screen" style={{ backgroundImage: 'url(/images/shop/background_sell_shop.jpg)' }}>

    <PlayerInventorySellShop playerData={player}/>
    <SellShopObjectDetails/>

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