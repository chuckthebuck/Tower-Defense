/***********************
 ****** VARIABLES ******
 ***********************/
//(charlie) umm what is the zip file for/ussless number?
//     (6 ' v' )9
//       |   |

var grassImg;
var levelOneNodes = [

  { x: -20, y: 250 },
  { x: 100, y: 250 },
  { x: 200, y: 250 },
  { x: 200, y: 140 },
  { x: 100, y: 140 },
  { x: 100, y: 40 },
  { x: 300, y: 40 },
  { x: 300, y: 140 },
  { x: 450, y: 140 },
  { x: 450, y: 430 },
  { x: 300, y: 430 },
  { x: 300, y: 350 },
  { x: 100, y: 350 },
  { x: 100, y: 430 },
  { x: -20, y: 430 }
];

var levelTwoNodes = [
  { x: -20, y: 50 },
  { x: 100, y: 50 },
  { x: 100, y: 400 },
  { x: 400, y: 400 },
  { x: 400, y: 200 },
  { x: 200, y: 200 },
  { x: 200, y: 100 },
  { x: 600, y: 100 }
];

var levelThreeNodes = [
  { x: 250, y: -20 },
  { x: 250, y: 180 },
  { x: 320, y: 180 },
  { x: 320, y: 320 },
  { x: 250, y: 320 },
  { x: 250, y: 520 }

];

var terrainNodes = [
  { x: 250, y: 180 },
  { x: 180, y: 180 },
  { x: 180, y: 320 },
  { x: 250, y: 320 }
];


var turretProof;

var turretType = ["Semi Auto Turret", "Mini Turret", "Shotgun Turret", "Sniper Turret", "Money Making Turret", "Minigun Turret", "50,000 Volt Tazer Turret", "Focused Lazer Turret"];

var currentTurret = 0;

//var arr = ["Uh oh"];

var levelSelected = false;

var paused = false;

var controls = false;

var inform = false;

var started = false;

var path;

var terrain = null;

var enemies;

var turrets;

var projectiles;

var wave;

var pauseButton;

var controllButton;

var infoButton;

var backButton;

var backButton2;

var bgColor;

var uselessNumber = 0;


var money = 0;
var health = 0;



/***********************
 *** SETUP FUNCTION ****
 ***********************/



function setup() {
  createCanvas(500, 500).parent("gameCanvas");
  pauseButton = new Button(250, 170, 300, 50, "Resume", function () { paused = false; controls = false; inform = false });
  controlButton = new Button(250, 250, 300, 50, "Controls", function () { controls = true; paused = false });
  infoButton = new Button(250, 330, 300, 50, "Info", function () { inform = true; paused = false });
  rectMode(CENTER, CENTER);
  textSize(20);
  map1Button = new Button(250, 150, 400, 80, "Map 1  Easy Peasy :D", function () { bgColor = color(224, 166, 105); path = new Path(levelOneNodes); path.color = color(196, 140, 81); wave = new Wave(levelOneNodes); started = true; money = 2000; health = 20; levelSelected = true; turretProof = path.roads; updateInfo() });
  map2Button = new Button(250, 275, 400, 80, "Map 2  Mild :/", function () { bgColor = color(196, 194, 192); path = new Path(levelTwoNodes); path.color = color(79, 78, 77); wave = new Wave(levelTwoNodes); started = true; levelSelected = true; money = 500; health = 10; turretProof = path.roads; updateInfo() });
  map3Button = new Button(250, 400, 400, 80, "Map 3  Kaizo :<", function () { bgColor = color(250, 211, 105); path = new Path(levelThreeNodes); terrain = new Path(terrainNodes); wave = new Wave(levelThreeNodes); started = true; levelSelected = true; money = 450; health = 0; turretProof = terrain.roads.concat(path.roads); updateInfo() });
  rectMode(CORNER, TOP);
  backButton = new Button(250, 330, 200, 45, "Back", function () { paused = true });
  backButton2 = new Button(250, 330, 200, 45, "Back", function () { imform = false; paused = true });
  enemies = [];
  turrets = [];
  projectiles = [];
  wave = new Wave(levelOneNodes);
  wave.start;
  levelSelected = false;

  uselessNumber = 0;

  paused = false;

  controls = false;

  inform = false;

  started = false;

  path;

  terrain = null;

  enemies;

  turrets;

  projectiles;

  wave;

  pauseButton;

  controllButton;

  infoButton;

  backButton;

  backButton2;

  bgColor;

  updateInfo();
}

/***********************
 **** DRAW FUNCTION ****
 ***********************/

function draw() {
  if (started = true && this.health >= 0) {
    if (!levelSelected) {
      levelSelect();
      return;
    }

    if (paused) {
      drawPause();
      return;
    }


    if (controls) {
      drawControls();
      return;
    }

    if (inform) {
      drawInfo();
      return;
    }



    background(bgColor);

    if (terrain !== null) {
      terrain.draw();
    }

    path.draw();
    for (var enemy of enemies) {
      enemy.update();
    }





    for (var turret of turrets) {
      turret.update();
    }

    for (var projectile of projectiles) {
      projectile.update();


    }
    checkCollision();
    wave.update();
  } else {

    gameOver();
  }

}


/***********************
 *** OTHER FUNCTIONS ***
 ***********************/

function checkTurret() {
  var text = "";
  if (getTurretBeingPlaced() != null) {
    text = "Unavailable"
  } else {
    text = "Price: $300";

    if (currentTurret == 0) {
      text = "Price: $300";

    }
    if (currentTurret == 1) {
      text = "Price: $50";

    }
    if (currentTurret == 2) {
      text = "Price: $150";

    }

    if (currentTurret ==3) {
      text = "Price: $400"

    }
    if (currentTurret == 6) {
      text = "Price: $450";
    }
  }
  if (currentTurret == 4) {
    text = "Price: $400";
  }

  if (currentTurret == 5) {
    text = "Price: $550";
  }

  if (currentTurret == 7) {
    text = "Price: $2000"
  }

  document.getElementById("buyTurretText").textContent = text;
}
function levelSelect() {
  background(70);
  rectMode(CENTER);
  fill(150);
  rect(250, 70, 200, 50);
  fill(0);
  noStroke()
  textSize(12.5);
  text("Select Your Level!", 250, 70);
  stroke(0);
  textSize(20);

  map1Button.draw();
  map2Button.draw();
  map3Button.draw();
  rectMode(CORNER, TOP);
}

function useless() {
}

function switchTurret() {
  currentTurret += 1;
  if (currentTurret >= turretType.length) {
    currentTurret = 0;
  }
  document.getElementById("rectangle").innerHTML = turretType[currentTurret];
}

function startGame() {
  if (started == true) {
    wave.start();
    updateInfo();
  }


}


function pauseGame() {
  paused = !paused;
  controls = false;
  inform = false;

}

function control() {
  controls = !controls;
}

function infos() {
  inform = !inform;
}

function drawInfo() {
  rectMode(CENTER);
  strokeWeight(2);
  stroke(0);
  fill(100);
  rect(250, 250, 450, 250);
  textAlign(CENTER, CENTER);
  stroke(44);
  textSize(17);
  fill(150);
  rect(250, 215, 340, 150);

  rect(250, 330, 200, 45);
  stroke(150);
  fill(0);
  text("Try to survive the infinite waves \n of enemies by using turrets.\n Try to survive as long as you can!  \n\n Created and Developed by Jackson Burt. ", 250, 215);
  textSize(20);
  stroke(150);
  fill(0);
  text("Back", 250, 330);
  fill(150);
  stroke(44);
  backButton2.draw();
}

function drawControls() {
  rectMode(CENTER);
  strokeWeight(2);
  stroke(0);
  fill(100);
  rect(250, 250, 450, 250);
  textAlign(CENTER, CENTER);
  stroke(44);
  textSize(20);
  fill(150);
  rect(250, 160, 300, 40);
  rect(250, 215, 300, 40);
  rect(250, 270, 300, 40);

  rect(250, 330, 200, 45);
  stroke(150);
  fill(0);
  text("Pressed", uselessNumber, 250, 160);
  textSize(18);
  text("Target Mode - Left and Right Arrows ", 250, 270);
  textSize(20);
  text("There Are ", 250, 215);
  text("Back", 250, 330);
  fill(150);
  stroke(44);
}


function drawPause() {
  rectMode(CENTER);
  strokeWeight(2);
  stroke(0);
  fill(100);
  rect(250, 250, 450, 250);
  textAlign(CENTER, CENTER);
  stroke(44);
  fill(150);

  //rect(250, 170, 300, 50);

  //rect(250, 250, 300, 50);

  //rect(250, 330, 300, 50);

  rect(250, 70, 200, 50);

  textSize(25);
  stroke(150);
  fill(0);

  text("Paused", 250, 70)

  text("Resume", 250, 170);
  text("Tips", 250, 250);
  text("Info", 250, 330);
  fill(150);
  stroke(44);
  pauseButton.draw();
//  controlButton.draw();
  infoButton.draw();


  rectMode(CORNER);

  noStroke();
};


function gameOver() {
  background(0, 0, 0, 20);
  fill(200);
  textSize(38);
  textAlign(CENTER, CENTER);
  text("Game Over.", 250, 250);
}

function updateInfo() {
  document.getElementById("Money").innerHTML = floor(money);
  document.getElementById("Health").innerHTML =  health;
}

function startWave() {
  wave.start();
}

function checkCollision() {
  for (var enemy of enemies) {
    for (var projectile of projectiles) {
      if (projectile instanceof LazerProjectile) {

        if (CircleInLine(enemy, projectile) == true) {
          var damage = min(enemy.strength, projectile.strength);

          enemy.strength -= damage;

          if (enemy.strength <= 0) {
            money += enemy.value * 1.2
            updateInfo();
          }



        }


      } else
        if (CircleInCircle(enemy, projectile) == true) {

          if (projectile instanceof MmtdProjectile) {
            money += enemy.value * projectile.value;
            updateInfo();
          }

          var damage = min(enemy.strength, projectile.strength);

          enemy.strength -= damage;
          projectile.strength -= damage;

          if (enemy.strength <= 0) {
            enemy.value += 5;
            money += enemy.value;
            updateInfo();
          }
          if (projectile instanceof TazerProjectile) {
            enemy.slowTimer = 120;

          }

          if (!(projectile instanceof SniperProjectile || projectile instanceof LazerProjectile)) {
            projectile.strength = 0;
          }

          if (!(projectile instanceof MiniProjectile)) {
            money += enemy.value / 10;
          }


        }

    }
    filterArrays();
  }
}



function filterArrays() {
  enemies = enemies.filter(e => e.finished == false && e.strength > 0);
  projectiles = projectiles.filter(p => p.inWorld() && p.strength > 0 && !(p instanceof LazerProjectile));
}

function getTurretBeingPlaced() {
  for (var turret of turrets) {
    if (turret.placed == false) {
      return turret;
    }
  }
  return null;
}

function getTurretSelected() {
  for (var turret of turrets) {
    if (turret.selected) {
      return turret;
    }
  }
  return null;
}

function getTurretClicked() {
  for (var turret of turrets) {
    if (dist(mouseY, mouseX, turret.y, turret.x) < turret.size / 2) {
      return turret;
    }
  }
  return null;
}

function unselect() {
  for (var turret of turrets) {
    turret.selected = false;
  }
}
function mousePressed() {

  if (mouseX > 0 && mouseX < 500 && mouseY > 0 && mouseY < 500) {
    unselect();
  }
  let turret = getTurretBeingPlaced();
  if (turret != null) {
    if (turret.isValid()) {
      turret.placed = true;

    }
  } else {
    turret = getTurretClicked();
    if (turret != null) {
      turret.selected = true;


    }
  }
}

function keyPressed() {
  let turret = getTurretSelected();
  if (turret != null) {
    if (keyCode == 39) {
      if (turret.targetMode < 5) {
        turret.targetMode += 1;
      }
    }



    if (keyCode == 37) {
      if (turret.targetMode > 1) {
        turret.targetMode -= 1;
      }

      if (keyCode == 49) {
        turretType = 0;
      }

      if (keyCode == 50) {
        turretType = 1;
      }

      if (keyCode == 51) {
        turretType = 2;
      }


    }

  }
}