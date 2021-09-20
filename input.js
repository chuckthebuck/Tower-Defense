var mouseClicked = function () {
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
    if(health < 0){
        
        setup();
        health = 0;
    
    }


};