const COLORS = ["#dab7a3", "#d39b75", "#9ca18d", "#628272", "#21574a"];
const WINDOW_HEIGHT = window.innerHeight;
const WINDOW_WIDTH = window.innerWidth;

const $colorName = document.getElementById("selected-color-name");
const $shapes = [];

changeColor(COLORS[0]);
createPalette();
createShapes();

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
  const $shapes = document.getElementById("shapes");
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < 140; i++) {
    fragment.appendChild(createShape());
  }

  $shapes.appendChild(fragment);
}

function createShape() {
  const $li = document.createElement("li");
  $li.className = "shape";
  $li.style.backgroundColor = COLORS[0];
  $li.style.top = `${getRandomNumber(-10, WINDOW_HEIGHT)}px`;
  $li.style.left = `${getRandomNumber(-10, WINDOW_WIDTH)}px`;

  $shapes.push($li);

  runAnimation($li);
  return $li;
}

function runAnimation($shape) {
  const scale = getRandomNumber(0.8, 2);
  const posX = getRandomNumber(-500, 800);
  const posY = getRandomNumber(-400, 800);
  $shape.style.transform = `scale(${scale}) translate(${posX}px, ${posY}px)`;
  setTimeout(() => runAnimation($shape), 2000);
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * max) + min;
}
