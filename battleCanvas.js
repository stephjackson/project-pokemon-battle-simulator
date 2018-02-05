function BattleCanvas() {
  this.canvas = document.getElementById("battlefield");
  this.ctx = this.canvas.getContext("2d");
  this.fontName = "PokemonGB";
}

BattleCanvas.prototype.drawBoard = function(string, pokemon1, pokemon2, curHealth, maxHealth, myName, oppName, oppHealth) {
  var background = new Image();
  var player = new Image();
  var opponent = new Image();
  var x = 30, y = 436;
  this.ctx.font = "16px Helvetica";
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
    that.ctx.font = "30px Helvetica";
    that.ctx.fillText(curHealth, 395, 348);
    that.ctx.fillText(maxHealth, 475, 348);
    that.ctx.fillText("HP: " + oppHealth, 160, 60);
    that.ctx.fillText(myName, 345, 285);
    that.ctx.fillText(oppName, 10, 55);
    which = that;
    player.addEventListener("load", function() {
      which.ctx.drawImage(player, 20, 168, 224, 224);
    })
    opponent.addEventListener("load", function() {
      which.ctx.drawImage(opponent, 417, 0, 224, 224);
    })
  });
}