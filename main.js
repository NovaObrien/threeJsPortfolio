import './style.css'

import * as THREE from 'three'

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

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
  const geometry = new THREE.SphereGeometry(.1, 100, 100)
  const material = new THREE.MeshStandardMaterial( { color: 0xffffff})
  const star = new THREE.Mesh(geometry, material)

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(1000))

  star.position.set(x,y,z)
  scene.add(star)
}




const spaceTexture  = new THREE.TextureLoader().load('img/space.jpg')
scene.background = spaceTexture


function animate() {
  requestAnimationFrame(animate)
  
  // nova.rotation.x += 0.01
  nova.rotation.y += 0.005
  // nova.rotation.z += 0.01
  nova.translateX (.5)
  // nova.translateY (.1)
  nova.translateZ (.5)

  controls.update()

  renderer.render( scene, camera)
}

// add avatar //

const novaTexture = new THREE.TextureLoader().load('img/Mars_Map.png')
const novaNormal = new THREE.TextureLoader().load('img/normal.png')
const nova = new THREE.Mesh(
  
  new THREE.SphereGeometry(5,50,50),
  new THREE.MeshBasicMaterial({ map: novaTexture}),
  new THREE.MeshNormalMaterial({map: novaNormal})
  )

  scene.add(nova)

//load Model
// let loader = new GLTFLoader()
// loader.load('./3d/scene.gltf', function(gltf){
//   scene.add(gltf.scene)
// })


  function init() {
    addLight()
    Array(300).fill().forEach(addStar)
    animate()
  }
  
init()

