// ------------------- Player setup -------------------
const player = document.getElementById("player");
let isJumping = false;
let playerY = 0;
let jumpVelocity = 15;
let gravity = 1;

// Player jump function
function jump() {
  if (!isJumping) {
    isJumping = true;
    let jumpInterval = setInterval(() => {
      playerY += jumpVelocity;
      jumpVelocity -= gravity;

      if (playerY <= 0) { // ground detect
        playerY = 0;
        isJumping = false;
        jumpVelocity = 15;
        clearInterval(jumpInterval);
      }

      player.style.bottom = playerY + "px";
    }, 20);
  }
}

// Keyboard input
document.addEventListener("keydown", (e) => {
  if (e.code === "Space" || e.code === "ArrowUp") {
    jump();
  }
});

// ------------------- Police setup -------------------
const police = document.getElementById("police");
let policeX = -100;

function movePolice() {
  policeX += 5; // police speed
  if (policeX > window.innerWidth) policeX = -100;
  police.style.left = policeX + "px";
}
setInterval(movePolice, 50);

// ------------------- Buildings setup -------------------
const buildings = document.querySelectorAll(".building");

function moveBuildings() {
  buildings.forEach(building => {
    let left = parseInt(building.style.left);
    left -= 5; // building speed
    if (left < -50) left = window.innerWidth + Math.random() * 200;
    building.style.left = left + "px";
  });
}
setInterval(moveBuildings, 50);

// ------------------- Train obstacle -------------------
const train = document.getElementById("train");
let trainX = 800;

function moveTrain() {
  trainX -= 10; // train speed
  if (trainX < -100) trainX = window.innerWidth + Math.random() * 400;
  train.style.left = trainX + "px";

  // Collision with player
  const playerRect = player.getBoundingClientRect();
  const trainRect = train.getBoundingClientRect();
  if (
    playerRect.x < trainRect.x + trainRect.width &&
    playerRect.x + playerRect.width > trainRect.x &&
    playerRect.y < trainRect.y + trainRect.height &&
    playerRect.y + playerRect.height > trainRect.y
  ) {
    alert("Game Over! Train dhoreche 😱");
    window.location.reload();
  }
}
setInterval(moveTrain, 50);

// ------------------- Coin setup -------------------
const coin = document.getElementById("coin");
let score = 0;

function moveCoin() {
  // random horizontal spawn
  if (parseInt(coin.style.left) < -50) {
    coin.style.left = Math.random() * (window.innerWidth - 50) + "px";
    coin.style.bottom = 50 + Math.random() * 150 + "px"; // height random
  }
  
  // collision detect
  const playerRect = player.getBoundingClientRect();
  const coinRect = coin.getBoundingClientRect();

  if (
    playerRect.x < coinRect.x + coinRect.width &&
    playerRect.x + playerRect.width > coinRect.x &&
    playerRect.y < coinRect.y + coinRect.height &&
    playerRect.y + playerRect.height > coinRect.y
  ) {
    score += 1;
    console.log("Score:", score);
    // move coin out of screen
    coin.style.left = "-100px";
  }
}
setInterval(moveCoin, 50);

// ------------------- Police collision -------------------
function checkPoliceCollision() {
  const playerRect = player.getBoundingClientRect();
  const policeRect = police.getBoundingClientRect();

  if (
    playerRect.x < policeRect.x + policeRect.width &&
    playerRect.x + playerRect.width > policeRect.x &&
    playerRect.y < policeRect.y + policeRect.height &&
    playerRect.y + playerRect.height > policeRect.y
  ) {
    alert("Game Over! Police dhoreche 😡");
    window.location.reload();
  }
}
setInterval(checkPoliceCollision, 50);
