const canvas = document.getElementById("ground");
const ctx = canvas.getContext("2d");
const patch = 32;
var foodX = 12;
var foodY = 8;
var snake = [{ x: 5, y: 8 }, { x: 4, y: 8 }, { x: 3, y: 8 }];
var drag = 65;
var facingDirection = "right";
var isGameOn = false;
var isGameOver = false;

window.onload = function() {
  placeFood();
  drawSnake();
};

function placeFood() {
  const food_img = document.getElementById("food");
  let location_valid = false;
  while (!location_valid) {
    if (snake.length != 3) {
      foodX = Math.floor(Math.random() * 17 + 1);
      foodY = Math.floor(Math.random() * 15 + 1);
    }
    location_valid = snake.every(segment => {
      return segment.x != foodX || segment.y != foodY;
    });
  }
  ctx.drawImage(food_img, (foodX - 1) * patch, (foodY - 1) * patch);
}

function drawSnake() {
  var opacityReduction = 0.6 / snake.length;
  var alpha = 1;
  for (i = 0; i < snake.length; i++) {
    var x = snake[i].x - 1;
    var y = snake[i].y - 1;
    ctx.fillStyle = "rgba(80, 117, 249," + alpha + ")";
    alpha -= opacityReduction;
    ctx.fillRect(x * patch, y * patch, 32, 32);
  }
}

function moveRight() {
  ctx.clearRect((snake[0].x - 1) * patch, (snake[0].y - 1) * patch, 32, 32);
  for (i = snake.length - 1; i > 0; i--) {
    var x = snake[i].x - 1;
    var y = snake[i].y - 1;
    ctx.clearRect(x * patch, y * patch, 32, 32);
    snake[i].x = snake[i - 1].x;
    snake[i].y = snake[i - 1].y;
  }
  snake[0].x += 1;
  collisionTest();
  drawSnake();
}

function moveLeft() {
  ctx.clearRect((snake[0].x - 1) * patch, (snake[0].y - 1) * patch, 32, 32);
  for (i = snake.length - 1; i > 0; i--) {
    var x = snake[i].x - 1;
    var y = snake[i].y - 1;
    ctx.clearRect(x * patch, y * patch, 32, 32);
    snake[i].x = snake[i - 1].x;
    snake[i].y = snake[i - 1].y;
  }
  snake[0].x -= 1;
  collisionTest();
  drawSnake();
}

function moveDown() {
  ctx.clearRect((snake[0].x - 1) * patch, (snake[0].y - 1) * patch, 32, 32);
  for (i = snake.length - 1; i > 0; i--) {
    var x = snake[i].x - 1;
    var y = snake[i].y - 1;
    ctx.clearRect(x * patch, y * patch, 32, 32);
    snake[i].x = snake[i - 1].x;
    snake[i].y = snake[i - 1].y;
  }
  snake[0].y += 1;
  collisionTest();
  drawSnake();
}

function moveUp() {
  ctx.clearRect((snake[0].x - 1) * patch, (snake[0].y - 1) * patch, 32, 32);
  for (i = snake.length - 1; i > 0; i--) {
    var x = snake[i].x - 1;
    var y = snake[i].y - 1;
    ctx.clearRect(x * patch, y * patch, 32, 32);
    snake[i].x = snake[i - 1].x;
    snake[i].y = snake[i - 1].y;
  }
  snake[0].y -= 1;
  collisionTest();
  drawSnake();
}

document.onkeydown = function(event) {
  switch (event.key) {
    case "ArrowLeft":
      if (facingDirection !== "right") {
        facingDirection = "left";
      }
      break;
    case "ArrowUp":
      if (facingDirection !== "down") {
        facingDirection = "up";
      }
      break;
    case "ArrowRight":
      if (facingDirection !== "left") {
        facingDirection = "right";
        if (!isGameOn) {
          isGameOn = true;
          requestAnimationFrame(loop);
        }
      }
      break;
    case "ArrowDown":
      if (facingDirection !== "up") {
        facingDirection = "down";
      }
      break;
  }
};

function foodCollision() {
  if (snake[0].x === foodX && snake[0].y === foodY) {
    var newSegment = { x: snake[0].x, y: snake[0].y };
    snake.push(newSegment);
    addScore();
    placeFood();
  }
}

function wallCollision() {
  if (snake[0].y < 1) {
    snake[0].y = 15;
  } else if (snake[0].y > 15) {
    snake[0].y = 1;
  }
  if (snake[0].x < 1) {
    snake[0].x = 18;
  } else if (snake[0].x > 17) {
    snake[0].x = 1;
  }
}

function snakeCollision() {
  for (i = 1; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      gameOver();
    }
  }
}

function addScore() {
  document.getElementById("score").innerHTML = "Score: " + (snake.length - 3);
}

function gameOver() {
  isGameOn = false;
  isGameOver = true;
  document.getElementById("score").style.backgroundColor = "#ffffff";
  document.getElementById("score").style.color = "#e8481d";
  document.getElementById("score").innerHTML =
    "Game Over - Your Score: " + (snake.length - 3);
}

function collisionTest() {
  wallCollision();
  snakeCollision();
  foodCollision();
}

function restart() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  foodX = 13;
  foodY = 8;
  snake = [{ x: 5, y: 8 }, { x: 4, y: 8 }, { x: 3, y: 8 }];
  document.getElementById("score").style.backgroundColor = "#4a752c";
  document.getElementById("score").style.color = "#ffffff";
  document.getElementById("score").innerHTML = "Score: 0";
  isGameOn = true;
  facingDirection = "right";
  placeFood();
  drawSnake();
}


function renderGame() {
  let move;
  switch (facingDirection) {
    case "up":
      move = moveUp;
      break;
    case "down":
      move = moveDown;
      break;
    case "left":
      move = moveLeft;
      break;
    case "right":
      move = moveRight;
  }
  move();
}

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

function loop() {
  if (isGameOn && !isGameOver){
    renderGame();
    sleep(drag);
    requestAnimationFrame(loop);
  }
}

requestAnimationFrame(loop);