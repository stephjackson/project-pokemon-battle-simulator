//Object to hold attacks.
var attack = {
  bodySlam: {
    name:     "Body Slam",
    type:     "normal",
    stat:     "attack",
    power:    85,
    accuracy: 100
  },
  earthquake: {
    name:     "Earthquake",
    type:     "ground",
    stat:     "attack",
    power:    100,
    accuracy: 100
  },
  blizzard: {
    name:     "Blizzard",
    type:     "ice",
    stat:     "special",
    power:    120,
    accuracy: 70
  },
  hyperBeam: {
    name:     "Hyper Beam",
    type:     "normal",
    stat:     "attack",
    power:    150,
    accuracy: 100
  },
  rockSlide: {
    name:     "Rock Slide",
    type:     "rock",
    stat:     "attack",
    power:    75,
    accuracy: 90
  },
};

//First value is attack type, second value is defense multiplier
var typeChart = {
  normal: {
    normal: 1,
    ground: 1,
    rock:   .5,
    ice:    1,
    none:   1
  },
  ground: {
    normal: 1,
    ground: 1,
    rock:   2,
    ice:    1,
    none:   1
  },
  rock: {
    normal: 1,
    ground: .5,
    rock:   1,
    ice:    2,
    none:   1 
  },
  ice: {
    normal: 1,
    ground: 2,
    rock:   1,
    ice:    .5,
    none:   1 
  }
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
  this.moves       = [attack.bodySlam, attack.earthquake, attack.hyperBeam, attack.rockSlide],
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
  this.moves       = [attack.bodySlam, attack.earthquake, attack.blizzard, attack.hyperBeam],
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
  this.switchChoice;
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
  var hit = this.checkHit(move);
  if (hit === false) {
    return 0;
  }
  var damage = this.baseDamage(attacker, move, opponent);
  var STAB = this.findSTAB(attacker, move);
  var random = this.damageRNG();
  var effectiveness = this.effectiveness(move, opponent);
  var crit = this.critCheck()
  damage = damage * STAB * effectiveness * random * crit;
  return Math.round(damage);
}

Battle.prototype.checkHit = function(move) {
  var hitBool = true;
  var hit = Math.floor(Math.random() * 100 - move.accuracy);
  if (hit > 0) {
    hitBool = false;
  }
  return hitBool;
}

Battle.prototype.baseDamage = function(attacker, move, opponent) {
  var damage = 0;
  if (move.stat === "attack") {
    damage = (42 * move.power * attacker.attack / opponent.defense / 50 + 2)
  } else if (move.stat === "special") {
    damage = (42 * move.power * attacker.special / opponent.special / 50 + 2)
  } else {
    console.log("Prolly a status move!");
  }
  return damage;
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
    this.eventString += "Critical hit!\n";
    damage = 2;
  }
  return damage;
}

Battle.prototype.showMoves = function(currentPokemon, currentTeam) {
  var string = "\nChoose a move: "
  currentPokemon.moves.forEach(function(move, i){
    string += (i + 1) + ": " + move.name + " ";
    if (i === 1) {
      string += "\n";
    }
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
Battle.prototype.switch = function(playerTeam, switchInput) {
  var temp = playerTeam[0];
  playerTeam[0] = playerTeam[switchInput];
  var string = "Player switched " + temp.name + " with " + playerTeam[0].name + "!";
  playerTeam[switchInput] = temp;
  return string;
}

Battle.prototype.switchOnFaint = function(playerTeam, switchInput) {
  var temp = playerTeam[0];
  playerTeam[0] = playerTeam[switchInput];
  var string = "Go! " + playerTeam[0].name + "!";
  playerTeam[switchInput] = temp;
  return string;
}

//Handles switching on faint.
Battle.prototype.deadSwitch = function(playerTeam, whoAttacks) {
  playerTeam.shift();
  var won = this.winnerCheck(playerTeam);
  if (won === true) {
    battle.gameOver = true;
    this.turnPhase = 3;
    return;
  }
  if (whoAttacks === false) {
    this.turnPhase = 4;
    return;
    // var switchInput = this.switchText(playerTeam, 0);
    // var temp = playerTeam[0];
    // playerTeam[0] = playerTeam[switchInput - 1];
    // playerTeam[switchInput - 1] = temp;
    // this.eventString += "You sent out " + playerTeam[0].name + "!\n";
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
  if (attackDamage > 0) {
    this.eventString += attackString + attacker.name + " dealt " + attackDamage + " damage to " + defender.name + "!\n";
  } else {
    this.eventString += "It missed!\n";
  }
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
  var opponentsMove = battle.opponentMove(battle.opponentTeam[0]);
  if (battle.turnPhase === 0 && battle.gameOver === false) {
    if (e.key > 0 && e.key < 6 && battle.playerTeam.length > 1) {
      battle.pickedMove = e.key;
      battle.turnPhase++;
      if (battle.pickedMove == 5) {
        battle.turnPhase++;
        battle.eventString += battle.showSwitch(battle.playerTeam, 1);
        battleCanvas.drawBoard(battle.eventString, 
          battle.playerTeam[0].backSprite, 
          battle.opponentTeam[0].frontSprite, 
          battle.playerTeam[0].health, 
          battle.playerTeam[0].maxHealth, 
          battle.playerTeam[0].name,
          battle.opponentTeam[0].name,
          battle.opponentTeam[0].health);
        battle.clearEventString();
      }
    } else if (e.key > 0 && e.key < 5) {
      battle.pickedMove = e.key;
      battle.turnPhase++;
    } else {
      console.log("Something went wrong!");
    }
  } else if (battle.turnPhase === 1 && battle.gameOver === false) {
    //Opponent picks move
    //Check speed
    battle.pickedMove = battle.playerTeam[0].moves[battle.pickedMove - 1];
    var playerGoesFirst = battle.checkSpeed(battle.playerTeam[0], battle.opponentTeam[0]);
    var died = false;
    //Faster goes first
    if (playerGoesFirst === true && battle.pickedMove != 5) {
      died = battle.attack(battle.playerTeam[0], battle.opponentTeam[0], battle.pickedMove, battle.opponentTeam, true);
      if (battle.opponentTeam.length > 0 && died === false && battle.opponentTeam[0].health > 0) {
        battle.attack(battle.opponentTeam[0], battle.playerTeam[0], opponentsMove, battle.playerTeam, false);
      }
    } else {
      died = battle.attack(battle.opponentTeam[0], battle.playerTeam[0], opponentsMove, battle.playerTeam, false);
      if (battle.playerTeam.length > 0 && battle.pickedMove != 5 && died === false && battle.playerTeam[0].health > 0) {
        battle.attack(battle.playerTeam[0], battle.opponentTeam[0], battle.pickedMove, battle.opponentTeam, true);
      }
    } if (battle.gameOver === false && battle.turnPhase != 4) {
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
  } else if (battle.turnPhase === 2 && battle.gameOver === false) {
    if (e.key > 0 && e.key < battle.playerTeam.length) {
      battle.switchChoice = e.key;
      this.eventString += battle.switch(battle.playerTeam, battle.switchChoice);
      battle.attack(battle.opponentTeam[0], battle.playerTeam[0], opponentsMove, battle.playerTeam, false);
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
    } else {
      console.log ("Something went wrong!");
    }
  } else if (battle.turnPhase === "dead" && battle.gameOver === false) {
    if (e.key >= 0 && e.key <= battle.playerTeam.length) {
      battle.switchChoice = e.key - 1;
      battle.eventString += battle.switchOnFaint(battle.playerTeam, battle.switchChoice);
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
  if (battle.turnPhase === 3) {
    if (battle.playerTeam.length === 0) {
      battle.eventString += "\nYou lost! You whited out!";
    } else if (battle.opponentTeam.length === 0) {
      battle.eventString += "\nYou won! You got 6435$ for winning!";
    } else {
      console.log("Something bad happened!");
    }
      battleCanvas.drawBoard(battle.eventString, 
        "img/RGB_Red_Back.png", 
        "img/Spr_RG_Blue_3.png", 
        0, 
        0, 
        "Red",
        "Blue",
        0);
      battle.clearEventString();
      battle.turnPhase = 10;
    }
    if (battle.turnPhase === 4) {
      battle.eventString += "\nWho would you like to send out?\n";
      battle.eventString += battle.showSwitch(battle.playerTeam, 0);
      battleCanvas.drawBoard(battle.eventString, 
        "img/RGB_Red_Back.png", 
        battle.opponentTeam[0].frontSprite, 
        battle.playerTeam[0].health, 
        battle.playerTeam[0].maxHealth, 
        battle.playerTeam[0].name,
        battle.opponentTeam[0].name,
        battle.opponentTeam[0].health);
      battle.clearEventString();
      battle.turnPhase = "dead";
    }
  }