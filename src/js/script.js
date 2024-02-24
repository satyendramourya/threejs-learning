console.log("initializing script.js");

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as dat from '../../node_modules/dat.gui/build/dat.gui.module.js';

const renderer = new THREE.WebGLRenderer(); // create a space to render

// ==============================================================
const gui = new dat.GUI();
// ==============================================================


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

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);


// axis individually
// camera.position.z = 5; // set the camera position 
// camera.position.y = 2; // set the camera position

// set position of the camera all axis at once
camera.position.set(-10, 30, 30);
orbit.update();


// create a box
const boxGeometry = new THREE.BoxGeometry(1, 1); // create a box geometry
const boxMaterial = new THREE.MeshBasicMaterial({ color: "#4775d1" }); // create a material
const box = new THREE.Mesh(boxGeometry, boxMaterial); // create a mesh
scene.add(box); // add the box to the scene
box.position.set(10, 5, 0);


// create a plane
const planeGeometry = new THREE.PlaneGeometry(30, 30,); // create a box geometry
const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFFFF, side: THREE.DoubleSide }); // create a material
const plane = new THREE.Mesh(planeGeometry, planeMaterial); // create a mesh
scene.add(plane); // add the box to the scene
plane.rotation.x = -0.5 * Math.PI;

const gridhelper = new THREE.GridHelper(30,);
scene.add(gridhelper);


// create a sphere =============================================
const sphereGeometry = new THREE.SphereGeometry(4,20,20); // create a box geometry
const sphereMaterial = new THREE.MeshBasicMaterial({ color: "#ff0000", wireframe: false }); // create a material
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial); // create a mesh
scene.add(sphere); // add the box to the scene
// sphere.position.x = 5;
sphere.position.set(0, 10, 0);
//=============================================================


// ==============================================================

let step = 0;
// let speed = 0.01;
let direction = false;

const options = {
    sphereColor: "#ffea00",
    wireframe: false,
    speed: 0.01
}

gui.addColor(options, "sphereColor").onChange((color) => { 
    sphereMaterial.color.set(color);
    boxMaterial.color.set(color);
});

gui.add(options, "wireframe").onChange((wireframe) => {
    sphere.material.wireframe = wireframe;
    box.material.wireframe = wireframe;
});

gui.add(options, "speed", 0.01, 0.1);

// ==============================================================

function animate() {
    //rotating the box ------------------------------------- 
    box.rotation.x += 0.01; // rotate the box
    box.rotation.y += 0.01; // rotate the box
    box.rotation.z += 0.01; // rotate the box

    //rotating the sphere -------------------------------------
    sphere.rotation.x += 0.01; // rotate the sphere
    sphere.rotation.y += 0.01; // rotate the sphere
    sphere.rotation.z += 0.01; // rotate the sphere
    
    //bounce the sphere-------------------------------------
    step += options.speed;
    sphere.position.y = 10 * Math.abs(Math.sin(step));

    // if (direction) {
    //     sphere.position.y = 10 * Math.abs(Math.sin(step));
    //     sphere.position.x = 10 * Math.abs(Math.sin(step));
    //     setTimeout(() => { direction = false }, 5220);
    //     // direction = false;
    // } else {
    //     sphere.position.y = 10 * Math.abs(Math.sin(step));
    //     sphere.position.x = -10 * Math.abs(Math.sin(step));
    //     setTimeout(() => { direction = true }, 5220);
    //     // direction = true;
    // }


    // render the scene with the camera -------------------------------------
    renderer.render(scene, camera); 
}

renderer.setAnimationLoop(animate); // render the scene with the camera



// render the scene with the camera
// renderer.render(scene, camera);