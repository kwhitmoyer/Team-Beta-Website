var wizard;                // declare variable that will refer to player object
var idleAnim;              // declare variable for idle animation
var runAnim;               // declare variable for run animation

var i = 0;

let electricAnim;
const electricFrames = 20;

let angleShotAnim;

var GameState = [];

// Loads all animations for sprites in the project.
function loadanimations() {
    // loads idle animation sprite sheet (strip), and seperates frames
    idleAnim = loadAnimation("assets/idleAnimSheet.png",
        { frameSize: [32, 32], frames: 2 });
    idleAnim.frameDelay = 18;     // slows down idle animation


    // loads run animation sprite sheet (strip), and seperates frames
    runAnim = loadAnimation("assets/runAnimSheet.png",
        { frameSize: [32, 32], frames: 6 });

    // loads idle animation for golem enemy
    golemIdle = loadAnimation("assets/golemIdle.png",
        { framesize: [16, 16], frames: 4 });
    golemIdle.frameDelay = 17;

    // loads run animation
    golemRun = loadAnimation("assets/golemIdle.png",
        { framesize: [16, 16], frames: 4 });
    golemRun.frameDelay = 5;


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

    angleShotAnim = loadAnimation(
        "assets/tile001.png",
        "assets/tile002.png",
        "assets/tile003.png",
        "assets/tile004.png"
    );

    angleShotAnim.frameDelay = 15;

}

// tests movement functions - not sure if this is good enough or not (never done TDD tbh)
var i = 0;             // argument for testPlayerMovement()
function testPlayerMovement(i) {
    if (i < 100) { wizard.moveRight(); };
    if (i > 100 && i < 200) { wizard.moveDown(); };
    if (i > 200 && i < 300) { wizard.moveLeft(); };
    if (i > 300) { wizard.moveUp(); };
}

// preload images for animation - executed once
function preload() {
    loadanimations();
    createGolemGroup();
}

// Currently implemented in level0
// // setup canvas and player sprite - executed once
// function setup() {
//     createCanvas(windowWidth, windowHeight);
//     wizard = new player();
//     tempSprite = new Sprite();
//     wizard.sprite.overlaps(tempSprite);
// }

var i = 0;             // argument for testPlayerMovement()

function drawScene() {
    GameState = ["level0"]; // First will be menu, but that is not implemented yet.
}

var test;

function draw() {
    background("#fce1b6");   // arbitrary color choice, can be changed

    text('WASD to move\n' +
        'Click to attack (mouse to aim)\n' +
        'Space to shoot fireball sideways\n' +
        'Press 1 to change attack\n' +
        'Press b to spawn golem enemy\n' +
        'Hold o to activate golem behavior (must be holding for attacks to effect them)', 50, 50);

    // press b to spawn golem in random pos
    if (kb.presses('b')) {
        let newGolem;
        newGolem = new golem(Math.floor(Math.random() * 401), Math.floor(Math.random() * 401));
    }

    // Center the canvas around the player
    translate(windowWidth / 2 - wizard.sprite.position.x, windowHeight / 2 - wizard.sprite.position.y);

    // Draw the player
    wizard.sprite.draw();

    playerMovement();

    // Normalize movement, so player does not move faster in diagonal movements
    // see pyth. theorem
    wizard.normalizeMovement();
    castSpell();
    golemBehavior();
}