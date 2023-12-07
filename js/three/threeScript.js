// THREE
import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';

// put everything in this web gl checker
if ( WebGL.isWebGLAvailable() ) {

	// Create a scene
    const scene = new THREE.Scene();

    // Create a camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Create a renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    // adds render in the class 'box'
    // document.querySelector('.box').appendChild(renderer.domElement);
    document.body.appendChild(renderer.domElement);

    // Create a cube
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 2;

    // Render the scene
    const animate = () => {
        requestAnimationFrame(animate);

        // Rotate the cube
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        renderer.render(scene, camera);
    };

    // Handle window resize
    window.addEventListener('resize', () => {
        const newWidth = window.innerWidth;
        const newHeight = window.innerHeight;

        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(newWidth, newHeight);
    });

    // Start the animation loop
    animate();

} else {

	const warning = WebGL.getWebGLErrorMessage();
    
	// change this depending on the container
    document.getElementById( 'container' ).appendChild( warning );

}

