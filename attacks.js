var fireballAnim;
const spells = [];
const spellSpeed = 7;

var currentAttack = 0;
const angleSpeed = 7;


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
        this.sprite.collider = "none";
        this.isFrozen = false;
        // this.sprite.debug = true;
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
        this.sprite.collider = "none";
        this.sprite.addAni(angleShotAnim);
        this.sprite.animation.scale = 0.2;
        this.sprite.diameter = 10;
        // this.sprite.debug = true;
        this.sprite.life = 200;
    }
    addVelocity(velx, vely, speed) {
        this.sprite.vel.x = velx;
        this.sprite.vel.y = vely;
        this.sprite.vel.normalize().mult(speed);
    }
    zeroVelocity() {
        this.sprite.vel.x = 0;
        this.sprite.vel.y = 0;
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
var angles = [];
var angleProjectiles = [];
var onlyOneShot = true;


// Spawns either an electric attack, or fireball at player's position, and adds
// a constant velocity to where the mouse is. Changeable by const spellSpeed.
function castSpell() {


    // to optimize calculating offsets, instead of every frame.
    if (!hasRun) {
        offsetX = windowWidth / 2;
        offsetY = windowHeight / 2;
        hasRun = true;
    }

    // If line1 has been drawn, keep drawing it every frame.
    if (line1) {
        drawingContext.setLineDash([20, 20]);
        stroke(0);
        strokeWeight(0.25);
        line(node1.posx, node1.posy, wizard.posx, wizard.posy);
    }

    // If line2 has been drawn, keep drawing it every frame.
    if (line2) {
        line(node2.posx, node2.posy, node1.posx, node1.posy);
    }

    if (currentAttack > 2) { currentAttack = 0; };




    // firing mode is angleshot
    if (currentAttack == 2) {


        // create one anglenode that follows cursor
        if (!anglenode1) {
            node1 = new AngleNode(mouseX - offsetX + wizard.posx, mouseY - offsetY + wizard.posy);
            anglenode1 = true;
            angles.push(node1);
        }

        // if position of first node is not frozen on screen, follow mouse
        if (!node1.isFrozen) {
            node1.follow(mouseX - offsetX + wizard.posx, mouseY - offsetY + wizard.posy);
        } else if (!node2.isFrozen) {
            // if position of first node is set, but second one is not, set the second node to follow the cursor

            node2.follow(mouseX - offsetX + wizard.posx, mouseY - offsetY + wizard.posy);
        }

        if (mouse.presses() && !node1.isFrozen) { // If node 1 isnt frozen, and player clicks, freeze position, get another node to follow cursor, and draw line between player and node1
            node1.freezePosition();
            node2 = node1.nextNode();
            line1 = true;
        } else if (mouse.presses() && node1.isFrozen && onlyOneShot) { // if first node's position is set, and player presses again, this sets second node's position frozen, =>
            // draws line from node1 to node2, and shoots projectile along the path of the line.
            // dont ask questions, I think it works(maybe)


            node2.freezePosition();                                                                 // freezes node 2 in position

            line2 = true;// keeps line 2 on screen


            onlyOneShot = false;                                                                    // makes sure user can only shoot one shot along that path


            projectile = new AngleShot(wizard.posx, wizard.posy);                                   // shoots projectile to node1
            projectile.addVelocity(node1.posx - wizard.posx, node1.posy - wizard.posy, angleSpeed);

            checkCollides = true;                                                                   // boolean to check collisions between node1 and projectile

            angleProjectiles.push(projectile);
            angles.push(node2);

            node1.sprite.show = false;                                                              // make nodes invisible once shot is fired
            node2.sprite.show = false;


            // if the lifespan of the projectile is over, remove the nodes and stop drawing the lines
        } else if (angleProjectiles.length == 1) {
            if (angleProjectiles[0].sprite.removed) {
                node1.despawn();
                node2.despawn();
                line1 = false;
                line2 = false;
                anglenode1 = false;
                angles = []; // set these empty, so that a projectile does not want to go to a (previously fired) node
                angleProjectiles = [];
                onlyOneShot = true;
            }

        }


        // if an angleshot has been fired
        if (angleProjectiles.length > 0) {

            // checks if it has reached the first node yet...
            if (angleProjectiles[0].sprite.overlaps(angles[0].sprite)) {

                // if so, zeroes its velocity, and starts it along the path to node2
                angleProjectiles[0].zeroVelocity();
                angleProjectiles[0].addVelocity(angles[1].posx - angles[0].posx, angles[1].posy - angles[0].posy, angleSpeed);
            }


        }
    } else {
        // resetting every boolean value, so that angleshot can be used again later by the player.

        onlyOneShot = true;
        if (angles.length > 0) { // if > 0 nodes on screen...

            if (angles.length > 1) { // if > 1 nodes on screen..
                angles[0].sprite.visible = false; // make angles invisible
                angles[1].sprite.visible = false;

                line1 = false; // make lines invisible
                line2 = false;

                angles = [];  // empty these for the same reason as it is done above
                angleProjectiles = [];
                anglenode1 = false;
            } else if (angles.length == 1) {
                angles[0].sprite.visible = false;
                anglenode1 = false;
            }
        }
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
        projectile = new fireball();

        // adds spell to array for overlap detection
        spells.push(projectile);
        golems.overlaps(projectile.sprite);

        if (wizard.sprite.mirror.x) {
            projectile.setRotation(180);
            projectile.shoot(-100000, 0, spellSpeed);
        } else {
            projectile.shoot(100000, 0, spellSpeed);
        }
    }
    if (kb.presses("1")) { currentAttack++; };




}

