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
import { Armor } from "@/_common/interfaces/Armor";
import { Artifact } from "@/_common/interfaces/Artifact";
import { Boot } from "@/_common/interfaces/Boot";
import { Helmet } from "@/_common/interfaces/Helmet";
import { Ingredient } from "@/_common/interfaces/Ingredients";
import { Ring } from "@/_common/interfaces/Ring";
import { Shield } from "@/_common/interfaces/Shield";
import { Weapon } from "@/_common/interfaces/Weapon";
import Confirm from "@/components/shop/Confirm";


const Sell = () => {


  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const [playerEmail, setPlayerEmail] = useState<string | null>(null);
  const [playerData, setPlayerData] = useState<Player>();
  const [productConfirm, setProductConfirm] = useState<object | null>(null);
  const [selectedItemToSell, setSelectedItemToSell] = useState< Helmet | Armor | Weapon | Artifact | Ring | Boot | Shield | Ingredient>();



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
    console.log(selectedItemToSell);
    
  }, [selectedItemToSell]);

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

  const handleConfirmSell = async (productConfirm) => {
    if (!productConfirm) return;

    try {
      const itemPrice = 1000;
  
      const result = await sellProduct(playerData.email, productConfirm, itemPrice);
      console.log(result); 
  
      if (result && result.success) {
        const updatedPlayerData = {
          ...playerData,
          gold: result.gold, 
          inventory: result.inventory, 
        };
        localStorage.setItem('playerData', JSON.stringify(updatedPlayerData));
        setPlayerData(updatedPlayerData);
      }
  
      setProductConfirm(null);
    } catch (error) {
      console.error('Error during sell:', error);
    }
  };

  const sellProduct = async (playerEmail, product, itemPrice) => {
    try {
      const response = await fetch('/api/shop/confirmSell', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ playerEmail, product, productPrice: itemPrice }),
      });
  
      const result = await response.json();
  
      if (!response.ok || !result.success) {
        console.log('Sell failed:', result.message);
        //alert(result.message); 
        return result;
      }
      console.log('Sell successful:', result);
      //alert('Sell successful!');
      return result;
    } catch (error) {
      console.error('Error during product sell:', error);
      //alert('An error occurred while processing your sell.');
    }
  };
  const handleSellClick = () => {
    setProductConfirm(selectedItemToSell);
  };

  const handleCancel = () => {
    setProductConfirm(null);
  };

//####################################################################################################
//####################################################################################################
// Function to reset the item showing on details on the card
//####################################################################################################
//####################################################################################################
const handleResetSelectedItemToSell = () => {
  setSelectedItemToSell(undefined);
}

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
          <PlayerInventorySellShop playerData={playerData} setSelectedItemToSell={setSelectedItemToSell} />
          <SellShopObjectDetails item={selectedItemToSell}/>
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
              <KaotikaButton text="KEEP IT" handleClick={handleResetSelectedItemToSell}/>
            </div>
            <div className="mt-20 px-6">
            <KaotikaButton text="SELL IT" handleClick={handleSellClick} />
            </div>
            <ShopPlayerInfo gold={playerData?.gold!} level={playerData?.level!}/>
          </div>


        </div>
        {/* isOpen, onCancel, onConfirm, product */}
        {productConfirm && (
          <Confirm isOpen={handleSellClick} onCancel={handleCancel} onConfirm={handleConfirmSell} product={selectedItemToSell}/>
        )}

      </div>
    </Layout>


  );
};


export default Sell;