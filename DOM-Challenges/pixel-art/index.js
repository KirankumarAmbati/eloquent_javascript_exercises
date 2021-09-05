function PixelArt(el, rows, cols) {
  this.element = document.querySelector(el);
  this.rows = rows;
  this.cols = cols;
  this.isClicked = false;
  this.color = null;
  this.colorElement = null;

  this.init();
  this.bindEvents();
}

PixelArt.prototype.init = function () {
  const grid = this.makeGrid();
  const colorPallete = this.makeColorPallete();
  grid.appendChild(colorPallete);

  this.element.appendChild(grid);
};

PixelArt.prototype.makeGrid = function () {
  const grid = document.createDocumentFragment();

  for (let i = 0; i < this.rows; i++) {
    let container = document.createElement("div");
    container.classList.add("container");

    for (let j = 0; j < this.cols; j++) {
      let cell = document.createElement("span");
      cell.classList.add("cell");
      cell.setAttribute("data-cellposition", `${i}-${j}`);

      container.appendChild(cell);
    }
    grid.appendChild(container);
  }

  return grid;
};

PixelArt.prototype.makeColorPallete = function () {
  let colorPallete = document.createElement("div");
  colorPallete.classList.add("container");

  for (let p = 0; p < this.cols; p++) {
    const color = `#${Math.floor(Math.random() * 1000000)}`;

    let colorCell = document.createElement("span");
    colorCell.style.backgroundColor = color;
    colorCell.style.cursor = "pointer";
    colorCell.classList.add("cell");
    colorCell.setAttribute("data-color", color);

    colorPallete.appendChild(colorCell);
  }

  this.colorPallete = colorPallete;
  return colorPallete;
};

PixelArt.prototype.paint = function (e) {
  let cellposition = e.target.dataset?.cellposition;
  const cell = document.querySelector(`[data-cellposition='${cellposition}'`);

  if (cell) {
    cell.style.backgroundColor = this.color;
  }
};

PixelArt.prototype.cellClick = function (e) {
  this.paint(e);
};

PixelArt.prototype.mouseDown = function () {
  this.isClicked = true;
};

PixelArt.prototype.mouseOver = function (e) {
  if (this.isClicked) {
    this.paint(e);
  }
};

PixelArt.prototype.mouseUp = function () {
  this.isClicked = false;
};

PixelArt.prototype.selectColor = function (e) {
  e.stopPropagation();

  const color = e.target.dataset.color;
  e.srcElement.style.border = "2px solid red";

  if (this.colorElement) {
    this.colorElement.style.border = `1px solid black`;
  }

  this.colorElement = e.srcElement;
  this.color = color;
};

PixelArt.prototype.bindEvents = function () {
  this.element.addEventListener("mousedown", this.mouseDown.bind(this));
  this.element.addEventListener("mouseup", this.mouseUp.bind(this));
  this.element.addEventListener("mouseover", this.mouseOver.bind(this));
  this.element.addEventListener("click", this.cellClick.bind(this));

  this.colorPallete.addEventListener("click", this.selectColor.bind(this));
};
