let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

scene.background = new THREE.Color(0x87CEEB);

// Light
let light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0,10,10);
scene.add(light);

// Ground
let groundGeo = new THREE.PlaneGeometry(10,200);
let groundMat = new THREE.MeshStandardMaterial({color: 0x333333});
let ground = new THREE.Mesh(groundGeo, groundMat);
ground.rotation.x = -Math.PI/2;
scene.add(ground);

// Player
let playerGeo = new THREE.BoxGeometry(1,2,1);
let playerMat = new THREE.MeshStandardMaterial({color: 0x00ff00});
let player = new THREE.Mesh(playerGeo, playerMat);
player.position.y = 1;
scene.add(player);

camera.position.set(0,5,8);

let obstacles = [];
let coins = [];
let speed = 0.5;
let score = 0;

// Score Display
let scoreDiv = document.createElement("div");
scoreDiv.style.position = "absolute";
scoreDiv.style.top = "20px";
scoreDiv.style.left = "20px";
scoreDiv.style.color = "white";
scoreDiv.style.fontSize = "24px";
scoreDiv.innerHTML = "Score: 0";
document.body.appendChild(scoreDiv);

// Create Obstacle
function createObstacle(){
  let geo = new THREE.BoxGeometry(1,2,1);
  let mat = new THREE.MeshStandardMaterial({color: 0xff0000});
  let obstacle = new THREE.Mesh(geo, mat);
  obstacle.position.set((Math.floor(Math.random()*3)-1)*2,1,-100);
  scene.add(obstacle);
  obstacles.push(obstacle);
}

// Create Coin
function createCoin(){
  let geo = new THREE.CylinderGeometry(0.5,0.5,0.2,32);
  let mat = new THREE.MeshStandardMaterial({color: 0xffff00});
  let coin = new THREE.Mesh(geo, mat);
  coin.rotation.x = Math.PI/2;
  coin.position.set((Math.floor(Math.random()*3)-1)*2,1,-100);
  scene.add(coin);
  coins.push(coin);
}

setInterval(createObstacle,2000);
setInterval(createCoin,1500);

// Controls
document.addEventListener("keydown", e=>{
  if(e.key==="ArrowLeft" && player.position.x>-2)
    player.position.x-=2;
  if(e.key==="ArrowRight" && player.position.x<2)
    player.position.x+=2;
});

// Animation Loop
function animate(){
  requestAnimationFrame(animate);

  // Move obstacles
  obstacles.forEach((o,index)=>{
    o.position.z += speed;
    if(o.position.distanceTo(player.position)<1.5){
      alert("Game Over! Final Score: "+score);
      location.reload();
    }
    if(o.position.z>10){
      scene.remove(o);
      obstacles.splice(index,1);
    }
  });

  // Move coins
  coins.forEach((c,index)=>{
    c.position.z += speed;
    c.rotation.z += 0.1;

    if(c.position.distanceTo(player.position)<1.5){
      score+=10;
      scoreDiv.innerHTML="Score: "+score;
      scene.remove(c);
      coins.splice(index,1);
    }

    if(c.position.z>10){
      scene.remove(c);
      coins.splice(index,1);
    }
  });

  speed += 0.0005;

  renderer.render(scene,camera);
}

animate();
