
window.onload = function() {
  var battleMusic = new Howl({
    src: ['sound/battleMusic.mp3'],
    loop: true
  });

  var titleMusic = new Howl({
    src: ['sound/titleScreenMusic.mp3'],
    loop: true
  });

  var victory = new Howl({
    src: ['sound/victory.mp3']
  });

  var hit = new Howl({
    src: ['sound/hit.mp3']
  });

  var notVeryEffective = new Howl({
    src: ['sound/notVeryEffective.mp3']
  });

  var superEffective = new Howl({
    src: ['sound/superEffective.mp3']
  });

  var status = new Howl({
    src: ['sound/status.mp3']
  });

  var faint = new Howl({
    src: ['sound/faint.mp3']
  });

  battleCanvas = new BattleCanvas();
  titleMusic.play();
  battleCanvas.titleScreen();
  document.onkeypress = function(e) {
    titleMusic.stop();
    startGame();
  }

  function startGame() {
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
    amnesia: {
      name:     "Amnesia",
      type:     "psychic",
      stat:     2,
      statName: "special",
      origStat: "startSpec",
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
    explosion: {
      name:     "Explosion",
      type:     "normal",
      stat:     "attack",
      mech:     "attack",
      chance:   0,
      power:    340,
      accuracy: 100,
      explode:  true
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
    hypnosis: {
      name:     "Hypnosis",
      type:     "psychic",
      mech:     "status",
      effect:   "SLP",
      chance:   100,
      target:   "opponent",
      accuracy: 60
    },
    iceBeam: {
      name:     "Ice Beam",
      type:     "ice",
      stat:     "special",
      mech:     "attack",
      mech2:    "status",
      effect:   "FRZ",
      chance:   10,
      power:    95,
      accuracy: 100
    },
    megaDrain: {
      name:     "Mega Drain",
      type:     "grass",
      stat:     "special",
      mech:     "attack",
      chance:   0,
      power:    40,
      accuracy: 100
    },
    pinMissile: {
      name:     "Pin Missle",
      type:     "bug",
      stat:     "attack",
      mech:     "attack",
      chance:   0,
      power:    50,
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
    selfDestruct: {
      name:     "Selfdestruct",
      type:     "normal",
      stat:     "attack",
      mech:     "attack",
      chance:   0,
      power:    260,
      accuracy: 100,
      explode:  true
    },
    sing: {
      name:     "Sing",
      type:     "normal",
      mech:     "status",
      effect:   "SLP",
      chance:   100,
      target:   "opponent",
      accuracy: 55
    },
    sleepPowder: {
      name:     "Sleep Powder",
      type:     "grass",
      mech:     "status",
      effect:   "SLP",
      chance:   100,
      target:   "opponent",
      accuracy: 75
    },
    softboiled: {
      name:     "Softboiled",
      type:     "normal",
      statName: "health",
      mech:     "stat"
    },
    stunSpore: {
      name:     "Stun Spore",
      type:     "grass",
      mech:     "status",
      effect:   "PAR",
      chance:   100,
      target:   "opponent",
      accuracy: 75
    },
    surf: {
      name: "Surf",
      type: "water",
      stat: "special",
      mech: "attack",
      mech2: "",
      chance: 0,
      power: 95,
      accuracy: 100
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
      poison:   1,
      ground:   1,
      rock:     .5,
      bug:      1,
      ghost:    0,
      grass:    1,
      water:    1,
      electric: 1,
      psychic:  1,
      ice:      1,
      none:     1
    },
    flying: {
      normal:   1,
      flying:   1,
      poison:   1,
      ground:   1,
      rock:     .5,
      bug:      2,
      ghost:    1,
      water:    1,
      grass:    2,
      electric: .5,
      psychic:  1,
      ice:      1,
      none:     1
    },
    poison: {
      normal:   1,
      flying:   1,
      poison:   .5,
      ground:   .5,
      rock:     .5,
      bug:      1,
      ghost:    .5,
      water:    1,
      grass:    2,
      electric: 1,
      psychic:  1,
      ice:      1,
      none:     1
    },
    ground: {
      normal:   1,
      flying:   0,
      poison:   2,
      ground:   1,
      rock:     2,
      bug:      .5,
      ghost:    1,
      water:    1,
      grass:    .5,
      electric: 2,
      psychic:  1,
      ice:      1,
      none:     1
    },
    rock: {
      normal:   1,
      flying:   2,
      poison:   1,
      ground:   .5,
      rock:     1,
      bug:      2,
      ghost:    1,
      water:    1,
      grass:    1,
      electric: 1,
      psychic:  1,
      ice:      2,
      none:     1 
    },
    bug: {
      normal:   1,
      flying:   .5,
      poison:   .5,
      ground:   1,
      rock:     1,
      bug:      1,
      ghost:    .5,
      water:    1,
      grass:    2,
      electric: 1,
      psychic:  2,
      ice:      1,
      none:     1 
    },
    ghost: {
      normal:   0,
      flying:   1,
      poison:   1,
      ground:   1,
      rock:     1,
      bug:      1,
      ghost:    2,
      water:    1,
      grass:    1,
      electric: 1,
      psychic:  0,
      ice:      1,
      none:     1 
    },
    water: {
      normal:   1,
      flying:   1,
      poison:   1,
      ground:   2,
      rock:     2,
      bug:      1,
      ghost:    1,
      water:    .5,
      grass:    .5,
      electric: 1,
      psychic:  1,
      ice:      1,
      none:     1 
    },
    grass: {
      normal:   1,
      flying:   .5,
      poison:   .5,
      ground:   2,
      rock:     2,
      bug:      .5,
      ghost:    1,
      water:    2,
      grass:    .5,
      electric: 1,
      psychic:  1,
      ice:      1,
      none:     1 
    },
    electric: {
      normal:   1,
      flying:   2,
      poison:   1,
      ground:   0,
      rock:     1,
      bug:      1,
      ghost:    1,
      water:    2,
      grass:    .5,
      electric: .5,
      psychic:  1,
      ice:      1,
      none:     1 
    },
    psychic: {
      normal:   1,
      flying:   1,
      poison:   1,
      ground:   1,
      rock:     1,
      bug:      1,
      ghost:    1,
      water:    1,
      grass:    1,
      electric: 1,
      psychic:  .5,
      ice:      1,
      none:     1 
    },
    ice: {
      normal:   1,
      flying:   2,
      poison:   1,
      ground:   2,
      rock:     1,
      bug:      1,
      ghost:    1,
      water:    .5,
      grass:    2,
      electric: 1,
      psychic:  1,
      ice:      .5,
      none:     1 
    }
  }

  //Pokemon constructors
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
    this.backSprite  = "img/Spr_b_g1_065.png",
    this.cry         = new Howl({
      src: ['sound/alakazamCry.mp3']
    })
  }

  function Chansey() {
    this.name        = "Chansey",
    this.type1       = "normal",
    this.type2       = "none", 
    this.health      = 703, 
    this.maxHealth   = 703,
    this.attack      = 108, 
    this.startAtt    = 108, 
    this.defense     = 108, 
    this.startDef    = 108, 
    this.special     = 308, 
    this.startSpec   = 308, 
    this.speed       = 198,
    this.startSpd    = 198,
    this.statStages  = [0,0,0,0],
    this.status      = "NON",
    this.turnStat    = 0,
    this.moves       = [attack.iceBeam, attack.softboiled, attack.thunderWave, attack.thunderbolt],
    this.frontSprite = "img/Spr_1b_113.png",
    this.backSprite  = "img/Spr_b_g1_113.png",
    this.cry         = new Howl({
      src: ['sound/chanseyCry.mp3']
    })
  }

  function Cloyster() {
    this.name        = "Cloyster",
    this.type1       = "water",
    this.type2       = "ice", 
    this.health      = 303, 
    this.maxHealth   = 303,
    this.attack      = 288, 
    this.startAtt    = 288, 
    this.defense     = 458, 
    this.startDef    = 458, 
    this.special     = 268, 
    this.startSpec   = 268, 
    this.speed       = 238,
    this.startSpd    = 238,
    this.statStages  = [0,0,0,0],
    this.status      = "NON",
    this.turnStat    = 0,
    this.moves       = [attack.surf, attack.blizzard, attack.hyperBeam, attack.explosion],
    this.frontSprite = "img/Spr_1b_091.png",
    this.backSprite  = "img/Spr_b_g1_091.png",
    this.cry         = new Howl({
      src: ['sound/cloysterCry.mp3']
    })
  }

  function Exeggutor() {
    this.name        = "Exeggutor",
    this.type1       = "grass",
    this.type2       = "psychic", 
    this.health      = 393, 
    this.maxHealth   = 393,
    this.attack      = 288, 
    this.startAtt    = 288, 
    this.defense     = 268, 
    this.startDef    = 268, 
    this.special     = 348, 
    this.startSpec   = 348, 
    this.speed       = 208,
    this.startSpd    = 208,
    this.statStages  = [0,0,0,0],
    this.status      = "NON",
    this.turnStat    = 0,
    this.moves       = [attack.sleepPowder, attack.stunSpore, attack.psychic, attack.explosion],
    this.frontSprite = "img/Spr_1b_103.png",
    this.backSprite  = "img/Spr_b_g1_103.png",
    this.cry         = new Howl({
      src: ['sound/exeggutorCry.mp3']
    })
  }

  function Gengar() {
    this.name        = "Gengar",
    this.type1       = "ghost",
    this.type2       = "poison", 
    this.health      = 323, 
    this.maxHealth   = 323,
    this.attack      = 228, 
    this.startAtt    = 228, 
    this.defense     = 218, 
    this.startDef    = 218, 
    this.special     = 358, 
    this.startSpec   = 358, 
    this.speed       = 318,
    this.startSpd    = 318,
    this.statStages  = [0,0,0,0],
    this.status      = "NON",
    this.turnStat    = 0,
    this.moves       = [attack.hypnosis, attack.explosion, attack.thunderbolt, attack.megaDrain],
    this.frontSprite = "img/Spr_1b_094.png",
    this.backSprite  = "img/Spr_b_g1_094.png",
    this.cry         = new Howl({
      src: ['sound/gengarCry.mp3']
    })
  }

  function Golem() {
    this.name        = "Golem",
    this.type1       = "rock",
    this.type2       = "ground", 
    this.health      = 363, 
    this.maxHealth   = 363,
    this.attack      = 318, 
    this.startAtt    = 318, 
    this.defense     = 358, 
    this.startDef    = 358, 
    this.special     = 208, 
    this.startSpec   = 208, 
    this.speed       = 188,
    this.startSpd    = 188,
    this.statStages  = [0,0,0,0],
    this.status      = "NON",
    this.turnStat    = 0,
    this.moves       = [attack.bodySlam, attack.earthquake, attack.explosion, attack.rockSlide],
    this.frontSprite = "img/Spr_1b_076.png",
    this.backSprite  = "img/Spr_b_g1_076.png"
    this.hyperBeam   = false,
    this.cry         = new Howl({
      src: ['sound/golemCry.mp3']
    })
  };

  function Jolteon() {
    this.name        = "Jolteon",
    this.type1       = "electric",
    this.type2       = "none", 
    this.health      = 333, 
    this.maxHealth   = 333,
    this.attack      = 228, 
    this.startAtt    = 228, 
    this.defense     = 218, 
    this.startDef    = 218, 
    this.special     = 318, 
    this.startSpec   = 318, 
    this.speed       = 358,
    this.startSpd    = 358,
    this.statStages  = [0,0,0,0],
    this.status      = "NON",
    this.turnStat    = 0,
    this.moves       = [attack.bodySlam, attack.thunderbolt, attack.thunderWave, attack.pinMissile],
    this.frontSprite = "img/Spr_1b_135.png",
    this.backSprite  = "img/Spr_b_g1_135.png"
    this.hyperBeam   = false,
    this.cry         = new Howl({
      src: ['sound/jolteonCry.mp3']
    })
  }

  function Lapras() {
    this.name        = "Lapras",
    this.type1       = "water",
    this.type2       = "ice", 
    this.health      = 463, 
    this.maxHealth   = 463,
    this.attack      = 268, 
    this.startAtt    = 268, 
    this.defense     = 258, 
    this.startDef    = 258, 
    this.special     = 288, 
    this.startSpec   = 288, 
    this.speed       = 218,
    this.startSpd    = 218,
    this.statStages  = [0,0,0,0],
    this.status      = "NON",
    this.turnStat    = 0,
    this.moves       = [attack.blizzard, attack.thunderbolt, attack.bodySlam, attack.sing],
    this.frontSprite = "img/Spr_1b_131.png",
    this.backSprite  = "img/Spr_b_g1_131.png",
    this.cry         = new Howl({
      src: ['sound/laprasCry.mp3']
    })
  }

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
    this.hyperBeam   = false,
    this.cry         = new Howl({
      src: ['sound/rhydonCry.mp3']
    })
  }

  function Slowbro() {
    this.name        = "Slowbro",
    this.type1       = "water",
    this.type2       = "psychic", 
    this.health      = 393, 
    this.maxHealth   = 393,
    this.attack      = 248, 
    this.startAtt    = 248, 
    this.defense     = 318, 
    this.startDef    = 318, 
    this.special     = 258, 
    this.startSpec   = 258, 
    this.speed       = 158,
    this.startSpd    = 158,
    this.statStages  = [0,0,0,0],
    this.status      = "NON",
    this.turnStat    = 0,
    this.moves       = [attack.surf, attack.amnesia, attack.thunderWave, attack.recover],
    this.frontSprite = "img/Spr_1b_080.png",
    this.backSprite  = "img/Spr_b_g1_080.png",
    this.cry         = new Howl({
      src: ['sound/slowbroCry.mp3']
    })
  }

  function Snorlax() {
    this.name        = "Snorlax",
    this.type1       = "normal",
    this.type2       = "none", 
    this.health      = 523, 
    this.maxHealth   = 523,
    this.attack      = 318,
    this.startAtt    = 318,
    this.defense     = 228, 
    this.startDef    = 228,
    this.special     = 228, 
    this.startSpec   = 228,
    this.speed       = 158,
    this.startSpd    = 158,
    this.statStages  = [0,0,0,0],
    this.status      = "NON",
    this.turnStat    = 0,
    this.moves       = [attack.hyperBeam, attack.bodySlam, attack.explosion, attack.earthquake],
    this.frontSprite = "img/Spr_1b_143.png",
    this.backSprite  = "img/Spr_b_g1_143.png",
    this.hyperBeam   = false,
    this.cry         = new Howl({
      src: ['sound/snorlaxCry.mp3']
    })
  };

  function Starmie() {
    this.name        = "Starmie",
    this.type1       = "water",
    this.type2       = "psychic", 
    this.health      = 323, 
    this.maxHealth   = 323,
    this.attack      = 248,
    this.startAtt    = 248,
    this.defense     = 268, 
    this.startDef    = 268,
    this.special     = 298, 
    this.startSpec   = 298,
    this.speed       = 328,
    this.startSpd    = 328,
    this.statStages  = [0,0,0,0],
    this.status      = "NON",
    this.turnStat    = 0,
    this.moves       = [attack.blizzard, attack.thunderbolt, attack.recover, attack.thunderWave],
    this.frontSprite = "img/Spr_1b_121.png",
    this.backSprite  = "img/Spr_b_g1_121.png",
    this.hyperBeam   = false,
    this.cry         = new Howl({
      src: ['sound/starmieCry.mp3']
    })
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
    this.moves       = [attack.hyperBeam, attack.bodySlam, attack.blizzard, attack.earthquake],
    this.frontSprite = "img/Spr_1b_128.png",
    this.backSprite  = "img/Spr_b_g1_128.png",
    this.hyperBeam   = false,
    this.cry         = new Howl({
      src: ['sound/taurosCry.mp3']
    })
  };

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
    this.backSprite  = "img/Spr_b_g1_145.png",
    this.cry         = new Howl({
      src: ['sound/zapdosCry.mp3']
    })
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
    this.explode = false;
  };

  Battle.prototype.clearEventString = function() {
    this.eventString = "";
  }

  //Pushes Pokemon to both the player's team array and the opponents.
  Battle.prototype.createTeams = function(playerTeam, opponentTeam) {
    var alakazam = new Alakazam();
    var chansey = new Chansey();
    var cloyster = new Cloyster();
    var exeggutor = new Exeggutor();
    var gengar = new Gengar();
    var golem = new Golem();
    var jolteon = new Jolteon();
    var lapras = new Lapras();
    var rhydon = new Rhydon();
    var slowbro = new Slowbro();
    var snorlax = new Snorlax();
    var starmie = new Starmie();
    var tauros = new Tauros();
    var zapdos = new Zapdos();

    var pickArray = [];
    pickArray.push(alakazam);
    pickArray.push(chansey);
    pickArray.push(cloyster);
    pickArray.push(exeggutor);
    pickArray.push(gengar);
    pickArray.push(golem);
    pickArray.push(jolteon);
    pickArray.push(lapras);
    pickArray.push(rhydon);
    pickArray.push(slowbro);
    pickArray.push(snorlax);
    pickArray.push(starmie);
    pickArray.push(tauros);
    pickArray.push(zapdos);

    pickArray = battle.shuffle(pickArray);

    for (var i = 0; i < 12; i+=2) {
      this.playerTeam.push(pickArray[i]);
      this.opponentTeam.push(pickArray[i + 1])
    }
  };

  Battle.prototype.shuffle = function(array) {
    var temp = null;
    for (var i = array.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  //Calculates the damage of a Pokemon using a move on an opponent.
  Battle.prototype.calculateDamage = function(attacker, move, opponent, crit, whoAttacks) {
    var damage = this.baseDamage(attacker, move, opponent);
    var STAB = this.findSTAB(attacker, move);
    var random = this.damageRNG();
    var effectiveness = this.effectiveness(move, opponent);
    if (effectiveness === 1) {
      if (whoAttacks === true) {
        hit.play();
      }
    }
    if (effectiveness >= 2) {
      this.eventString += "It's super effective!\n";
      if (whoAttacks === true) {
        superEffective.play();
      }
    }
    if (effectiveness <= .5 && effectiveness > 0) {
      this.eventString += "It's not very effective!\n";
      if (whoAttacks === true) {
        notVeryEffective.play();
      }
    }
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
    string += "1: Attack\n2: Switch";

    return string;
  }

  Battle.prototype.showAttacks = function(currentPokemon, currentTeam) {
    var string = "";
    
    currentPokemon.moves.forEach(function(move, i){
      string += (i + 1) + ": " + move.name + " ";
      if (i === 1) {
        string += "\n";
      }
    });

    string += "\n5: Cancel";

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
    if (pokemon.status === "PAR") {
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
      faint.play();
      this.turnPhase = 4;
      return;
    } 
    else {
      this.eventString += "\nEnemy sent out " + playerTeam[0].name + "!\n";
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
      string += (i + add) + ": " + playerTeam[i].name + " ";
      if (i === 3) {
        string += "\n"
      }
    }

    string += "6: Cancel\n";

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
      this.eventString += defenderString + defender.name + " has fainted!";
      this.deadSwitch(defenderTeam, whoAttacks);
    }
    return defenderFaint;
  }

  Battle.prototype.explosionFoo = function(attacker, attackString, attackTeam, whoAttacks) {
      this.explode = true;
      attacker.health = 0;
    if (whoAttacks === true) {
      this.eventString += attackString + attacker.name + " has fainted! ";
      attackTeam.shift();
      this.turnPhase = 4;
    } else {
      whoAttacks = !whoAttacks;
      if (this.pickedMove === 5) {
        attackTeam = this.playerTeam;
      }
      this.deadSwitch(attackTeam, whoAttacks);
    }
    return;
  }

  //Attack logic - calculates damage, outputs strings based on results, checks for fainting.
  Battle.prototype.attack = function(attacker, defender, pickedMove, defenderTeam, whoAttacks, attackString, defenderString, attackTeam) {
    var crit = this.critCheck()
    var attackDamage = battle.calculateDamage(attacker, pickedMove, defender, crit, whoAttacks);
    defender.health -= attackDamage;
    if (attackDamage > 0) {
      this.eventString += attackString + attacker.name + " dealt " + attackDamage + " damage to " + defender.name + "!\n";
      if (pickedMove.mech2 = "status") {
        var filler = this.status(attacker, defender, pickedMove, defenderTeam, whoAttacks, attackString, defenderString)
      }
      if (pickedMove.name === "Hyper Beam") {
        this.hyperBeamStatus(attacker);
      }
      if (pickedMove.explode === true) {
        console.log(attackTeam);
        this.explosionFoo(attacker, attackString, attackTeam, whoAttacks);
      }
    } else {
      this.eventString += "It missed!\n";
    }
    return false;
  }

  Battle.prototype.hyperBeamStatus = function(attacker) {
    attacker.hyperBeam = true;
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
    if (defender.status !== "NON" && pickedMove.chance > 0) {
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
        if (defender.status === "SLP") {
          defender.turnStat = this.generateSleep();
          this.eventString += defenderString + defender.name + " has fallen asleep!\n";
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

  Battle.prototype.attackRouter = function(attacker, defender, pickedMove, defenderTeam, whoAttacks, attackTeam) {
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
      died = this.attack(attacker, defender, pickedMove, defenderTeam, whoAttacks, attackString, defenderString, attackTeam);
    } else if(pickedMove.mech === "stat" && skipMove === true) {
      died = this.stat(attacker, defender, pickedMove, defenderTeam, whoAttacks, attackString, defenderString)
      if (whoAttacks === true) {
        status.play();
      }
    } else if(pickedMove.mech === "status" && skipMove === true) {
      died = this.status(attacker, defender, pickedMove, defenderTeam, whoAttacks, attackString, defenderString)
      if (whoAttacks === true) {
        status.play();
      }
    } else {
      console.log("Something bad happened in the attack router!");
    }
    var died = this.checkFaint(defender, defenderString, whoAttacks, defenderTeam);
    return died;
  }

  Battle.prototype.skippedMove = function(attacker, defender, pickedMove, defenderTeam, whoAttacks, attackString, defenderString) {
    var canMove = true;
    if (attacker.status === "PAR") {
      var roll = Math.floor(Math.random() * 3)
      if (roll === 0) {
          canMove = false;
          this.eventString += attackString + attacker.name + " is paralyzed!\n";
        }
    } else if (attacker.status === "FRZ") {
      canMove = false;
      this.eventString += attackString + attacker.name + " is frozen solid!\n"
    } else if (attacker.status === "SLP") {
      canMove = false;
      attacker.turnStat--;
      if (attacker.turnStat <= 0) {
        this.wakeUp(attacker, defender, pickedMove, defenderTeam, whoAttacks, attackString, defenderString);
      } else {
        this.eventString += attackString + attacker.name + " is asleep!\n"
      }
    } else if (attacker.hyperBeam === true) {
      canMove = false;
      attacker.hyperBeam = false;
      this.eventString = this.eventString.slice(0, this.eventString - 1);
      this.eventString += attackString + attacker.name + " is recharging!\n"
    } else if (this.effectiveness(pickedMove, defender) === 0) {
      canMove = false;
      this.eventString += defenderString + defender.name + " is immune to " + pickedMove.name + "!\n";
    } else {
      canMove = this.checkHit(pickedMove);
      if (canMove === false) {
        this.eventString += "It missed!\n"
      }
    }
    return canMove;
  }

  Battle.prototype.generateSleep = function() {
    return (Math.floor(Math.random() * 4 + 2))
  }

  Battle.prototype.wakeUp = function(attacker, defender, pickedMove, defenderTeam, whoAttacks, attackString, defenderString) {
    attacker.status = "NON",
    this.eventString += attackString + attacker.name + " woke up!\n"
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
  var battle = new Battle();
  var battleCanvas = new BattleCanvas();

  battle.createTeams(battle.playerTeam, battle.opponentTeam);
  battleMusic.play();

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
  battle.playerTeam[0].cry.play();
  battle.clearEventString();

  document.onkeypress = function(e) {
    var opponentsMove = battle.opponentMove(battle.opponentTeam[0]);
    if (battle.turnPhase === 0 && battle.gameOver === false) {
      if (e.key == 1 || e.key == 2) {
        battle.pickedMove = e.key;
        battle.turnPhase++;
        if (battle.pickedMove == 1) {
          battle.eventString += battle.showAttacks(battle.playerTeam[0], battle.playerTeam);
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
        if (battle.pickedMove == 2) {
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
      } else {
        console.log("Something went wrong!");
      }
    } else if (battle.turnPhase === 1 && battle.gameOver === false) {
      //Opponent picks move
      //Check speed
      if (e.key == 5) {
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
      } else if (e.key == 1 || e.key == 2 || e.key == 3 || e.key == 4) {
        battle.pickedMove = e.key;
        console.log(battle.pickedMove);
        if (battle.pickedMove > 0 && battle.pickedMove < 5) {
          battle.pickedMove = battle.playerTeam[0].moves[battle.pickedMove - 1];
          var playerGoesFirst = battle.checkSpeed(battle.playerTeam[0], battle.opponentTeam[0]);
          var died = false;
          //Faster goes first
          if (playerGoesFirst === true && battle.pickedMove != 5) {
            died = battle.attackRouter(battle.playerTeam[0], battle.opponentTeam[0], battle.pickedMove, battle.opponentTeam, true, battle.playerTeam);
            if (battle.opponentTeam.length > 0 && died === false && battle.opponentTeam[0].health > 0 && battle.explode === false) {
              battle.attackRouter(battle.opponentTeam[0], battle.playerTeam[0], opponentsMove, battle.playerTeam, false, battle.opponentTeam);
            }
          } else {
            died = battle.attackRouter(battle.opponentTeam[0], battle.playerTeam[0], opponentsMove, battle.playerTeam, false, battle.opponentTeam);
            if (battle.playerTeam.length > 0 && battle.pickedMove != 5 && died === false && battle.playerTeam[0].health > 0 && battle.explode === false) {
              battle.attackRouter(battle.playerTeam[0], battle.opponentTeam[0], battle.pickedMove, battle.opponentTeam, true, battle.playerTeam);
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
        }
      }
    } else if (battle.turnPhase === 2 && battle.gameOver === false) {
      console.log(e.key);
      if (e.key > 0 && e.key < battle.playerTeam.length) {
        battle.switchChoice = e.key;
        this.eventString += battle.switch(battle.playerTeam, battle.switchChoice);
        battle.attackRouter(battle.opponentTeam[0], battle.playerTeam[0], opponentsMove, battle.playerTeam, false, battle.opponentTeam);
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
        battle.playerTeam[0].cry.play();
        battle.clearEventString();
        battle.turnPhase = 0;
      } else if (e.key == 6) {
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
        battle.playerTeam[0].cry.play();
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
        battleMusic.stop();
        victory.play();
        battle.clearEventString();
        battle.turnPhase = 10;
      }
      if (battle.turnPhase === 4) {
        battle.eventString += "\nWho would you like to send out?\n";
        battle.eventString += battle.showSwitch(battle.playerTeam, 0);
        battleCanvas.drawBoard(battle.eventString, 
          "img/RGB_Red_Back.png", 
          battle.opponentTeam[0].frontSprite, 
          battle.playerTeam.length, 
          "6", 
          "Red",
          battle.opponentTeam[0].name,
          battle.opponentTeam[0].health,
          "NON",
          battle.opponentTeam[0].status,
          battle.opponentTeam[0].maxHealth);
        battle.clearEventString();
        battle.turnPhase = "dead";
      }
    battle.explode = false;
    }
  }
}

