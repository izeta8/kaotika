


interface promps {

}

const SellShopObjectDetails: React.FC<promps> = () => {

  const item = {
        "modifiers": {
            "intelligence": 2,
            "dexterity": 3,
            "constitution": 10,
            "insanity": 5,
            "charisma": 4,
            "strength": 6
        },
        "_id": "66f694d84a8f1157dab87bc3",
        "name": "Berserker's Fury Boots",
        "description": "Fuel your rage and strength.",
        "type": "boot",
        "image": "/images/equipment/boots/boot_11.png",
        "value": 400,
        "defense": 36,
        "min_lvl": 15,
        "isActive": true,
        "isUnique": false
    }

    return (

        <div>
            <div className="flex flex-row text-medievalSepia bg-cover bg-no-repeat bg-center w-2" style={{ backgroundImage: 'url(/images/shop/shop_item_details.png)', width: '740px', height: '500px' }}>
                <div className="flex-col w-1/2">
                    <h2 className="text-3xl pt-10 px-4 mb-4 text-center">{item.name}</h2>

                    {((item.type === "armor") || (item.type === "artifact") || (item.type === "helmet") || (item.type === "boot") || (item.type === "ring") || (item.type === "shield") || (item.type === "weapon")) ?
                        (item.modifiers.charisma > 0) ?
                            <h2 className="text-xl pl-24 mb-1">Charisma: <span className="text-emerald-300">{item.modifiers.charisma}</span></h2>
                            : (item.modifiers.charisma < 0) ?
                                <h2 className="text-xl pl-24 mb-1">Charisma: <span className="text-rose-600">{item.modifiers.charisma}</span></h2>
                                : <></>
                        : <></>
                    }

                    {((item.type === "armor") || (item.type === "artifact") || (item.type === "helmet") || (item.type === "boot") || (item.type === "ring") || (item.type === "shield") || (item.type === "weapon")) ?
                        (item.modifiers.constitution > 0) ?
                            <h2 className="text-xl pl-24 mb-1">Constitution: <span className="text-emerald-300">{item.modifiers.constitution}</span></h2>
                            : (item.modifiers.constitution < 0) ?
                                <h2 className="text-xl pl-24 mb-1">Constitution: <span className="text-rose-600">{item.modifiers.constitution}</span></h2>
                                : <></>
                        : <></>
                    }

                    {((item.type === "armor") || (item.type === "artifact") || (item.type === "helmet") || (item.type === "boot") || (item.type === "ring") || (item.type === "shield") || (item.type === "weapon")) ?
                        (item.modifiers.dexterity > 0) ?
                            <h2 className="text-xl pl-24 mb-1">Dexterity: <span className="text-emerald-300">{item.modifiers.dexterity}</span></h2>
                            : (item.modifiers.dexterity < 0) ?
                                <h2 className="text-xl pl-24 mb-1">Dexterity: <span className="text-rose-600">{item.modifiers.dexterity}</span></h2>
                                : <></>
                        : <></>
                    }

                    {((item.type === "armor") || (item.type === "artifact") || (item.type === "helmet") || (item.type === "boot") || (item.type === "ring") || (item.type === "shield") || (item.type === "weapon")) ?
                        (item.modifiers.insanity > 0) ?
                            <h2 className="text-xl pl-24 mb-1">Insanity: <span className="text-emerald-300">{item.modifiers.insanity}</span></h2>
                            : (item.modifiers.insanity < 0) ?
                                <h2 className="text-xl pl-24 mb-1">Insanity: <span className="text-rose-600">{item.modifiers.insanity}</span></h2>
                                : <></>
                        : <></>
                    }
                    {((item.type === "armor") || (item.type === "artifact") || (item.type === "helmet") || (item.type === "boot") || (item.type === "ring") || (item.type === "shield") || (item.type === "weapon")) ?
                        (item.modifiers.intelligence > 0) ?
                            <h2 className="text-xl pl-24 mb-1">Intelligence: <span className="text-emerald-300">{item.modifiers.intelligence}</span></h2>
                            : (item.modifiers.intelligence < 0) ?
                                <h2 className="text-xl pl-24 mb-1">Intelligence: <span className="text-rose-600">{item.modifiers.intelligence}</span></h2>
                                : <></>
                        : <></>
                    }

                    {((item.type === "armor") || (item.type === "artifact") || (item.type === "helmet") || (item.type === "boot") || (item.type === "ring") || (item.type === "shield") || (item.type === "weapon")) ?
                        (item.modifiers.strength > 0) ?
                            <h2 className="text-xl pl-24 mb-1">Strength: <span className="text-emerald-300">{item.modifiers.strength}</span></h2>
                            : (item.modifiers.strength < 0) ?
                                <h2 className="text-xl pl-24 mb-1">Strength: <span className="text-rose-600">{item.modifiers.strength}</span></h2>
                                : <></>
                        : <></>
                    }


                    {/* Only if the item type is the one which have defense attribute */}
                    {((item.type === "armor") || (item.type === "helmet") || (item.type === "boot") || (item.type === "shield")) ?
                        (item.defense > 0) ?
                            <h2 className="text-xl pl-24 mb-1">Defense: <span className="text-emerald-300">{item.defense}</span></h2>
                            : (item.defense < 0) ?
                                <h2 className="text-xl pl-24 mb-1">Defense: <span className="text-rose-600">{item.defense}</span></h2>
                                : <></>
                        : <></>}

                    {/* Only if the item is an ingredient render the effects*/}
                    {(item.type === "ingredient") ?
                        item.effects.map((effect) => {
                            return (<h2 className="text-xl pl-24 mb-1">{getIngredientEffectName(effect)}</h2>)
                        })
                        : <></>}

                </div>
                <div className="w-1/2 ">

                    {(item.type === "ingredient") ?
                        <img src={item.image} alt={item.name} className="w-1/2 mt-14 ml-16 rounded-full" />
                        : <img src={item.image} alt={item.name} className="w-1/2 mt-14 ml-16" />
                        }

                    {/* Render th tem real value */}
                    <h2 className="text-3xl pl-20">Item value is {item.value}</h2>
                    {/* Only if the item type is the one which needs a minimun level to use */}
                    {((item.type === "armor") || (item.type === "artifact") || (item.type === "helmet") || (item.type === "boot") || (item.type === "ring") || (item.type === "shield") || (item.type === "weapon")) ?
                        <h2 className="text-3xl pl-20">Min level to use is {item.min_lvl}</h2>
                        : <></>}

                </div>
            </div>
        </div>
    );
}

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