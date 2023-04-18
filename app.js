const grid = document.querySelector(".grid");
const scoreBoard = document.querySelector(".score");
const speedBoard = document.querySelector(".speed");
const selectLevel = document.querySelector("#level");
const startBtn = document.querySelector(".start");
const resetBtn = document.querySelector(".reset");

console.log(speedBoard);

let snakeX, snakeY;
snakeX = snakeY = 10;
let foodX, foodY;
let snakeBody = [];
let score = 0;
let gameLevel = 500;
let gamePlaying = false;

let directionX = 1;
let directionY = 0;

speedBoard.innerText = gameLevel;

document.addEventListener("keydown", (e) => {
  if (e.code === "ArrowRight" && directionX !== -1) {
    directionX = 1;
    directionY = 0;
  } else if (e.code === "ArrowLeft" && directionX !== 1) {
    directionX = -1;
    directionY = 0;
  } else if (e.code === "ArrowUp" && directionY !== 1) {
    directionY = -1;
    directionX = 0;
  } else if (e.code === "ArrowDown" && directionY !== -1) {
    directionY = 1;
    directionX = 0;
  }
});

function createSnake() {
  let snake = document.createElement("div");
  snake.classList.add("head");

  snake.style.cssText = `grid-column: ${snakeX};
    grid-row: ${snakeY}`;
  grid.appendChild(snake);
  return snake;
}

let loop;

let snakeHead;

const func = () => {
  // Let the last segment of the snake have the coordinates of the next segment, so on and so forth.
  if (snakeBody.length) {
    for (let index = snakeBody.length - 1; index > 0; index--) {
      snakeBody[index] = snakeBody[index - 1];
    }
  }

  // the first element of the snakeBody array will register the coordinates of the head.
  if (snakeBody.length) {
    snakeBody[0] = [snakeX, snakeY];
  }

  snakeX += directionX;
  snakeY += directionY;

  snakeHead.style.cssText = `grid-column: ${snakeX};
      grid-row: ${snakeY};`;

  if (snakeBody.length) {
    for (let index = 0; index < snakeBody.length; index++) {
      document.querySelectorAll(".snake")[
        index
      ].style.cssText = `grid-column: ${snakeBody[index][0]};
      grid-row: ${snakeBody[index][1]};`;
    }
  }

  // detect when the snake hits the food
  if (snakeX === foodX && snakeY === foodY) {
    score++;
    if (score === 1 && gameLevel === 500) {
      gameLevel = 250;
      speedBoard.innerText = gameLevel;
      console.log("YES", gameLevel);
    } else if (score === 2 && gameLevel === 250) {
      gameLevel = 125;
      speedBoard.innerText = gameLevel;
      console.log("YES Again", gameLevel);
    }
    scoreBoard.innerText = score;
    // increase the body of the snake by one block
    snakeBody.push([foodX, foodY]);
    document.querySelectorAll(".food")[0].classList.add("snake");
    document.querySelectorAll(".food.snake")[0].classList.remove("food");

    // create new food with random coordinates
    newFood();
  }

  if (snakeX >= 30 || snakeY >= 30 || snakeX <= 0 || snakeY <= 0) {
    clearInterval(loop);
    loop = null;
    snakeX = 10;
    snakeY = 10;
    score = 0;
    scoreBoard.innerText = score;
  }
};

function startGame() {
  if (!gamePlaying) {
    snakeHead = createSnake();

    // grid.appendChild(snakeHead);
    newFood();
    loop = setInterval(func, gameLevel);
  }
}

const randomPosition = () => {
  let posX = Math.floor(Math.random() * 30) + 1;
  let posY = Math.floor(Math.random() * 30) + 1;

  for (let i = 0; i < snakeBody.length; i++) {
    if (snakeBody[i][0] !== posX && snakeBody[i][1] !== posY) {
      return [posX, posY];
    } else {
      return randomPosition();
    }
  }
};

// Generate new food with random coordinates
function newFood() {
  let newFood = document.createElement("div");
  newFood.classList.add("food");
  if (snakeBody.length) {
    foodX = randomPosition()[0];
    foodY = randomPosition()[1];
  } else {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
  }

  newFood.style.cssText = `grid-column: ${foodX};
    grid-row: ${foodY};`;
  grid.appendChild(newFood);
}

selectLevel.addEventListener("change", (e) => {
  switch (e.target.value) {
    case "1":
      gameLevel = 500;
      break;
    case "2":
      gameLevel = 250;
      break;
    case "3":
      gameLevel = 125;
      break;

    default:
      gameLevel = 500;
      break;
  }
});

function stopInterval() {
  clearInterval(loop);
}

function resetGame() {
  clearInterval(loop);
  loop = null;
  snakeX = 10;
  snakeY = 10;
  directionX = 1;
  directionY = 0;
  document.querySelectorAll(".head").forEach((head) => {
    head.remove();
  });
  document.querySelectorAll(".snake").forEach((snake) => {
    snake.remove();
  });
  document.querySelectorAll(".food").forEach((food) => {
    food.remove();
  });
  score = 0;
  scoreBoard.innerText = score;
  gamePlaying = false;
}

startBtn.addEventListener("click", () => {
  startGame();
  gamePlaying = true;
});
resetBtn.addEventListener("click", resetGame);
