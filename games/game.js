// Get the canvas element and its 2D context
const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");

// Define the size of each cell in the grid
const cellSize = 20;

// Initialize the snake's position and movement
let snake = [
  { x: 10, y: 10 },
];
let dx = 1;
let dy = 0;

// Initialize the position of the food
let food = { x: 5, y: 5 };

// Handle keyboard input to control the snake's movement
document.addEventListener("keydown", changeDirection);

// Change the snake's direction based on keyboard input
function changeDirection(event) {
  if (event.key === "ArrowUp" && dy !== 1) {
    dx = 0;
    dy = -1;
  } else if (event.key === "ArrowDown" && dy !== -1) {
    dx = 0;
    dy = 1;
  } else if (event.key === "ArrowLeft" && dx !== 1) {
    dx = -1;
    dy = 0;
  } else if (event.key === "ArrowRight" && dx !== -1) {
    dx = 1;
    dy = 0;
  }
}

// Update the game state
function update() {
  // Move the snake
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);

  // Check if the snake has collided with the food
  if (head.x === food.x && head.y === food.y) {
    // Generate new food position
    food.x = Math.floor(Math.random() * canvas.width / cellSize);
    food.y = Math.floor(Math.random() * canvas.height / cellSize);
  } else {
    // Remove the tail segment
    snake.pop();
  }

  // Check if the snake has collided with the walls or itself
  if (
    head.x < 0 ||
    head.x >= canvas.width / cellSize ||
    head.y < 0 ||
    head.y >= canvas.height / cellSize ||
    snake.some((segment, index) => index !== 0 && segment.x === head.x && segment.y === head.y)
  ) {
    // Game over
    clearInterval(gameInterval);
    alert("Game over!");
  }

  // Clear the canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the snake
  context.fillStyle = "green";
  snake.forEach(segment => {
    context.fillRect(segment.x * cellSize, segment.y * cellSize, cellSize, cellSize);
  });

  // Draw the food
  context.fillStyle = "red";
  context.fillRect(food.x * cellSize, food.y * cellSize, cellSize, cellSize);
}

// Start the game loop
const gameInterval = setInterval(update, 100);
