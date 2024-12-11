import { ItemData } from "@/_common/interfaces/ItemData"


export const mockHelmetData:ItemData = {
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
    "isActive": true,
}

export const mockWeaponData:ItemData = {
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
    "isActive": true,
}

export const mockArmorData:ItemData = {
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
    "isActive": true,
}

export const mockShieldData:ItemData = {
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
    "isActive": true,
}

export const mockArtifactData:ItemData = {
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
    "isActive": true,
}

export const mockBootData:ItemData = {
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
    "isUnique": false,
}

export const mockRingData:ItemData = {
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
    "isUnique": false,
}

export const mockIngredient1Data:ItemData = {
    "_id": "6702b39d76863c206a48cccd",
    "name": "Moonleaf",
    "description": "A mystical leaf that offers a slight increase in hit points.",
    "value": 8,
    "effects": [
        "least_increase_hit_points"
    ],
    "image": "/images/ingredients/increase/increase_4.webp",
    "type": "ingredient",
    "qty": 6
}

export const mockIngredient2Data:ItemData = {
    "_id": "6702b44f76863c2y6a48ccdc",
    "name": "Titan's Blood",
    "description": "A rare blood known for its ability to enhance strength tremendously.",
    "value": 175,
    "effects": [
        "restore_strength",
        "lesser_increase_hit_points",
        "greater_restore_constitution",
    ],
    "image": "/images/ingredients/restore/restore_7.webp",
    "type": "ingredient",
    "qty": 6,
}

