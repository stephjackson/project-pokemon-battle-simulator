function BattleCanvas() {
  this.canvas = document.getElementById("battlefield");
  this.ctx = this.canvas.getContext("2d");
}

BattleCanvas.prototype.createBoard = function() {
  var background = new Image();
  background.src = "img/battlefield.png";
  // that = this;
  // background.addEventListener("load", function() {
    this.ctx.drawImage(background, 0, 0)
  // });
}