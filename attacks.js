var fireballAnim;
const spellSpeed = 7;

var currentAttack = 0;


class spell {
    constructor() {
        this.sprite = new Sprite(wizard.posx, wizard.posy);

    }

    // This is to rotate spell to where the mouse is, in relation to player
    rotateSpell(rotation) {
        this.sprite.rotateTo(rotation);
    }


    // This is for shooting with spacebar, it is a set rotation along x-axis
    setRotation(rotation) {
        this.sprite.rotation = rotation;
    }

    // Shoots spell at set speed, changeable by const spellSpeed at top of file
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
        this.sprite.life = 100;

    }
}

class electric extends spell {
    constructor() {
        super();
        this.sprite.addAni(electricAnim);
        this.sprite.collider = "none";
    }
}

function castSpell() {
    let fire, elec;
    if (currentAttack > 1) { currentAttack = 0; };
    if (mouse.presses()) {
        if (currentAttack == 0) {
            fire = new fireball();
            fire.rotateSpell(mouse);
            fire.shoot(mouseX - windowWidth / 2, mouseY - windowHeight / 2, spellSpeed);
        } else if (currentAttack == 1) {
            elec = new electric();
            elec.rotateSpell(mouse);
            elec.shoot(mouseX - windowWidth / 2, mouseY - windowHeight / 2, spellSpeed);
        }
    }
    if (kb.presses(" ")) {
        fire = new fireball();
        if (wizard.sprite.mirror.x) {
            fire.setRotation(180);
            fire.shoot(-wizard.posx, 0, spellSpeed);
        } else {
            fire.shoot(wizard.posx, 0, spellSpeed);
        }
    }
    if (kb.presses("1")) { currentAttack++; };
}