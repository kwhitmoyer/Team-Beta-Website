var fireballAnim;
const spells = [];
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
        this.sprite.collider = 'kinematic';
        this.sprite.life = 100;
        this.sprite.diameter = 9;
        this.sprite.debug = true;
    }
}


// Calls super constructor, then animates fireball, with a lifetime of 100 frames
class electric extends spell {
    constructor() {
        super();
        this.sprite.addAni(electricAnim);
        this.sprite.collider = "none";
        this.sprite.life = 100;
        this.sprite.debug = true;
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
        this.moveable = true;
    }

    setPos(x, y) {
        if (this.moveable) {
            this.sprite.position.x = x;
            this.sprite.position.y = y;
        }
    }
    despawn() {
        this.sprite.remove();
        delete this;
    }

    lockPos() {
        var newShot = new angleShot(player.posx + mouseX, mouseY);
    }
    get posx() {
        return wizard.posx + mouseX - offsetX;
    }
    get posy() {
        return wizard.posy + mouseY - offsetY;
    }
    freezePosition() {
        this.moveable = false;
        this.sprite.position.x.lockPos;
        this.sprite.position.y.lockPos;
    }
    drawLine(node) {
        line(this.sprite.x, this.sprite.y, node.sprite.x, node.sprite.y);
        // line(angleProj.sprite.x, angleProj.sprite.y, secondAngle.sprite.x, secondAngle.sprite.y);

    }
    unlockPosition() {
        this.moveable = true;
        this.despawn();
    }
    posX(node) {
        return wizard.posx + node.sprite.x - offsetX;
    }
    posY(node) {
        return wizard.posy + node.sprite.y - offsetY;
    }

    fireProj() {
        this.projSprite = new Sprite(wizard.posx, wizard.posy);
        this.projSprite.addAni(angleShotAnim);
        // this.sprite.diameter = 0.1;
        this.projSprite.scale = 0.1;
        this.projSprite.vel.x = angleProj.sprite.x - wizard.posx;
        this.projSprite.vel.y = angleProj.sprite.y - wizard.posy;
        this.projSprite.vel.normalize().mult(3);
        this.projSprite.collider = "kinetic";
        // this.projSprite.x = wizard.posx

    }
}


var spellFlag = false;
let projectile;
let angleProj;
var offsetX;
var offsetY;
var hasRun = false;
var tst;

// Spawns either an electric attack, or fireball at player's position, and adds
// a constant velocity to where the mouse is. Changeable by const spellSpeed.
function castSpell() {
    // to optimize calculating offsets, instead of every frame.
    if (!hasRun) {
        offsetX = windowWidth / 2;
        offsetY = windowHeight / 2;
        hasRun = true;
    }



    if (currentAttack > 2) { currentAttack = 0; };

    if (currentAttack == 2 && !spellFlag) {
        // create angleshot at cursor position, and prepare to follow cursor
        angleProj = new angleShot(wizard.posx + mouseX - offsetX, wizard.posy + mouseY - offsetY);
        spellFlag = true;
        makeAngle();
    } else if (spellFlag && currentAttack == 2) {
        // set position of circle to the cursor if the firing mode is angleshot
        angleProj.setPos(wizard.posx + mouseX - offsetX, wizard.posy + mouseY - offsetY);
        makeAngle();
    } else if (spellFlag) {
        // angleshot is deselected
        spellFlag = false;
        angleProj.despawn();
    }


    if (mouse.presses()) {


        // Angle of which to rotate the spell to face away from player
        var x = wizard.posx + mouseX - offsetX;
        var y = wizard.posy + mouseY - offsetY;


        if (currentAttack == 0) {
            // 0 is fireball attack for now...

            projectile = new fireball();
            tst = projectile;

            // adds spell to array for overlap detection
            spells.push(fire);
            golems.overlaps(fire.sprite);

            // rotateTo() in fireball child class needs object, which is why {x, y} is passed
            projectile.rotateSpell({ x, y });

            // Shoot takes 3 parameters: velocity in x direction, y direction, and the spell speed
            // this function passes those parameters
            projectile.shoot(mouseX - offsetX, mouseY - offsetY, spellSpeed);
        } else if (currentAttack == 1) {

            // Above methods are used here as well.
            elec = new electric();

            // adds spell to array for overlap detection
            spells.push(elec);
            golems.overlaps(elec.sprite);

            elec.rotateSpell({ x, y });
            elec.shoot(mouseX - windowWidth / 2, mouseY - windowHeight / 2, spellSpeed);
        }
    }

    // When player presses space, fireballs are only in x-direction, wherever they are facing
    if (kb.presses(" ")) {
        fire = new fireball();

        // adds spell to array for overlap detection
        spells.push(fire);
        golems.overlaps(fire.sprite);

        if (wizard.sprite.mirror.x) {
            projectile.setRotation(180);
            projectile.shoot(-wizard.posx, 0, -spellSpeed);
        } else {
            projectile.shoot(wizard.posx, 0, spellSpeed);
        }
        console.log(projectile);
    }
    if (kb.presses("1")) { currentAttack++; };
}

// var angles = [];
var angleFlag = false;
var secondAngleFlag = false;
var secondAngle;



function makeAngle() {

    if (secondAngleFlag) {
        secondAngle.drawLine(angleProj);
        projectile = secondAngle.fireProj();
        secondAngleFlag = false;
        angleFlag = false;
        secondAngle.despawn();
        angleProj.despawn();
    }


    if (angleFlag) {
        angleProj.drawLine(wizard);
        secondAngle.setPos(wizard.posx + mouseX - offsetX, wizard.posy + mouseY - offsetY);
        // secondAngle.drawLine(angleProj);
        if (mouse.presses()) {
            secondAngle.freezePosition();
            secondAngle.drawLine(angleProj);
            secondAngleFlag = true;
        }
    }
    if (mouse.presses() && !angleFlag) {
        // freeze position of circle
        angleProj.freezePosition();
        // make sure the circle does not disappear
        angleFlag = true;
        secondAngle = new angleShot(wizard.posx + mouseX - offsetX, wizard.posy + mouseY - offsetY);
    }
}
