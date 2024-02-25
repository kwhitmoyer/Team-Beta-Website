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
        this.sprite.collider = 'none';
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

class AngleNode {
    constructor(x, y) {
        this.sprite = new Sprite(x, y);
        this.sprite.diameter = 9;
        this.sprite.collider = "static";
        this.isFrozen = false;
        this.sprite.debug = true;
    }
    follow(x, y) {
        this.sprite.x = x;
        this.sprite.y = y;
    }
    freezePosition() {
        this.isFrozen = true;
        this.sprite.position.x.lockPos;
        this.sprite.position.y.lockPos;
    }
    nextNode() {
        return new AngleNode(this.posx, this.posy);
    }
    despawn() {
        this.sprite.remove();
        delete this;
    }

    get posx() {
        return this.sprite.x;
    }
    get posy() {
        return this.sprite.y;
    }

}

class AngleShot {
    constructor(x, y) {
        this.sprite = new Sprite(x, y);
        this.sprite.collider = "kinematic";
        this.sprite.addAni(angleShotAnim);
        this.sprite.animation.scale = 0.5;
        this.sprite.diameter = 10;
        this.sprite.debug = true;
    }
    addVelocity(velx, vely, speed) {
        this.sprite.vel.x = velx;
        this.sprite.vel.y = vely;
        this.sprite.vel.normalize().mult(speed);
    }
    get posx() {
        return this.sprite.x;
    }
    get posy() {
        return this.sprite.y;
    }
}


let projectile;
var offsetX;
var offsetY;
var hasRun = false;

var anglenode1 = false;
var node1;
var node2;
var line1 = false;
var line2 = false;
var checkCollides = false;



// Spawns either an electric attack, or fireball at player's position, and adds
// a constant velocity to where the mouse is. Changeable by const spellSpeed.
function castSpell() {


    // to optimize calculating offsets, instead of every frame.
    if (!hasRun) {
        offsetX = windowWidth / 2;
        offsetY = windowHeight / 2;
        hasRun = true;
    }
    if (line1) {
        line(node1.posx, node1.posy, wizard.posx, wizard.posy);
    }
    if (line2) {
        line(node2.posx, node2.posy, node1.posx, node1.posy);
    }
    if (checkCollides) {

    }



    if (currentAttack > 2) { currentAttack = 0; };

    if (currentAttack == 2) {
        // create one anglenode that follows cursor
        if (!anglenode1) {
            node1 = new AngleNode(mouseX - offsetX + wizard.posx, mouseY - offsetY + wizard.posy);
            anglenode1 = true;
        }
        if (!node1.isFrozen) {
            node1.follow(mouseX - offsetX + wizard.posx, mouseY - offsetY + wizard.posy);
        } else if (!node2.isFrozen) {
            node2.follow(mouseX - offsetX + wizard.posx, mouseY - offsetY + wizard.posy);
        }
        // at this point, creates one node, and the node follows the pointer.
        // When player clicks, it goes to else statement, where the second node starts following the pointer.

        if (mouse.presses() && !node1.isFrozen) {
            node1.freezePosition();
            node2 = node1.nextNode();
            line1 = true;
        } else if (mouse.presses() && node1.isFrozen) {
            line2 = true;
            node2.freezePosition();
            // shoot_angle_shot(node1, node2);
            projectile = new AngleShot(wizard.posx, wizard.posy);
            projectile.addVelocity(node1.posx - wizard.posx, node1.posy - wizard.posy, angleSpeed);
            checkCollides = true;

        }


        // at this point, when player clicks, the position freezes, and creates a new node to follow

        // at this point, draws line from first node to player by setting a boolean to update a line every frame outside this if-statement.



    }




    if (mouse.presses()) {


        // Angle of which to rotate the spell to face away from player
        var x = wizard.posx + mouseX - offsetX;
        var y = wizard.posy + mouseY - offsetY;


        if (currentAttack == 0) {
            // 0 is fireball attack for now...

            projectile = new fireball();

            // adds spell to array for overlap detection
            spells.push(projectile);
            golems.overlaps(projectile.sprite);

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

const angleSpeed = 7;


// function shoot_angle_shot(node1, node2) {
//     var projectile = new AngleShot(wizard.posx, wizard.posy);
//     // projectile.sprite.addAni(angleShotAnim);
//     projectile.addVelocity(node1.posx - wizard.posx, node1.posy - wizard.posy, angleSpeed);
//     if (projectile.sprite.overlaps(node1.sprite)) {
//         console.log("HERE");
//     }

//     function test(projectile, node1) {
//         projectile.addVelocity(100, 100, 100);
//     }