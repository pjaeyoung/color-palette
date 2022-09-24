const COLORS = ["#dab7a3", "#d39b75", "#9ca18d", "#628272", "#21574a"];
const $colorName = document.getElementById("selected-color-name");
const $shapes = [];

changeColor(COLORS[0]);
createPalette();
createShapes();
runMoveAndScaleAnimationAll();

window.addEventListener("resize", debounce(placeShapesRandomly, 500));

function debounce(fn, limit) {
  let timer;
  return function () {
    if (timer) {
      timer = null;
      clearTimeout(timer);
      return;
    }
    timer = setTimeout(fn, limit);
  };
}

function changeColor(selectedColor) {
  $colorName.textContent = selectedColor;
  document.body.style.backgroundColor = selectedColor;
  $shapes.forEach(($shape) => {
    $shape.style.backgroundColor = selectedColor;
  });
}

function createPalette() {
  const $palette = document.getElementById("palette");
  const fragment = document.createDocumentFragment();
  COLORS.forEach((colorName) => {
    fragment.appendChild(createPaletteColor(colorName));
  });

  $palette.appendChild(fragment);
}

function createPaletteColor(colorName) {
  const $li = document.createElement("li");
  const $button = document.createElement("button");
  $button.className = "color";
  $button.dataset.color = colorName;
  $button.style.backgroundColor = colorName;
  $button.onclick = () => changeColor(colorName);

  $li.appendChild($button);

  return $li;
}

function createShapes() {
  const $shapes_container = document.getElementById("shapes");
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < 140; i++) {
    const $shape = createShape();
    $shapes.push($shape);
    fragment.appendChild($shape);
  }
  placeShapesRandomly();
  $shapes_container.appendChild(fragment);
}

function createShape() {
  const $li = document.createElement("li");

  $li.className = "shape";
  $li.style.backgroundColor = COLORS[0];
  return $li;
}

function placeShapesRandomly() {
  const WINDOW_HEIGHT = window.innerHeight;
  const WINDOW_WIDTH = window.innerWidth;
  $shapes.forEach(($shape) => {
    $shape.style.top = `${getRandomNumber(-10, WINDOW_HEIGHT)}px`;
    $shape.style.left = `${getRandomNumber(-10, WINDOW_WIDTH)}px`;
  });
}

function runMoveAndScaleAnimationAll() {
  $shapes.forEach(runMoveAndScaleAnimation);
}

function runMoveAndScaleAnimation($shape) {
  const WINDOW_HEIGHT = window.innerHeight;
  const WINDOW_WIDTH = window.innerWidth;

  const scale = getRandomNumber(0.8, 2);
  const posX = getRandomNumber(-WINDOW_WIDTH * 0.3, WINDOW_WIDTH * 0.5);
  const posY = getRandomNumber(-WINDOW_HEIGHT * 0.3, WINDOW_HEIGHT * 0.5);
  $shape.style.transform = `scale(${scale}) translate(${posX}px, ${posY}px)`;

  setTimeout(() => runMoveAndScaleAnimation($shape), 2000);
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * max) + min;
}
