import * as THREE from '../lib/three.module.js';
import { GLTFLoader } from '../lib/GLTFLoader.js';
import { OrbitControls } from '../lib/OrbitControls.js';
import { RGBELoader } from '../lib/RGBELoader.js';
import { RoughnessMipmapper } from '../lib/RoughnessMipmapper.js';
import { setupMaterials, materials, floor_material } from './materials.js';

let scene = null;
let camera = null;
let renderer = null;
let controls = null;
let current_model_parts = {
    container: null,
    containerTopBottom: null,
    tap: null,
    sticks: null,
    floor: null
};

const init = (callback) => {
    const canvasContainer = document.getElementById("canvas-container");

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
    renderer.setClearColor(0xe8e8e8);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.physicallyCorrectLights = true;
    renderer.shadowMap.enabled = true;
    canvasContainer.appendChild(renderer.domElement);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, canvasContainer.clientWidth / canvasContainer.clientHeight, 0.1, 1000);
    camera.position.set(0, 15, 18);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 6, 0);
    controls.enablePan = false;
    controls.minDistance = 12.0;
    controls.maxDistance = 30.0;
	controls.minPolarAngle = Math.PI * 0.05;
	controls.maxPolarAngle = Math.PI / 1.8;

    setupMaterials(() => {
        new RGBELoader()
            .setDataType(THREE.UnsignedByteType)
            .setPath('textures/')
            .load('reading_room_1k.hdr', function (texture) {

                const envMap = pmremGenerator.fromEquirectangular(texture).texture;
                pmremGenerator.dispose();

                scene.environment = envMap;

                const loader = new GLTFLoader().setPath('models/');
                loader.load('profumatore_piccolo_no_mod.glb', function (gltf) {

                    gltf.scene.traverse(function (child) {
                        if (child.isMesh) {
                            if (child.material.name == "Body") {
                                current_model_parts.container = child;
                            }
                            else if(child.material.name == "BottomTop") {
                                current_model_parts.containerTopBottom = child;
                            }
                            else if(child.material.name == "Tap") {
                                current_model_parts.tap = child;
                            }
                            else if(child.material.name == "Bastoni") {
                                current_model_parts.sticks = child;
                            }
                            else if(child.material.name == "Pavimento") {
                                current_model_parts.floor = child;
                            }
                        }
                    });

                    const setupContainer = (callback) => {
                        if(materials.white_rubber.material) {
                            current_model_parts.container.material = materials.white_rubber.material;
                            current_model_parts.containerTopBottom.material = materials.white_rubber.material;

                            callback();
                        }
                        else {
                            materials.white_rubber.load((material) => {
                                materials.white_rubber.material = material;
                                current_model_parts.container.material = material;
                                current_model_parts.containerTopBottom.material = material;

                                callback();
                            });
                        }
                    };

                    const setupTap = (callback) => {
                        if(materials.smooth_black_metal.material) {
                            current_model_parts.tap.material = materials.smooth_black_metal.material;

                            callback();
                        }
                        else {
                            materials.smooth_black_metal.load((material) => {
                                materials.smooth_black_metal.material = material;
                                current_model_parts.tap.material = material;

                                callback();
                            });
                        }
                    };

                    const setupSticks = (callback) => {
                        if(materials.wood_fine_008.material) {
                            current_model_parts.sticks.material = materials.wood_fine_008.material;
                            callback();
                        }
                        else {
                            materials.wood_fine_008.load((material) => {
                                materials.wood_fine_008.material = material;
                                current_model_parts.sticks.material = material;
                                callback();
                            });
                        }
                    };

                    current_model_parts.floor.material = floor_material;
                    setupContainer(() => {
                        setupTap(() => {
                            setupSticks(() => {
                                scene.add(gltf.scene);
                                callback();
                            });
                        });
                    });
                });
            });
    });

    window.addEventListener('resize', onWindowResize, false);
    document.getElementById("rotation-button").onclick = toggleCameraAutoRotation;
}

const onWindowResize = () => {
    const canvasContainer = document.getElementById("canvas-container");

    camera.aspect = canvasContainer.clientWidth / canvasContainer.clientHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
}

const update = () => {
    requestAnimationFrame(() => { update(); });

    controls.update();

    render();
}

const render = () => {
    renderer.render(scene, camera);
}

const setupPreview = (callback) => {
    init(callback);
    update();
}

const toggleCameraAutoRotation = () => {
    controls.autoRotate = !controls.autoRotate;
}

export { setupPreview, current_model_parts };