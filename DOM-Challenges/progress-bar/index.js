function ProgressBar(selector, timePeriod, req) {
  this.timePeriod = timePeriod;
  this.req = req;
  this.inQueue = 0;

  const container = document.querySelector(selector);

  const progressBar = document.createElement("progress");
  progressBar.value = 0;
  progressBar.max = 100;
  container.appendChild(progressBar);
  this.progressBar = progressBar;

  const runButton = document.createElement("button");
  runButton.innerText = "RUN (0)";
  container.appendChild(runButton);
  this.runButton = runButton;

  this.bindEvents();
}

ProgressBar.prototype.init = function () {
  this.progressBar.value = 0;

  const intervalID = setInterval(() => {
    this.runButton.innerText = `RUN (${this.inQueue - 1})`;

    if (this.progressBar.value === 100) {
      if (this.inQueue > 0) {
        this.inQueue--;
      }
      clearInterval(intervalID);
    }

    this.progressBar.value += 1;
  }, this.timePeriod / 100);
};

ProgressBar.prototype.run = function () {
  setTimeout(() => {
    this.init();
  }, this.inQueue * this.timePeriod);

  this.inQueue++;
  this.runButton.innerText = `RUN (${this.inQueue - 1})`;
};

ProgressBar.prototype.bindEvents = function () {
  this.runButton.addEventListener("click", this.run.bind(this));
};
