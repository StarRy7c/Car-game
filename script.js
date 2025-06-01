const playerCar = document.getElementById('player-car');
const enemyCar = document.getElementById('enemy-car');
const gameOver = document.getElementById('game-over');

let gameSpeed = 4;
let enemySpeed = 5;
let moveLeft = false;
let moveRight = false;

let playerX = 175;

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') moveLeft = true;
  if (e.key === 'ArrowRight') moveRight = true;
});

document.addEventListener('keyup', (e) => {
  if (e.key === 'ArrowLeft') moveLeft = false;
  if (e.key === 'ArrowRight') moveRight = false;
});

function update() {
  // Move player
  if (moveLeft && playerX > 0) playerX -= gameSpeed;
  if (moveRight && playerX < 350) playerX += gameSpeed;
  playerCar.style.left = playerX + 'px';

  // Move enemy
  let enemyY = parseInt(window.getComputedStyle(enemyCar).getPropertyValue('top'));
  if (enemyY >= 600) {
    enemyCar.style.top = '-120px';
    enemyCar.style.left = Math.floor(Math.random() * 350) + 'px';
  } else {
    enemyCar.style.top = enemyY + enemySpeed + 'px';
  }

  // Collision Detection
  if (isCollide(playerCar, enemyCar)) {
    gameOver.style.display = 'block';
    cancelAnimationFrame(animationId);
    return;
  }

  animationId = requestAnimationFrame(update);
}

function isCollide(a, b) {
  const aRect = a.getBoundingClientRect();
  const bRect = b.getBoundingClientRect();
  return !(
    aRect.bottom < bRect.top ||
    aRect.top > bRect.bottom ||
    aRect.right < bRect.left ||
    aRect.left > bRect.right
  );
}

let animationId = requestAnimationFrame(update);
