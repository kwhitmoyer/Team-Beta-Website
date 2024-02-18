
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



// // tests movement functions - not sure if this is good enough or not (never done TDD tbh)
// var i = 0;             // argument for testPlayerMovement()
// function testPlayerMovement(i) {
//     if (i < 100) { wizard.moveRight(); };
//     if (i > 100 && i < 200) { wizard.moveDown(); };
//     if (i > 200 && i < 300) { wizard.moveLeft(); };
//     if (i > 300) { wizard.moveUp(); };
// }

// setup canvas and player sprite
function setup() {
    createCanvas(windowWidth, windowHeight);
    wizard = new player();
}


function draw() {
    background("#000000");   // arbitrary color choice, can be changed

    playerMovement();
    wizard.normalizeMovement();
    castSpell();
    despawnProjectiles();
}
