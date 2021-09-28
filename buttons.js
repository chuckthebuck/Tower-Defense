class Button {




    constructor(x, y, width, height, text, func) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.text = text;
        this.func = func;
    }

    mouseCollide() {

        if (mouseX > this.x - this.width / 2 &&
            mouseX < this.x + this.width / 2 &&
            mouseY > this.y - this.height / 2 &&
            mouseY < this.y + this.height / 2) {
            return true;
        }
        return false;
    }

    draw() {
        fill(150);
        rect(this.x, this.y, this.width, this.height);
        textAlign(CENTER);
        fill(0);
        stroke(150);
        text(this.text, this.x, this.y);
        stroke(0);
    }


}

var ready = true;


/*var mouseClicked = function () {
    if (!ready) {
        return;
    } else {
        ready = false;
        setTimeout(function () { ready = true }, 500);
    }
    if (paused) {

        if (pauseButton.mouseCollide()) {
            pauseButton.func();
        }
        if (controlButton.mouseCollide()) {
            controlButton.func();
        }
        if (infoButton.mouseCollide()) {
            infoButton.func();
            return;
        }
    }

    if (controls) {

        if (backButton.mouseCollide()) {
            backButton.func();
        }
        return;
    }
    if (inform) {

        if (backButton2.mouseCollide()) {
            backButton2.func();
        }
        return;
    }

    if (!levelSelected) {

        if (map1Button.mouseCollide()) {
            map1Button.func();
        }

        if (map2Button.mouseCollide()) {
            map2Button.func();
        }

        if (map3Button.mouseCollide()) {
            map3Button.func();
        }
        return false;


    }


};*/
