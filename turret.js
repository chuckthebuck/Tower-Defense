class Turret {
  constructor(roads) {
    this.roads = roads;
    this.value = 300;
    this.x = 75;
    this.y = 75;
    this.size = 45;
    this.gunSize = 37.5;
    this.range = 90;
    this.lookAngle = 90;
    this.placed = false;
    this.selected = false;
    this.projectileSpeed = 8.5;
    this.projectileStrength = 0.45;
    this.shotCooldown = 10;
    this.shootingTimer = 10;
    this.targetMode = 1;
    this.upgrades = 0;
    this.maxUpgrades = 20;
    this.projectile = Projectile;
  }

  upgrade() {

    let upgradePrice = (this.upgrades + 1) * 300;



    if (this.upgrades < this.maxUpgrades && money >= upgradePrice) {
      money -= upgradePrice;
      updateInfo();
      this.upgrades++;
      this.value += upgradePrice;


      if (this instanceof Sniper) {
        this.projectileStrength += 10;
        this.range += 50;
        this.shotCooldown -= 5;
      } else if (this instanceof Mmtd) {
        this.projectileStrength += 0.1;
        this.shotCooldown -= 2;
        this.value += 2;
        this.shootingTimer--
      } else if (this instanceof Tazer) {
        this.projectileStrength += 0.2;
        this.shotCooldown -= 1.5;

        this.range += 20;
        this.shootingTimer--;
        if (this.upgrades % 2 == 1) {
          this.shotCooldown -= 2;
        }

      } else if (this instanceof Small) {
        this.shootingTimer -= 0.35;
        this.projectileStrength += 0.3;
        this.range += 5;


      } else if (this instanceof Shotgun) {
        this.shotCooldown -= 1;
        this.projectileStrength += 1.7;
        this.range += 5;

      } else if (this instanceof Mini) {
        this.shootingTimer -= 0.6;
        this.projectileStrength += 0.35;
        this.range += 25;

    } else if (this instanceof Turret) {
      this.shootingTimer -= 1;


    }

      this.projectileSpeed += 0.2;
    }

  }




  draw() {
    //Turret Visibility Circle
    if (!this.placed || this.selected) {
      strokeWeight(1);
      stroke(0, 0, 0, 50);
      fill(this.chooseColor());
      ellipse(this.x, this.y, this.range * 2, this.range * 2);
    }

    //Turret Gun
    strokeWeight(7.5);
    fill(20, 20, 20)
    stroke(20, 20, 20);
    var x = this.gunSize * cos(this.lookAngle);
    var y = this.gunSize * sin(this.lookAngle);
    line(this.x, this.y, this.x + x, this.y + y);

    //Turret Body
    strokeWeight(2);
    stroke(20, 20, 20);
    fill(255, 255, 255);
    ellipse(this.x, this.y, this.size, this.size);

    if (this.selected) {
      /////////////////////////////////////////////////////////////////////////////////////////////////////////////
      textAlign(CENTER, BOTTOM);
      textSize(10);
      stroke(0);
      fill(255);
      text(22);
      text("Lvl:", this.x - 5.5, this.y - 25);
      text(this.upgrades, this.x + 10, this.y - 25);
      if (this.targetMode == 1) {
        text("\n-Targeting-\n Closest Enemy To Turret", this.x, this.y)
        rect(this.x, this.y);
      } else if (this.targetMode == 2) {
        text("\n-Targeting-\n Farthest Enemy From Turret", this.x, this.y)
        rect(this.x, this.y);
      } else if (this.targetMode == 3) {
        text("\n-Targeting-\n Strongest Enemy", this.x, this.y)
        rect(this.x, this.y);
      } else if (this.targetMode == 4) {
        text("\n-Targeting-\n Weakest Enemy", this.x, this.y)
        rect(this.x, this.y);
      } else if (this.targetMode == 5) {
        text("\n-Targeting-\n Farthest Enemy From Start", this.x, this.y)
        rect(this.x, this.y);
      }
    }
  }

  followMouse() {
    this.x = mouseX;
    this.y = mouseY;
  }

  onRoad() {
    for (var road of this.roads) {
      if (CircleInRect(this, road)) {
        return true;
      }
    }
    return false;
  }

  onTurret() {
    var temp = { x: this.x, y: this.y, size: this.size * 1.5 }
    for (var turret of turrets) {
      if (turret.placed) {
        if (CircleInCircle(temp, turret)) {
          return true;
        }

      }

    }
    return false;
  }
  isValid() {
    if (this.x < 0 || this.x > 500 || this.y < 0 || this.y > 500) {
      return false;
    }


    if (this.onRoad()) {
      return false;
    }
    if (this.onTurret()) {
      return false;
    }
    return true;

  }

  shootProjectile() {
    if (this.shootingTimer < this.shotCooldown) {
      this.shootingTimer += 1;
    } else {
      this.shootingTimer = 0;

      let x = this.x + (this.gunSize * cos(this.lookAngle));
      let y = this.y + (this.gunSize * sin(this.lookAngle));

      let xSpeed = this.projectileSpeed * cos(this.lookAngle);
      let ySpeed = this.projectileSpeed * sin(this.lookAngle);

      projectiles.push(new this.projectile(x, y, xSpeed, ySpeed, this.projectileStrength));

    }

  }

  closeToTurret() {

    var closestDistance = Infinity;
    var closestEnemy = null;

    for (var enemy of enemies) {
      var distance = dist(enemy.x, enemy.y, this.x, this.y);

      if (distance > this.range + enemy.size / 2) {
        continue;
      }

      if (distance < closestDistance) {
        closestDistance = distance;
        closestEnemy = enemy;
      }
    }

    return closestEnemy;
  }

  farToTurret() {

    var farthestDistance = - Infinity;
    var farthestEnemy = null;

    for (var enemy of enemies) {
      var distance = dist(enemy.x, enemy.y, this.x, this.y);

      if (distance > this.range + enemy.size / 2) {
        continue;
      }

      if (distance > farthestDistance) {
        farthestDistance = distance;
        farthestEnemy = enemy;
      }
    }

    return farthestEnemy;
  }

  strongestEnemy() {

    var strongestStrength = - Infinity;
    var strongestEnemy = null;

    for (var enemy of enemies) {
      var distance = dist(enemy.x, enemy.y, this.x, this.y);
      var strength = enemy.strength;
      if (distance > this.range + enemy.size / 2) {
        continue;
      }

      if (enemy.strength > strongestStrength) {
        strongestStrength = strength;
        strongestEnemy = enemy;
      }
    }

    return strongestEnemy;
  }

  weakestEnemy() {

    var weakestWeak = Infinity;
    var weakestEnemy = null;

    for (var enemy of enemies) {
      var distance = dist(enemy.x, enemy.y, this.x, this.y);
      var strength = enemy.strength;
      if (distance > this.range + enemy.size / 2) {
        continue;
      }

      if (enemy.strength < weakestWeak) {
        weakestWeak = strength;
        weakestEnemy = enemy;
      }
    }

    return weakestEnemy;
  }



  farFromStart() {

    var farthestDistance;
    farthestDistance = -1
    var farthestEnemy = null;

    for (var enemy of enemies) {
      var distance = dist(enemy.x, enemy.y, this.x, this.y);

      if (distance > this.range + enemy.size / 2) {
        continue;
      }

      var travel = enemy.distanceTraveled()

      if (travel > farthestDistance) {
        farthestDistance = travel;
        farthestEnemy = enemy;
      }
    }

    return farthestEnemy;
  }



  targetEnemy() {

    var enemy = null;
    if (this.targetMode == 1) {
      enemy = this.closeToTurret();
    }

    if (this.targetMode == 2) {
      enemy = this.farToTurret();
    }

    if (this.targetMode == 3) {
      enemy = this.farFromStart();
    }

    if (this.targetMode == 4) {
      enemy = this.farFromStart();
    }

    if (this.targetMode == 5) {
      enemy = this.weakestEnemy();
    }

    if (this.targetMode == 6) {
      enemy = this.strongestEnemy();
    }







    if (enemy == null) {
      return;
    }

    this.lookAngle = atan2(enemy.y - this.y, enemy.x - this.x);
    this.shootProjectile();
  }






  update() {

    if (this.placed === false) {
      this.x = mouseX;
      this.y = mouseY;
    } else {
      this.targetEnemy();

    }

    this.draw();
    if (this.selected) {
      stroke(0);
      fill(255);
      text(10);
      text("Lvl:", this.x - 5.5, this.y - 25);
      text(this.upgrades, this.x + 10, this.y - 25);
    }
  }

  chooseColor() {
    if (this.selected) {
      return color(100, 100, 300, 50);
    }

    if (this.placed || this.isValid()) {
      return color(255, 255, 255, 50);
    } else {
      return color(200, 0, 0, 50);
    }


  }

}


function upgradeTurret() {
  let turret = getTurretSelected();
  if (turret !== null) {
    turret.upgrade();
  }

}




function sellTurret() {
  var index = turrets.indexOf(getTurretSelected());
  if (index >= 0) {
    money += turrets[index].value;
    turrets[index] = turrets[turrets.length - 1]
    turrets.pop();
    console.log(index);
    updateInfo();
  }


}



function buyTurret() {

  let turret = getTurretBeingPlaced();
  //if (money >= turret.value) {
  updateInfo();

  if (currentTurret == 0) {
    let newTurret = new Turret(turretProof)
    if (money >= newTurret.value) {
      turrets.push(newTurret);
      money -= newTurret.value;
      updateInfo();

    }
  }
  if (currentTurret == 1) {
    let newTurret = new Small(path.roads)
    if (money >= newTurret.value) {
      turrets.push(newTurret);
      money -= newTurret.value;
      updateInfo();
    }
  }
  if (currentTurret == 2) {
    let newTurret = new Shotgun(path.roads)
    if (money >= newTurret.value) {
      turrets.push(newTurret);
      money -= newTurret.value;
      updateInfo();
    }
  }
  if (currentTurret == 3) {
    let newTurret = new Sniper(path.roads)
    if (money >= newTurret.value) {
      turrets.push(newTurret);
      money -= newTurret.value;
      updateInfo();
    }
  }
  if (currentTurret == 6) {
    let newTurret = new Tazer(path.roads)
    if (money >= newTurret.value) {
      turrets.push(newTurret);
      money -= newTurret.value;
      updateInfo();
    }
  }
  if (currentTurret == 4) {
    let newTurret = new Mmtd(path.roads)
    if (money >= newTurret.value) {
      turrets.push(newTurret);
      money -= newTurret.value;
      updateInfo();
    }
  }
  if (currentTurret == 5) {
    let newTurret = new Mini(path.roads)
    if (money >= newTurret.value) {
      turrets.push(newTurret);
      money -= newTurret.value;
      updateInfo();
    }
  }
  if (currentTurret == 7) {
    let newTurret = new Lazer(path.roads)
    if (money >= newTurret.value) {
      turrets.push(newTurret);
      money -= newTurret.value;
      updateInfo();
    }
  }

}

function CircleInRect(c, r) {
  //Find the closest point in rectangle to circle
  let closeX = c.x;
  let closeY = c.y;

  if (c.x < r.x) {
    closeX = r.x;
  } else if (c.x > r.x + r.w) {
    closeX = r.x + r.w;
  }
  if (c.y < r.y) {
    closeY = r.y;
  } else if (c.y > r.y + r.h) {
    closeY = r.y + r.h;
  }

  //Check if distance to closest point is less than radius
  if (dist(c.x, c.y, closeX, closeY) < c.size / 2) {
    return true;
  } else {
    return false;
  }



}

function CircleInCircle(c1, c2) {
  return dist(c1.x, c1.y, c2.x, c2.y) < (c1.size / 2) + (c2.size / 2);
}

function CircleInLine(c1, l2) {
  var cx = c1.x;      // circle position (set by mouse)
  var cy = c1.y;
  var r = c1.size / 2;     // circle radius

  var x1 = l2.x;    // coordinates of line
  var y1 = l2.y;
  var x2 = l2.endX;
  var y2 = l2.endY;


  // is either end INSIDE the circle?
  // if so, return true immediately
  var inside1 = pointCircle(x1, y1, cx, cy, r);
  var inside2 = pointCircle(x2, y2, cx, cy, r);
  if (inside1 || inside2) return true;

  // get length of the line
  var distX = x1 - x2;
  var distY = y1 - y2;
  var len = sqrt((distX * distX) + (distY * distY));

  // get dot product of the line and circle
  var dot = (((cx - x1) * (x2 - x1)) + ((cy - y1) * (y2 - y1))) / pow(len, 2);

  // find the closest point on the line
  var closestX = x1 + (dot * (x2 - x1));
  var closestY = y1 + (dot * (y2 - y1));

  // is this point actually on the line segment?
  // if so keep going, but if not, return false
  var onSegment = linePoint(x1, y1, x2, y2, closestX, closestY);
  if (!onSegment) return false;


  // get distance to closest point
  distX = closestX - cx;
  distY = closestY - cy;
  var distance = sqrt((distX * distX) + (distY * distY));

  if (distance <= r) {
    return true;
  }
  return false;
}


// POINT/CIRCLE
function pointCircle(px, py, cx, cy, r) {

  // get distance between the point and circle's center
  // using the Pythagorean Theorem
  var distX = px - cx;
  var distY = py - cy;
  var distance = sqrt((distX * distX) + (distY * distY));

  // if the distance is less than the circle's
  // radius the point is inside!
  if (distance <= r) {
    return true;
  }
  return false;
}


// LINE/POINT
function linePoint(x1, y1, x2, y2, px, py) {

  // get distance from the point to the two ends of the line
  var d1 = dist(px, py, x1, y1);
  var d2 = dist(px, py, x2, y2);

  // get the length of the line
  var lineLen = dist(x1, y1, x2, y2);

  // since floats are so minutely accurate, add
  // a little buffer zone that will give collision
  var buffer = 2;    // higher # = less accurate

  // if the two distances are equal to the line's
  // length, the point is on the line!
  // note we use the buffer here to give a range,
  // rather than one #
  if (d1 + d2 >= lineLen - buffer && d1 + d2 <= lineLen + buffer) {
    return true;
  }
  return false;

}
