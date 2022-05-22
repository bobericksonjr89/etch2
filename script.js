// DOM CAPTURE
const container = document.querySelector(".container");
const button = document.querySelector("button");

// EVENT LISTENERS
button.addEventListener("click", promptUserForSize);

// FUNCTIONS
function createGrid(size = 16) {
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const box = document.createElement("div");
      box.classList.add("box");
      const boxSize = 960 / size;
      box.style.width = `${boxSize}px`;
      box.style.height = `${boxSize}px`;
      box.addEventListener("mouseenter", colorBox);
      container.appendChild(box);
    }
  }
}

function clearGrid() {
  let lastChild = container.lastElementChild;
  while (lastChild) {
    container.removeChild(lastChild);
    lastChild = container.lastElementChild;
  }
}

function colorBox(e) {
  const box = e.target;
  if (box.dataset.colored === "true") {
    box.style.backgroundColor = tintColor(box);
    return;
  }
  box.style.backgroundColor = randomColor();
  box.style.opacity = 1;
  box.dataset.colored = "true";
}

function randomColor() {
  const r = randomDecimal();
  const g = randomDecimal();
  const b = randomDecimal();
  return `rgb(${r}, ${g}, ${b})`;
}

function randomDecimal() {
  return Math.floor(Math.random() * 255);
}

function tintColor(target) {
  if (+target.style.opacity === 0) {
    return;
  }
  const opacityNumber = +target.style.opacity;
  target.style.opacity = (opacityNumber - 0.1).toString();
}

function promptUserForSize() {
  let size;
  do {
    size = prompt("How many boxes per row? (Max 100)");
  } while (!size || size < 1 || size > 100);

  clearGrid();
  createGrid(size);
}

// INIT
createGrid();
