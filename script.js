// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 10, 10);
scene.add(light);

// Road
const roadGeometry = new THREE.BoxGeometry(10, 0.5, 200);
const roadMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
const road = new THREE.Mesh(roadGeometry, roadMaterial);
road.position.z = -80;
scene.add(road);

// Player
const playerGeometry = new THREE.BoxGeometry(1, 2, 1);
const playerMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const player = new THREE.Mesh(playerGeometry, playerMaterial);
player.position.y = 1;
scene.add(player);

// Obstacle (Train block)
const obstacleGeometry = new THREE.BoxGeometry(1, 2, 1);
const obstacleMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const obstacle = new THREE.Mesh(obstacleGeometry, obstacleMaterial);
obstacle.position.set(0, 1, -20);
scene.add(obstacle);

// Camera position
camera.position.set(0, 5, 8);
camera.lookAt(player.position);

// Lane system
let lanes = [-3, 0, 3];
let currentLane = 1;

function updateLane() {
  player.position.x = lanes[currentLane];
}

// Jump system
let isJumping = false;
let velocityY = 0;
let gravity = -0.01;

document.getElementById("leftBtn").addEventListener("click", () => {
  if (currentLane > 0) {
    currentLane--;
    updateLane();
  }
});

document.getElementById("rightBtn").addEventListener("click", () => {
  if (currentLane < 2) {
    currentLane++;
    updateLane();
  }
});

document.getElementById("jumpBtn").addEventListener("click", () => {
  if (!isJumping) {
    velocityY = 0.25;
    isJumping = true;
  }
});

// Animation
function animate() {
  requestAnimationFrame(animate);

  // Jump physics
  if (isJumping) {
    player.position.y += velocityY;
    velocityY += gravity;

    if (player.position.y <= 1) {
      player.position.y = 1;
      isJumping = false;
    }
  }

  // Obstacle move towards player
  obstacle.position.z += 0.2;

  if (obstacle.position.z > 5) {
    obstacle.position.z = -100;
    obstacle.position.x = lanes[Math.floor(Math.random() * 3)];
  }

  renderer.render(scene, camera);
}

animate();
