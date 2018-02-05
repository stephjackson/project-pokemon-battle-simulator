//Object to hold attacks.
var attack = {
  bodySlam: {
    name:     "Body Slam",
    type:     "normal",
    power:    85,
    accuracy: 100
  },
  earthquake: {
    name:     "Earthquake",
    type:     "ground",
    power:    100,
    accuracy: 100
  }
};

//First value is attack type, second value is defense multiplier
var typeChart = {
  normal: {
    normal: 1,
    ground: 1,
    rock:   .5,
    none:   1
  },
  ground: {
    normal: 1,
    ground: 1,
    rock:   2,
    none:   1
  },
  rock: {
    normal: 1,
    ground: .5,
    rock:   1,
    none:   1 
  },
}

//Pokemon constructors
function Rhydon() {
  this.name        = "Rhydon",
  this.type1       = "ground",
  this.type2       = "rock", 
  this.health      = 413, 
  this.maxHealth   = 413,
  this.attack      = 358, 
  this.defense     = 338, 
  this.special     = 188, 
  this.speed       = 178,
  this.moves       = [attack.bodySlam, attack.earthquake],
  this.frontSprite = "img/Spr_1b_112.png",
  this.backSprite  = "img/Spr_b_g1_112.png"
};

function Tauros() {
  this.name        = "Tauros",
  this.type1       = "normal",
  this.type2       = "none", 
  this.health      = 353, 
  this.maxHealth   = 353,
  this.attack      = 298, 
  this.defense     = 288, 
  this.special     = 238, 
  this.speed       = 318,
  this.moves       = [attack.bodySlam, attack.earthquake],
  this.frontSprite = "img/Spr_1b_128.png",
  this.backSprite  = "img/Spr_b_g1_128.png"
};

//The main battle function constructor.
function Battle() {
  this.playerTeam = [];
  this.opponentTeam = [];
  this.turnPhase = 0;
  this.pickedMove;
  this.gameOver = false;
  this.eventString = "";
};

Battle.prototype.clearEventString = function() {
  this.eventString = "";
}

//Pushes Pokemon to both the player's team array and the opponents.
Battle.prototype.createTeams = function(playerTeam, opponentTeam) {
  playerTeam.push(rhydonP);
  playerTeam.push(taurosP);
  opponentTeam.push(taurosO);
  opponentTeam.push(rhydonO);
};

//Calculates the damage of a Pokemon using a move on an opponent.
Battle.prototype.calculateDamage = function(attacker, move, opponent) {
  var damage = (42 * move.power * attacker.attack / opponent.defense / 50 + 2);
  var STAB = this.findSTAB(attacker, move);
  var random = this.damageRNG();
  var effectiveness = this.effectiveness(move, opponent);
  var crit = this.critCheck()
  damage = damage * STAB * effectiveness * random * crit;
  return Math.round(damage);
}

//Pokemon of a given type using attacks with the same type get a bonus of 1.5x to the attack.
Battle.prototype.findSTAB = function(attacker, attack) {
  var STAB = 1;

  if (attacker.type1 === attack.type) {
    STAB *= 1.5;
  }
  if (attacker.type2 === attack.type) {
    STAB *= 1.5;
  }

  return STAB;
}

//A random number generator for damage.
Battle.prototype.damageRNG = function() {
  return Math.floor(Math.random() * 15 + 85) / 100;
}

//Calculates damage modifier based on typing - see typeChart for more details.
Battle.prototype.effectiveness = function(move, opponent) {
  var effectiveness = 1;
  effectiveness *= typeChart[move.type][opponent.type1]
  effectiveness *= typeChart[move.type][opponent.type2]
  return effectiveness;
}

//Checks if an attack has critted (random chance for double damage).
Battle.prototype.critCheck = function() {
  var damage = 1;
  if ((Math.floor(Math.random() * 16 + 1) === 16)){
    damage = 2;
  }
  return damage;
}

Battle.prototype.showMoves = function(currentPokemon, currentTeam) {
  var string = "\n"
  currentPokemon.moves.forEach(function(move, i){
    string += (i + 1) + ": " + move.name + " ";
  });

  string += "5: Switch";

  return string;
}

//Prompt to pick a move.
Battle.prototype.pickMove = function(currentPokemon, currentTeam) {
  this.showMoves(currentPokemon, currentTeam);
  var input = -1;
  document.onkeypress = function(e) {
      input = e.key;
    }
  return input;
}

//Randomly picks opponent's move.
Battle.prototype.opponentMove = function(opponent) {
  var random = Math.floor(Math.random() * opponent.moves.length);
  return opponent.moves[random];
}

//Handles chosen switching.
Battle.prototype.switch = function(playerTeam) {
  var switchInput = this.switchText(playerTeam, 1);
  var temp = playerTeam[0];
  playerTeam[0] = playerTeam[switchInput];
  console.log("Player switched " + temp.name + " with " + playerTeam[0].name + "!");
  playerTeam[switchInput] = temp;
}

//Handles switching on faint.
Battle.prototype.deadSwitch = function(playerTeam, whoAttacks) {
  playerTeam.shift();
  var won = this.winnerCheck(playerTeam);
  if (won === true) {
    return;
  }
  if (whoAttacks === false) {
    var switchInput = this.switchText(playerTeam, 0);
    var temp = playerTeam[0];
    playerTeam[0] = playerTeam[switchInput - 1];
    playerTeam[switchInput - 1] = temp;
    this.eventString += "You sent out " + playerTeam[0].name + "!\n";
  } 
  else {
    this.eventString += "Enemy sent out " + playerTeam[0].name + "!\n";
  }
}

//Gives the prompt to switch.
Battle.prototype.switchText = function(playerTeam, startIndex) {
  console.log("Pick a pokemon to switch to: \n");
  var switchInput = prompt(this.showSwitch(playerTeam, startIndex));
  return switchInput;
}

//Shows switch options in prompt.
Battle.prototype.showSwitch = function(playerTeam, startIndex) {
  var string = "";
  var add = 0;
  if (startIndex === 0) {
    add = 1;
  }
  for (var i = startIndex; i < playerTeam.length; i++) {
    string += (i + add) + ": " + playerTeam[i].name + "\n";
  }

  return string;
}

//Returns the faster of two Pokemon.
Battle.prototype.checkSpeed = function(player, opponent) {
  var faster = true;
  if (player.speed === opponent.speed) {
    var coinFlip = Math.floor(Math.random() * 2);
    if (coinFlip === 0) {
      faster = false;
    }
  }
  faster = (player.speed > opponent.speed);
  return faster;
}

//Checks if a defending Pokemon has fainted.
Battle.prototype.checkFaint = function(player) {
  return (player.health < 0);
}

//Attack logic - calculates damage, outputs strings based on results, checks for fainting.
Battle.prototype.attack = function(attacker, defender, pickedMove, defenderTeam, whoAttacks) {
  var died = false;
  var attackString = "";
  var defenderString = "";
  if (whoAttacks === true) {
    defenderString = "Enemy ";
  } else {
    attackString = "Enemy ";
  }
  var attackDamage = battle.calculateDamage(attacker, pickedMove, defender);
  this.eventString += attackString + attacker.name + " used " + pickedMove.name + "!\n";
  defender.health -= attackDamage;
  this.eventString += attackString + attacker.name + " dealt " + attackDamage + " damage to " + defender.name + "!\n";
  var defenderFaint = this.checkFaint(defender);
  if (defenderFaint === true) {
    died = true;
    this.eventString += defenderString + defender.name + " has fainted! ";
    this.deadSwitch(defenderTeam, whoAttacks);
  }
  return died;
}

//Checks to see if you won on faint.
Battle.prototype.winnerCheck = function(defenderTeam) {
  var won = false;
  if (defenderTeam.length === 0) {
    console.log("Player has lost the game!");
    won = true;
  }
  return won;
}

//Status update
battleCanvas = new BattleCanvas();

var battle = new Battle();
var taurosP = new Tauros();
var rhydonP = new Rhydon();
var taurosO = new Tauros();
var rhydonO = new Rhydon();
battle.createTeams(battle.playerTeam, battle.opponentTeam);

battle.eventString += ("Enemy sent out " + battle.opponentTeam[0].name + "!\n");
battle.eventString += ("Go! " + battle.playerTeam[0].name + "!");
battle.eventString += battle.showMoves(battle.playerTeam[0], battle.playerTeam);
battleCanvas.drawBoard(battle.eventString, 
  battle.playerTeam[0].backSprite, 
  battle.opponentTeam[0].frontSprite, 
  battle.playerTeam[0].health, 
  battle.playerTeam[0].maxHealth, 
  battle.playerTeam[0].name,
  battle.opponentTeam[0].name,
  battle.opponentTeam[0].health);
battle.clearEventString();

document.onkeypress = function(e) {
  if (battle.turnPhase === 0 && battle.gameOver === false && battle.playerTeam.length > 0 && battle.opponentTeam.length > 0) {
    if (e.key > 0 && e.key < 6) {
      battle.pickedMove = e.key;
      console.log(battle.pickedMove);
      battle.turnPhase++;
    }
  } else if (battle.turnPhase === 1 && battle.gameOver === false && battle.playerTeam.length > 0 && battle.opponentTeam.length > 0) {
    //Opponent picks move
    var opponentsMove = battle.opponentMove(battle.opponentTeam[0]);
    //Check speed
    if (battle.pickedMove == 5) {
      battle.switch(battle.playerTeam);
    } else {
      battle.pickedMove = battle.playerTeam[0].moves[battle.pickedMove - 1];
    }
    var playerGoesFirst = battle.checkSpeed(battle.playerTeam[0], battle.opponentTeam[0]);
    var died = false;
    //Faster goes first
    if (playerGoesFirst === true && battle.pickedMove != 5) {
      died = battle.attack(battle.playerTeam[0], battle.opponentTeam[0], battle.pickedMove, battle.opponentTeam, true);
      if (battle.opponentTeam.length > 0 && died === false) {
        battle.attack(battle.opponentTeam[0], battle.playerTeam[0], opponentsMove, battle.playerTeam, false);
      }
    } else {
      died = battle.attack(battle.opponentTeam[0], battle.playerTeam[0], opponentsMove, battle.playerTeam, false);
      if (battle.playerTeam.length > 0 && battle.pickedMove != 5 && died === false) {
        battle.attack(battle.playerTeam[0], battle.opponentTeam[0], battle.pickedMove, battle.opponentTeam, true);
      }
    }
    if (battle.gameOver === false) {
      //Pick move
      battle.eventString = battle.eventString.substring(0, battle.eventString.length - 1);
      battle.eventString += battle.showMoves(battle.playerTeam[0], battle.playerTeam);
      battleCanvas.drawBoard(battle.eventString, 
        battle.playerTeam[0].backSprite, 
        battle.opponentTeam[0].frontSprite, 
        battle.playerTeam[0].health, 
        battle.playerTeam[0].maxHealth, 
        battle.playerTeam[0].name,
        battle.opponentTeam[0].name,
        battle.opponentTeam[0].health);
      battle.clearEventString();
      battle.turnPhase = 0;
    }
  }
}

// while (battle.playerTeam.length > 0 && battle.opponentTeam.length > 0)
// {
//   console.log("Current Pokemon: " + battle.playerTeam[0].name + " Health: " + battle.playerTeam[0].health);
//   console.log("Opponent Pokemon: " + battle.opponentTeam[0].name + " Health: " + battle.opponentTeam[0].health);
//   //Pick move

//   var pickedMove = battle.pickMove(battle.playerTeam[0], battle.playerTeam);
//   //Opponent picks move
//   var opponentsMove = battle.opponentMove(battle.opponentTeam[0]);
//   //Check speed
//   if (pickedMove == 5) {
//     battle.switch(battle.playerTeam);
//   } else {
//     pickedMove = battle.playerTeam[0].moves[pickedMove - 1];
//   }
//   var playerGoesFirst = battle.checkSpeed(battle.playerTeam[0], battle.opponentTeam[0]);
//   var died = false;
//   //Faster goes first
//   if (playerGoesFirst === true && pickedMove != 5) {
//     died = battle.attack(battle.playerTeam[0], battle.opponentTeam[0], pickedMove, battle.opponentTeam, true);
//     if (battle.opponentTeam.length > 0 && died === false) {
//       battle.attack(battle.opponentTeam[0], battle.playerTeam[0], opponentsMove, battle.playerTeam, false);
//     }
//   } else {
//     died = battle.attack(battle.opponentTeam[0], battle.playerTeam[0], opponentsMove, battle.playerTeam, false);
//     if (battle.playerTeam.length > 0 && pickedMove != 5 && died === false) {
//       battle.attack(battle.playerTeam[0], battle.opponentTeam[0], pickedMove, battle.opponentTeam, true);
//     }
//   }
// }
