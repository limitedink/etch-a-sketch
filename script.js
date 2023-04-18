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
container.style.height = "500px";
container.style.width = "500px";

// Add event listener to new grid button
newGridButton.addEventListener("click", () => {
  // Ask user for number of squares per side
  const userInput = prompt(
    "Enter number of squares per side (maximum 64):",
    numSquaresPerSide
  );
  // Check if user input is valid
  const newNumSquaresPerSide = parseInt(userInput);
  if (!isNaN(newNumSquaresPerSide) && newNumSquaresPerSide <= 64) {
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
let isShadingModeOn = false;
let isLightenModeOn = false;
let shadingCounter = 0;
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

          if (isShadingModeOn) {
            let currentColor = square.dataset.color;
            if (currentColor === "white") {
              square.style.backgroundColor = "#222";
              square.dataset.color = "#222";
            } else {
              let rgbColor = hexToRGB(currentColor);
              let newRgbColor = {
                r: rgbColor.r - 25,
                g: rgbColor.g - 25,
                b: rgbColor.b - 25,
              };
              let newHexColor = RGBToHex(newRgbColor);
              square.style.backgroundColor = newHexColor;
              square.dataset.color = newHexColor;
            }
          } else if (isLightenModeOn) {
            let currentColor = square.dataset.color;
            if (currentColor === "white") {
              square.style.backgroundColor = "#ddd";
              square.dataset.color = "#ddd";
            } else {
              let rgbColor = hexToRGB(currentColor);
              let newRgbColor = {
                r: rgbColor.r + 25,
                g: rgbColor.g + 25,
                b: rgbColor.b + 25,
              };
              let newHexColor = RGBToHex(newRgbColor);
              square.style.backgroundColor = newHexColor;
              square.dataset.color = newHexColor;
            }
          } else {
            square.style.backgroundColor = trailColor;
            square.dataset.color = trailColor;
          }
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
let isGridVisible = false;
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
//Shading MODE
// Add event listener to shading mode button
const shadingModeButton = document.querySelector("#shadingmode");
shadingModeButton.addEventListener("click", () => {
  isShadingModeOn = !isShadingModeOn; // toggle shading mode
  if (isShadingModeOn) {
    shadingModeButton.innerHTML = "Shading Mode <b>ON</b>";
    isLightenModeOn = false; // turn off lighten mode
    lightenModeButton.innerHTML = "Lighten Mode OFF";

    const currentColor = getComputedStyle(
      document.documentElement
    ).getPropertyValue("--main-color");
    const newColor = adjust(RGBToHex, currentColor, -20); // darken color by 20 units
    document.documentElement.style.setProperty("--main-color", newColor);
  } else {
    shadingModeButton.textContent = "Shading Mode OFF";
  }
});
//Lighten MODE
// Add event listener to lighten mode button
const lightenModeButton = document.querySelector("#lightenmode");
lightenModeButton.addEventListener("click", () => {
  isLightenModeOn = !isLightenModeOn; // toggle lighten mode
  if (isLightenModeOn) {
    lightenModeButton.innerHTML = "Lighten Mode <b>ON</b>";
    isShadingModeOn = false; // turn off shading mode
    shadingModeButton.innerHTML = "Shading Mode OFF";
  } else {
    lightenModeButton.textContent = "Lighten Mode OFF";
  }
});

function eyedropper() {
  const squares = document.querySelectorAll(".square");
  const colorPicker = document.querySelector("#color-picker");

  squares.forEach((square) => {
    square.addEventListener("click", () => {
      const color = square.style.backgroundColor;
      const hexColor = rgbToHex(color);
      colorPicker.value = hexColor;
    });
  });
}

function rgbToHex(rgb) {
  const rgbArr = rgb.match(/\d+/g);
  const hexArr = rgbArr.map((color) => {
    const hex = Number(color).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  });
  return "#" + hexArr.join("");
}

const eyedropperButton = document.querySelector("#eyedropper");
eyedropperButton.addEventListener("click", eyedropper);
