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

class angleShot {
    constructor(x, y) {
        this.sprite = new Sprite();
        this.sprite.diameter = 8;
        this.sprite.position.x = x;
        this.sprite.position.y = y;
        this.sprite.collider = "none";
        this.sprite.color = "white";
    }

    setPos(x, y) {
        this.sprite.position.x = x;
        this.sprite.position.y = y;
    }
    despawn() {
        this.sprite.remove();
        delete this;
    }

    lockPos() {

    }

}

var spellFlag = false;
let projectile;
let angleProj;

// Spawns either an electric attack, or fireball at player's position, and adds
// a constant velocity to where the mouse is. Changeable by const spellSpeed.
function castSpell() {

    if (currentAttack > 2) { currentAttack = 0; };

    if (currentAttack == 2 && !spellFlag) {
        angleProj = new angleShot(wizard.posx + mouseX - windowWidth / 2, wizard.posy + mouseY - windowHeight / 2);
        spellFlag = true;
        makeAngle();
    } else if (spellFlag && currentAttack == 2) {
        angleProj.setPos(wizard.posx + mouseX - windowWidth / 2, wizard.posy + mouseY - windowHeight / 2);
        makeAngle();
    } else if (spellFlag) {
        spellFlag = false;
        angleProj.despawn();
    }

    if (mouse.presses()) {

        // Angle of which to rotate the spell to face away from player
        var x = wizard.posx + mouseX - windowWidth / 2;
        var y = wizard.posy + mouseY - windowHeight / 2;


        if (currentAttack == 0) {
            // 0 is fireball attack for now...

            projectile = new fireball();

            // rotateTo() in fireball child class needs object, which is why {x, y} is passed
            projectile.rotateSpell({ x, y });

            // Shoot takes 3 parameters: velocity in x direction, y direction, and the spell speed
            // this function passes those parameters
            projectile.shoot(mouseX - windowWidth / 2, mouseY - windowHeight / 2, spellSpeed);
        } else if (currentAttack == 1) {

            // Above methods are used here as well.
            projectile = new electric();
            projectile.rotateSpell({ x, y });
            projectile.shoot(mouseX - windowWidth / 2, mouseY - windowHeight / 2, spellSpeed);
        }
    }

    // When player presses space, fireballs are only in x-direction, wherever they are facing
    if (kb.presses(" ")) {
        projectile = new fireball();

        if (wizard.sprite.mirror.x) {
            projectile.setRotation(180);
            projectile.shoot(-wizard.posx, 0, spellSpeed);
        } else {
            projectile.shoot(wizard.posx, 0, spellSpeed);
        }
    }
    if (kb.presses("1")) { currentAttack++; };
}

function makeAngle() {
    let angleProj2;
    if (mouse.presses()) {
        angleProj2 = angleProj.lockPos();

    }
}