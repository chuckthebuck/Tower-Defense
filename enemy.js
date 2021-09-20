class Enemy {
    constructor(strength, speed, nodes) {
        this.strength = strength;
        this.value = strength;
        this.speed = speed;
        this.nodes = nodes;
        this.x = nodes[0].x;
        this.y = nodes[0].y;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.size = 30;
        this.targetNode = 0;
        this.finished = false;
        this.slowTimer = 0;
    }


    draw() {
        strokeWeight(1)
        stroke(50, 0, 0);
        fill(200, 75, 75);
        ellipse(this.x, this.y, this.size, this.size);
        fill('black');
        textAlign(CENTER, CENTER);
        textSize(15);

        text(this.strength.floor, this.x, this.y)
    }
    move() {
        let xSpeed = this.xSpeed;
        let ySpeed = this.ySpeed;
        if(this.slowTimer > 0){
            xSpeed/=2;
            ySpeed/=2;
        }
        this.x += xSpeed;
        this.y += ySpeed;
        this.slowTimer -= 1;
    }

    findTarget() {
        //if(the player isnt moving)
        if (this.xSpeed == 0 && this.ySpeed == 0) {
            this.targetNode++;
            let target = this.nodes[this.targetNode];

            //Find the next target node
            //Set x and y speed to move target
            let xDifference = target.x - this.x
            let yDifference = target.y - this.y
            let angle = atan2(yDifference, xDifference)
            this.xSpeed = this.speed * cos(angle);
            this.ySpeed = this.speed * sin(angle);
        }
    }
    checkTarget() {
        let target = this.nodes[this.targetNode];
        let distance = dist(this.x, this.y, target.x, target.y);
        if (distance < this.speed) {
            //stop moving, enemy!!
            this.xSpeed = 0;
            this.ySpeed = 0;
            if (this.targetNode == this.nodes.length - 1) {
                this.finished = true;
                health -= 1;
                updateInfo();
            }
        }
    }

    distanceTraveled() {
        //This function will return how much
        //distance an enemy has traveled
        var distance = 0;
        //i will track which node we are looking at
        var i = 1;
        //if the node is past the end or past the player
        //then stop while loop
        while (i < this.nodes.length && i < this.targetNode) {
            let node1 = this.nodes[i - 1];
            let node2 = this.nodes[i];
            //Add the nodes distance from the previous node
            distance += dist(node1.x, node1.y, node2.x, node2.y);
            i += 1;
        }
        //Add the remaining amount the player is from his last target node
        var lastNode = this.nodes[i - 1];
        distance += dist(this.x, this.y, lastNode.x, lastNode.y);
        return distance;
    }


    update() {
        this.findTarget();
        this.move();
        this.draw();
        this.checkTarget();
    }
}