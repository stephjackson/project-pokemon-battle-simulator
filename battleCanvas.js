function BattleCanvas() {
  this.canvas = document.getElementById("battlefield");
  this.ctx = this.canvas.getContext("2d");
  this.fontName = "PokemonGB";
}

BattleCanvas.prototype.drawBoard = function(string, pokemon1, pokemon2, curHealth, maxHealth, myName, oppName, oppHealth, myStatus, oppStatus) {
  var background = new Image();
  var player = new Image();
  var opponent = new Image();
  var x = 30, y = 426;
  this.ctx.font = "12px PokemonGB";
  background.src = "img/battlefield.png";
  player.src = pokemon1;
  opponent.src = pokemon2;
  that = this;
  string = string.split("\n");
  background.addEventListener("load", function() {
    that.ctx.drawImage(background, 0, 0);
    for (var i = 0; i < string.length; i++) {
      that.ctx.fillText(string[i], x, y);
      y += 20;
    }
    that.ctx.font = "19px PokemonGB";
    that.ctx.fillText(curHealth, 395, 348);
    that.ctx.fillText(maxHealth, 475, 348);
    that.ctx.fillText("HP:" + oppHealth, 168, 56);
    if (oppStatus !== "NON") {
      that.ctx.fillText(oppStatus, 292, 56);
    }
    that.ctx.fillText(myName, 324, 284);
    if (myStatus !== "NON") {
      that.ctx.fillText(myStatus, 524, 284);
    }
    that.ctx.fillText(oppName, 4, 56);
    which = that;
    player.addEventListener("load", function() {
      which.ctx.drawImage(player, 20, 168, 224, 224);
    })
    opponent.addEventListener("load", function() {
      which.ctx.drawImage(opponent, 417, 0, 224, 224);
    })
  });
}