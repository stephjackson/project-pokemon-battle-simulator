window.onload = function() {
//Object to hold attacks.
var attack = {
  agility: {
    name:     "Agility",
    type:     "psychic",
    stat:     3,
    statName: "speed",
    origStat: "startSpd",
    mech:     "stat",
    stage:    2,
    accuracy: 100,
  },
  blizzard: {
    name:     "Blizzard",
    type:     "ice",
    stat:     "special",
    mech:     "attack",
    mech2:    "status",
    effect:   "FRZ",
    chance:   10,
    power:    120,
    accuracy: 90
  },
  bodySlam: {
    name:     "Body Slam",
    type:     "normal",
    stat:     "attack",
    mech:     "attack",
    mech2:    "status",
    effect:   "PAR",
    chance:   30,
    power:    85,
    accuracy: 100
  },
  drillPeck: {
    name:     "Drill Peck",
    type:     "flying",
    stat:     "attack",
    mech:     "attack",
    chance:   0,
    power:    80,
    accuracy: 100
  },
  earthquake: {
    name:     "Earthquake",
    type:     "ground",
    stat:     "attack",
    mech:     "attack",
    chance:   0,
    power:    100,
    accuracy: 100
  },
  hyperBeam: {
    name:     "Hyper Beam",
    type:     "normal",
    stat:     "attack",
    mech:     "attack",
    chance:   0,
    power:    150,
    accuracy: 100
  },
  psychic: {
    name:     "Psychic",
    type:     "psychic",
    stat:     "special",
    mech:     "attack",
    chance:   0,
    power:    90,
    accuracy: 100
  },
  recover: {
    name:     "Recover",
    type:     "normal",
    statName: "health",
    mech:     "stat"
  },
  reflect: {
    name:     "Reflect",
    type:     "psychic",
    stat:     1,
    statName: "defense",
    origStat: "startDef",
    mech:     "stat",
    stage:    2,
    accuracy: 100,
  },
  rockSlide: {
    name:     "Rock Slide",
    type:     "rock",
    stat:     "attack",
    mech:     "attack",
    mech2:    "",
    chance:   0,
    power:    75,
    accuracy: 90
  },
  softboiled: {
    name:     "Softboiled",
    type:     "normal",
    statName: "health",
    mech:     "stat"
  },
  thunderbolt: {
    name:     "Thunderbolt",
    type:     "electric",
    stat:     "special",
    mech:     "attack",
    mech2:    "status",
    effect:   "PAR",
    chance:   10,
    power:    95,
    accuracy: 100
  },
  thunderWave: {
    name:     "Thunder Wave",
    type:     "electric",
    mech:     "status",
    effect:   "PAR",
    chance:   100,
    target:   "opponent",
    accuracy: 100
  }
};

//First value is attack type, second value is defense multiplier
var typeChart = {
  normal: {
    normal:   1,
    flying:   1,
    ground:   1,
    rock:     .5,
    electric: 1,
    psychic:  1,
    ice:      1,
    none:     1
  },
  flying: {
    normal:   1,
    flying:   1,
    ground:   1,
    rock:     .5,
    electric: .5,
    psychic:  1,
    ice:      1,
    none:     1
  },
  ground: {
    normal:   1,
    flying:   0,
    ground:   1,
    rock:     2,
    electric: 2,
    psychic:  1,
    ice:      1,
    none:     1
  },
  rock: {
    normal:   1,
    flying:   2,
    ground:   .5,
    rock:     1,
    electric: 1,
    psychic:  1,
    ice:      2,
    none:     1 
  },
  electric: {
    normal:   1,
    flying:   2,
    ground:   0,
    rock:     1,
    electric: .5,
    psychic:  1,
    ice:      1,
    none:     1 
  },
  psychic: {
    normal:   1,
    flying:   1,
    ground:   1,
    rock:     1,
    electric: 1,
    psychic:  .5,
    ice:      1,
    none:     1 
  },
  ice: {
    normal:   1,
    flying:   2,
    ground:   2,
    rock:     1,
    electric: 1,
    psychic:  1,
    ice:      .5,
    none:     1 
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
  this.startAtt    = 358, 
  this.defense     = 338, 
  this.startDef    = 338, 
  this.special     = 188, 
  this.startSpec   = 188, 
  this.speed       = 178,
  this.startSpd    = 178,
  this.statStages  = [0,0,0,0],
  this.status      = "NON",
  this.turnStat    = 0,
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
  this.startAtt    = 298,
  this.defense     = 288, 
  this.startDef    = 288,
  this.special     = 238, 
  this.startSpec   = 238,
  this.speed       = 318,
  this.startSpd    = 318,
  this.statStages  = [0,0,0,0],
  this.status      = "NON",
  this.turnStat    = 0,
  this.moves       = [attack.bodySlam, attack.earthquake, attack.blizzard, attack.hyperBeam],
  this.frontSprite = "img/Spr_1b_128.png",
  this.backSprite  = "img/Spr_b_g1_128.png"
};

function Alakazam() {
  this.name        = "Alakazam",
  this.type1       = "psychic",
  this.type2       = "none", 
  this.health      = 313, 
  this.maxHealth   = 313,
  this.attack      = 198, 
  this.startAtt    = 198, 
  this.defense     = 188, 
  this.startDef    = 188, 
  this.special     = 368, 
  this.startSpec   = 368, 
  this.speed       = 338,
  this.startSpd    = 338,
  this.statStages  = [0,0,0,0],
  this.status      = "NON",
  this.turnStat    = 0,
  this.moves       = [attack.psychic, attack.reflect, attack.recover, attack.thunderWave],
  this.frontSprite = "img/Spr_1b_065.png",
  this.backSprite  = "img/Spr_b_g1_065.png"
}

function Zapdos() {
  this.name        = "Zapdos",
  this.type1       = "electric",
  this.type2       = "flying", 
  this.health      = 383, 
  this.maxHealth   = 383,
  this.attack      = 278, 
  this.startAtt    = 278, 
  this.defense     = 268, 
  this.startDef    = 268, 
  this.special     = 348, 
  this.startSpec   = 348, 
  this.speed       = 298,
  this.startSpd    = 298,
  this.statStages  = [0,0,0,0],
  this.status      = "NON",
  this.turnStat    = 0,
  this.moves       = [attack.thunderbolt, attack.drillPeck, attack.thunderWave, attack.agility],
  this.frontSprite = "img/Spr_1b_145.png",
  this.backSprite  = "img/Spr_b_g1_145.png"
}


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
  playerTeam.push(zapdosP);
  playerTeam.push(taurosP);
  playerTeam.push(zamP);
  playerTeam.push(rhydonP);
  opponentTeam.push(zapdosO);
  opponentTeam.push(zamO);
  opponentTeam.push(taurosO);
  opponentTeam.push(rhydonO);
};

//Calculates the damage of a Pokemon using a move on an opponent.
Battle.prototype.calculateDamage = function(attacker, move, opponent, crit) {
  var damage = this.baseDamage(attacker, move, opponent);
  var STAB = this.findSTAB(attacker, move);
  var random = this.damageRNG();
  var effectiveness = this.effectiveness(move, opponent);
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
  if (Math.floor(Math.random() * 16 + 1) === 16){
    this.eventString = this.eventString.slice(0,this.eventString.length - 1);
    this.eventString += " Critical hit!\n";
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
  this.resetStats(playerTeam[0]);
  var temp = playerTeam[0];
  playerTeam[0] = playerTeam[switchInput];
  var string = "Player switched " + temp.name + " with " + playerTeam[0].name + "!";
  playerTeam[switchInput] = temp;
  this.resetStats(playerTeam[0]);
  return string;
}

Battle.prototype.resetStats = function(pokemon) {
  pokemon.attack = pokemon.startAtt;
  pokemon.defense = pokemon.startDef;
  pokemon.speed = pokemon.startSpd;
  pokemon.special = pokemon.startSpec;
  pokemon.statStages = [0,0,0,0];
  if (pokemon.status = "PAR") {
    pokemon.speed /= 2;
    pokemon.statStages[3] = -1;
  }
}

Battle.prototype.switchOnFaint = function(playerTeam, switchInput) {
  this.resetStats(playerTeam[0]);
  var temp = playerTeam[0];
  playerTeam[0] = playerTeam[switchInput];
  var string = "Go! " + playerTeam[0].name + "!";
  playerTeam[switchInput] = temp;
  this.resetStats(playerTeam[0]);
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
  } else {
    faster = (player.speed > opponent.speed);
  }
  return faster;
}

//Checks if a defending Pokemon has fainted.
Battle.prototype.checkFaint = function(defender, defenderString, whoAttacks, defenderTeam) {
  var defenderFaint = (defender.health <= 0);
  if (defenderFaint === true) {
    this.eventString += defenderString + defender.name + " has fainted! ";
    this.deadSwitch(defenderTeam, whoAttacks);
  }
  return defenderFaint;
}

//Attack logic - calculates damage, outputs strings based on results, checks for fainting.
Battle.prototype.attack = function(attacker, defender, pickedMove, defenderTeam, whoAttacks, attackString, defenderString) {
  var crit = this.critCheck()
  var attackDamage = battle.calculateDamage(attacker, pickedMove, defender, crit);
  defender.health -= attackDamage;
  if (attackDamage > 0) {
    this.eventString += attackString + attacker.name + " dealt " + attackDamage + " damage to " + defender.name + "!\n";
    if (pickedMove.mech2 = "status") {
      var filler = this.status(attacker, defender, pickedMove, defenderTeam, whoAttacks, attackString, defenderString)
    }
  } else {
    this.eventString += "It missed!\n";
  }
  return false;
}

Battle.prototype.stat = function(attacker, defender, pickedMove, defenderTeam, whoAttacks, attackString, defenderString) {
  if(pickedMove.statName === "health") {
    if (attacker.health >= attacker.maxHealth) {
      this.eventString += attackString + attacker.name + "'s health is full!\n"
    } else {
      attacker.health += Math.round(attacker.maxHealth / 2);
      if (attacker.health > attacker.maxHealth) {
        attacker.health = attacker.maxHealth;
      }
      this.eventString += attackString + attacker.name + " gained some health!\n"
    }
  } else if (attacker.statStages[pickedMove.stat] >= 6) {
    this.eventString += attackString + attacker.name + "'s " + pickedMove.statName + " is maxed out!\n"
  } else {
    attacker.statStages[pickedMove.stat] += pickedMove.stage;
    attacker[pickedMove.statName] = attacker[pickedMove.origStat] * ((attacker.statStages[pickedMove.stat] + 2) / 2);
    if (attacker.status === "PAR") {
      this.statusStat(attacker);
    }
    this.eventString += attacker.name + "'s " + pickedMove.statName + " increased!\n";
  }
  return false;
}

Battle.prototype.status = function(attacker, defender, pickedMove, defenderTeam, whoAttacks, attackString, defenderString) {
  if (defender.status !== "NON" && pickedMove.chance === 100) {
    this.eventString += "It failed!\n";
  } else {
    var chanceBool = true;
    var chance = Math.floor(Math.random() * 100 - pickedMove.chance);
    if (chance > 0) {
      chanceBool = false;
    }
    if (chanceBool === true) {
      defender.status = pickedMove.effect;
      if (defender.status === "PAR") {
        this.eventString += defenderString + defender.name + " is now paralyzed!\n";
        this.statusStat(defender);
      }
      if (defender.status === "FRZ") {
        this.eventString += defenderString + defender.name + " is frozen solid!\n";
      }
    }
  }
  return false;
}

Battle.prototype.statusStat = function(defender) {
  if (defender.status === "PAR") {
    defender.speed /= 2;
  }
}

Battle.prototype.attackRouter = function(attacker, defender, pickedMove, defenderTeam, whoAttacks, attackString, defenderString) {
  var died;
  var attackString = "";
  var defenderString = "";
  if (whoAttacks === true) {
    defenderString = "Enemy ";
  } else {
    attackString = "Enemy ";
  }
  this.eventString += attackString + attacker.name + " used " + pickedMove.name + "!\n";
  var skipMove = this.skippedMove(attacker, defender, pickedMove, defenderTeam, whoAttacks, attackString, defenderString)
  if(pickedMove.mech === "attack" && skipMove === true) {
    died = this.attack(attacker, defender, pickedMove, defenderTeam, whoAttacks, attackString, defenderString);
  } else if(pickedMove.mech === "stat" && skipMove === true) {
    died = this.stat(attacker, defender, pickedMove, defenderTeam, whoAttacks, attackString, defenderString)
  } else if(pickedMove.mech === "status" && skipMove === true) {
    died = this.status(attacker, defender, pickedMove, defenderTeam, whoAttacks, attackString, defenderString)
  } else {
    console.log("Something bad happened in the attack router!");
  }
  var died = this.checkFaint(defender, defenderString, whoAttacks, defenderTeam);
  return died;
}

Battle.prototype.skippedMove = function(attacker, defender, pickedMove, defenderTeam, whoAttacks, attackString, defenderString) {
  var canMove = true;
  if (attacker.status === "PAR") {
    var roll = Math.floor(Math.random() * 2)
    if (roll === 0) {
        canMove = false;
        this.eventString += attackString + attacker.name + " is paralyzed!\n";
      }
    } else if (attacker.status === "FRZ") {
    canMove = false;
    this.eventString += attackString + attacker.name + " is frozen solid!\n"
  } else {
    canMove = this.checkHit(pickedMove);
    if (canMove === false) {
      this.eventString += "It missed!\n"
    }
  }
  return canMove;
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
var battleCanvas = new BattleCanvas();
var battle = new Battle();
var zapdosP = new Zapdos();
var zapdosO = new Zapdos();
var taurosP = new Tauros();
var rhydonP = new Rhydon();
var taurosO = new Tauros();
var rhydonO = new Rhydon();
var zamP = new Alakazam();
var zamO = new Alakazam();
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
  battle.opponentTeam[0].health,
  battle.playerTeam[0].status,
  battle.opponentTeam[0].status,
  battle.opponentTeam[0].maxHealth);
battle.clearEventString();

document.onkeypress = function(e) {
  console.log(battle.playerTeam[0].speed);
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
          battle.opponentTeam[0].health,
          battle.playerTeam[0].status,
          battle.opponentTeam[0].status,
          battle.opponentTeam[0].maxHealth);
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
      died = battle.attackRouter(battle.playerTeam[0], battle.opponentTeam[0], battle.pickedMove, battle.opponentTeam, true);
      if (battle.opponentTeam.length > 0 && died === false && battle.opponentTeam[0].health > 0) {
        battle.attackRouter(battle.opponentTeam[0], battle.playerTeam[0], opponentsMove, battle.playerTeam, false);
      }
    } else {
      died = battle.attackRouter(battle.opponentTeam[0], battle.playerTeam[0], opponentsMove, battle.playerTeam, false);
      if (battle.playerTeam.length > 0 && battle.pickedMove != 5 && died === false && battle.playerTeam[0].health > 0) {
        battle.attackRouter(battle.playerTeam[0], battle.opponentTeam[0], battle.pickedMove, battle.opponentTeam, true);
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
        battle.opponentTeam[0].health,
        battle.playerTeam[0].status,
        battle.opponentTeam[0].status,
        battle.opponentTeam[0].maxHealth);
      battle.clearEventString();
      battle.turnPhase = 0;
    }
  } else if (battle.turnPhase === 2 && battle.gameOver === false) {
    if (e.key > 0 && e.key < battle.playerTeam.length) {
      battle.switchChoice = e.key;
      this.eventString += battle.switch(battle.playerTeam, battle.switchChoice);
      battle.attackRouter(battle.opponentTeam[0], battle.playerTeam[0], opponentsMove, battle.playerTeam, false);
      battle.eventString += battle.showMoves(battle.playerTeam[0], battle.playerTeam);
      battleCanvas.drawBoard(battle.eventString, 
        battle.playerTeam[0].backSprite, 
        battle.opponentTeam[0].frontSprite, 
        battle.playerTeam[0].health, 
        battle.playerTeam[0].maxHealth, 
        battle.playerTeam[0].name,
        battle.opponentTeam[0].name,
        battle.opponentTeam[0].health,
        battle.playerTeam[0].status,
        battle.opponentTeam[0].status,
        battle.opponentTeam[0].maxHealth);
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
        battle.opponentTeam[0].health,
        battle.playerTeam[0].status,
        battle.opponentTeam[0].status,
        battle.opponentTeam[0].maxHealth);
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
        0,
        "",
        "",
        0,
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
        battle.opponentTeam[0].health,
        battle.playerTeam[0].status,
        battle.opponentTeam[0].status,
        battle.opponentTeam[0].maxHealth);
      battle.clearEventString();
      battle.turnPhase = "dead";
    }
  }
}

