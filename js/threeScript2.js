// THREE
import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';
import Stats from 'three/addons/libs/stats.module.js';
import * as Tone from 'tone';
import { Ping } from './toneScript3.js';

const playButton = document.getElementById('play');
playButton.addEventListener('click', async () => {
    await Tone.start();
    console.log("audio is ready");
    new Ping();
});

// put everything in this web gl checker
if ( WebGL.isWebGLAvailable() ) {

let stats
// stats is unnecessary, but shows framerate and stuff
    
let camera, scene, raycaster, renderer;
// required variables

let theta = 0;
// THETA: the symbol for the measure of an angle. in our case storing the angle of the camera.
let INTERSECTED;

const pointer = new THREE.Vector2();
const radius = 25;
const frustumSize = 50;
// FRUSTUM: the portion of a cone or pyramid which remains after its upper part has been cut off by a plane parallel to its base

init();
animate();

function init() {
        
    // setup camera and aspect ratio
    const aspect = window.innerWidth / window.innerHeight;
    camera = new THREE.OrthographicCamera(frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, 0.1, 1000)

    // setup scene
    scene = new THREE.Scene();
    // changes background color
    scene.background = new THREE.Color(0xffeeee05);
    
    // sets up light
    
    const light = new THREE.DirectionalLight (0xFFFDD0, 3) 
    // color of light, intensity of light 
    
    light.position.set(1, 1, 1).normalize();
    // x, y, z values of the position. normalizing is like making it a unit? 
    
    scene.add(light);
    // adds light source and settings to our scene

    const geometry = new THREE.BoxGeometry();
    // creates the box outline/vectors (not the faces, just the corners)

    for ( let i = 0; i < 50; i ++) {
        // for loop loops until 2000 shapes made

        const object = new THREE.Mesh (geometry, new THREE.MeshLambertMaterial( {color: Math.random() * 0xffffff}));
        // creates mesh with random color, uses 'geometry' const we defined earlier

        object.position.x = Math.random() * 40 - 20;
        object.position.y = Math.random() * 40 - 20;
        object.position.z = Math.random() * 40 - 20;
        // gives object random position coordinates

        object.rotation.x = Math.random() * 2 * Math.PI;
        object.rotation.y = Math.random() * 2 * Math.PI;
        object.rotation.z = Math.random() * 2 * Math.PI;
        // gives object random rotation coordinates, based on multiple of pi?

        object.scale.x = Math.random() + 1;
        object.scale.y = Math.random() + 1;
        object.scale.z = Math.random() + 1;
        // gives object random size. object will be at least 0.5 big

        scene.add (object);
        // adds object to the scene, loop restarts
    }

    // setup raycaster
    // raycaster acts like a laser pointed at the scene, a laser pointed directly from mouse. useful for selecting/highlighting objects
    
    raycaster = new THREE.Raycaster();
    // create raycaster

    renderer = new THREE.WebGLRenderer( {antialias: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    // create renderer, set its size, add it to the html

    // stats = new Stats();
    // document.body.appendChild( stats.dom );
    // adds stats display to html. its like framerate and such

    document.addEventListener( 'pointermove', onPointerMove );
    // listens for pointer to move

    window.addEventListener('resize', onWindowResize);
    // resize window listener
}

function onWindowResize() {
    // console.log('tried to resize');
    const aspect = window.innerWidth / window.innerHeight;
    // grabs aspect ratio at the moment

    camera.left = - frustumSize * aspect /2;
    camera.right = frustumSize * aspect /2;
    camera.top = frustumSize /2;
    camera.bottom = -frustumSize /2;
    // adjusts ?

    camera.updateProjectionMatrix();


    renderer.setSize( window.innerWidth, window.innerHeight);
    // resets render size
}

function onPointerMove (event) {
    pointer.x = (event.clientX / window.innerWidth ) *2 -1;
    pointer.y = - (event.clientY / window.innerHeight ) *2 +1;
    // tracks pointer position. '.clientX', '.clientY' return pointer position. not sure why the plus 1, minus 1 times 2?
}

function animate() {
    requestAnimationFrame(animate);

    render();
    // statsbar.update();
    // not sure, don't really need stats i feel
}

function render() {
    theta += 0.1;
    // increments the angle of the camera
    
    camera.position.x = radius * Math.sin( THREE.MathUtils.degToRad(theta));
    camera.position.y = radius * Math.sin( THREE.MathUtils.degToRad( theta ) );			
    camera.position.z = radius * Math.cos( THREE.MathUtils.degToRad( theta ) );
    // sets posittions base off of the theta value

    camera.lookAt( scene.position );

    camera.updateMatrixWorld();

    // finds intersections in the raycaster
    raycaster.setFromCamera(pointer, camera);

    const intersects= raycaster.intersectObjects(scene.children, false);
    // method to determine the objects intersecting with the mouse

    if ( intersects.length > 0 ) {
        // intersect detection. if there is an element in the array. the intersects variable is an array.
        if ( INTERSECTED != intersects[ 0 ].object ) {
            // checks to see if the intersected object is a new one. '[ 0 ]' indicates first element/object in an array

            if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
            // from chatgpt: 'If INTERSECTED is truthy (i.e., it's not null or undefined), it resets the material of the previously intersected object to its original color. This is done to revert the visual indication of the previous intersection'

            INTERSECTED = intersects[ 0 ].object;
            INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
            INTERSECTED.material.emissive.setHex( 0xff0000 );
            // 1. sets the new object as the intersected object. 2. 'currentHex' is assigned value of object's emissive material. 3. sets the emissive material to a new color (white in this case), to indicate it is being hovered over.
            
            Tone.start();
            console.log("audio is ready");
            new Ping();
            // console.log('intersected, and setHex to white');
        }

    } else {

        if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );

        INTERSECTED = null;
    }

    renderer.render(scene, camera);

}

} else {

    const warning = WebGL.getWebGLErrorMessage();
    
    // change this depending on the container
    document.getElementById( 'container' ).appendChild( warning );

};