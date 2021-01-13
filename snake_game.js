const canvas = document.getElementById("ground");
const ctx = canvas.getContext("2d");
const patch = 32;
var food_x = 13;
var food_y = 8;
var snake = [{ x: 5, y: 8 }, { x: 4, y: 8 }, { x: 3, y: 8 }];
var drag = 100;
var movement;
var direction = "right";
var gameOn = true;

window.onload = function() {
  placeFood();
  drawSnake();
};

function placeFood() {
  const food_img = document.getElementById("food");
  ctx.drawImage(food_img, (food_x - 1) * patch, (food_y - 1) * patch);
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
  switch (event.keyCode) {
    case 37:
      if (direction !== "right" && gameOn === true) {
        clearInterval(movement);
        direction = "left";
        movement = setInterval(moveLeft, drag);
      }
      break;
    case 38:
      if (direction !== "down" && gameOn === true) {
        clearInterval(movement);
        direction = "up";
        movement = setInterval(moveUp, drag);
      }
      break;
    case 39:
      if (direction !== "left" && gameOn === true) {
        clearInterval(movement);
        direction = "right";
        movement = setInterval(moveRight, drag);
      }
      break;

    case 40:
      if (direction !== "up" && gameOn === true) {
        clearInterval(movement);
        direction = "down";
        movement = setInterval(moveDown, drag);
      }
      break;
  }
};

function foodCollision() {
  if (snake[0].x === food_x && snake[0].y === food_y) {
    var newSegment = { x: snake[0].x, y: snake[0].y };
    snake.push(newSegment);
    addScore();
    var isPatchEmpty = false;
    while (isPatchEmpty === false) {
      food_x = Math.floor(Math.random() * 17) + 1;
      food_y = Math.floor(Math.random() * 15) + 1;
      for (i = 0; i < snake.length; i++) {
        if (snake[i].x === food_x || snake[i].y === food_y) {
          isPatchEmpty = false;
        } else {
          isPatchEmpty = true;
        }
      }
    }
    placeFood();
  }
}

function wallCollision() {
  switch (direction) {
    case "up":
      if (snake[0].y < 1) {
        snake[0].y = 15;
      }
      break;
    case "down":
      if (snake[0].y > 15) {
        snake[0].y = 1;
      }
      break;
    case "left":
      if (snake[0].x < 1) {
        snake[0].x = 18;
      }
      break;
    case "right":
      if (snake[0].x > 17) {
        snake[0].x = 1;
      }
      break;
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
  gameOn = false;
  clearInterval(movement);
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
  food_x = 13;
  food_y = 8;
  snake = [{ x: 5, y: 8 }, { x: 4, y: 8 }, { x: 3, y: 8 }];
  document.getElementById("score").style.backgroundColor = "#4a752c";
  document.getElementById("score").style.color = "#ffffff";
  document.getElementById("score").innerHTML = "Score: 0";
  gameOn = true;
  direction = "right";
  placeFood();
  drawSnake();
}
