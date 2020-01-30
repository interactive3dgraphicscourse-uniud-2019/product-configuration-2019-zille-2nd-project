import * as THREE from '../lib/three.module.js';

let materials = {};
let tap_materials = [];
let container_materials = [];
let sticks_materials = [];

const textureLoader = new THREE.TextureLoader();

const createStandardMaterial = (callback, color, roughness, metalness) => {
    callback(new THREE.MeshStandardMaterial({ color: color, roughness: roughness, metalness: metalness }));
}

const createTexturedMaterial = (callback, albedo, normal, roughness, metalness) => {

    textureLoader.load(`./textures/materials/${albedo}`, (albedoMap) => {
        albedoMap.encoding = THREE.sRGBEncoding;
        albedoMap.needsUpdate = true;

        textureLoader.load(`./textures/materials/${normal}`, (normalMap) => {
            textureLoader.load(`./textures/materials/${roughness}`, (roughnessMap) => {

                callback(new THREE.MeshStandardMaterial({
                    map: albedoMap,
                    normalMap: normalMap,
                    roughnessMap: roughnessMap,
                    metalness: metalness
                }));
            });
        });
    });
}

const setupMaterials = (callback) => {

    materials.chrome = {
        key: 'chrome',
        description: "Cromato",
        load: (callback) => createStandardMaterial(callback, new THREE.Color(0.550, 0.556, 0.554), 0.04, 1.0),
        material: null,
        previewTexture: null
    };

    materials.back_metal = {
        key: 'back_metal',
        description: "Metallo nero",
        load: (callback) => createStandardMaterial(callback, new THREE.Color(0.1, 0.1, 0.1), 0.04, 1.0),
        material: null
    };

    materials.smooth_copper = {
        key: 'smooth_copper',
        description: "Rame liscio",
        load: (callback) => createStandardMaterial(callback, new THREE.Color(0.955, 0.637, 0.538), 0.04, 1.0),
        material: null
    };

    materials.anodized_copper = {
        key: 'anodized_copper',
        description: "Rame anodizzato",
        load: (callback) => createStandardMaterial(callback, new THREE.Color(0.955, 0.637, 0.538), 0.2, 1.0),
        material: null
    };

    materials.back_rubber = {
        key: 'back_rubber',
        description: "Gomma nera",
        load: (callback) => createStandardMaterial(callback, new THREE.Color(0.04, 0.04, 0.04), 0.4, 0.0),
        material: null
    };

    materials.back_plastic = {
        key: 'back_plastic',
        description: "Plastica nera",
        load: (callback) => createStandardMaterial(callback, new THREE.Color(0.04, 0.04, 0.04), 0.04, 0.0),
        material: null
    };

    materials.white_rubber = {
        key: 'white_rubber',
        description: "Gomma bianca",
        load: (callback) => createStandardMaterial(callback, new THREE.Color(0.8, 0.8, 0.8), 0.6, 0.0),
        material: null
    };

    materials.white_plastic = {
        key: 'white_plastic',
        description: "Plastica bianca",
        load: (callback) => createStandardMaterial(callback, new THREE.Color(0.8, 0.8, 0.8), 0.04, 0.0),
        material: null
    };

    materials.fabric_leather_001 = {
        key: 'fabric_leather_001',
        description: "Ecopelle bianca 1",
        previewTexture: "FabricLeather001/FabricLeather001_COL_VAR1_1K.jpg",
        load: (callback) => createTexturedMaterial(callback, "FabricLeather001/FabricLeather001_COL_VAR1_1K.jpg", "FabricLeather001/FabricLeather001_NRM_1K.jpg", "FabricLeather001/FabricLeather001_GLOSS_1K.jpg", 0.0),
        material: null
    };

    materials.fabric_leather_white_001 = {
        key: 'fabric_leather_white_001',
        description: "Ecopelle bianca 2",
        previewTexture: "FabricLeatherWhite001/FabricLeatherWhite001_COL_1K.jpg",
        load: (callback) => createTexturedMaterial(callback, "FabricLeatherWhite001/FabricLeatherWhite001_COL_1K.jpg", "FabricLeatherWhite001/FabricLeatherWhite001_NRM_1K.jpg", "FabricLeatherWhite001/FabricLeatherWhite001_GLOSS_1K.jpg", 0.0),
        material: null
    };

    materials.fabric_leather_black_001 = {
        key: 'fabric_leather_black_001',
        description: "Ecopelle nera",
        previewTexture: "FabricLeatherBlack001/FabricLeatherBlack001_COL_1K.jpg",
        load: (callback) => createTexturedMaterial(callback, "FabricLeatherBlack001/FabricLeatherBlack001_COL_1K.jpg", "FabricLeatherBlack001/FabricLeatherBlack001_NRM_1K.jpg", "FabricLeatherBlack001/FabricLeatherBlack001_GLOSS_1K.jpg", 0.0),
        material: null
    };

    materials.metal_designer_wall_steel_waves_002 = {
        key: 'metal_designer_wall_steel_waves_002',
        description: "Metallo lavorato",
        previewTexture: "MetalDesignerWallSteelWaves002/MetalDesignerWallSteelWaves002_COL_1K.jpg",
        load: (callback) => createTexturedMaterial(callback, "MetalDesignerWallSteelWaves002/MetalDesignerWallSteelWaves002_COL_1K.jpg", "MetalDesignerWallSteelWaves002/MetalDesignerWallSteelWaves002_NRM_1K.jpg", "MetalDesignerWallSteelWaves002/MetalDesignerWallSteelWaves002_ROUGHNESS_1K.jpg", 1.0),
        material: null
    };

    materials.stone_marble_calacatta_004 = {
        key: 'stone_marble_calacatta_004',
        description: "Marmo",
        previewTexture: "StoneMarbleCalacatta004/StoneMarbleCalacatta004_COL_1K.jpg",
        load: (callback) => createTexturedMaterial(callback, "StoneMarbleCalacatta004/StoneMarbleCalacatta004_COL_1K.jpg", "StoneMarbleCalacatta004/StoneMarbleCalacatta004_NRM_1K.jpg", "StoneMarbleCalacatta004/StoneMarbleCalacatta004_GLOSS_1K.jpg", 0.0),
        material: null
    };

    materials.wood_fine_007 = {
        key: 'wood_fine_007',
        description: "Legno 1",
        previewTexture: "WoodFine007/WoodFine007_COL_1K.jpg",
        load: (callback) => createTexturedMaterial(callback, "WoodFine007/WoodFine007_COL_1K.jpg", "WoodFine007/WoodFine007_NRM_1K.jpg", "WoodFine007/WoodFine007_GLOSS_1K.jpg", 0.0),
        material: null
    };

    materials.wood_fine_008 = {
        key: 'wood_fine_008',
        description: "Legno 2",
        previewTexture: "WoodFine008/WoodFine008_COL_1K.jpg",
        load: (callback) => createTexturedMaterial(callback, "WoodFine008/WoodFine008_COL_1K.jpg", "WoodFine008/WoodFine008_NRM_1K.png", "WoodFine008/WoodFine008_GLOSS_1K.jpg", 0.0),
        material: null
    };

    materials.wood_fine_009 = {
        key: 'wood_fine_009',
        description: "Legno 3",
        previewTexture: "WoodFine009/WoodFine009_COL_1K.jpg",
        load: (callback) => createTexturedMaterial(callback, "WoodFine009/WoodFine009_COL_1K.jpg", "WoodFine009/WoodFine009_NRM_1K.jpg", "WoodFine009/WoodFine009_GLOSS_1K.jpg", 0.0),
        material: null
    };

    materials.wood_fine_dark_002 = {
        key: 'wood_fine_dark_002',
        description: "Legno 4",
        previewTexture: "WoodFineDark002/WoodFineDark002_COL_1K.jpg",
        load: (callback) => createTexturedMaterial(callback, "WoodFineDark002/WoodFineDark002_COL_1K.jpg", "WoodFineDark002/WoodFineDark002_NRM_1K.jpg", "WoodFineDark002/WoodFineDark002_GLOSS_1K.jpg", 0.0),
        material: null
    };

    materials.wood_quartered_catseye_001 = {
        key: 'wood_quartered_catseye_001',
        description: "Legno 5",
        previewTexture: "WoodQuarteredCatseye001/WoodQuarteredCatseye001_COL_1K.jpg",
        load: (callback) => createTexturedMaterial(callback, "WoodQuarteredCatseye001/WoodQuarteredCatseye001_COL_1K.jpg", "WoodQuarteredCatseye001/WoodQuarteredCatseye001_NRM_1K.jpg", "WoodQuarteredCatseye001/WoodQuarteredCatseye001_GLOSS_1K.jpg", 0.0),
        material: null
    };

    materials.wood_quartered_midnight_vista_002 = {
        key: 'wood_quartered_midnight_vista_002',
        description: "Legno 6",
        previewTexture: "WoodQuarteredMidnightVista002/WoodQuarteredMidnightVista002_COL_1K.jpg",
        load: (callback) => createTexturedMaterial(callback, "WoodQuarteredMidnightVista002/WoodQuarteredMidnightVista002_COL_1K.jpg", "WoodQuarteredMidnightVista002/WoodQuarteredMidnightVista002_NRM_1K.jpg", "WoodQuarteredMidnightVista002/WoodQuarteredMidnightVista002_GLOSS_1K.jpg", 0.0),
        material: null
    };

    materials.wood_quartered_recchiuti_001 = {
        key: 'wood_quartered_recchiuti_001',
        description: "Legno 7",
        previewTexture: "WoodQuarteredRecchiuti001/WoodQuarteredRecchiuti001_COL_1K.jpg",
        load: (callback) => createTexturedMaterial(callback, "WoodQuarteredRecchiuti001/WoodQuarteredRecchiuti001_COL_1K.jpg", "WoodQuarteredRecchiuti001/WoodQuarteredRecchiuti001_NRM_1K.jpg", "WoodQuarteredRecchiuti001/WoodQuarteredRecchiuti001_GLOSS_1K.jpg", 0.0),
        material: null
    };

    materials.wood_quartered_sunflower_seed_001 = {
        key: 'wood_quartered_sunflower_seed_001',
        description: "Legno 8",
        previewTexture: "WoodQuarteredSunflowerSeed001/WoodQuarteredSunflowerSeed001_COL_1K.jpg",
        load: (callback) => createTexturedMaterial(callback, "WoodQuarteredSunflowerSeed001/WoodQuarteredSunflowerSeed001_COL_1K.jpg", "WoodQuarteredSunflowerSeed001/WoodQuarteredSunflowerSeed001_NRM_1K.jpg", "WoodQuarteredSunflowerSeed001/WoodQuarteredSunflowerSeed001_GLOSS_1K.jpg", 0.0),
        material: null
    };

    tap_materials.push(
        materials.chrome,
        materials.back_metal,
        materials.smooth_copper,
        materials.anodized_copper,
        materials.back_rubber,
        materials.back_plastic,
        materials.white_rubber,
        materials.white_plastic,
        materials.fabric_leather_001,
        materials.fabric_leather_white_001,
        materials.fabric_leather_black_001,
        materials.metal_designer_wall_steel_waves_002,
        materials.stone_marble_calacatta_004,
        materials.wood_fine_007,
        materials.wood_fine_008,
        materials.wood_fine_009,
        materials.wood_fine_dark_002,
        materials.wood_quartered_catseye_001,
        materials.wood_quartered_midnight_vista_002,
        materials.wood_quartered_recchiuti_001,
        materials.wood_quartered_sunflower_seed_001);

    container_materials.push(
        materials.chrome,
        materials.back_metal,
        materials.smooth_copper,
        materials.anodized_copper,
        materials.back_rubber,
        materials.back_plastic,
        materials.white_rubber,
        materials.white_plastic,
        materials.fabric_leather_001,
        materials.fabric_leather_white_001,
        materials.fabric_leather_black_001,
        materials.metal_designer_wall_steel_waves_002,
        materials.stone_marble_calacatta_004,
        materials.wood_fine_007,
        materials.wood_fine_008,
        materials.wood_fine_009,
        materials.wood_fine_dark_002,
        materials.wood_quartered_catseye_001,
        materials.wood_quartered_midnight_vista_002,
        materials.wood_quartered_recchiuti_001,
        materials.wood_quartered_sunflower_seed_001);

    sticks_materials.push(
        materials.chrome,
        materials.back_metal,
        materials.smooth_copper,
        materials.anodized_copper,
        materials.back_rubber,
        materials.back_plastic,
        materials.white_rubber,
        materials.white_plastic,
        materials.fabric_leather_001,
        materials.fabric_leather_white_001,
        materials.fabric_leather_black_001,
        materials.metal_designer_wall_steel_waves_002,
        materials.stone_marble_calacatta_004,
        materials.wood_fine_007,
        materials.wood_fine_008,
        materials.wood_fine_009,
        materials.wood_fine_dark_002,
        materials.wood_quartered_catseye_001,
        materials.wood_quartered_midnight_vista_002,
        materials.wood_quartered_recchiuti_001,
        materials.wood_quartered_sunflower_seed_001);

    callback();
};

export { setupMaterials, materials, tap_materials, container_materials, sticks_materials };