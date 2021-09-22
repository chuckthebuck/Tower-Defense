class Sniper extends Turret {
    constructor(roads) {
        super(roads);
        this.value = 400;
        this.range = 400;
        this.shotCooldown = 70;
        this.gunSize = 45;
        this.projectileStrength = 20;
        this.projectileSpeed = 30;
        this.targetMode = 3;
        this.projectile = Projectile;


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
        fill(50, 150, 50);
        stroke(0);
        var x = this.gunSize * cos(this.lookAngle);
        var y = this.gunSize * sin(this.lookAngle);
        line(this.x, this.y, this.x + x, this.y + y);

        //Turret Body
        strokeWeight(2);
        stroke(0, 0, 0);
        fill(55, 100, 55);
        ellipse(this.x, this.y, this.size, this.size);
        stroke(0, 0, 0);
        fill(100, 150, 100);
        push();
        translate(this.x, this.y, rectMode(CENTER));
        rotate(this.lookAngle);
        rect(0, 0, this.size / 2, this.size / 2);
        pop();
        if (this.selected) {
            fill("white");
            textAlign(CENTER, TOP);
            textSize(15);
        }
        if (this.selected) {
            textAlign(CENTER, BOTTOM);
            textSize(10);
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

}

class SniperProjectile extends Projectile {
    constructor(x, y, xSpeed, ySpeed, strength, roads) {
        super(x, y, xSpeed, ySpeed, roads)
        this.x = x;
        this.y = y;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.strength = strength;
        this.size = 10;
    }
    move() {
        this.x += this.xSpeed;
        this.y += this.ySpeed;
    }
    update() {
        this.move();
        this.draw();
    }
    inWorld() {
        let outside = this.range;

        return this.x > -outside && this.y < this.range + outside
            && this.y > -outside && this.x < this.range + outside;

    }

}


//Lazer/////////
/////////////////
////////////////
///////////////
//////////////
class Lazer extends Turret {
    constructor(roads) {
        super(roads);
        this.range = 10000;
        this.projectileStrength = 3;
        this.gunSize = 40;
        this.size = 50;
        this.value = 12000;

    }
    draw() {
        //Turret Visibility Circle
        if (!this.placed || this.selected) {
            strokeWeight(1);
            stroke("black");
            fill(this.chooseColor());

            ellipse(this.x, this.y, this.range * 2, this.range * 2);
        }

        this.lookAngle = atan2(mouseY - this.y, mouseX - this.x);

        //Turret Gun           
        strokeWeight(17);
        stroke(0);
        var x = this.gunSize * cos(this.lookAngle);
        var y = this.gunSize * sin(this.lookAngle);
        line(this.x, this.y, this.x + x, this.y + y);
        strokeWeight(13);
        stroke(100);
        line(this.x, this.y, this.x + x, this.y + y);
        strokeWeight(7);
        stroke(0, 0, 0);
        line(this.x, this.y, this.x + x, this.y + y);
        strokeWeight(3);
        stroke(235, 0, 0);
        line(this.x, this.y, this.x + x, this.y + y);

        //Turret Body
        strokeWeight(2);
        stroke(0, 0, 0);
        fill(100);
        ellipse(this.x, this.y, this.size, this.size);
        stroke(0, 0, 0);
        fill(255, 0, 0);
        push();
        translate(this.x, this.y, rectMode(CENTER));
        rotate(this.lookAngle);
        ellipse(0, 0, this.size / 2, this.size / 2);
        pop();
        fill(0);
        push();
        translate(this.x, this.y, rectMode(CENTER));
        rotate(this.lookAngle);
        ellipse(0, 0, this.size / 4, this.size / 4);
        pop();
        if (this.selected) {
            fill("white");
            textAlign(CENTER, TOP);
            textSize(15);
        }
        if (this.selected) {
            textAlign(CENTER, BOTTOM);
            textSize(10);
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

    shootProjectile() {
        // if (this.shootingTimer < this.shotCooldown) {
        this.shootingTimer += 1;
        //} else {
        // this.shootingTimer = 0;
        //projectiles = [];
        let x = this.x;
        let y = this.y;

        let xSpeed = this.projectileSpeed * cos(this.lookAngle);
        let ySpeed = this.projectileSpeed * sin(this.lookAngle);

        projectiles.push(new LazerProjectile(x, y, xSpeed, ySpeed, this.projectileStrength, this.lookAngle));


    }

};


class LazerProjectile extends Projectile {
    constructor(x, y, xSpeed, ySpeed, strength, dir) {
        super(x, y, xSpeed, ySpeed, strength);
        //this.x = x;
        //this.y = y;
        //this.xSpeed = xSpeed;
        //this.ySpeed = ySpeed;
        //this.strength = strength;
        this.dir = dir;
        this.endX = 0;
        this.endY = 0;
    }
    draw() {
        let targetX = this.x + 10000 * cos(this.dir);
        this.endX = targetX;
        let targetY = this.x + 10000 * sin(this.dir);
        this.endY = targetY;
        let startX = this.x + 50 * cos(this.dir);
        let startY = this.y + 50 * sin(this.dir);
        stroke(200, 0, 0, 50)
        strokeWeight(19);
        line(startX, startY, targetX, targetY)
        stroke(200, 0, 0)
        strokeWeight(16);
        line(startX, startY, targetX, targetY)
        stroke(200, 100, 100)
        strokeWeight(10);
        line(startX, startY, targetX, targetY)
        stroke(255, 255, 260)
        strokeWeight(3)
        line(startX, startY, targetX, targetY)
        strokeWeight(2);
    };
    move() {
        this.dir = atan2(mouseY - this.y, mouseX - this.x);
    }
    update() {
        this.move();
        this.draw();
    }
    inWorld() {
        let outside = 500;

        return this.x > -outside && this.y < 500 + outside
            && this.y > -outside && this.x < 500 + outside;

    }

}
//Tazer/////////
/////////////////
////////////////
///////////////
//////////////
class Tazer extends Turret {
    constructor(roads) {
        super(roads);
        this.value = 400;
        this.range = 70;
        this.shotCooldown = 30;
        this.projectileStrength = 0.7;
        this.gunSize = 33;
        this.projectileSpeed = 20;
        this.targetMode = 2;
        this.projectile = TazerProjectile;

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
        strokeWeight(9);
        fill(50, 150, 150)
        stroke(50);
        var x = this.gunSize * cos(this.lookAngle);
        var y = this.gunSize * sin(this.lookAngle);
        line(this.x, this.y, this.x + x, this.y + y);

        //Turret Body
        strokeWeight(2);
        stroke(25, 25, 25);
        fill(55, 100, 100);
        ellipse(this.x, this.y, this.size, this.size);
        stroke(25, 25, 25);
        fill(242, 217, 116);
        ellipse(this.x, this.y, this.size / 2, this.size / 2);
        stroke(50, 50, 50);
        fill(100, 150, 150);
        push();
        translate(this.x, this.y, rectMode(CENTER));
        rotate(this.lookAngle);
        pop();
        if (this.selected) {
            fill("white");
            textAlign(CENTER, TOP);
            textSize(15);
        }
        if (this.selected) {
            textAlign(CENTER, BOTTOM);
            textSize(10);
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

}

class TazerProjectile extends Projectile {
    constructor(x, y, xSpeed, ySpeed, strength, speed, roads) {
        super(x, y, xSpeed, ySpeed, strength, speed, roads)
        fill(100, 200, 200);
        this.x = x;
        this.y = y;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.strength = strength;
        this.size = 3.5;
    }
    move() {
        this.x += this.xSpeed;
        this.y += this.ySpeed;
    }
    update() {
        this.move();
        this.draw();
    }
    inWorld() {
        let outside = 500;

        return this.x > -500 && this.y < 500 + outside
            && this.y > -500 && this.x < 500 + outside;

    }

}
//M.M.T.D./////////
//////////////////
/////////////////
////////////////
///////////////
class Mmtd extends Turret {
    constructor(roads) {
        super(roads);
        this.value = 400;
        this.range = 100;
        this.shotCooldown = 20;
        this.gunSize = 34;
        this.projectileSpeed = 10;
        this.targetMode = 3;
        this.projectileStrength = 0.1;
        this.size = 45;
        this.projectile = MmtdProjectile;


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
        strokeWeight(6);
        fill(50, 150, 150);
        stroke(50);
        var x = this.gunSize * cos(this.lookAngle);
        var y = this.gunSize * sin(this.lookAngle);
        line(this.x, this.y, this.x + x, this.y + y);

        //Turret Body
        strokeWeight(2);
        stroke(0, 0, 0);
        fill(200, 250, 250);
        ellipse(this.x, this.y, this.size, this.size);
        stroke(50, 50, 50);
        fill(100, 150, 150);
        push();
        translate(this.x, this.y, rectMode(CENTER));
        rotate(this.lookAngle);
        rect(0, 0, this.size / 2, this.size / 2);
        pop();
        if (this.selected) {
            fill("white");
            textAlign(CENTER, TOP);
            textSize(15);
        }
        if (this.selected) {
            textAlign(CENTER, BOTTOM);
            textSize(10);
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

}

class MmtdProjectile extends Projectile {
    constructor(x, y, xSpeed, ySpeed, strength, speed, roads) {
        super(x, y, xSpeed, ySpeed, strength, speed, roads);
        fill(0, 200, 200)
        this.x = x;
        this.y = y;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.strength = 0.1;
        this.size = 5;
        this.value = strength;
    }
    move() {
        this.x += this.xSpeed;
        this.y += this.ySpeed;
    }
    update() {
        this.move();
        this.draw();
    }
    inWorld() {
        let outside = 500;

        return this.x > -500 && this.y < 500 + outside
            && this.y > -500 && this.x < 500 + outside;

    }

}
//Minigun/////////
//////////////////
/////////////////
////////////////
///////////////
class Mini extends Turret {
    constructor(roads) {
        super(roads);
        this.value = 500;
        this.range = 150;
        this.shotCooldown = 5;
        this.gunSize = 36;
        this.projectileSpeed = 13;
        this.targetMode = 4;
        this.projectileStrength = 0.6;
        this.projectile = MiniProjectile;


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
        strokeWeight(11);
        fill(227, 245, 66);
        stroke(0);
        var x = this.gunSize * cos(this.lookAngle);
        var y = this.gunSize * sin(this.lookAngle);
        line(this.x, this.y, this.x + x, this.y + y);

        //Turret Body
        strokeWeight(2);
        stroke(0, 0, 0);
        fill(227, 245, 66);
        ellipse(this.x, this.y, this.size, this.size);
        stroke(0, 0, 0);
        fill(120, 87, 11);
        push();
        translate(this.x, this.y, rectMode(CENTER));
        rotate(this.lookAngle);
        ellipse(0, 0, this.size / 2, this.size / 2);
        pop();
        if (this.selected) {
            fill("white");
            textAlign(CENTER, TOP);
            textSize(15);
        }
        if (this.selected) {
            textAlign(CENTER, BOTTOM);
            textSize(10);
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

}

class MiniProjectile extends Projectile {
    constructor(x, y, xSpeed, ySpeed, strength, speed, roads) {
        super(x, y, xSpeed, ySpeed, strength, speed, roads);
        fill(0, 0, 0)
        this.x = x;
        this.y = y;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.size = 8;
    }
    move() {
        this.x += this.xSpeed;
        this.y += this.ySpeed;
    }
}
//Small Turret/////////
//////////////////
/////////////////
////////////////
///////////////
class Small extends Turret {
    constructor(roads) {
        super(roads);
        this.value = 50;
        this.range = 75;
        this.shotCooldown = 35;
        this.gunSize = 15;
        this.projectileSpeed = 13;
        this.targetMode = 1;
        this.size = 15;
        this.projectileStrength = 0.19;
        this.projectile = SmallProjectile;


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
        strokeWeight(2);
        fill(0);
        stroke(0);
        var x = this.gunSize * cos(this.lookAngle);
        var y = this.gunSize * sin(this.lookAngle);
        line(this.x, this.y, this.x + x, this.y + y);

        //Turret Body
        strokeWeight(2);
        stroke(0, 0, 0);
        fill(209, 43, 175);
        ellipse(this.x, this.y, this.size, this.size);
        if (this.selected) {
            fill("white");
            textAlign(CENTER, TOP);
            textSize(15);
        }
        if (this.selected) {
            textAlign(CENTER, BOTTOM);
            textSize(10);
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

}

class SmallProjectile extends Projectile {
    constructor(x, y, xSpeed, ySpeed, strength, speed, roads) {
        super(x, y, xSpeed, ySpeed, strength, speed, roads);
        fill(0, 0, 0)
        this.x = x;
        this.y = y;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.size = 1.5;
    }
    move() {
        this.x += this.xSpeed;
        this.y += this.ySpeed;
    }
    update() {
        this.move();
        this.draw();
    }
    inWorld() {
        let outside = 500;

        return this.x > -500 && this.y < 500 + outside
            && this.y > -500 && this.x < 500 + outside;

    }

}
//Shotgun/////////
//////////////////
/////////////////
////////////////
///////////////
class Shotgun extends Turret {
    constructor(roads) {
        super(roads);
        this.value = 150;
        this.range = 70;
        this.shotCooldown = 30;
        this.gunSize = 31;
        this.projectileSpeed = 15;
        this.targetMode = 1;
        this.size = 42;
        this.projectileStrength = 0.75;
        this.projectile = ShotgunProjectile;


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
        strokeWeight(10);
        fill(0,0,0);
        stroke(20,0,0);
        var x = this.gunSize * cos(this.lookAngle);
        var y = this.gunSize * sin(this.lookAngle);
        line(this.x, this.y, this.x + x, this.y + y);

        //Turret Body
        strokeWeight(3);
        stroke(20, 0, 0);
        fill(252, 69, 3);
        ellipse(this.x, this.y, this.size, this.size);
         fill(252, 69, 3);
         push();
        translate(this.x, this.y, rectMode(CENTER));
        rotate(this.lookAngle);
        ellipse(0, 0, this.size / 2, this.size / 2);
        pop();
        if (this.selected) {
            fill("white");
            textAlign(CENTER, TOP);
            textSize(15);
        }
        if (this.selected) {
            textAlign(CENTER, BOTTOM);
            textSize(10);
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

}

class ShotgunProjectile extends Projectile {
    constructor(x, y, xSpeed, ySpeed, strength, speed, roads) {
        super(x, y, xSpeed, ySpeed, strength, speed, roads);
        fill(0, 0, 0)
        this.x = x;
        this.y = y;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.size = 8;
    }
    move() {
        this.x += this.xSpeed;
        this.y += this.ySpeed;
    }
    update() {
        this.move();
        this.draw();
    }
    inWorld() {
        let outside = 500;

        return this.x > -500 && this.y < 500 + outside
            && this.y > -500 && this.x < 500 + outside;

    }

}
