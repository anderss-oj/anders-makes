// PAGE SCRIPT
import $ from 'jquery';

$(document).ready(function() {
    //hover function
    function stretchOnOff(element) {
        element.hover(
            function addStretch() {
                element.addClass("fontStretch");
            },
            function removeStretch() {
                element.removeClass("fontStretch");
            }
        )
    };
    
    //header content hover
    $(".headerContent").hover(
        function addStretch() {
            $(this).addClass("fontStretch");
        },
        function removeStretch() {
            $(this).removeClass("fontStretch");
        }
    );

    //work page title hover
    stretchOnOff($(".titleText"));

    $("a").hover(
        function() {
            $(this).css("background-color", "white");
        },
        function() {
            $(this).css("background-color", "");
        }
    );
    
    $('#instruction').hover(
        function () {
            $(this).css("filter", "blur(0px)");
        },
        function () {
            $(this).css("filter", "blur(1px)");
        }
    )
});

// TONE STUFF

// making the tone sound

import * as Tone from 'tone';

class Ping {
    constructor(){
        // const autoPanner = new Tone.AutoPanner(0.5).toDestination().start();
        // const fatOsc = new Tone.FatOscillator("Cb1", "sine3", 10).connect(autoPanner).start();

        // const autoFilter = new Tone.AutoFilter({ frequency: 0.05, baseFrequency: 220, octaves: 2 }).toDestination().start();
        // const noise = new Tone.Noise({ type: "brown", volume: -20 }).connect(autoFilter).start();
        
        
        const synth = new Tone.PolySynth(Tone.Synth).toDestination();
        const now = Tone.now();
        synth.triggerAttackRelease(["D3"], '32n');
    }

    // add method for changing the note when off the intersect

}

// THREE
import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';
import Stats from 'three/addons/libs/stats.module.js';
// import * as Tone from 'tone';
// import { Ping } from '../tone/toneScript3.js';

const playButton = document.getElementById('instruction');
playButton.addEventListener('click', async () => {
    await Tone.start();
    console.log("audio is ready");
    new Ping();
});

// put everything in this web gl checker
if ( WebGL.isWebGLAvailable() ) {

// dictonaries for the work page. each object has a link and a gif preview. the gif previews are used as textures for the objects in the 3d scene.
let linkDict = {
    0 : "pages/work/machineNman.html",
    1 : "pages/work/bitRot.html",
    2 : "pages/work/terms.html",
    3 : "pages/work/beluchaga.html",
    4 : "pages/work/mashUp.html",
    5 : "pages/work/radio.html",
    6 : "pages/work/fern.html",
    7 : "pages/work/2005fordTaurus.html",
    8 : "pages/work/autoVirtual.html",
    9 : "pages/work/slowing.html",
    10 : "pages/work/m.c.Dean.html"
};

// Each object can use a video texture from an .mp4 file, with the existing gif as a fallback preview.
const textureDict = {
    0: { videoSrc: new URL('../images/documentationPics/machineNman.webm', import.meta.url).href, imageSrc: new URL('../images/documentationPics/machineNman.gif', import.meta.url).href },
    1: { videoSrc: new URL('../images/documentationPics/bitRotSmall.webm', import.meta.url).href, imageSrc: new URL('../images/documentationPics/bitRot.gif', import.meta.url).href },
    2: { videoSrc: new URL('../images/documentationPics/terms.webm', import.meta.url).href, imageSrc: new URL('../images/documentationPics/terms.gif', import.meta.url).href },
    3: { videoSrc: new URL('../images/documentationPics/beluchaga.webm', import.meta.url).href, imageSrc: new URL('../images/documentationPics/beluchaga.gif', import.meta.url).href },
    4: { videoSrc: new URL('../images/documentationPics/mashUp.webm', import.meta.url).href, imageSrc: new URL('../images/documentationPics/mashUp.gif', import.meta.url).href },
    5: { videoSrc: new URL('../images/documentationPics/radio.webm', import.meta.url).href, imageSrc: new URL('../images/documentationPics/radio.gif', import.meta.url).href },
    6: { videoSrc: new URL('../images/documentationPics/fern.webm', import.meta.url).href, imageSrc: new URL('../images/documentationPics/fern.gif', import.meta.url).href },
    7: { videoSrc: new URL('../images/documentationPics/2005fordTaurus.webm', import.meta.url).href, imageSrc: new URL('../images/documentationPics/2005fordTaurus.gif', import.meta.url).href },
    8: { videoSrc: new URL('../images/documentationPics/autoVirtual.webm', import.meta.url).href, imageSrc: new URL('../images/documentationPics/autoVirtual.gif', import.meta.url).href },
    9: { videoSrc: new URL('../images/documentationPics/slowingArchive.webm', import.meta.url).href, imageSrc: new URL('../images/documentationPics/slowingArchive.gif', import.meta.url).href },
    10: { videoSrc: new URL('../images/documentationPics/slowingSculpture.webm', import.meta.url).href, imageSrc: new URL('../images/documentationPics/slowingSculpture.gif', import.meta.url).href }
};
// Dictionary for all of the project page links that each object can navigate to.

let stats
// stats is unnecessary, but shows framerate and stuff
    
let camera, scene, raycaster, renderer;
// required variables

let theta = 0;
// THETA: the symbol for the measure of an angle. in our case storing the angle of the camera.
let INTERSECTED;

// Treat devices as touch-like when they cannot hover or do not expose a fine pointer/mouse.
const hasHoverCapability = window.matchMedia('(hover: hover)').matches;
const hasMouseCapability = window.matchMedia('(pointer: fine)').matches ||
    window.matchMedia('(any-pointer: fine)').matches;
const hasTouchInput = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
const isTouchDevice = window.matchMedia('(pointer: coarse)').matches ||
    window.matchMedia('(hover: none)').matches ||
    window.matchMedia('(pointer: none)').matches ||
    (hasTouchInput && (!hasHoverCapability || !hasMouseCapability));
const pointer = new THREE.Vector2();
const radius = 25;
const frustumSize = 50;
// FRUSTUM: the portion of a cone or pyramid which remains after its upper part has been cut off by a plane parallel to its base

init();
animate();

function attachTextureToMaterial(material, textureInfo, textureLoader) {
    // Start with the GIF texture so the object always has a valid visual source.
    const fallbackTexture = textureLoader.load(textureInfo.imageSrc);
    fallbackTexture.colorSpace = THREE.SRGBColorSpace;
    fallbackTexture.minFilter = THREE.LinearFilter;
    fallbackTexture.magFilter = THREE.LinearFilter;
    fallbackTexture.wrapS = THREE.ClampToEdgeWrapping;
    fallbackTexture.wrapT = THREE.ClampToEdgeWrapping;

    material.map = fallbackTexture;
    material.needsUpdate = true;

    // If an webm is available and can play, swap in a video texture.
    const video = document.createElement('video');
    video.src = textureInfo.videoSrc;
    video.crossOrigin = 'anonymous';
    video.loop = true;
    video.muted = true;
    video.autoplay = true;
    video.playsInline = true;
    video.load();

    video.addEventListener('canplaythrough', () => {
        video.play().catch(() => {});

        const videoTexture = new THREE.VideoTexture(video);
        videoTexture.colorSpace = THREE.SRGBColorSpace;
        videoTexture.minFilter = THREE.LinearFilter;
        videoTexture.magFilter = THREE.LinearFilter;
        videoTexture.wrapS = THREE.ClampToEdgeWrapping;
        videoTexture.wrapT = THREE.ClampToEdgeWrapping;

        material.map = videoTexture;
        material.needsUpdate = true;
    });

    video.addEventListener('error', () => {
        // Keep the fallback GIF texture if the webm cannot be played.
        material.map = fallbackTexture;
        material.needsUpdate = true;
    });
}

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
    // Creates the box outline/vectors for each mesh. The geometry is reused for every object.

    // Create a loader that can pull image textures into the scene from the local asset folder.
    const textureLoader = new THREE.TextureLoader();

    for ( let i = 0; i < (Object.keys(linkDict).length); i ++) {
        // Loop once for each project entry so every box gets its own texture and link.

        // Pick the matching texture source for this object index, or fall back to the first entry.
        const textureInfo = textureDict[i] || textureDict[0];

        // Start with the GIF texture and switch to a video texture only if the webm loads successfully.
        const material = new THREE.MeshToonMaterial();
        attachTextureToMaterial(material, textureInfo, textureLoader);

        const object = new THREE.Mesh(geometry, material);
        // Create the visible mesh using the textured material.

        object.position.x = Math.random() * 40 - 20;
        object.position.y = Math.random() * 40 - 20;
        object.position.z = Math.random() * 40 - 20;
        // gives object random position coordinates

        object.rotation.x = Math.random() * 2 * Math.PI;
        object.rotation.y = Math.random() * 2 * Math.PI;
        object.rotation.z = Math.random() * 2 * Math.PI;
        // gives object random rotation coordinates, based on multiple of pi?

        // Make the boxes slightly easier to hit on touch screens without changing desktop sizing.
        const mobileScaleBoost = isTouchDevice ? 1.2 : 1;
        object.scale.x = (Math.random() + 5) * mobileScaleBoost;
        object.scale.y = (Math.random() + 4) * mobileScaleBoost;
        object.scale.z = (Math.random() + 5) * mobileScaleBoost;
        // gives object random size. object will be at least 0.5 big

        // Store the destination URL on the object so it can be opened when clicked.
        object.userData = { URL: linkDict[i]};

        scene.add(object);
        // Add the completed object to the scene.
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

    if (isTouchDevice) {
        // Mobile and tablet devices use tap handling instead of hover-based interaction.
        document.addEventListener('touchstart', onTouchStart, { passive: false });
        console.log('touch device detected');
    } else {
        document.addEventListener( 'pointermove', onPointerMove );
        // listens for pointer to move

        document.addEventListener('click', objectClick, false);
                // listens for mouse click
    }

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

function onTouchStart(event) {
    if (!isTouchDevice || event.touches.length === 0) return;

    // Convert the tap position into a 3D raycast point.
    const touch = event.touches[0];
    const touchX = (touch.clientX / window.innerWidth) * 2 - 1;
    const touchY = -(touch.clientY / window.innerHeight) * 2 + 1;

    const touchPoint = new THREE.Vector2(touchX, touchY);
    raycaster.setFromCamera(touchPoint, camera);

    const intersects = raycaster.intersectObjects(scene.children, false);

    if (intersects.length > 0) {
        const selectedObject = intersects[0].object;

        // Clear the previous highlight before applying a new one.
        if (INTERSECTED && INTERSECTED !== selectedObject) {
            INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
        }

        INTERSECTED = selectedObject;
        INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
        INTERSECTED.material.emissive.setHex(0xff0000);

        // Give the tap a brief moment to feel intentional before navigating.
        Tone.start();
        new Ping();
        event.preventDefault();

        setTimeout(() => {
            window.location.href = selectedObject.userData.URL;
        }, 180);
    }
}

function objectClick() {
    if (INTERSECTED) {
        window.location.href = INTERSECTED.userData.URL;
        console.log('clicked');
    }
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
            
            if ( !isTouchDevice ) {
                Tone.start();
                new Ping();
            }
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