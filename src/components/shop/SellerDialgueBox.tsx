

interface promps {
    phrase?: string,
}


export const SellerDialogueBox : React.FC<promps> = ({phrase}) => {

    return (


<div className="flex flex-row text-medievalSepia bg-cover bg-no-repeat bg-center w-2 mt-64 mr-10" style={{ backgroundImage: 'url(/images/shop/seller_dialogue_box.png)', width: '525px', height: '280px' }}>
    <h2 className="text-3xl pl-8 pr-8 mb-4 text-center place-self-center">{phrase}</h2>
</div>
             
        
    );

}


export function createItemSellPriceMessage(message:string, itemName:string, itemValue:number): string {
    let returnMessage = "";

    
    returnMessage = message.replace("{itemName}", itemName);
    returnMessage = returnMessage.replace("{price}", itemValue.toString());


    return returnMessage;
}


