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
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Loading from "@/components/Loading";


const Sell = () => {


  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const [playerEmail, setPlayerEmail] = useState<string | null>(null);
  const [playerData, setPlayerData] = useState<Player | null>(null);



//####################################################################################################
//####################################################################################################
// Get the player data with the email that the user has been autenticated
//####################################################################################################
//####################################################################################################

  useEffect(() => {
    if (session?.user?.email) {
      setLoading(true);
      setPlayerEmail(session.user.email);
    }
  }, [session]);

  useEffect(() => {
    if (playerEmail) {

      const loadPlayerData = async () => {
        try {
          setLoading(true);
          const res = await fetch(`/api/shop/player/?playerEmail=${playerEmail}`);
          if (res.status === 200) {
            const data = await res.json();
            delete data.player.isInsideTower;
            delete data.player.socketId;
            delete data.player.isInsideLab;
            delete data.player.isInsideHall;
            delete data.player.obituaryDiscovered;
            delete data.player.fcm_token;
            delete data.player.role;
            delete data.player.cardId;
            const playerObject = data.player;

            console.log(playerObject)
            setPlayerData(playerObject);
          } else if (res.status === 404) {
            const data = await res.json();
          }
        } catch (error) {
          console.error(`An error occurred while checking registration`, error);
        } finally {
          setLoading(false);
        }
      }

      loadPlayerData();
    }
  }, [playerEmail]);

//####################################################################################################
// Return loading spinner if there is charging something
//####################################################################################################

  if (loading) {
    return (<Loading />);
  }


  return (

    <Layout>
      <div className="flex text-medievalSepia bg-cover bg-no-repeat bg-center min-h-screen" style={{ backgroundImage: 'url(/images/shop/background_sell_shop.jpg)' }}>

        <div className="flex-col w-1/2">
          <PlayerInventorySellShop playerData={playerData} />
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