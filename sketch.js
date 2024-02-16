var wizard;                // declare variable that will refer to player object
var idleAnim;              // declare variable for idle animation
var runAnim;               // declare variable for run animation
var i = 0;                 // argument for testPlayerMovement()

// these variables track whether the player is moving
// used to prevent animation from switching to idle while
// still moving in some cases
var movingUp = false;
var movingDown = false;
var movingRight = false;
var movingLeft = false;

// preload images for animation
function preload() {
    // loads idle animation sprite sheet (strip), and seperates frames
    idleAnim = loadAnimation( "assets/idleAnimSheet.png",
    {frameSize: [32, 32], frames: 2});

    // loads run animation sprite sheet (strip), and seperates frames
    runAnim = loadAnimation( "assets/runAnimSheet.png",
                  {frameSize: [32, 32], frames: 6});
}

// class for player character
class player {
    // class methods
    constructor() {
        this.sprite = new Sprite (25, 25);
        this.sprite.addAni(idleAnim);
    }

    // moves player right by setting velocity
    moveRight() {
        this.sprite.vel.x = 3;
        this.sprite.changeAni(runAnim);
        this.sprite.mirror.x = false;
    }

    // moves player left by setting velocity
    moveLeft() {
        this.sprite.vel.x = -3;
        this.sprite.changeAni(runAnim);
        this.sprite.mirror.x = true;
    }

    // moves player down by setting velocity
    moveDown() {
        this.sprite.vel.y = 3;
        this.sprite.changeAni(runAnim);
      }

      // moves player up by setting velocity
    moveUp() {
        this.sprite.vel.y = -3;
        this.sprite.changeAni(runAnim);
      }

    // stops player movement by setting velocity to 0
    stopMovementX() {
        this.sprite.vel.x = 0;
        if (!movingUp && !movingDown) {
            this.sprite.changeAni(idleAnim);
        }
    }

    stopMovementY() {
        this.sprite.vel.y = 0;
        if (!movingRight && !movingLeft) {
            this.sprite.changeAni(idleAnim);
        }
    }

    // class attributes
    sprite;           // player sprite
}

// tests movement functions - not sure if this is good enough or not (never done TDD tbh)
function testPlayerMovement(i) {
    if (i < 100) { wizard.moveRight(); };
    if (i > 100 && i < 200) { wizard.moveDown(); };
    if (i > 200 && i < 300) { wizard.moveLeft(); };
    if (i > 300) { wizard.moveUp(); };
}

// preload images for animation - executed once
function preload() {
    // loads idle animation sprite sheet (strip), and seperates frames
    idleAnim = loadAnimation( "assets/idleAnimSheet.png",
    {frameSize: [32, 32], frames: 2});

    // loads run animation sprite sheet (strip), and seperates frames
    runAnim = loadAnimation( "assets/runAnimSheet.png",
                  {frameSize: [32, 32], frames: 6});
}

// setup canvas and player sprite - executed once
function setup() {
    createCanvas(windowWidth, windowHeight);
    wizard = new player();
    idleAnim.frameDelay = 18;     // slows down idle animation
}

// executed repeatedly
function draw() {
    background("#fce1b6");   // arbitrary color choice, can be changed

    // for movement testing
    // testPlayerMovement(i);
    // ++i;
    // if (i > 400) { i = 0; };

// tried multiple different setups for these if statements
// this one seems to work the best

    // controls movement up
    if (kb.presses('w')) {
        movingUp = true;
        wizard.moveUp();
    }
    if (kb.releases('w')) {
        movingUp = false;
        wizard.stopMovementY();
    }

    // controls movement left
    if (kb.presses('a')) {
        movingLeft = true;
        wizard.moveLeft();
    }
    if (kb.releases('a')) {
        movingLeft = false;
        wizard.stopMovementX();
    }

    // controls movement down
    if (kb.presses('s')) {
        movingDown = true;
        wizard.moveDown();
    }
    if (kb.releases('s')) {
        movingDown = false;
        wizard.stopMovementY();

    }

    // controls movement right
    if (kb.presses('d')) {
        movingRight = true;
        wizard.moveRight();
    }
    if (kb.releases('d')) {
        movingRight = false;
        wizard.stopMovementX();
    }
}
