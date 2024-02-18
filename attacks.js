var fireballAnim;
const fireballSpeed = 7;

var currentAttack = 0;




class spell {
    constructor() {
        this.sprite = new Sprite(wizard.posx, wizard.posy);
        this.timeAlive = 0;
    }
    rotateSpell(rotation) {
        this.sprite.rotateTo(rotation, 1000, 0);
    }
    setRotation(rotation) {
        this.sprite.rotation = rotation;
    }
    shoot(velX, velY, speed) {
        this.sprite.vel.x = velX;
        this.sprite.vel.y = velY;
        this.sprite.vel.normalize().mult(speed);
    }

}



class fireball extends spell {
    constructor() {
        super();
        this.sprite.addAni(fireballAnim);
        this.sprite.collider = 'none';

    }
}

class electric extends spell {
    constructor() {
        super();
        this.sprite.addAni(electricAnim);
        this.sprite.collider = "none";
    }
    setDt() {
        this.deltaT = deltaTime;
    }
    getDt() {
        return this.deltaT;
    }

}




var electrics = [];
var fireballs = [];

function castSpell() {
    let fire, elec;
    if (currentAttack > 1) { currentAttack = 0; };
    if (mouse.presses()) {
        if (currentAttack == 0) {
            fire = new fireball();
            fire.rotateSpell(mouse);
            fire.shoot(mouseX - wizard.posx, mouseY - wizard.posy, fireballSpeed);
        } else if (currentAttack == 1) {
            elec = new electric();
            elec.setDt();
            electrics.push(elec);
            elec.rotateSpell(mouse);
            elec.shoot(mouseX - wizard.posx, mouseY - wizard.posy, fireballSpeed);
        }
    }
    if (kb.presses(" ")) {
        fire = new fireball();
        if (wizard.sprite.mirror.x) {
            fire.setRotation(180);
            fire.shoot(-wizard.posx, 0, fireballSpeed);
        } else {
            fire.shoot(wizard.posx, 0, fireballSpeed);
        }
    }
    if (kb.presses("1")) { currentAttack++; };
}

function despawnProjectiles() {
    for (var i = 0; i < electrics.length; ++i) {
        // console.log(electrics[i].getDt());
        if (electrics[i].getDt() > 1000) {
            electrics[i].remove();
        } else {
            electrics[i].setDt(electrics[i].getDt + deltaTime);
        }
    }
}