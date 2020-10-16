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

var group = new THREE.Group();

up_to_down = -4.5

for (let i = 0; i < 10; i++) {
  left_to_right = -4.5
  for (let j = 0; j < 10; j++) {

    // Starts at the center of the grid
    var cube = new THREE.Mesh( geometry, material );

    // Since we have no use for position, rotation and scale
    cube.matrixAutoUpdate = false;

    // Only the first and last argument will be used for movement
    // Left (-ve)/Right (+ve) is first argument
    // Up (-ve) / Down (+ve) is last argument
    var cube_matrix = new THREE.Matrix4().makeTranslation(left_to_right, 0.0, up_to_down);
    cube.applyMatrix4(cube_matrix);

    // So we can change the colors later
    group.add( cube );

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

// // Create Grid
// var size = 15, step = 3;

// var geom = new THREE.Geometry();
// var mat = new THREE.LineBasicMaterial({color: 'white'})

// for (let i =  - size; i <= size; i += step) {
//   geom.vertices.push(new THREE.Vector3(- size, - 0.04, i));
//   geom.vertices.push(new THREE.Vector3(size, -0.04, i));

//   geom.vertices.push(new THREE.Vector3(i, -0.04, - size));
//   geom.vertices.push(new THREE.Vector3(i, -0.04, size));
  
// }

// var line = new THREE.Line(geom, mat, THREE.LineSegments)
// scene.add( line );

// Change position of camera
// camera.position.z = 50;



// Change color of first mesh
group.children[0].material = group.children[0].material.clone();
group.children[0].material.color.setHex( 0xFFFFF)

// Game logic
var update = function(){
  // rotate torus each frame 
  group.children[0].matrixAutoUpdate = true;
  group.children[0].rotation.x += 0.05
  //group.rotation.x += 0.01
  //group.rotation.y += 0.0005
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