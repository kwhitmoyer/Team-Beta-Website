var wizard;                // declare variable that will refer to player object
var idleAnim;              // declare variable for idle animation
var runAnim;               // declare variable for run animation
var emptyAnim;
var state = 0;             // controls state (title screen, level0, level1 etc)
var startButton;           // variable for title screen start button
var level0Drawn = 0;       // variable used in drawing level0

let electricAnim;
const electricFrames = 20;

let angleShotAnim;

// Loads all animations for sprites in the project.
function loadanimations() {
    // loads idle animation sprite sheet (strip), and seperates frames
    idleAnim = loadAnimation("assets/idleAnimSheet.png",
        { frameSize: [32, 32], frames: 2 });
    idleAnim.frameDelay = 18;     // slows down idle animation


    // loads run animation sprite sheet (strip), and seperates frames
    runAnim = loadAnimation("assets/runAnimSheet.png",
        { frameSize: [32, 32], frames: 6 });

    //loads death animation sprite sheet and seperates frames
    deathAnim = loadAnimation("assets/deathAnimSheet.png",
        { frameSize: [32, 32], frames: 10 });

    emptyAnim = loadAnimation("assets/emptyAnim.png",
    { frameSize: [32, 32], frames: 1 });

    // loads idle animation for golem enemy
    golemIdle = loadAnimation("assets/golemIdle.png",
        { framesize: [16, 16], frames: 4 });
    golemIdle.frameDelay = 17;

    // loads run animation
    golemRun = loadAnimation("assets/golemIdle.png",
        { framesize: [16, 16], frames: 4 });
    golemRun.frameDelay = 5;

    teleportJump = loadAnimation("assets/teleportAnimSheet.png",
        { frameSize: [32, 32], frames: 4});

    shield = loadAnimation("assets/shieldAnimSheet.png",
        { frameSize: [32, 32], frames: 1});


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
    // angleShotAnim.scale = 0.2;

    fearAnim = loadAnimation(
        "assets/fear/fearballstage1.png",
        "assets/fear/fearballstage2.png",
        "assets/fear/fearballstage3.png",
        "assets/fear/fearballstage4.png",
        "assets/fear/fearballstage5.png",
        "assets/fear/fearballstage6.png",
        "assets/fear/fearballstage7.png",
        "assets/fear/fearballstage8.png"
    ); 



}

// tests movement functions - not sure if this is good enough or not (never done TDD tbh)
function testPlayerMovement(i) {
    if (i < 100) { wizard.moveRight(); };
    if (i > 100 && i < 200) { wizard.moveDown(); };
    if (i > 200 && i < 300) { wizard.moveLeft(); };
    if (i > 300) { wizard.moveUp(); };
}

// Add a respawn function
function respawnPlayer() {
    wizard.health = 1;  // Reset player health
    wizard.sprite.position.set(25, 25);  // Set the player position to the initial position
    wizard.sprite.changeAni(idleAnim);  // Play idle animation
}

function setupButtons() {
    startButton = new Button({
        x: width/2, y: height - 50,
        width: 100, height: 50,
        align_x: 0, align_y: 0,
        content: 'Click to Start',
        on_press() {
            state++;
        }
    })
}

// preload images for animation - executed once
function preload() {
    loadanimations();
    bombImg = loadImage('assets/items/testItem1.png');
    potionImg = loadImage('assets/items/testItem2.png');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    wizard = new player();
    setupButtons();
    createGolemGroup();
    createItemGroup();
    inventoryItemSprites();
}

// Currently implemented in level0
// // setup canvas and player sprite - executed once
// function setup() {
//     createCanvas(windowWidth, windowHeight);
//     wizard = new player();
//     tempSprite = new Sprite();
//     wizard.sprite.overlaps(tempSprite);
// }

var test;
var respawnState = false; // New variable to track respawn state

function draw() {
    // state = 0 corresponds to start screen
    if (state == 0) {
        background("#5cb8ff");   // arbitrary color choice, can be changed
        fill(0);
        textSize(50);
        textAlign(CENTER);
        text("The Wizard's Quest", width/2, height/2);
        startButton.draw();
        wizard.sprite.changeAni(emptyAnim);
    }
    // state = 1 corresponds to level0
    camera.on();                    // manually turns camera on - needed for HUD sprites
    if (state == 1) {
        background("#fce1b6");   // arbitrary color choice, can be changed
        if (level0Drawn == 0) { drawLevel0(); }   // makes sure level sprites only get drawn once - breaks otherwise
    }

    // Center the canvas around the player
    //translate(windowWidth / 2 - wizard.sprite.position.x, windowHeight / 2 - wizard.sprite.position.y);

    // Draw the player
    wizard.sprite.draw();
    camera.x = wizard.sprite.x;
	camera.y = wizard.sprite.y;

    playerMovement();

    // press b to spawn golem in random pos
    if (kb.presses('b')) {
        let newGolem;
        newGolem = new golem(Math.floor(Math.random() * 401), Math.floor(Math.random() * 401));
    }

    // spawns generic item to add to inventory
    if (state != 0) {
        if (kb.presses('p')) {
            let newItem;
            newItem = new item(Math.floor(Math.random() * 401), Math.floor(Math.random() * 401));
        }
    }

    // Normalize movement, so player does not move faster in diagonal movements
    // see pyth. theorem
    wizard.normalizeMovement();
    if (state != 0) { castSpell(); }          // prevents spells from being cast on title screen
    golemBehavior();

    // Respawn player when 'r' is pressed
    if (kb.presses('r') && !respawnState) {
        respawnPlayer();
        respawnState = true;
    }

    // Reset respawn state when 'r' is released
    if (kb.released('r')) {
        respawnState = false;
    }

    if (state != 0) {
        camera.off();                       // HUD sprites must be drawn after camera turned off
        drawInventory();
        if (state == 1) {
        textAlign(LEFT);
        text('WASD to move\n' +
        'Click to attack (mouse to aim)\n' +
        'Space to shoot fireball sideways\n' +
        'Press 1 to change attack\n' +
        'Press b to spawn golem enemy\n' +
        'Hold o to activate golem behavior (must be holding for attacks to effect them)\n' +
        'Press y to die\n' +
        'Press r to respawn\n' +
        'Press p to spawn item\n' +
        'Press t to teleport\n' +
        'Press i for shield',50, 100);
        }
    }
}
