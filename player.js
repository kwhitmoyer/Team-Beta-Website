
const playerSpeed = 3;
var isMoving = false;


// class for player character
class player {
    // class methods
    constructor() {
        // creates new sprite at 25, 25 with a physical size of 20 x 32 pixels
        this.sprite = new Sprite(25, 25, 20, 32);
        this.sprite.addAni(idleAnim);
        this.sprite.collider = "none";
        //this.sprite.debug = true;
    }

    // moves player right by setting velocity
    moveRight() {

        this.sprite.vel.x = playerSpeed;
        //this.sprite.changeAni(runAnim);
        this.sprite.mirror.x = false;

    }

    // moves player left by setting velocity
    moveLeft() {
        this.sprite.vel.x = -playerSpeed;
        //this.sprite.changeAni(runAnim);
        this.sprite.mirror.x = true;
    }

    // moves player down by setting velocity
    moveDown() {
        this.sprite.vel.y = playerSpeed;
    }

    //this.sprite.changeAni(runAnim);


    // moves player up by setting velocity
    moveUp() {
        this.sprite.vel.y = -playerSpeed;
    }
    //this.sprite.changeAni(runAnim);

    // stops player movement by setting velocity to 0
    stopMovementX() {
        this.sprite.vel.x = 0;
        if (!this.moving()) {

            this.sprite.changeAni(idleAnim);
        }
    }

    normalizeMovement() {
        this.sprite.vel.normalize().mult(playerSpeed);
    }

    get posx() {
        return this.sprite.position.x;
    }
    get posy() {
        return this.sprite.position.y;
    }


    stopMovementY() {
        this.sprite.vel.y = 0;
        if (!this.moving()) {

            this.sprite.changeAni(idleAnim);
        }
    }

    moving(moving) {
        if ((this.sprite.vel.y == 0) && (this.sprite.vel.x == 0)) {
            moving = false;
        } else {
            moving = true;
        }
        return moving;
    }

    // class attributes
    sprite;           // player sprite
    health = 1;       // player health - currently operating on assumption that we want 1 hit death
}



function playerMovement() {
    if (kb.presses('right')) {
        wizard.sprite.mirror.x = false;
        wizard.sprite.changeAni(runAnim);
    }
    if (kb.pressing('right')) { wizard.moveRight(); }
    if (kb.released('right')) { wizard.stopMovementX(); }


    // controls movement left
    if (kb.presses('left')) {
        wizard.sprite.mirror.x = true;
        wizard.sprite.changeAni(runAnim);
    }
    if (kb.pressing('left')) { wizard.moveLeft(); }
    if (kb.released('left')) { wizard.stopMovementX(); }


    // controls movement down
    if (kb.presses('down')) { wizard.sprite.changeAni(runAnim); }
    if (kb.pressing('down')) { wizard.moveDown(); }
    if (kb.released('down')) { wizard.stopMovementY(); }

    // controls movement up
    if (kb.presses('up')) { wizard.sprite.changeAni(runAnim); }
    if (kb.pressing('up')) { wizard.moveUp(); }
    if (kb.released('up')) { wizard.stopMovementY(); }
}