// Source: https://codepen.io/zadvorsky/pen/qOYqGv

var scene = new THREE.Scene();
// degrees, ratio, near clicking plane and far clicking plane
var camera = new THREE.PerspectiveCamera(12, window.innerWidth / window.innerHeight, 1, 1000 );
camera.position.set(20,40,50)
camera.lookAt(scene.position)

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create shape (try to make it animated )
// width, depth, height, 
var geometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5 );
// Create material color or image texture 
var material = new THREE.MeshBasicMaterial( { color: 0xfff000 } );

// Maybe use Quaternion instead?
// https://threejs.org/docs/#api/en/math/Quaternion

var group = new THREE.Group();

up_to_down = -4.5


for (let i = 0; i < 10; i++) {
  left_to_right = -4.5
  for (let j = 0; j < 10; j++) {
    var geom = new THREE.Geometry(0.5, 0.5, 0.5);
    
    for (let k = 0; k < 100; k++) {
      var vertex = new THREE.Vector3();

      vertex.x = Math.random() * ((-0.5 + left_to_right) - (0.5 + left_to_right)) + (0.5+left_to_right);
      vertex.y = 0;
      vertex.z = Math.random() * ((-0.5 + up_to_down) - (0.5 + up_to_down)) + (0.5 + up_to_down);

      geom.vertices.push(vertex);
      
      
    }
    // scene.add( gr );
    var particles = new THREE.Points(geom, new THREE.PointsMaterial({
      color: 0xffffff
    }));
    particles.boundingSphere = 50;
    // particles.matrixAutoUpdate = false;
    // var cube_matrix = new THREE.Matrix4().makeTranslation(left_to_right, 0.0, up_to_down);
    // particles.applyMatrix4(cube_matrix);
    group.add(particles)

    // Starts at the center of the grid
    var cube = new THREE.Mesh( geometry, material );

    // // Since we have no use for position, rotation and scale
    // cube.matrixAutoUpdate = false;

    // // Only the first and last argument will be used for movement
    // // Left (-ve)/Right (+ve) is first argument
    // // Up (-ve) / Down (+ve) is last argument
    // var cube_matrix = new THREE.Matrix4().makeTranslation(left_to_right, 0.0, up_to_down);
    // cube.applyMatrix4(cube_matrix);

    // So we can change the colors later
    // group.add( cube );

    left_to_right += 1
  }  
  up_to_down += 1
}
scene.add( group );

// Create grid
var size = 10;
var divisions = 10;

var gridHelper = new THREE.GridHelper( size, divisions );
scene.add( gridHelper );

// Particle System
// https://stackoverflow.com/questions/31289577/three-js-position-particles-evenly-on-objects-faces-rather-than-verticies


group.children[0].material = group.children[0].material.clone();
group.children[0].material.color.setHex( 0xFFFFF)

// Game logic
var update = function(){
  // rotate torus each frame 
  group.children[0].matrixAutoUpdate = true;
  group.children[0].rotation.x += 0.05
  //group.rotation.x += 0.01
  //group.rotation.y += 0.0005
  //particleSystem.rotation.x += 0.0001

};

// Draw scene
var render = function(){
  
  renderer.render( scene, camera);
};

// How game will flow
// Look into it
// run game loop (update, render, repeat)
var GameLoop = function(){
  // Run every single frame
  requestAnimationFrame (GameLoop);

  update();
  render();
};

GameLoop();