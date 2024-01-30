import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();

const loader = new THREE.CubeTextureLoader();
loader.setPath('textures/');

const textureCube = loader.load([
    'space-texture.jpg', 'space-texture.jpg',
    'space-texture.jpg', 'space-texture.jpg',
    'space-texture.jpg', 'space-texture.jpg'
]);

scene.background = textureCube

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 5);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement)
controls.update();

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
light.castShadow = true;
scene.add(light);

const light1 = new THREE.DirectionalLight(0xffffff, 1);
light1.position.set(-5, -5, -5);
light1.castShadow = true;
scene.add(light1);

const texture = new THREE.TextureLoader().load("textures/world-map.jpg");

const geometry2 = new THREE.SphereGeometry(3, 50, 50);
const material2 = new THREE.MeshPhongMaterial({color: 0xffffff, map: texture});
const torusKnot = new THREE.Mesh(geometry2, material2);

scene.add(torusKnot);

function animate() {
    requestAnimationFrame(animate);

    torusKnot.rotation.y += 0.003;

    controls.update();

    renderer.render(scene, camera);
}

animate();