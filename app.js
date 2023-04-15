const container = document.querySelector(".container");
const snake = document.querySelector(".snake");
const scoreBoard = document.querySelector(".score");

let collided = false;
let direction = "right";
let current = 1;
let score = 0;

let x = 0;
let y = 0;

// code for the bait
const bait = document.createElement("div");
bait.classList.add("bait");

function generateRandomNum() {
  let randomNum = Math.floor(Math.random() * 25);
  if (randomNum > 0) {
    return randomNum;
  } else {
    return generateRandomNum();
  }
}

console.log(generateRandomNum());

bait.style.top = `${generateRandomNum()}rem`;
bait.style.left = `${generateRandomNum()}rem`;

container.appendChild(bait);

console.log(bait.getBoundingClientRect());

const func = () => {
  if (direction === "right") {
    x++;
    snake.style.transform = `translate(${x}px, ${y}px)`;
  } else if (direction === "left") {
    x--;
    snake.style.transform = `translate(${x}px, ${y}px)`;
  } else if (direction === "up") {
    y--;
    snake.style.transform = `translate(${x}px, ${y}px)`;
  } else {
    y++;
    snake.style.transform = `translate(${x}px, ${y}px)`;
  }
  if (
    snake.getBoundingClientRect().right >=
      container.getBoundingClientRect().right ||
    snake.getBoundingClientRect().bottom >=
      container.getBoundingClientRect().bottom ||
    snake.getBoundingClientRect().top <=
      container.getBoundingClientRect().top ||
    snake.getBoundingClientRect().left <= container.getBoundingClientRect().left
  ) {
    clearInterval(test);
    x = 0;
    y = 0;
    collided = true;
    score = 0;
    scoreBoard.innerText = score;
    console.log("Collision!");
  }

  if (
    snake.getBoundingClientRect().y <=
      bait.getBoundingClientRect().y + bait.getBoundingClientRect().height &&
    snake.getBoundingClientRect().y >= bait.getBoundingClientRect().y &&
    snake.getBoundingClientRect().x >= bait.getBoundingClientRect().x &&
    snake.getBoundingClientRect().x <=
      bait.getBoundingClientRect().x + bait.getBoundingClientRect().width
  ) {
    console.log("Bingo");
    score++;
    scoreBoard.innerText = score;
    snake.style.width = `${snake.getBoundingClientRect().width + 16}px`;
    bait.style.top = `${generateRandomNum()}rem`;
    bait.style.left = `${generateRandomNum()}rem`;
  }

  current++;
};

let test = setInterval(func, 10);

document.addEventListener("keydown", (event) => {
  if (event.code === "ArrowDown") {
    direction = "down";
  } else if (event.code === "ArrowUp") {
    direction = "up";
  } else if (event.code === "ArrowRight") {
    direction = "right";
  } else {
    direction = "left";
  }
});

const resetBtn = document.querySelector(".reset");

resetBtn.addEventListener("click", () => {
  x = 0;
  y = 0;
  direction = "right";
  bait.style.top = `${generateRandomNum()}rem`;
  bait.style.left = `${generateRandomNum()}rem`;
  score = 0;
  test = setInterval(func, 10);
});
