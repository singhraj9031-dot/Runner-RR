let gameSpeed = 3; // starting speed
let maxSpeed = 20; // limit (isse zyada nahi jayega)
let speedIncrease = 0.0005; // kitni dheere speed badhe
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);
/* ---------- PLAYER ---------- */
let player = {
  x: canvas.width / 2,
y: canvas.height - 120,
  radius: 100,
  lane: 1
};

const lanes = [
  canvas.width / 4,
  canvas.width / 2,
  (canvas.width / 4) * 3
];

/* ---------- COINS ---------- */
let coins = [];
let score = 0;

/* ---------- CREATE COIN ---------- */
function spawnCoin() {
  let lane = Math.floor(Math.random() * 3);
  coins.push({
    x: lanes[lane],
    y: -20,
    r: 75
  });
}

/* ---------- CONTROLS ---------- */
document.addEventListener("touchstart", e => {
  let x = e.touches[0].clientX;
  if (x < window.innerWidth / 2 && player.lane > 0) {
    player.lane--;
  }
  if (x > window.innerWidth / 2 && player.lane < 2) {
    player.lane++;
  }
});

/* ---------- GAME LOOP ---------- */
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Player movement
  player.x += (lanes[player.lane] - player.x) * 0.1;
  
  // Draw player (circle character)
  ctx.fillStyle = "orange";
  ctx.beginPath();
  ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
  ctx.fill();
  
  // Coins
  for (let i = 0; i < coins.length; i++) {
    coins[i].y += 4;
    
    //RR 
    
    ctx.fillStyle = "green";
    ctx.beginPath();
    ctx.arc(coins[i].x, coins[i].y, coins[i].r, 0, Math.PI * 2);
    ctx.fill();
    
    // Collision
    let dx = player.x - coins[i].x;
    let dy = player.y - coins[i].y;
    let dist = Math.sqrt(dx * dx + dy * dy);
    
    if (dist < player.radius + coins[i].r) {
      coins.splice(i, 1);
      score++;
      break;
    }
    
    // Remove offscreen
    if (coins[i].y > canvas.height) {
      coins.splice(i, 1);
      break;
    }
  }
  
  // Score
  ctx.fillStyle = "#000";
  ctx.font = "18px Arial";
  ctx.fillText("R: " + score, 10, 25);
  
  requestAnimationFrame(update);
}
if (gameSpeed < maxSpeed) {
  gameSpeed += speedIncrease;
}

setInterval(spawnCoin, 1200);
update();