function Star(el, count, callback) {
  this.el = el;
  this.active = -1;
  this.count = count;
  this.callback = callback;
  this.element = document.querySelector(this.el);

  this.init();
  this.bindEvents();
}

Star.prototype.init = function (params) {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < this.count; i++) {
    const ele = document.createElement("i");
    ele.classList.add("fa");
    ele.classList.add("fa-star-o");
    ele.setAttribute("data-rating", i + 1);
    fragment.appendChild(ele);
  }

  this.element.appendChild(fragment);
};

Star.prototype.bindEvents = function (params) {
  this.element.addEventListener("click", this.onClick.bind(this));
  this.element.addEventListener("mouseover", this.onMouseOver.bind(this));
  this.element.addEventListener("mouseleave", this.onMouseLeave.bind(this));
};

Star.prototype.fill = function (rating) {
  for (let i = 0; i < this.count; i++) {
    if (i < rating) {
      this.element.children[i].classList.add("fa-star");
      this.element.children[i].classList.remove("fa-star-o");
    } else {
      this.element.children[i].classList.add("fa-star-o");
      this.element.children[i].classList.remove("fa-star");
    }
  }
};

Star.prototype.onMouseOver = function (e) {
  this.fill(e.target.dataset.rating || this.active);
};

Star.prototype.onMouseLeave = function (e) {
  this.fill(this.active);
};

Star.prototype.onClick = function (e) {
  this.active = e.target.dataset.rating;
  this.callback(this.active);
};
