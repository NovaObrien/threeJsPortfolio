import './style.css'

import * as THREE from 'three'

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
})

renderer.setPixelRatio( window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(30)

renderer.render(scene, camera)



// add light //
function addLight() {

  const pointLight = new THREE.PointLight(0x6DF0DA)
  pointLight.position.set(20,20,20)
  
  const ambientLight = new THREE.AmbientLight(0xffffff)
  
  scene.add(pointLight, ambientLight)
  
  // const lightHelper = new THREE.PointLightHelper(pointLight)
  // const gridHelper = new THREE.GridHelper()
  
  // scene.add(lightHelper, gridHelper)
}

const controls = new OrbitControls(camera, renderer.domElement)

function addStar() {
  const geometry = new THREE.BoxGeometry(3, 3, 3)
  const material = new THREE.MeshStandardMaterial( { color: 0x6DF0DA})
  const star = new THREE.Mesh(geometry, material)

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))

  star.position.set(x,y,z)
  scene.add(star)
}




// const spaceTexture  = new THREE.TextureLoader().load('img/space.jpg')
// scene.background = spaceTexture


function animate() {
  requestAnimationFrame(animate)
  
  // nova.rotation.x += 0.01
  // nova.rotation.y += 0.005
  // nova.rotation.z += 0.01

  controls.update()

  renderer.render( scene, camera)
}

// add avatar //

// const novaTexture = new THREE.TextureLoader().load('img/seflPort2.png')
// const nova = new THREE.Mesh(
  
//   new THREE.BoxGeometry(5,5,5),
//   new THREE.MeshBasicMaterial({ map: novaTexture})
//   )

//   scene.add(nova)

//load Model
let loader = new GLTFLoader()
loader.load('./3d/scene.gltf', function(gltf){
  scene.add(gltf.scene)
})


  function init() {
    addLight()
    Array(200).fill().forEach(addStar)
    animate()
  }
  
init()

