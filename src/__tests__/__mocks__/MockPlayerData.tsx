
// Mock player data for the test
export const mockPlayerData: any = {

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
            "die_num": 2,
            "isUnique": false,
            "isActive": true
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
            "min_lvl": 1,
            "isUnique": false,
            "isActive": true
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
            "min_lvl": 1,
            "isUnique": false,
            "isActive": true
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
            "min_lvl": 1,
            "isUnique": false,
            "isActive": true
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
            "isActive": true,
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
            "min_lvl": 1,
            "isUnique": false,
            "isActive": true
        }
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
                "name": "Intelligence",
                "description": "The intelligence controls the chance of success when using a potion",
                "value": 5
            },
            {
                "name": "Dexterity",
                "description": "Manages the chance of success when using a melee weapon and the damage a missile weapon does",
                "value": 30
            },
            {
                "name": "Insanity",
                "description": "Indicates the state of mental health of an adventurer. If the insanity is high, there will be more chance to make a fumble of a critical hit, and the resulting damage will be more critical. If the insanity is low, there will be less chance to make a fumble or a critical hit, and the resulting damage will be less critical",
                "value": 45
            },
            {
                "name": "Charisma",
                "description": "Indicates the chance to attack first in the next round",
                "value": 17
            },
            {
                "name": "Constitution",
                "description": "Indicates the number of Hit Points an adventurer starts with",
                "value": 13
            },
            {
                "name": "Strength",
                "description": "Manages the chance of success when using a melee weapon, and the damage a melee weapon does",
                "value": 5
            }
        ]
    },
    "tasks": [],
    "gold": 1599,
    "created_date": "2024-09-09T10:03:12.124Z",
    "inventory": {

        "helmets": [
            {
                "_id": "66f3b3ddc8cdd090db911d7f",
                "name": "Warbringer Helm",
                "description": "Brings the wrath of war upon its foes.",
                "type": "helmet",
                "image": "/images/equipment/helmets/helmet_2.png",
                "value": 170,
                "defense": 24,
                "modifiers": {
                    "intelligence": 3,
                    "dexterity": 5,
                    "constitution": 6,
                    "insanity": 0,
                    "charisma": 1,
                    "strength": 5
                },
                "min_lvl": 10,
                "isUnique": false,
                "isActive": true
            },
        ],
        "weapons": [
            {
                "modifiers": {
                    "intelligence": 10,
                    "dexterity": 2,
                    "constitution": 0,
                    "insanity": 12,
                    "charisma": 8,
                    "strength": -15
                },
                "_id": "66f9caddd39859521ad20fe1",
                "name": "Soulstealer",
                "description": "A sword that siphons the life force of its victims.",
                "type": "weapon",
                "image": "/images/equipment/weapons/sword_34.png",
                "value": 675,
                "base_percentage": 12,
                "min_lvl": 11,
                "die_faces": 10,
                "die_modifier": 5,
                "die_num": 7,
                "isUnique": false,
                "isActive": true
            },
        ],
        "armors": [
            {
                "modifiers": {
                    "intelligence": 15,
                    "charisma": 12,
                    "dexterity": 10,
                    "strength": -6,
                    "constitution": 0,
                    "insanity": 0
                },
                "_id": "66f3d2fab32d7add9a087646",
                "name": "Obsidian Plate",
                "description": "Forged from the hardest obsidian rock.",
                "type": "armor",
                "image": "/images/equipment/armors/armor_42.png",
                "value": 540,
                "defense": 60,
                "min_lvl": 10,
                "isUnique": false,
                "isActive": true
            },
        ],
        "shields": [
            {
                "modifiers": {
                    "intelligence": 0,
                    "dexterity": 2,
                    "constitution": 3,
                    "insanity": 0,
                    "charisma": 0,
                    "strength": 5
                },
                "_id": "66f27c81c114335cadf45d70",
                "name": "Knights Shield",
                "description": "A sturdy shield for knights.",
                "type": "shield",
                "image": "/images/equipment/shields/shield_initial.png",
                "value": 15,
                "defense": 10,
                "min_lvl": 1,
                "isUnique": false,
                "isActive": true
            },
        ],
        "artifacts": [
            {
                "modifiers": {
                    "intelligence": -2,
                    "dexterity": 2,
                    "constitution": 0,
                    "insanity": 0,
                    "charisma": 8,
                    "strength": 0
                },
                "_id": "66a902e1b5831810990551d3",
                "name": "Amulet of the Phoenix Rebirth",
                "description": "An amulet imbued with the essence of a phoenix.",
                "type": "artifact",
                "image": "/images/equipment/artifacts/artifact_3.png",
                "value": 5,
                "min_lvl": 1,
                "isUnique": false,
                "isActive": true
            },
        ],
        "boots": [
            {
                "modifiers": {
                    "intelligence": 0,
                    "dexterity": 0,
                    "constitution": 0,
                    "insanity": 0,
                    "charisma": 0,
                    "strength": 0
                },
                "_id": "66d99a807518eb499003535f",
                "name": "Beggars path",
                "description": "Cheap sinister leather shoes.",
                "type": "boot",
                "image": "/images/equipment/boots/boot_initial.png",
                "value": 5,
                "defense": 4,
                "min_lvl": 1,
                "isActive": true,
                "isUnique": true
            },
        ],
        "rings": [
            {
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
                "min_lvl": 1,
                "isActive": true,
                "isUnique": true
            },
        ],
        "ingredients": [
            {
                "_id": "6702b39d76863c206a48cccd",
                "name": "Moonleaf",
                "description": "A mystical leaf that offers a slight increase in hit points.",
                "value": 8,
                "effects": [
                    "least_increase_hit_points"
                ],
                "image": "/images/ingredients/increase/increase_4.webp",
                "type": "ingredient",
                "quantity": 6
            },
        ],
        "antidote_potions": [],
        "healing_potions": [],
        "enhancer_potions": []
    }
    
};