import * as THREE from '../lib/three.module.js';
import { GLTFLoader } from '../lib/GLTFLoader.js';
import { OrbitControls } from '../lib/OrbitControls.js';
import { RGBELoader } from '../lib/RGBELoader.js';
import { RoughnessMipmapper } from '../lib/RoughnessMipmapper.js';
import { setupMaterials } from './materials.js';

let scene = null;
let camera = null;
let renderer = null;
let controls = null;
let current_model_parts = {
    container: null,
    containerTopBottom: null,
    tap: null,
    sticks: null
};

const init = (callback) => {
    const canvasContainer = document.getElementById("canvas-container");

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
    renderer.setClearColor(0xf0f0f0);
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
    camera.position.set(0, 9, 15);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 6, 0);
    controls.enablePan = false;

    const dirLight = new THREE.DirectionalLight();
    dirLight.intensity = 1.0; // 1 lux
    dirLight.position.set(-1, 1.75, 1);
    dirLight.position.multiplyScalar(50);
    dirLight.castShadow = true;
    dirLight.shadow.camera.left = -64;
    dirLight.shadow.camera.right = 64;
    dirLight.shadow.camera.top = 64;
    dirLight.shadow.camera.bottom = -64;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    scene.add(dirLight);

    setupMaterials(() => {
        new RGBELoader()
            .setDataType(THREE.UnsignedByteType)
            .setPath('textures/')
            .load('cloud_layers_1k.hdr', function (texture) {

                var envMap = pmremGenerator.fromEquirectangular(texture).texture;
                pmremGenerator.dispose();

                var roughnessMipmapper = new RoughnessMipmapper(renderer);

                scene.environment = envMap;

                var loader = new GLTFLoader().setPath('models/');
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
                            
                            roughnessMipmapper.generateMipmaps(child.material);
                        }
                    });

                    scene.add(gltf.scene);
                    roughnessMipmapper.dispose();

                    callback();
                });
            });
    });

    window.addEventListener('resize', onWindowResize, false);
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

export { setupPreview, current_model_parts };