var wizard;                // declare variable that will refer to player object
var idleAnim;              // declare variable for idle animation
var runAnim;               // declare variable for run animation

var movingRight = false;
var movingLeft = false;
var movingUp = false;
var movingDown = false;
const playerSpeed = 3;


// class for player character
class player {
    // class methods
    constructor() {
        this.sprite = new Sprite(25, 25);
        this.sprite.addAni(idleAnim);
    }

    // moves player right by setting velocity
    moveRight() {
        this.sprite.vel.x = playerSpeed;
    }

    // moves player left by setting velocity
    moveLeft() {
        this.sprite.vel.x = -playerSpeed;
    }

    // moves player down by setting velocity
    moveDown() {
        this.sprite.vel.y = playerSpeed;
    }

    // moves player up by setting velocity
    moveUp() {
        this.sprite.vel.y = -playerSpeed;
    }

    // stops player movement by setting velocity to 0
    stopMovement() {
        this.sprite.vel.x = 0;
        this.sprite.vel.y = 0;
        if (this.sprite.vel.x == 0 && this.sprite.vel.y == 0) {
            this.sprite.changeAni(idleAnim);
        }
    }

    normalizeMovement() {
        this.sprite.vel.normalize().mult(playerSpeed);
    }

    get posx() {
        return this.sprite.x;
    }
    get posy() {
        return this.sprite.y;
    }



    // class attributes
    sprite;           // player sprite
}



function playerMovement() {
    if (kb.presses('right')) {
        wizard.sprite.mirror.x = false;
        wizard.sprite.changeAni(runAnim);
    }
    if (kb.pressing('right')) { wizard.moveRight(); }
    if (kb.released('right')) { wizard.stopMovement(); }

    // controls movement left
    if (kb.presses('left')) {
        wizard.sprite.mirror.x = true;
        wizard.sprite.changeAni(runAnim);
    }
    if (kb.pressing('left')) { wizard.moveLeft(); }
    if (kb.released('left')) { wizard.stopMovement(); }

    // controls movement down
    if (kb.presses('down')) { wizard.sprite.changeAni(runAnim); }
    if (kb.pressing('down')) { wizard.moveDown(); }
    if (kb.released('down')) { wizard.stopMovement(); }

    // controls movement up
    if (kb.presses('up')) { wizard.sprite.changeAni(runAnim); }
    if (kb.pressing('up')) { wizard.moveUp(); }
    if (kb.released('up')) { wizard.stopMovement(); }
}