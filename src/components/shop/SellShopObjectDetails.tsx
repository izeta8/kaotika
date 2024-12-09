interface Promps {
    item: any;
    hover: any;
    setSelectedItemToSell: (item: any) => void; // Pass this function to clear the item
}

const SellShopObjectDetails: React.FC<Promps> = ({ item, hover, setSelectedItemToSell }) => {

    if (!item && !hover) {
        return <></>;
    }

    if (!item && hover) {
        item = hover;
    }

    const handleClose = () => {
        setSelectedItemToSell(null); // Set the item to null when closed
    };

    return (
        <div className="ml-10 relative"> {/* Ensure the container has relative positioning */}
            <div
                className="flex flex-col text-medievalSepia bg-cover bg-no-repeat bg-center w-2"
                style={{ backgroundImage: 'url(/images/shop/shop_item_details.png)', width: '656px', height: '353px' }}
            >
                 {/* Close Button (X) */}
                 <button
                    onClick={handleClose}
                    className="absolute top-2 left-0 text-white text-3xl font-bold p-2 bg-black bg-opacity-50 rounded-full"
                    style={{ cursor: 'pointer' }}
                >
                    X
                </button>

                <h2 className="text-4xl px-6 mt-10 text-center place-self-center">{item.name}</h2>

                <div className="flex flex-row text-medievalSepia place-self-center">
                    <div className="flex-col w-1/2 place-self-center">
                        {((item.type === "armor") || (item.type === "artifact") || (item.type === "helmet") || (item.type === "boot") || (item.type === "ring") || (item.type === "shield") || (item.type === "weapon")) ?
                            (item.modifiers.charisma > 0) ?
                                <h2 className="text-2xl pl-24">Charisma: <span className="text-emerald-300">{item.modifiers.charisma}</span></h2>
                                : (item.modifiers.charisma < 0) ?
                                    <h2 className="text-2xl pl-24">Charisma: <span className="text-rose-600">{item.modifiers.charisma}</span></h2>
                                    : <></>
                            : <></>
                        }

                        {((item.type === "armor") || (item.type === "artifact") || (item.type === "helmet") || (item.type === "boot") || (item.type === "ring") || (item.type === "shield") || (item.type === "weapon")) ?
                            (item.modifiers.constitution > 0) ?
                                <h2 className="text-2xl pl-24">Constitution: <span className="text-emerald-300">{item.modifiers.constitution}</span></h2>
                                : (item.modifiers.constitution < 0) ?
                                    <h2 className="text-2xl pl-24">Constitution: <span className="text-rose-600">{item.modifiers.constitution}</span></h2>
                                    : <></>
                            : <></>
                        }

                        {((item.type === "armor") || (item.type === "artifact") || (item.type === "helmet") || (item.type === "boot") || (item.type === "ring") || (item.type === "shield") || (item.type === "weapon")) ?
                            (item.modifiers.dexterity > 0) ?
                                <h2 className="text-2xl pl-24">Dexterity: <span className="text-emerald-300">{item.modifiers.dexterity}</span></h2>
                                : (item.modifiers.dexterity < 0) ?
                                    <h2 className="text-2xl pl-24">Dexterity: <span className="text-rose-600">{item.modifiers.dexterity}</span></h2>
                                    : <></>
                            : <></>
                        }

                        {((item.type === "armor") || (item.type === "artifact") || (item.type === "helmet") || (item.type === "boot") || (item.type === "ring") || (item.type === "shield") || (item.type === "weapon")) ?
                            (item.modifiers.insanity > 0) ?
                                <h2 className="text-2xl pl-24">Insanity: <span className="text-emerald-300">{item.modifiers.insanity}</span></h2>
                                : (item.modifiers.insanity < 0) ?
                                    <h2 className="text-2xl pl-24">Insanity: <span className="text-rose-600">{item.modifiers.insanity}</span></h2>
                                    : <></>
                            : <></>
                        }
                        {((item.type === "armor") || (item.type === "artifact") || (item.type === "helmet") || (item.type === "boot") || (item.type === "ring") || (item.type === "shield") || (item.type === "weapon")) ?
                            (item.modifiers.intelligence > 0) ?
                                <h2 className="text-2xl pl-24">Intelligence: <span className="text-emerald-300">{item.modifiers.intelligence}</span></h2>
                                : (item.modifiers.intelligence < 0) ?
                                    <h2 className="text-2xl pl-24 mb-1">Intelligence: <span className="text-rose-600">{item.modifiers.intelligence}</span></h2>
                                    : <></>
                            : <></>
                        }

                        {((item.type === "armor") || (item.type === "artifact") || (item.type === "helmet") || (item.type === "boot") || (item.type === "ring") || (item.type === "shield") || (item.type === "weapon")) ?
                            (item.modifiers.strength > 0) ?
                                <h2 className="text-2xl pl-24">Strength: <span className="text-emerald-300">{item.modifiers.strength}</span></h2>
                                : (item.modifiers.strength < 0) ?
                                    <h2 className="text-2xl pl-24">Strength: <span className="text-rose-600">{item.modifiers.strength}</span></h2>
                                    : <></>
                            : <></>
                        }


                        {/* Only if the item type is the one which have defense attribute */}
                        {((item.type === "armor") || (item.type === "helmet") || (item.type === "boot") || (item.type === "shield")) ?
                            (item.defense > 0) ?
                                <h2 className="text-2xl pl-24">Defense: <span className="text-emerald-300">{item.defense}</span></h2>
                                : (item.defense < 0) ?
                                    <h2 className="text-2xl pl-24">Defense: <span className="text-rose-600">{item.defense}</span></h2>
                                    : <></>
                            : <></>}

                        {/* Only if the item is an ingredient render the effects*/}
                        {(item.type === "ingredient") ?
                            item.effects.map(effect => {
                                return (<h2 className="text-2xl pl-12">{getIngredientEffectName(effect)}</h2>);
                            })
                            : <></>}

                    </div>
                    <div className="w-1/2 place-self-center ">

                        {(item.type === "ingredient") ?
                            <img src={item.image} alt={item.name} className="w-1/2 ml-16 rounded-full" />
                            : <img src={item.image} alt={item.name} className="w-1/2 ml-16 " />
                        }

                        {/* Render the item value */}
                        <h2 className="text-3xl mr-5 text-center">Item value is {item.value}</h2>
                        {/* Only if the item type is the one which needs a minimum level to use */}
                        {((item.type === "armor") || (item.type === "artifact") || (item.type === "helmet") || (item.type === "boot") || (item.type === "ring") || (item.type === "shield") || (item.type === "weapon")) ?
                            <h2 className="text-3xl mr-5 text-center">Min level to use is {item.min_lvl}</h2>
                            : <></>}

                    </div>
                </div>

            </div>
        </div>
    );
};

// Function that gets the name of the effect 'least_increase_hit_points' --> 'Least Increase Hit Points'
function getIngredientEffectName(effect: string): string {
    let effectName = "";
    let effectSplit = effect.split("_");

    for (let i = 0; i < effectSplit.length; i++) {
        effectName += String(effectSplit[i]).charAt(0).toUpperCase() + String(effectSplit[i]).slice(1) + " ";
    }
    return effectName;
}

export default SellShopObjectDetails;
