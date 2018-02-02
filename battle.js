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
function Tauros() {
  this.name       = "Tauros",
  this.type1      = "normal",
  this.type2      = "none", 
  this.health     = 353, 
  this.attack     = 298, 
  this.defense    = 288, 
  this.special    = 238, 
  this.speed      = 318,
  this.moves      = [attack.bodySlam, attack.earthquake]
};

function Rhydon() {
  this.name       = "Rhydon",
  this.type1      = "ground",
  this.type2      = "rock", 
  this.health     = 413, 
  this.attack     = 358, 
  this.defense    = 338, 
  this.special    = 188, 
  this.speed      = 178,
  this.moves      = [attack.bodySlam, attack.earthquake]
};

//The main battle function constructor.
function Battle() {
  this.playerTeam = [];
  this.opponentTeam = [];
};

//Pushes Pokemon to both the player's team array and the opponents.
Battle.prototype.createTeams = function(playerTeam, opponentTeam) {
  playerTeam.push(rhydon);
  opponentTeam.push(tauros);
};

//Calculates the damage of a Pokemon using a move on an opponent.
Battle.prototype.calculateDamage = function(attacker, move, opponent) {
  var damage = (42 * move.power * attacker.attack / opponent.defense / 50 + 2);
  var STAB = battle.findSTAB(attacker, move);
  var random = battle.damageRNG();
  var effectiveness = battle.effectiveness(move, opponent);
  damage = damage * STAB * effectiveness * random;
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

//Prompt to pick a move.
Battle.prototype.pickMove = function(currentPokemon) {
  return currentPokemon.moves[prompt("Pick a move (Keys: 1, 2)") - 1]
}

//Randomly picks opponent's move.
Battle.prototype.opponentMove = function(opponent) {
  var random = Math.floor(Math.random() * opponent.moves.length);
  return opponent.moves[random];
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

Battle.prototype.checkFaint = function(player) {
  return (player.health < 0);
}

//Object declarations to create objects to fill out teams.
var battle = new Battle();
var tauros = new Tauros();
var rhydon = new Rhydon();
battle.createTeams(battle.playerTeam, battle.opponentTeam);

//Status update
while (battle.playerTeam.length > 0 && battle.opponentTeam.length > 0)
{
  console.log("Current Pokemon: " + battle.playerTeam[0].name + " Health: " + battle.playerTeam[0].health);
  console.log("Opponent Pokemon: " + battle.opponentTeam[0].name + " Health: " + battle.opponentTeam[0].health);
  //Pick move
  console.log("Pick a move: ")
  console.log("1. " + battle.playerTeam[0].moves[0].name);
  console.log("2. " + battle.playerTeam[0].moves[1].name);
  var pickedMove = battle.pickMove(battle.playerTeam[0]);
  //Opponent picks move
  var opponentsMove = battle.opponentMove(battle.opponentTeam[0]);
  //Check speed
  var playerGoesFirst = battle.checkSpeed(battle.playerTeam[0], battle.opponentTeam[0]);
  var playerDamage = battle.calculateDamage(battle.playerTeam[0], pickedMove, battle.opponentTeam[0]);
  var opponentDamage = battle.calculateDamage(battle.opponentTeam[0], opponentsMove, battle.playerTeam[0])
  //Faster goes first
  if (playerGoesFirst === true) {
    console.log(battle.playerTeam[0].name + " used " + pickedMove.name + "!");
    console.log(battle.playerTeam[0].name + " dealt " + playerDamage + " damage to " + battle.opponentTeam[0].name);
    battle.opponentTeam[0].health -= playerDamage;
    console.log("Enemy " + battle.opponentTeam[0].name + " has " + battle.opponentTeam[0].health + " health remaining.")
    console.log("Enemy " + battle.opponentTeam[0].name + " used " + opponentsMove.name + "!");
    console.log("Enemy " + battle.opponentTeam[0].name + " dealt " + opponentDamage + " damage to " + battle.playerTeam[0].name);
    battle.playerTeam[0].health -= opponentDamage;
    console.log(battle.playerTeam[0].name + " has " + battle.playerTeam[0].health + " health remaining.")
  } else {
    console.log("Enemy " + battle.opponentTeam[0].name + " used " + opponentsMove.name + "!");
    console.log("Enemy " + battle.opponentTeam[0].name + " dealt " + opponentDamage + " damage to " + battle.playerTeam[0].name);
    battle.playerTeam[0].health -= opponentDamage;
    console.log(battle.playerTeam[0].name + " has " + battle.playerTeam[0].health + " health remaining.")
    console.log(battle.playerTeam[0].name + " used " + pickedMove.name + "!");
    console.log(battle.playerTeam[0].name + " dealt " + playerDamage + " damage to " + battle.opponentTeam[0].name);
    battle.opponentTeam[0].health -= playerDamage;
    console.log("Enemy " + battle.opponentTeam[0].name + " has " + battle.opponentTeam[0].health + " health remaining.")
  }
  //If someone dies, remove from team array
  //If team array length is zero, declare winner
  //Slower goes second
  //(again)
  //If someone dies, remove from team array
  //If team array length is zero, declare winner
  //Loop until someone dies
}
