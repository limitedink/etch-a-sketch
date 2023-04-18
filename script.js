// // Define variables
// const container = document.querySelector(".container");
// const colorPicker = document.querySelector("#color-picker");
// const newGridButton = document.querySelector("#new-grid-btn");

// let numSquaresPerSide = 16;

// // Create initial grid
// createGrid(numSquaresPerSide);

// // Add event listeners to each grid square
// addEventListenersToSquares();

// // Set CSS properties to turn squares into grid
// container.style.display = "grid";
// container.style.gridTemplateColumns = `repeat(${numSquaresPerSide}, 1fr)`;
// container.style.gridTemplateRows = `repeat(${numSquaresPerSide}, 1fr)`;
// container.style.height = "400px";
// container.style.width = "400px";

// // Add event listener to new grid button
// newGridButton.addEventListener("click", () => {
//   // Ask user for number of squares per side
//   const userInput = prompt(
//     "Enter number of squares per side (maximum 100):",
//     numSquaresPerSide
//   );
//   // Check if user input is valid
//   const newNumSquaresPerSide = parseInt(userInput);
//   if (!isNaN(newNumSquaresPerSide) && newNumSquaresPerSide <= 100) {
//     numSquaresPerSide = newNumSquaresPerSide;
//     // Remove existing grid
//     container.innerHTML = "";
//     // Create new grid
//     createGrid(numSquaresPerSide);
//     // Set CSS properties to turn squares into grid
//     container.style.gridTemplateColumns = `repeat(${numSquaresPerSide}, 1fr)`;
//     container.style.gridTemplateRows = `repeat(${numSquaresPerSide}, 1fr)`;
//     // Add event listeners to new squares
//     addEventListenersToSquares();
//   }
// });

// // Create grid
// function createGrid(num) {
//   // Create new squares
//   for (let i = 0; i < num * num; i++) {
//     const div = document.createElement("div");
//     div.classList.add("square");
//     container.appendChild(div);
//   }
// }

// // Add event listeners to each grid square
// function addEventListenersToSquares() {
//   const squares = document.querySelectorAll(".square");
//   squares.forEach((square) => {
//     square.dataset.color = "white";
//     square.addEventListener("mouseover", () => {
//       const trailColor = colorPicker.value;
//       square.style.backgroundColor = trailColor;
//       square.dataset.color = trailColor;
//     });
//   });
// }

// Define variables
const container = document.querySelector(".container");
const colorPicker = document.querySelector("#color-picker");
const newGridButton = document.querySelector("#new-grid-btn");

let numSquaresPerSide = 64;
let draw = false; // Flag to determine if mouse is being held down

// Create initial grid
createGrid(numSquaresPerSide);

// Add event listeners to each grid square
addEventListenersToSquares();

// Set CSS properties to turn squares into grid
container.style.display = "grid";
container.style.gridTemplateColumns = `repeat(${numSquaresPerSide}, 1fr)`;
container.style.gridTemplateRows = `repeat(${numSquaresPerSide}, 1fr)`;
container.style.height = "500px";
container.style.width = "500px";

// Add event listener to new grid button
newGridButton.addEventListener("click", () => {
  // Ask user for number of squares per side
  const userInput = prompt(
    "Enter number of squares per side (maximum 100):",
    numSquaresPerSide
  );
  // Check if user input is valid
  const newNumSquaresPerSide = parseInt(userInput);
  if (!isNaN(newNumSquaresPerSide) && newNumSquaresPerSide <= 100) {
    numSquaresPerSide = newNumSquaresPerSide;
    // Remove existing grid
    container.innerHTML = "";
    // Create new grid
    createGrid(numSquaresPerSide);
    // Set CSS properties to turn squares into grid
    container.style.gridTemplateColumns = `repeat(${numSquaresPerSide}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${numSquaresPerSide}, 1fr)`;
    // Add event listeners to new squares
    addEventListenersToSquares();
  }
});

// Create grid
function createGrid(num) {
  // Create new squares
  for (let i = 0; i < num * num; i++) {
    const div = document.createElement("div");
    div.classList.add("square");
    container.appendChild(div);
  }
}
let isRainbowModeOn = false;
//DRAW FUNCTION
// Add event listeners to each grid square
function addEventListenersToSquares() {
  const squares = document.querySelectorAll(".square");
  let isDrawing = false;
  let eraserMode = false; // initialize eraser mode to false

  squares.forEach((square) => {
    square.dataset.color = "white";
    square.addEventListener("mousedown", () => {
      isDrawing = true;
      if (eraserMode) {
        // if eraser mode is on, set the square color to white
        square.style.backgroundColor = "white";
        square.dataset.color = "white";
      }
    });
    square.addEventListener("mouseup", () => {
      isDrawing = false;
    });
    square.addEventListener("mouseover", () => {
      if (isDrawing) {
        if (eraserMode) {
          // if eraser mode is on, set the square color to white
          square.style.backgroundColor = "white";
          square.dataset.color = "white";
        } else {
          // otherwise, set the square color to the selected color or a random color if rainbow mode is on
          let trailColor;
          if (isRainbowModeOn) {
            trailColor = getRandomColor();
          } else {
            trailColor = colorPicker.value;
          }
          square.style.backgroundColor = trailColor;
          square.dataset.color = trailColor;
        }
      }
    });
  });

  // Add event listener to document for mouseup event
  document.addEventListener("mouseup", () => {
    isDrawing = false;
  });

  //ERASER BUTTON
  // Add event listener to eraser button
  const eraserButton = document.querySelector("#eraser");
  eraserButton.addEventListener("click", () => {
    eraserMode = !eraserMode; // toggle eraser mode
    if (eraserMode) {
      eraserButton.innerHTML = "Eraser <b>ON</b>";
    } else {
      eraserButton.textContent = "Eraser OFF";
    }
  });
}

//GRID BUTTON
let isGridVisible = true;
const gridButton = document.querySelector("#gridmode");

gridButton.addEventListener("click", toggleGrid);
function toggleGrid() {
  isGridVisible = !isGridVisible;
  const squares = document.querySelectorAll(".square");
  squares.forEach((square) => {
    square.style.border = isGridVisible ? "1px solid black" : "none";
    if (isGridVisible) {
      gridButton.innerHTML = "Show Grid <b>ON</b>";
    } else {
      gridButton.textContent = "Show Grid OFF";
    }
  });
}

//RAINBOW MODE

// Add event listener to rainbowmode button
const rainbowModeButton = document.getElementById("rainbowmode");
rainbowModeButton.addEventListener("click", () => {
  isRainbowModeOn = !isRainbowModeOn; // Toggle rainbow mode
  rainbowModeButton.innerHTML = isRainbowModeOn
    ? "RAINBOWMODE <b>ON</b>"
    : "RAINBOWMODE OFF"; // Update button text
});

//generate random colour
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
