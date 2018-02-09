function BattleCanvas() {
  this.canvas = document.getElementById("battlefield");
  this.ctx = this.canvas.getContext("2d");
  this.fontName = "PokemonGB";
}

BattleCanvas.prototype.titleScreen = function() {
  var background = new Image();
  background.src = "img/titlescreen.png";
  that = this;
  background.addEventListener("load", function() {
    that.ctx.drawImage(background, 0, 0);
  });
}

BattleCanvas.prototype.drawBoard = function(string, pokemon1, pokemon2, curHealth, maxHealth, myName, oppName, oppHealth, myStatus, oppStatus, oppMaxHealth, myTeamLength, oppTeamLength) {
  var background = new Image();
  var player = new Image();
  var opponent = new Image();
  var ball = new Image();
  var x = 30, y = 426;
  this.ctx.font = "12px PokemonGB";
  background.src = "img/battlefield.png";
  ball.src = "img/pokeball.png";
  this.ctx.fillStyle = "#000000";
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
    if (oppStatus !== "NON" && oppStatus !== undefined) {
      that.ctx.fillText(oppStatus, 292, 56);
    }
    that.ctx.fillText(myName, 324, 284);
    if (myStatus !== "NON" && oppStatus !== undefined) {
      that.ctx.fillText(myStatus, 524, 284);
    }
    that.ctx.fillText(oppName, 44, 56);
    which = that;
    console.log(oppTeamLength, myTeamLength)
    ball.addEventListener("load", function() {
      for (var i = 0; i < oppTeamLength; i++) {
        which.ctx.drawImage(ball, 124 + (i * 28), 100, 24, 24)
      }
      for (var i = 0; i < myTeamLength; i++) {
        which.ctx.drawImage(ball, 392 + (i * 28), 356, 24, 24)
      }
    })
    that.ctx.fillStyle = "#848484";
    var myHealthLength = (192 * curHealth / maxHealth);
    var oppHealthLength = (192 * oppHealth / oppMaxHealth);
    that.ctx.fillRect(128,76,oppHealthLength,8)
    that.ctx.fillRect(384,300,myHealthLength,8)
    player.onload = function() {
      which.ctx.drawImage(player, 20, 168, 224, 224);
    };
    opponent.onload = function() {
      which.ctx.drawImage(opponent, 417, 0, 224, 224);
    };
  });
}