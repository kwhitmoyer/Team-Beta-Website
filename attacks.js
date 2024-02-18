var fireballAnim;
const fireballSpeed = 7;

var currentAttack = 0;


class spell {
    constructor() {
        this.sprite = new Sprite(wizard.posx, wizard.posy);
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
}




var electrics = [];
var fireballs = [];

function castSpell() {
    let fire, elec;
    if (currentAttack > 1) { currentAttack = 0; };
    if (mouse.presses()) {
        printProjectiles();
        if (currentAttack == 0) {
            fire = new fireball();
            fire.rotateSpell(mouse);
            fire.shoot(mouseX - wizard.posx, mouseY - wizard.posy, fireballSpeed);
            fireballs.push(fire);
        } else if (currentAttack == 1) {
            elec = new electric();
            electrics.push(elec);
            elec.rotateSpell(mouse);
            elec.shoot(mouseX - wizard.posx, mouseY - wizard.posy, fireballSpeed);
            electrics.push(elec);
        }
    }
    if (kb.presses(" ")) {
        printProjectiles();
        fire = new fireball();
        if (wizard.sprite.mirror.x) {
            fire.setRotation(180);
            fire.shoot(-wizard.posx, 0, fireballSpeed);
            fireballs.push(fire);
        } else {
            fire.shoot(wizard.posx, 0, fireballSpeed);
            fireballs.push(fire);
        }
    }
    if (kb.presses("1")) { currentAttack++; };
}


function printProjectiles() {
    for (var i = 0; i < electrics.length; i++) {
        console.log(electrics[i]);
    }
    for (var i = 0; i < fireballs.length; ++i) {
        console.log(fireballs[i]);
    }
}