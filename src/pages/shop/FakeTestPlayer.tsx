import { Player } from "@/_common/interfaces/Player";


const player: Player = {
    "attributes": {
        "intelligence": 17,
        "dexterity": 52,
        "charisma": 27,
        "constitution": 22,
        "strength": 17,
        "insanity": 45
    },
    "equipment": {
        "weapon": {
            "modifiers": {
                "intelligence": 5,
                "dexterity": 0,
                "constitution": 0,
                "insanity": 8,
                "charisma": -6,
                "strength": 0
            },
            "_id": "668bca115319ea9afdff0725",
            "name": "Twirling Yo-yo",
            "description": "A seemingly playful toy with a hidden edge, the Twirling Yo-yo is a versatile weapon in the right hands. ",
            "type": "weapon",
            "image": "/images/equipment/weapons/weapon_init_3.png",
            "value": 10,
            "base_percentage": 15,
            "min_lvl": 1,
            "die_faces": 6,
            "die_modifier": 6,
            "die_num": 2
        },
        "armor": {
            "modifiers": {
                "intelligence": 4,
                "dexterity": 0,
                "constitution": 0,
                "insanity": 0,
                "charisma": 0,
                "strength": -6
            },
            "_id": "668bca105319ea9afdff06fa",
            "name": "Shabby Windbreaker",
            "description": "Ragged and torn.",
            "type": "armor",
            "image": "/images/equipment/armors/jacket_3.png",
            "value": 10,
            "defense": 25,
            "min_lvl": 1
        },
        "artifact": {
            "modifiers": {
                "intelligence": 10,
                "dexterity": 0,
                "constitution": 0,
                "insanity": 0,
                "charisma": -2,
                "strength": 0
            },
            "_id": "66a902e1b5831810990551d2",
            "name": "Crown of Eternal Wisdom",
            "description": "This golden crown enhances intellect and wisdom.",
            "type": "artifact",
            "image": "/images/equipment/artifacts/artifact_2.png",
            "value": 5,
            "min_lvl": 1
        },
        "antidote_potion": {
            "_id": "668bca125319ea9afdff0761",
            "name": "Etherbind Tonic",
            "description": "A mystical tonic made from binding agents and ethereal dust, anchoring the afflicted back to the material plane.",
            "type": "antidote",
            "image": "/images/equipment/potions/antidote/antidote_2.png",
            "value": 10,
            "recovery_effect": {
                "modifiers": {
                    "hit_points": 0,
                    "intelligence": -10,
                    "dexterity": 0,
                    "insanity": 6,
                    "charisma": 0,
                    "constitution": 0,
                    "strength": 0
                },
                "_id": "6693fd5846527d0df5f0efeb",
                "name": "Ethereal Consumption",
                "description": "A spectral illness that causes the afflicted to slowly fade into the ethereal plane, losing touch with reality.",
                "type": "illness",
                "antidote_effects": [
                    "restore_intelligence",
                    "lesser_restore_insanity"
                ],
                "poison_effects": [
                    "damage_intelligence",
                    "lesser_damage_insanity"
                ]
            },
            "min_lvl": 1
        },
        "healing_potion": {
            "modifiers": {
                "hit_points": 40,
                "intelligence": -5,
                "dexterity": 0,
                "constitution": 0,
                "insanity": 0,
                "charisma": 0,
                "strength": 0
            },
            "_id": "668bca125319ea9afdff0754",
            "name": "Potion of Rejuvenation",
            "description": "This revitalizing potion restores energy and vitality to the drinker.",
            "type": "healing",
            "image": "/images/equipment/potions/healing/healing_2.png",
            "value": 10,
            "min_lvl": 1
        },
        "enhancer_potion": {
            "modifiers": {
                "intelligence": 0,
                "dexterity": 0,
                "constitution": 0,
                "insanity": 0,
                "charisma": 0,
                "strength": 20
            },
            "_id": "668bca125319ea9afdff0767",
            "name": "Potion of Increase Strength",
            "description": "This robust elixir temporarily amplifies the drinker's physical power, significantly boosting muscle strength and stamina.\n\n\n",
            "type": "enhancer",
            "image": "/images/equipment/potions/enhancer/enhancer_1.png",
            "value": 10,
            "duration": 2,
            "min_lvl": 1
        },
        "helmet": {
            "modifiers": {
                "intelligence": 0,
                "dexterity": 0,
                "constitution": 0,
                "insanity": 0,
                "charisma": 0,
                "strength": 0
            },
            "_id": "66d99aac7518eb4990035363",
            "name": "Eternal Guardian Helmet",
            "description": "A helmet blessed by the spirits.",
            "type": "helmet",
            "image": "/images/equipment/helmets/helmet_initial.png",
            "value": 5,
            "defense": 3,
            "min_lvl": 1
        },
        "shield": {
            "modifiers": {
                "intelligence": 0,
                "dexterity": 2,
                "constitution": 3,
                "insanity": 0,
                "charisma": 0,
                "strength": 5
            },
            "_id": "66f27c81c114335cadf45d70",
            "name": "Knight's Shield",
            "description": "A sturdy shield for knights.",
            "type": "shield",
            "image": "/images/equipment/shields/shield_initial.png",
            "value": 15,
            "defense": 10,
            "min_lvl": 1,
            "isUnique": false,
            "isActive": true
        },
        "boot": {
            "modifiers": {
                "intelligence": 0,
                "dexterity": 0,
                "constitution": 0,
                "insanity": 0,
                "charisma": 0,
                "strength": 0
            },
            "_id": "66d99a807518eb499003535f",
            "name": "Beggar's path",
            "description": "Cheap sinister leather shoes.",
            "type": "boot",
            "image": "/images/equipment/boots/boot_initial.png",
            "value": 5,
            "defense": 4,
            "min_lvl": 1
        },
        "ring": {
            "modifiers": {
                "intelligence": 2,
                "dexterity": 0,
                "constitution": 0,
                "insanity": 0,
                "charisma": 0,
                "strength": 2
            },
            "_id": "66a6d6c8dfbffe7e6503970f",
            "name": "Ring of Eternal Flame",
            "description": "A ring that burns with eternal fire.",
            "type": "ring",
            "image": "/images/equipment/rings/ring_1.png",
            "value": 10,
            "min_lvl": 1
        }
    },
    "inventory": {
        "helmets": [
            {
                "modifiers": {
                    "intelligence": 2,
                    "dexterity": 4,
                    "constitution": 6,
                    "insanity": 0,
                    "charisma": 3,
                    "strength": 6
                },
                "_id": "66f3b3ddc8cdd090db911d83",
                "name": "Helm of Valor",
                "description": "Infused with the courage of heroes.",
                "type": "helmet",
                "image": "/images/equipment/helmets/helmet_6.png",
                "value": 210,
                "defense": 29,
                "min_lvl": 12,
                "isUnique": false,
                "isActive": true
            }
        ],
        "weapons": [
            {
                "modifiers": {
                    "intelligence": 12,
                    "dexterity": 4,
                    "constitution": 0,
                    "insanity": 2,
                    "charisma": 7,
                    "strength": -19
                },
                "_id": "66f9caddd39859521ad20fe3",
                "name": "Blightbringer",
                "description": "A sword that spreads decay with each cut.",
                "type": "weapon",
                "image": "/images/equipment/weapons/sword_40.png",
                "value": 750,
                "base_percentage": 12,
                "min_lvl": 13,
                "die_faces": 12,
                "die_modifier": 1,
                "die_num": 9,
                "isUnique": false,
                "isActive": true
            },
            {
                "modifiers": {
                    "intelligence": 3,
                    "dexterity": 5,
                    "constitution": 0,
                    "insanity": 6,
                    "charisma": 8,
                    "strength": -18
                },
                "_id": "66f9caddd39859521ad20fec",
                "name": "Wraithblade",
                "description": "A spectral sword that cuts through the fabric of reality.",
                "type": "weapon",
                "image": "/images/equipment/weapons/sword_50.png",
                "value": 750,
                "base_percentage": 12,
                "min_lvl": 12,
                "die_faces": 12,
                "die_modifier": 5,
                "die_num": 7,
                "isUnique": false,
                "isActive": true
            }
        ],
        "armors": [
            {
                "modifiers": {
                    "intelligence": 18,
                    "dexterity": 12,
                    "constitution": 0,
                    "insanity": 0,
                    "charisma": 8,
                    "strength": -8
                },
                "_id": "66f297cae5be15925dc0abe6",
                "name": "Warden's Plate",
                "description": "Built for wardens who safeguard the gates.",
                "type": "armor",
                "image": "/images/equipment/armors/full_plate_3.png",
                "value": 650,
                "defense": 70,
                "min_lvl": 11,
                "isUnique": false,
                "isActive": true
            },
            {
                "modifiers": {
                    "intelligence": 10,
                    "dexterity": 15,
                    "constitution": 0,
                    "insanity": 0,
                    "charisma": 5,
                    "strength": -6
                },
                "_id": "66f297cae5be15925dc0abee",
                "name": "Dreadnought's Pride",
                "description": "Heavy armor that carries the weight of a ship.",
                "type": "armor",
                "image": "/images/equipment/armors/full_plate_12.png",
                "value": 500,
                "defense": 50,
                "min_lvl": 9,
                "isUnique": false,
                "isActive": true
            },
            {
                "modifiers": {
                    "strength": -9,
                    "constitution": 0,
                    "dexterity": 30,
                    "intelligence": 20,
                    "insanity": 0,
                    "charisma": 15
                },
                "_id": "66f3e0f7b32d7add9a08768d",
                "name": "Titanium Armor",
                "description": "An incredibly tough armor that withstands the strongest blows.",
                "type": "armor",
                "image": "/images/equipment/armors/heavy_armor_24.png",
                "value": 980,
                "defense": 82,
                "isUnique": false,
                "isActive": true,
                "min_lvl": 16
            }
        ],
        "shields": [],
        "artifacts": [
            {
                "modifiers": {
                    "intelligence": 37,
                    "dexterity": 35,
                    "constitution": 49,
                    "insanity": 14,
                    "charisma": 23,
                    "strength": 30
                },
                "_id": "66f66bb44a8f1157dab87b97",
                "name": "Mortimer's Hand",
                "description": "Shines with endless light.",
                "type": "artifact",
                "image": "/images/equipment/artifacts/artifact_64.png",
                "value": 12800,
                "min_lvl": 90,
                "isActive": false,
                "isUnique": true
            }
        ],
        "boots": [
            {
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
            },
            {
                "modifiers": {
                    "intelligence": 2,
                    "dexterity": 8,
                    "constitution": 6,
                    "insanity": 3,
                    "charisma": 2,
                    "strength": 3
                },
                "_id": "66f694d84a8f1157dab87bcf",
                "name": "Venomous Boots",
                "description": "Step lightly, leave poison in your wake.",
                "type": "boot",
                "image": "/images/equipment/boots/boot_23.png",
                "value": 440,
                "defense": 39,
                "min_lvl": 16,
                "isActive": true,
                "isUnique": false
            }
        ],
        "rings": [],
        "antidote_potions": [],
        "healing_potions": [],
        "enhancer_potions": []
    },
    "_id": "66dec7e0c23791be382fa672",
    "name": "Mikel Lopez Diaz",
    "nickname": "Gastino Il Bitwise",
    "email": "mikel.lopez@ikasle.aeg.eus",
    "avatar": "https://lh3.googleusercontent.com/a/ACg8ocL1dzYBw_ARRY4QY0kQeVgo0FtuGYRvFFEgP2MM8u5ASK5GlpBo=s96-c",
    "classroom_Id": "23525",
    "level": 17,
    "experience": 28200,
    "is_active": true,
    "profile": {
        "_id": "dge434y334y34s",
        "name": "Juggler",
        "description": "In the center of the square, where the crowd gathers, the Juggler displays his art. His hands move with hypnotic grace, controlling objects with a precision that seems to defy the laws of physics. He is not only a master of entertainment but also a shrewd strategist. Every move is calculated, every trick a distraction that hides his true intentions. The Juggler is a master of deception, capable of slipping into the shadows and disappearing in the blink of an eye, leaving behind a trail of mystery and awe.",
        "image": "/images/profiles/juggler.jpg",
        "attributes": [
            {
                "_id": "67497bdbcf865629a9b7a157",
                "name": "Intelligence",
                "description": "The intelligence controls the chance of success when using a potion",
                "value": 5
            },
            {
                "_id": "67497bdbcf865629a9b7a158",
                "name": "Dexterity",
                "description": "Manages the chance of success when using a melee weapon and the damage a missile weapon does",
                "value": 30
            },
            {
                "_id": "67497bdbcf865629a9b7a159",
                "name": "Insanity",
                "description": "Indicates the state of mental health of an adventurer. If the insanity is high, there will be more chance to make a fumble of a critical hit, and the resulting damage will be more critical. If the insanity is low, there will be less chance to make a fumble or a critical hit, and the resulting damage will be less critical",
                "value": 45
            },
            {
                "_id": "67497bdbcf865629a9b7a15a",
                "name": "Charisma",
                "description": "Indicates the chance to attack first in the next round",
                "value": 17
            },
            {
                "_id": "67497bdbcf865629a9b7a15b",
                "name": "Constitution",
                "description": "Indicates the number of Hit Points an adventurer starts with",
                "value": 13
            },
            {
                "_id": "67497bdbcf865629a9b7a15c",
                "name": "Strength",
                "description": "Manages the chance of success when using a melee weapon, and the damage a melee weapon does",
                "value": 5
            }
        ]
    },
    "tasks": [],
    "gold": 1599,
    "created_date": "2024-09-09T10:03:12.124Z"
}


export default player;