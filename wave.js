class Wave {


  constructor(nodes) {
    this.number = 0;
    this.active = false;
    this.groupAmount = 5;
    this.groupSize = 1;
    this.active = false;
    this.timer = 0;
    this.groupDelay = 60;
    this.memberDelay = 20;
    this.currentGroup = 0;
    this.currentMember = 0;
    this.strength = 1;
    this.speed = 2;
    this.nodes = nodes;


  }

  start() {
    if (this.active == false) {
      this.number++;
      this.active = true;
      this.timer = 0;
    }
  }



  spawnTime(group, member) {
    var groupDuration = this.memberDelay * (this.groupSize - 1);

    var groupStart = group * (this.groupDelay + groupDuration);

    var memberStart = member * this.memberDelay;
    if (this.timer >= groupStart + memberStart) {
      return true;
    } else {
      return false;
    }
  }

  spawnEnemies() {
    if (this.spawnTime(this.currentGroup, this.currentMember)) {

      enemies.push(new Enemy(this.strength, this.speed, this.nodes));
      this.currentMember += 1;
      if (this.currentMember >= this.groupSize) {
        this.currentMember = 0;
        this.currentGroup += 1;
      }
      if (this.currentGroup >= this.groupAmount) {
        this.currentGroup = 0;
        this.active = false;
        this.powerUp();
      }
    }
  }
  powerUp() {

    if (this.number % 5 == 1) {
      this.groupAmount++;
      this.speed += 0.095;
      this.strength += 0.25;
    }
    if(this.number === 3){
      this.groupSize++;
    }

    if (this.number % 10 == 2) {
      this.groupSize++;
      this.speed += 0.15;
    }

    this.groupDelay = random(35, 75)
    if(this.number <= 15){
      this.groupDelay = random(45, 70);
    }
    if (this.number === 15) {
      this.strength += 1;
      this.groupSize += 2;
    }
    if (this.number === 30) {
      this.groupSize += 2;
    }


    this.strength += 0.95;



  }
  update() {
    if (this.active) {
      this.spawnEnemies();
      this.timer++;
    }
  }
}