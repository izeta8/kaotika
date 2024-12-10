import { Player } from "@/_common/interfaces/Player";
import Layout from "@/components/Layout";
import PlayerInventorySellShop from "@/components/shop/PlayerInventorySellShop";
import Link from 'next/link';
import SellShopObjectDetails from "@/components/shop/SellShopObjectDetails";
import { SellerDialogueBox, createItemSellPriceMessage } from "@/components/shop/SellerDialgueBox";
import { Button } from "@nextui-org/button";
import KaotikaButton from "@/components/KaotikaButton";
import SellPlayerInfo from "@/components/shop/SellPlayerInfo";
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
import { MESSAGES } from "@/constants/shop/constants_messages";
import Confirm from "@/components/shop/Confirm";
import SellScreenButton from "@/components/shop/SellScreenButton";


const Sell = () => {


  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const [playerEmail, setPlayerEmail] = useState<string | null>(null);
  const [playerData, setPlayerData] = useState<Player>();
  const [productConfirm, setProductConfirm] = useState<object | null>(null);
  const [selectedItemToSell, setSelectedItemToSell] = useState< Helmet | Armor | Weapon | Artifact | Ring | Boot | Shield | null >(null);
  const [hoverItemToSell, setHoverItemToSell] = useState< Helmet | Armor | Weapon | Artifact | Ring | Boot | Shield | null >(null);
  const [sellerDialogueMessage, setSellerDialogueMessage] = useState<string>(MESSAGES.WELCOME);



  //####################################################################################################
  //####################################################################################################
  // Get the player data with the email that the user has been autenticated
  //####################################################################################################
  //####################################################################################################

  useEffect(() => {
    setPlayerEmail('ander.zubizarreta@ikasle.aeg.eus');
    // if (session?.user?.email) {
    //   setLoading(true);
    //   setPlayerEmail(session.user.email);
    // }
  }, [session]);

  useEffect(() => {
    console.log(selectedItemToSell);
    if (selectedItemToSell) {
      const itemSellPrice = Math.floor(selectedItemToSell.value/3);
      const message = createItemSellPriceMessage(MESSAGES.ITEM_SELECTED, selectedItemToSell.name, itemSellPrice);
      setSellerDialogueMessage(message);
    } else {
      if (sellerDialogueMessage !== MESSAGES.ITEM_SELL_SUCCESS) {
        setSellerDialogueMessage(MESSAGES.SELECT_ITEM);
      }
    }
    
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

  useEffect(()=> {
    setSellerDialogueMessage(MESSAGES.WELCOME)
  },[]);

  const handleConfirmSell = async (productConfirm) => {
    if (!productConfirm) return;

    try {
      const itemPrice = Math.floor(productConfirm.value/3);
  
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
      
      setSelectedItemToSell(undefined);
      setProductConfirm(null);
      setSellerDialogueMessage(MESSAGES.ITEM_SELL_SUCCESS);
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
    setSellerDialogueMessage(MESSAGES.ITEM_SELL_CANCEL)
  };

  //####################################################################################################
  //####################################################################################################
  // Function to reset the item showing on details on the card
  //####################################################################################################
  //####################################################################################################
  const handleResetSelectedItemToSell = () => {
    
    setProductConfirm(null);
    setSellerDialogueMessage(MESSAGES.ITEM_SELL_CANCEL)
    setSelectedItemToSell(null);
    
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
          <PlayerInventorySellShop playerData={playerData} setSelectedItemToSell={setSelectedItemToSell} setHoverItemToSell={setHoverItemToSell} selectedItemToSell={selectedItemToSell}/>
          <SellShopObjectDetails item={selectedItemToSell} hover={hoverItemToSell} setSelectedItemToSell={setSelectedItemToSell}/>
        </div>

        <div className="flex flex-col w-1/2">

          <div className="flex flex-row-reverse">

            {/* Botón de Return */}
            <Link
              href="/shop"
              className=" bg-darkSepia w-full text-black text-3xl py-2 px-4 mb-4 mt-4 mr-8 rounded hover:bg-medievalSepia text-center transition max-w-64 max-h-24"
            >
              Return to Home
            </Link>

          </div>

        {/* Container for the Dialogue Box */}
        <div
          className="absolute top-[300px] right-0 mt-12 mr-8"
          style={{
            height: 'auto', // Allow dynamic height for the dialogue box
          }}
        >
          <SellerDialogueBox phrase={sellerDialogueMessage} />
        </div>

        {/* Container for Buttons and Player Info */}
        <div
          className="flex flex-row justify-center items-center"
          style={{
            marginTop: '60vh', // Push the buttons down to 60% of the viewport height
            marginLeft: '-500px',
          }}
        >
          <div className="px-6">
          <SellScreenButton
          text="KEEP IT"
          handleClick={handleResetSelectedItemToSell}
          isSelected={selectedItemToSell !== null} // Enable if an item is selected
        />
          </div>
          <div className="px-6">
          <SellScreenButton
          text="SELL IT"
          handleClick={handleSellClick}
          isSelected={selectedItemToSell !== null} // Enable if an item is selected
        />
          </div>
          <SellPlayerInfo gold={playerData?.gold!} level={playerData?.level!} />
        </div>


        </div>
        {productConfirm && (
          <Confirm isOpen={handleSellClick} onCancel={handleCancel} onConfirm={handleConfirmSell} product={selectedItemToSell} />
        )}
      </div>
    </Layout>


  );
};


export default Sell;