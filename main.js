import './style.css'

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

 // Fancy Shapes

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xf0f0f0, wireframe: true});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

const pointLight = new THREE.PointLight(0xfafafa);
pointLight.position.set(20, 20, 20);

const ambientLight = new THREE.AmbientLight(0xfafafa);
scene.add(pointLight, ambientLight);

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.IcosahedronGeometry(0.3, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xd0d0ff});
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  
  star.position.set(x, y, z);
  scene.add(star);
}

Array(150).fill().forEach(addStar);

// adding a background
const spaceTexture = new THREE.TextureLoader().load('space2.webp');
scene.background = spaceTexture;

const akshayTexture = new THREE.TextureLoader().load('IMG_2886.jpg');

const akshay = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({map: akshayTexture})
);

scene.add(akshay);

const moonTexture = new THREE.TextureLoader().load('moonimg.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })

);

scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);

akshay.position.setZ(-5);
akshay.position.x = 2;
akshay.position.y = -1;

function moveCamera () {

  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  akshay.rotation.y += 0.01;
  akshay.rotation.z += 0.01;
  
  camera.position.x = t* -0.0002;
  camera.position.y = t* -0.0002;
  camera.position.z = t * -0.01;

}

document.body.onscroll = moveCamera;
moveCamera();

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;
  torus.rotation.z += 0.0;

  controls.update();

  renderer.render(scene, camera);
}

animate();