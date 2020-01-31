import * as THREE from '../lib/three.module.js';

let materials = {};
let tap_materials = [];
let container_materials = [];
let sticks_materials = [];
let floor_material = null;

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
        previewTexture: "chrome_preview.png",
        load: (callback) => createStandardMaterial(callback, new THREE.Color(0.550, 0.556, 0.554), 0.04, 1.0),
        material: null
    };

    materials.smooth_black_metal = {
        key: 'smooth_black_metal',
        description: "Metallo nero",
        previewTexture: "smooth_black_metal_preview.png",
        load: (callback) => createStandardMaterial(callback, new THREE.Color(0.1, 0.1, 0.1), 0.04, 1.0),
        material: null
    };

    materials.anodized_black_metal = {
        key: 'anodized_black_metal',
        description: "Metallo nero anodizzato",
        previewTexture: "anodized_black_metal_preview.png",
        load: (callback) => createStandardMaterial(callback, new THREE.Color(0.1, 0.1, 0.1), 0.2, 1.0),
        material: null
    };

    materials.smooth_copper = {
        key: 'smooth_copper',
        description: "Rame",
        previewTexture: "smooth_copper_preview.png",
        load: (callback) => createStandardMaterial(callback, new THREE.Color(0.955, 0.637, 0.538), 0.04, 1.0),
        material: null
    };

    materials.anodized_copper = {
        key: 'anodized_copper',
        description: "Rame anodizzato",
        previewTexture: "anodized_copper_preview.png",
        load: (callback) => createStandardMaterial(callback, new THREE.Color(0.955, 0.637, 0.538), 0.2, 1.0),
        material: null
    };

    materials.back_rubber = {
        key: 'back_rubber',
        description: "Gomma nera",
        previewTexture: "black_rubber_preview.png",
        load: (callback) => createStandardMaterial(callback, new THREE.Color(0.04, 0.04, 0.04), 0.4, 0.0),
        material: null
    };

    materials.back_plastic = {
        key: 'back_plastic',
        description: "Plastica nera",
        previewTexture: "black_plastic_preview.png",
        load: (callback) => createStandardMaterial(callback, new THREE.Color(0.04, 0.04, 0.04), 0.04, 0.0),
        material: null
    };

    materials.white_rubber = {
        key: 'white_rubber',
        description: "Gomma bianca",
        previewTexture: "white_rubber_preview.png",
        load: (callback) => createStandardMaterial(callback, new THREE.Color(0.8, 0.8, 0.8), 0.6, 0.0),
        material: null
    };

    materials.white_plastic = {
        key: 'white_plastic',
        description: "Plastica bianca",
        previewTexture: "white_plastic_preview.png",
        load: (callback) => createStandardMaterial(callback, new THREE.Color(0.8, 0.8, 0.8), 0.04, 0.0),
        material: null
    };

    materials.fabric_leather_001 = {
        key: 'fabric_leather_001',
        description: "Ecopelle bianca 1",
        previewTexture: "FabricLeather001_preview.jpg",
        load: (callback) => createTexturedMaterial(callback, "FabricLeather001/FabricLeather001_COL.jpg", "FabricLeather001/FabricLeather001_NRM.jpg", "FabricLeather001/FabricLeather001_ROUGHNESS.jpg", 0.0),
        material: null
    };

    materials.fabric_leather_white_001 = {
        key: 'fabric_leather_white_001',
        description: "Ecopelle bianca 2",
        previewTexture: "FabricLeatherWhite001_preview.jpg",
        load: (callback) => createTexturedMaterial(callback, "FabricLeatherWhite001/FabricLeatherWhite001_COL.jpg", "FabricLeatherWhite001/FabricLeatherWhite001_NRM.jpg", "FabricLeatherWhite001/FabricLeatherWhite001_ROUGHNESS.jpg", 0.0),
        material: null
    };

    materials.fabric_leather_black_001 = {
        key: 'fabric_leather_black_001',
        description: "Ecopelle nera",
        previewTexture: "FabricLeatherBlack001_preview.jpg",
        load: (callback) => createTexturedMaterial(callback, "FabricLeatherBlack001/FabricLeatherBlack001_COL.jpg", "FabricLeatherBlack001/FabricLeatherBlack001_NRM.jpg", "FabricLeatherBlack001/FabricLeatherBlack001_ROUGHNESS.jpg", 0.0),
        material: null
    };

    materials.metal_designer_wall_steel_waves_002 = {
        key: 'metal_designer_wall_steel_waves_002',
        description: "Metallo lavorato",
        previewTexture: "MetalDesignerWallSteelWaves002_preview.jpg",
        load: (callback) => createTexturedMaterial(callback, "MetalDesignerWallSteelWaves002/MetalDesignerWallSteelWaves002_COL.jpg", "MetalDesignerWallSteelWaves002/MetalDesignerWallSteelWaves002_NRM.jpg", "MetalDesignerWallSteelWaves002/MetalDesignerWallSteelWaves002_ROUGHNESS.jpg", 1.0),
        material: null
    };

    materials.stone_marble_calacatta_004 = {
        key: 'stone_marble_calacatta_004',
        description: "Marmo",
        previewTexture: "StoneMarbleCalacatta004_preview.jpg",
        load: (callback) => createTexturedMaterial(callback, "StoneMarbleCalacatta004/StoneMarbleCalacatta004_COL.jpg", "StoneMarbleCalacatta004/StoneMarbleCalacatta004_NRM.jpg", "StoneMarbleCalacatta004/StoneMarbleCalacatta004_ROUGHNESS.jpg", 0.0),
        material: null
    };

    materials.wood_fine_007 = {
        key: 'wood_fine_007',
        description: "Legno 1",
        previewTexture: "WoodFine007_preview.jpg",
        load: (callback) => createTexturedMaterial(callback, "WoodFine007/WoodFine007_COL.jpg", "WoodFine007/WoodFine007_NRM.jpg", "WoodFine007/WoodFine007_ROUGHNESS.jpg", 0.0),
        material: null
    };

    materials.wood_fine_008 = {
        key: 'wood_fine_008',
        description: "Legno 2",
        previewTexture: "WoodFine008_preview.jpg",
        load: (callback) => createTexturedMaterial(callback, "WoodFine008/WoodFine008_COL.jpg", "WoodFine008/WoodFine008_NRM.png", "WoodFine008/WoodFine008_ROUGHNESS.jpg", 0.0),
        material: null
    };

    materials.wood_fine_009 = {
        key: 'wood_fine_009',
        description: "Legno 3",
        previewTexture: "WoodFine009_preview.jpg",
        load: (callback) => createTexturedMaterial(callback, "WoodFine009/WoodFine009_COL.jpg", "WoodFine009/WoodFine009_NRM.jpg", "WoodFine009/WoodFine009_ROUGHNESS.jpg", 0.0),
        material: null
    };

    materials.wood_fine_dark_002 = {
        key: 'wood_fine_dark_002',
        description: "Legno 4",
        previewTexture: "WoodFineDark002_preview.jpg",
        load: (callback) => createTexturedMaterial(callback, "WoodFineDark002/WoodFineDark002_COL.jpg", "WoodFineDark002/WoodFineDark002_NRM.jpg", "WoodFineDark002/WoodFineDark002_ROUGHNESS.jpg", 0.0),
        material: null
    };

    materials.wood_quartered_catseye_001 = {
        key: 'wood_quartered_catseye_001',
        description: "Legno 5",
        previewTexture: "WoodQuarteredCatseye001_preview.jpg",
        load: (callback) => createTexturedMaterial(callback, "WoodQuarteredCatseye001/WoodQuarteredCatseye001_COL.jpg", "WoodQuarteredCatseye001/WoodQuarteredCatseye001_NRM.jpg", "WoodQuarteredCatseye001/WoodQuarteredCatseye001_ROUGHNESS.jpg", 0.0),
        material: null
    };

    materials.wood_quartered_midnight_vista_002 = {
        key: 'wood_quartered_midnight_vista_002',
        description: "Legno 6",
        previewTexture: "WoodQuarteredMidnightVista002_preview.jpg",
        load: (callback) => createTexturedMaterial(callback, "WoodQuarteredMidnightVista002/WoodQuarteredMidnightVista002_COL.jpg", "WoodQuarteredMidnightVista002/WoodQuarteredMidnightVista002_NRM.jpg", "WoodQuarteredMidnightVista002/WoodQuarteredMidnightVista002_ROUGHNESS.jpg", 0.0),
        material: null
    };

    materials.wood_quartered_recchiuti_001 = {
        key: 'wood_quartered_recchiuti_001',
        description: "Legno 7",
        previewTexture: "WoodQuarteredRecchiuti001_preview.jpg",
        load: (callback) => createTexturedMaterial(callback, "WoodQuarteredRecchiuti001/WoodQuarteredRecchiuti001_COL.jpg", "WoodQuarteredRecchiuti001/WoodQuarteredRecchiuti001_NRM.jpg", "WoodQuarteredRecchiuti001/WoodQuarteredRecchiuti001_ROUGHNESS.jpg", 0.0),
        material: null
    };

    materials.wood_quartered_sunflower_seed_001 = {
        key: 'wood_quartered_sunflower_seed_001',
        description: "Legno 8",
        previewTexture: "WoodQuarteredSunflowerSeed001_preview.jpg",
        load: (callback) => createTexturedMaterial(callback, "WoodQuarteredSunflowerSeed001/WoodQuarteredSunflowerSeed001_COL.jpg", "WoodQuarteredSunflowerSeed001/WoodQuarteredSunflowerSeed001_NRM.jpg", "WoodQuarteredSunflowerSeed001/WoodQuarteredSunflowerSeed001_ROUGHNESS.jpg", 0.0),
        material: null
    };

    tap_materials.push(
        materials.chrome,
        materials.smooth_black_metal,
        materials.anodized_black_metal,
        materials.smooth_copper,
        materials.anodized_copper,
        materials.back_rubber,
        materials.back_plastic,
        materials.white_rubber,
        materials.white_plastic);

    container_materials.push(
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
        materials.wood_fine_007,
        materials.wood_fine_008,
        materials.wood_fine_009,
        materials.wood_fine_dark_002,
        materials.wood_quartered_catseye_001,
        materials.wood_quartered_midnight_vista_002,
        materials.wood_quartered_recchiuti_001,
        materials.wood_quartered_sunflower_seed_001);

    textureLoader.load(`./textures/floor_ambient_occlusion.png`, (aoMap) => {

        // In questo caso non utilizzo MeshStandardMaterial perchè questo materiale
        // mi serve solo per visualizzare l'ombra dovuta all'occlusione ambientale
        // sotto i bastoncini e al profumatore
        floor_material = new THREE.MeshBasicMaterial({
            aoMap: aoMap
        });

        callback();
    });
};

export { setupMaterials, materials, tap_materials, container_materials, sticks_materials, floor_material };