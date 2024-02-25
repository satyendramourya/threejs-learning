console.log("initializing script.js");

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as dat from '../../node_modules/dat.gui/build/dat.gui.module.js';

const renderer = new THREE.WebGLRenderer(); // create a space to render

// ==============================================================
const gui = new dat.GUI();
// ==============================================================



renderer.shadowMap.enabled = true; // enable shadow
renderer.setSize(window.innerWidth, window.innerHeight); // set the size of the renderer

document.body.appendChild(renderer.domElement); // add the renderer to the body

const scene = new THREE.Scene(); // create a scene

//set the camera
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const orbit = new OrbitControls(camera, renderer.domElement);

// const axesHelper = new THREE.AxesHelper(5);
// scene.add(axesHelper);


// axis individually
// camera.position.z = 5; // set the camera position
// camera.position.y = 2; // set the camera position

// set position of the camera all axis at once

let cameraPosition = {
    x: -60,
    y: 20,
    z: 30
}

camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);

function updateCameraPosition() {
    camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
    orbit.update();
}

let cameraFolder = gui.addFolder("Camera Position");
cameraFolder.add(cameraPosition, 'x', -100, 100).onChange(updateCameraPosition);
cameraFolder.add(cameraPosition, 'y', -100, 100).onChange(updateCameraPosition);
cameraFolder.add(cameraPosition, 'z', -100, 100).onChange(updateCameraPosition);


orbit.update();


// create a box
const boxGeometry = new THREE.BoxGeometry(); // create a box geometry
const boxMaterial = new THREE.MeshBasicMaterial({color: 0x00FF00}); // create a material
const box = new THREE.Mesh(boxGeometry, boxMaterial); // create a mesh
scene.add(box); // add the box to the scene


// create a plane
const planeGeometry = new THREE.PlaneGeometry(30, 30,); // create a box geometry
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, side: THREE.DoubleSide }); // create a material
const plane = new THREE.Mesh(planeGeometry, planeMaterial); // create a mesh
scene.add(plane); // add the box to the scene
plane.rotation.x = -0.5 * Math.PI;
plane.receiveShadow = true;

// const gridHelper = new THREE.GridHelper(30,);
// scene.add(gridHelper);


// create a sphere =============================================
const sphereGeometry = new THREE.SphereGeometry(4, 50, 50); // create a box geometry
const sphereMaterial = new THREE.MeshStandardMaterial({ color: "#ff0000", wireframe: false }); // create a material
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial); // create a mesh
sphere.castShadow = true;
let spherePosition = {
    x: -10,
    y: 10,
    z: 0
}

sphere.position.setX(spherePosition.x);
sphere.position.setY(spherePosition.y);
sphere.position.setZ(spherePosition.z);

scene.add(sphere); // add the box to the scene
// sphere.position.x = 5;

let sphereFolder = gui.addFolder("Sphere Position");
sphereFolder.add(spherePosition, 'x', -20, 20).onChange(() => {
    sphere.position.set(spherePosition.x, spherePosition.y, spherePosition.z);
    orbit.update();
});
sphereFolder.add(spherePosition, 'y', -20, 20).onChange(() => {
    sphere.position.set(spherePosition.x, spherePosition.y, spherePosition.z);
    orbit.update();
});
sphereFolder.add(spherePosition, 'z', -20, 20).onChange(() => {
    sphere.position.set(spherePosition.x, spherePosition.y, spherePosition.z);
    orbit.update();
});


orbit.update();
//=============================================================


// light ==============================================================
// const ambientLight = new THREE.AmbientLight(0xffffff);
// scene.add(ambientLight);


// directional light ==============================================
// const directionLight = new THREE.DirectionalLight(0xFFFFFF, 0.8);
// scene.add(directionLight);
// directionLight.position.set(30, 20, 0);
// directionLight.castShadow = true;
// directionLight.shadow.camera.bottom = -10;
// directionLight.shadow.camera.top = 10;
// directionLight.shadow.camera.left = -20;
// directionLight.shadow.camera.right = 20;

// const directionLightHelper = new THREE.DirectionalLightHelper(directionLight, 5);
// scene.add(directionLightHelper);

// // tells the light to cast shadow (area of the shadow)
// const dlightShadowHelper = new THREE.CameraHelper(directionLight.shadow.camera);
// scene.add(dlightShadowHelper);

// ==============================================================
const spotLight = new THREE.SpotLight(0xFFFFFF);
scene.add(spotLight);
spotLight.position.set(-100, 100, 0);
spotLight.castShadow = true;
spotLight.angle = 0.2;

// const sLightHelper = new THREE.SpotLightHelper(spotLight);
// scene.add(sLightHelper);

// ==============================================================


// Fog (color, near, far)==============================================================
//scene.fog = new THREE.Fog(0xFFFFFF, 1, 200);
scene.fog = new THREE.FogExp2(0xFFFFFF, 0.01);
// renderer.setClearColor(0xFFEA00);
// ==============================================================

let step = 0;
// let speed = 0.01;
let direction = false;

const options = {
    sphereColor: "#ffea00",
    wireframe: false,
    speed: 0.01,
    angle: 0.2,
    penumbra: 0,
    intensity: 1,

}

gui.addColor(options, "sphereColor").onChange((color) => { 
    sphereMaterial.color.set(color);
});

gui.add(options, "wireframe").onChange((wireframe) => {
    sphere.material.wireframe = wireframe;
    box.material.wireframe = wireframe;
});

gui.add(options, "speed", 0, 1);
gui.add(options, "angle", 0, 1);
gui.add(options, "penumbra", 0, 1);
gui.add(options, "intensity", 0, 1);

// ==============================================================

//catch the mouse move event
const mousePosition = new THREE.Vector2();

window.addEventListener("mousemove", (event) => { 
    mousePosition.x = (event.clientX / window.innerWidth) * 2 - 1;
    mousePosition.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

const rayCaster = new THREE.Raycaster();

const sphereId = sphere.id;




// ==============================================================

function animate() {
    //rotating the box ------------------------------------- 
    // box.rotation.x += 0.01; // rotate the box
    // box.rotation.y += 0.01; // rotate the box
    // box.rotation.z += 0.01; // rotate the box

    //rotating the sphere -------------------------------------
    // sphere.rotation.x += 0.01; // rotate the sphere
    // sphere.rotation.y += 0.01; // rotate the sphere
    // sphere.rotation.z += 0.01; // rotate the sphere
    
    //bounce the sphere-------------------------------------
    step += options.speed;
    sphere.position.y = spherePosition.y * Math.abs(Math.sin(step));

    // if (direction) {
    //     sphere.position.y = 10 * Math.abs(Math.sin(step));
    //     // sphere.position.x = 10 * Math.abs(Math.sin(step));
    //     sphere.position.z = 10 * Math.abs(Math.sin(step));
    //     setTimeout(() => { direction = false }, 5220);
    //     // direction = false;
    // } else {
    //     sphere.position.y = 10 * Math.abs(Math.sin(step));
    //     // sphere.position.x = -10 * Math.abs(Math.sin(step));
    //     sphere.position.z = -10 * Math.abs(Math.sin(step));
    //     setTimeout(() => { direction = true }, 5220);
    //     // direction = true;
    // }

    spotLight.angle = options.angle;
    spotLight.penumbra = options.penumbra;
    spotLight.intensity = options.intensity;
    // sLightHelper.update();


    // rayCaster.setFromCamera(mousePosition, camera);
    // const intersects = rayCaster.intersectObjects(scene.children, true);
    // console.log(intersects);

    // // change ther color of the intersected object
    // for (let i = 0; i < intersects.length; i++) {
    //     if (intersects[i].object.id === sphereId) {
    //         intersects[i].object.material.color.set(0x00ff00);
    //     }
    // }


    // render the scene with the camera -------------------------------------
    renderer.render(scene, camera); 
}

renderer.setAnimationLoop(animate); // render the scene with the camera



// render the scene with the camera
// renderer.render(scene, camera);