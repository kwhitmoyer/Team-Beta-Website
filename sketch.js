var wizard;                // declare variable that will refer to player object
var idleAnim;              // declare variable for idle animation
var runAnim;               // declare variable for run animation
var i = 0;

const playerSpeed = 3;
var isMoving = false;

let electricAnim;
const electricFrames = 20;

function loadanimations() {
    // loads idle animation sprite sheet (strip), and seperates frames

    idleAnim = loadAnimation("assets/idleAnimSheet.png",
        { frameSize: [32, 32], frames: 2 });
    idleAnim.frameDelay = 18;     // slows down idle animation


    // loads run animation sprite sheet (strip), and seperates frames
    runAnim = loadAnimation("assets/runAnimSheet.png",
        { frameSize: [32, 32], frames: 6 });


    fireballAnim = loadAnimation(
        'assets/fireball/FB001.png',
        'assets/fireball/FB002.png',
        'assets/fireball/FB003.png',
        'assets/fireball/FB004.png'
    );
    fireballAnim.frameDelay = 15;

    electricAnim = loadAnimation(
        "assets/electric/tile1.png",
        "assets/electric/tile2.png",
        "assets/electric/tile3.png",
        "assets/electric/tile4.png"
    );
    electricAnim.frameDelay = electricFrames;

}


// preload images for animation
function preload() {
    loadanimations();
}

/ class for player character
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



// tests movement functions - not sure if this is good enough or not (never done TDD tbh)
var i = 0;             // argument for testPlayerMovement()
function testPlayerMovement(i) {
    if (i < 100) { wizard.moveRight(); };
    if (i > 100 && i < 200) { wizard.moveDown(); };
    if (i > 200 && i < 300) { wizard.moveLeft(); };
    if (i > 300) { wizard.moveUp(); };
}

// setup canvas and player sprite
function setup() {
    createCanvas(windowWidth, windowHeight);
    wizard = new player();
}


function draw() {
    background("#fce1b6");   // arbitrary color choice, can be changed

    playerMovement();
    wizard.normalizeMovement();
    castSpell();
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
