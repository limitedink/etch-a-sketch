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

let numSquaresPerSide = 16;
let draw = false; // Flag to determine if mouse is being held down

// Create initial grid
createGrid(numSquaresPerSide);

// Add event listeners to each grid square
addEventListenersToSquares();

// Set CSS properties to turn squares into grid
container.style.display = "grid";
container.style.gridTemplateColumns = `repeat(${numSquaresPerSide}, 1fr)`;
container.style.gridTemplateRows = `repeat(${numSquaresPerSide}, 1fr)`;
container.style.height = "400px";
container.style.width = "400px";

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

// Add event listeners to each grid square
function addEventListenersToSquares() {
  const squares = document.querySelectorAll(".square");
  let isDrawing = false;
  squares.forEach((square) => {
    square.dataset.color = "white";
    square.addEventListener("mousedown", () => {
      isDrawing = true;
    });
    square.addEventListener("mouseup", () => {
      isDrawing = false;
    });
    square.addEventListener("mouseover", () => {
      if (isDrawing) {
        const trailColor = colorPicker.value;
        square.style.backgroundColor = trailColor;
        square.dataset.color = trailColor;
      }
    });
  });
}

// Add event listener to document for mouseup event
document.addEventListener("mouseup", () => {
  isDrawing = false;
});
