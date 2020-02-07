var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

/*
request the JSON and once received execute the function funct

in: url, url of the json file
    funct, function to be executed using the resulting JSON
*/
function actOnJSON(url,funct){
  fetch(url).then((result)=>result.json()).then((result)=>funct(result));
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

let photos = [] //list of the geometry representing pictures
/*
Draw the images on the "wall" in 3D using Three.js

in: imagesPositionsJson, the GeoJSON containing the polygon representing the images on the wall.
*/
function renderImages(imagesPositionsJson){
  imagesPositionsJson.features.forEach((feature)=>{
    console.log(feature.geometry.coordinates[0][0]);
    let x1 = feature.geometry.coordinates[0][0][0][0]; let y1 = feature.geometry.coordinates[0][0][0][1];
    let x2 = feature.geometry.coordinates[0][0][1][0]; let y2 = feature.geometry.coordinates[0][0][1][1];
    let x3 = feature.geometry.coordinates[0][0][2][0]; let y3 = feature.geometry.coordinates[0][0][2][1];
    let x4 = feature.geometry.coordinates[0][0][3][0]; let y4 = feature.geometry.coordinates[0][0][3][1];

    var geo=new THREE.Geometry();
    geo.vertices.push(
        new THREE.Vector3(x1,y1,-feature.properties.id),//vertex0
        new THREE.Vector3(x2,y2,-feature.properties.id),//1
        new THREE.Vector3(x3,y3,-feature.properties.id),//2
        new THREE.Vector3(x4,y4,-feature.properties.id)//3
        );
    geo.faces.push(
        new THREE.Face3(2,1,0),//use vertices of rank 2,1,0
        new THREE.Face3(3,2,0)//vertices[3],1,2...
        );
        var material = new THREE.MeshBasicMaterial( { color: getRandomColor()  } );
        var photo = new THREE.Mesh( geo, material );
        photos.push(photo);
        scene.add( photo );
  })

}
camera.position.z = 5;

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
actOnJSON("Data/1_14.geojson",renderImages)
camera.position.set( 328, -1604, 500 );
//camera.rotation.y = 90 * Math.PI / 180
//camera.rotation.set(0,0,-Math.PI/2)
camera.lookAt(328,-1604,-11)
// controls = new THREE.OrbitControls( camera, renderer.domElement );
//
// 				//controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)
//
// 				controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
// 				controls.dampingFactor = 0.05;
//
// 				controls.screenSpacePanning = false;
//
// 				controls.minDistance = 100;
// 				controls.maxDistance = 500;
//
// 				controls.maxPolarAngle = Math.PI / 2;




animate();
