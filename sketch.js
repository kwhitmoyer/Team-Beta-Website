var wizard;                // declare variable that will refer to player object
var idleAnim;              // declare variable for idle animation
var runAnim;               // declare variable for run animation

var i = 0;

let electricAnim;
const electricFrames = 20;


// Loads all animations for sprites in the project.
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

function draw() {
    background("#fce1b6");   // arbitrary color choice, can be changed

    // Center the canvas around the player
    translate(width / 2 - wizard.sprite.position.x, height / 2 - wizard.sprite.position.y);

    // Draw the player
    wizard.sprite.draw();

    playerMovement();

    // Normalize movement, so player does not move faster in diagonal movements
    // see pyth. theorem
    wizard.normalizeMovement();
    castSpell();


}