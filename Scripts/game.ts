// MAIN GAME FILE
// game.ts 
// Derek Wong
// Last Modified By: Derek Wong
// Date Last Modified: 2/7/2016
// Displays the game objects
/*Revision History
  2/10/2016- Added Planet #1 And Moon#1
           - Added Rotation to Moon
           - Added Gulp Automation  
  2/8/2016 - Added cube mesh(sun)
           - Added parentCube mesh to control the orbit of planet #1
  2/7/2016 - Initialized Project
*/

//import
import Scene = THREE.Scene;
import Renderer = THREE.WebGLRenderer;
import PerspectiveCamera = THREE.PerspectiveCamera;
import BoxGeometry = THREE.BoxGeometry;
import CubeGeometry = THREE.CubeGeometry;
import PlaneGeometry = THREE.PlaneGeometry;
import SphereGeometry = THREE.SphereGeometry;
import AxisHelper = THREE.AxisHelper;
import LambertMaterial = THREE.MeshLambertMaterial;
import MeshBasicMaterial = THREE.MeshBasicMaterial;
import Mesh = THREE.Mesh;
import SpotLight = THREE.SpotLight;
import Control = objects.Control;
import GUI = dat.GUI;
import Color = THREE.Color;
import Vector3 = THREE.Vector3;

//Define attributes
var scene: Scene;
var renderer: Renderer;
var camera: PerspectiveCamera;
var cubeGeometry: CubeGeometry;
var planeGeometry: PlaneGeometry;
var sphereGeometry: SphereGeometry;
var cubeMaterial: LambertMaterial;
var planeMaterial: LambertMaterial;
var sphereMaterial: LambertMaterial;
var axes:AxisHelper;
var cube: Mesh;
var moon: Mesh;
var planet: Mesh;
var planetParent: Mesh;
var parentCube:Mesh;
var plane: Mesh;
var group: Mesh;
var sphere: Mesh;
var spotLight: SpotLight;

// Initialize Control 
var control: Control;
var gui: GUI;
var stats:Stats;
var step:number = 0;

function init() {
    // Instantiate a new Scene object
	scene = new Scene();
	
	setupRenderer(); // setup the default renderer
	
	setupCamera(); // setup the camera
	
    // add an axis helper to the scene
    axes = new AxisHelper(20);
    scene.add(axes);
    
        
    
   
    
    //parentCube is a cube mesh that will control 1 planet orbit 
	
    cubeGeometry = new BoxGeometry(1, 1, 1);
    cubeMaterial = new THREE.MeshLambertMaterial({color: 0x0000ff, transparent: true, opacity: 1});
    parentCube = new Mesh(cubeGeometry,cubeMaterial);
    parentCube.position.x = 0;
    parentCube.position.y = 0;
    parentCube.position.z = 0;
    scene.add(parentCube);
    
    //planetParent is a cube mesh that will control 1 moon orbit
    cubeGeometry = new BoxGeometry(1, 1, 1);
    cubeMaterial = new THREE.MeshLambertMaterial({color: 0x0000ff, transparent: true, opacity: 1});
    planetParent = new Mesh(cubeGeometry,cubeMaterial);
    planetParent.position.x = 20;
    planetParent.position.y = 0;
    planetParent.position.z = 0;
    parentCube.add(planetParent);
    //Child Cube
    
    //Sun  
	cubeGeometry = new BoxGeometry(4, 6, 8);
	cubeMaterial = new LambertMaterial({color:0xFF0000});
	cube = new Mesh(cubeGeometry, cubeMaterial);    
	cube.castShadow = true;
    cube.position.x = 0;
    cube.position.y = 0;
    cube.position.z = 0;
    scene.add(cube);
   
    
	
    //Planet #1
	cubeGeometry = new BoxGeometry(3, 3, 3);
	cubeMaterial = new LambertMaterial({color:0xBB0000});
	planet = new Mesh(cubeGeometry, cubeMaterial);    
	planet.castShadow = true;
    planet.position.x = 20;
    planet.position.y = 0;
    planet.position.z = 0;
    parentCube.add(planet);
    
    //Moon of planet #1
    cubeGeometry = new BoxGeometry(2, 2, 2);
	cubeMaterial = new LambertMaterial({color:0xDD0000});
	moon = new Mesh(cubeGeometry, cubeMaterial);    
	moon.castShadow = true;
    moon.position.x = 4;
    moon.position.y = 0;
    moon.position.z = 0;
    planetParent.add(moon);
    
   
	
           
	// Add a SpotLight to the scene
	spotLight = new SpotLight(0xbdbd1e);
	spotLight.position.set (-40, 30, -10);
	spotLight.castShadow = true;
	scene.add(spotLight);
	console.log("Added Spot Light to Scene");
	
    //Add Ambient Light to the scene
    var light = new THREE.AmbientLight( 0x404040 ); 
    scene.add( light );
    
    // Initialize GUI controls
	gui = new GUI();
	control = new Control(0,0,0);
	addControl(control);
    
    // Add framerate stats
    addStatsObject();
    
	document.body.appendChild(renderer.domElement);
	gameLoop(); // render the scene	
}

// Add control to scene
function addControl(controlObject: Control):void {
	gui.add(controlObject, 'rotateXAxis', 0, 1);
	gui.add(controlObject, 'rotateYAxis', 0, 1);
    gui.add(controlObject, 'rotateZAxis', 0, 1);
}

// Add Stats to scene
function addStatsObject() {
	stats = new Stats();
	stats.setMode(0);
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.left = '0px';
	stats.domElement.style.top = '0px';
	document.body.appendChild(stats.domElement);
}

/* Setup main game loop
    -Handle planet and moon orbit
    -Hanlde Lighting
    -Handle Camera
 */
function gameLoop():void {
	stats.update();
	
    //animate Parent Cube in x, y ,z axis
     parentCube.rotation.y+= 0.01;
     planetParent.rotation.z+=0.01;
     
     
     
   
    
    
       
	
	requestAnimationFrame(gameLoop);
	
    
	renderer.render(scene, camera);
}

// Setup default renderer
function setupRenderer():void {
	renderer = new Renderer();
	renderer.setClearColor(0xEEEEEE, 1.0);
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMapEnabled = true;
	
}

// Setup main camera for the scene
function setupCamera():void {
	camera = new PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
	camera.position.x =-30;
	camera.position.y = 40;
	camera.position.z = 30;
	camera.lookAt(scene.position);
	
}

