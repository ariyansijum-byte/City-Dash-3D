const game = document.getElementById("game");
const player = document.getElementById("player");
const scoreDisplay = document.getElementById("score");
const startScreen = document.getElementById("startScreen");
const gameOverScreen = document.getElementById("gameOverScreen");
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");

let lane = 1; // 0 = left, 1 = middle, 2 = right
let lanePositions = [30, 130, 230];
let score = 0;
let gameRunning = false;
let obstacleInterval;
let speed = 5;

/* ================= START GAME ================= */

startBtn.addEventListener("click", () => {
  startScreen.style.display = "none";
  gameRunning = true;
  startGame();
});

restartBtn.addEventListener("click", () => {
  location.reload();
});

/* ================= PLAYER MOVE ================= */

document.addEventListener("keydown", (e) => {
  if (!gameRunning) return;

  if (e.key === "ArrowLeft" && lane > 0) {
    lane--;
  }

  if (e.key === "ArrowRight" && lane < 2) {
    lane++;
  }

  player.style.left = lanePositions[lane] + "px";
});

/* ================= CREATE OBSTACLE ================= */

function startGame() {
  obstacleInterval = setInterval(createObstacle, 1500);
}

function createObstacle() {
  if (!gameRunning) return;

  const obstacle = document.createElement("div");
  obstacle.classList.add("obstacle");

  let randomLane = Math.floor(Math.random() * 3);
  obstacle.style.left = lanePositions[randomLane] + "px";

  game.appendChild(obstacle);

  let top = -60;

  const moveObstacle = setInterval(() => {
    if (!gameRunning) {
      clearInterval(moveObstacle);
      return;
    }

    top += speed;
    obstacle.style.top = top + "px";

    // Collision Detection
    if (
      top > 420 &&
      randomLane === lane
    ) {
      endGame();
      clearInterval(moveObstacle);
    }

    // Passed obstacle
    if (top > 550) {
      obstacle.remove();
      score++;
      scoreDisplay.innerText = "Score: " + score;

      // Speed increase every 5 points
      if (score % 5 === 0) {
        speed += 1;
      }

      clearInterval(moveObstacle);
    }

  }, 30);
}

/* ================= GAME OVER ================= */

function endGame() {
  gameRunning = false;
  clearInterval(obstacleInterval);
  gameOverScreen.style.display = "flex";
}
