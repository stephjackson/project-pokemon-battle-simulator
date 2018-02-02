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
    rock:   .5
  },
  ground: {
    normal: 1,
    ground: 1,
    rock:   2
  },
  rock: {
    normal: 1,
    ground: .5,
    rock:   1   
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
  this.moves     = [attack.bodySlam, attack.earthquake]
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
  playerTeam.push(tauros);
  opponentTeam.push(rhydon);
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

var battle = new Battle();
var tauros = new Tauros();
var rhydon = new Rhydon();
battle.createTeams(battle.playerTeam, battle.opponentTeam);

//Status update
console.log("Current Pokemon: " + battle.playerTeam[0].name + " Health: " + battle.playerTeam[0].health);
console.log("Opponent Pokemon: " + battle.opponentTeam[0].name + " Health: " + battle.opponentTeam[0].health);
//Pick move
console.log("Pick a move: ")
console.log("1. " + battle.playerTeam[0].moves[0].name);
console.log("2. " + battle.playerTeam[0].moves[1].name);
//Opponent picks move
//Check speed
//Faster goes first
//If someone dies, remove from team array
//If team array length is zero, declare winner
//Slower goes second
//(again)
//If someone dies, remove from team array
//If team array length is zero, declare winner
//Loop until someone dies