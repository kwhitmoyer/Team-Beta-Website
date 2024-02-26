var fireballAnim;
const spellSpeed = 7;

var currentAttack = 0;

// Parent class for all spells (Fireball and Electric)
class spell {
    constructor() {
        this.sprite = new Sprite(wizard.posx, wizard.posy);

    }

    // This is to rotate spell to where the mouse is, in relation to player
    rotateSpell(rotation) {
        this.sprite.rotateTo(rotation, 100000, 0);

    }


    // This is for shooting with spacebar, it is a set rotation along x-axis
    setRotation(rotation) {
        this.sprite.rotation = rotation;
    }

    // Shoots spell at set speed, changeable by const spellSpeed at top of file
    shoot(velX, velY, speed) {
        this.sprite.vel.x = velX;
        this.sprite.vel.y = velY;

        // Normalize velocity, so that speed is constant.
        // If not normalized, spells would be faster if the cursor is further from player.
        this.sprite.vel.normalize().mult(speed);
    }

}


// Calls super constructor, then animates fireball, with a lifetime of 100 frames
class fireball extends spell {
    constructor() {
        super();
        this.sprite.addAni(fireballAnim);
        this.sprite.collider = 'none';
        this.sprite.life = 100;

    }
}


// Calls super constructor, then animates fireball, with a lifetime of 100 frames
class electric extends spell {
    constructor() {
        super();
        this.sprite.addAni(electricAnim);
        this.sprite.collider = "none";
        this.sprite.life = 100;
    }
}

// Spawns either an electric attack, or fireball at player's position, and adds
// a constant velocity to where the mouse is. Changeable by const spellSpeed.
function castSpell() {
    let fire, elec;
    if (currentAttack > 1) { currentAttack = 0; };
    if (mouse.presses()) {

        // Angle of which to rotate the spell to face away from player
        var x = wizard.posx + mouseX - windowWidth / 2;
        var y = wizard.posy + mouseY - windowHeight / 2;


        if (currentAttack == 0) {
            // 0 is fireball attack for now...

            fire = new fireball();

            // rotateTo() in fireball child class needs object, which is why {x, y} is passed
            fire.rotateSpell({ x, y });

            // Shoot takes 3 parameters: velocity in x direction, y direction, and the spell speed
            // this function passes those parameters
            fire.shoot(mouseX - windowWidth / 2, mouseY - windowHeight / 2, spellSpeed);
        } else if (currentAttack == 1) {

            // Above methods are used here as well.
            elec = new electric();
            elec.rotateSpell({ x, y });
            elec.shoot(mouseX - windowWidth / 2, mouseY - windowHeight / 2, spellSpeed);
        }
    }

    // When player presses space, fireballs are only in x-direction, wherever they are facing
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

