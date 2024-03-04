// Declare variable that will refer to the player object
var wizard;

// Declare variables for animations
var idleAnim;
var runAnim;
var emptyAnim;
var deathAnim;
var golemIdle;
var golemRun;
var fireballAnim;
var electricAnim;
var angleShotAnim;

// Controls game state (title screen, levels, etc.)
var state = 0;

// Variable for title screen start button
var startButton;

// Variable used in drawing level0
var level0Drawn = 0;

// Counter for movement test function
var i = 0;

// Number of frames for electric animation
const electricFrames = 20;

// Loads all animations for sprites in the project
function loadanimations() {
    // Load idle animation sprite sheet (strip) and separate frames
    idleAnim = loadAnimation("assets/idleAnimSheet.png",
        { frameSize: [32, 32], frames: 2 });
    idleAnim.frameDelay = 18; // Slows down idle animation

    // Load run animation sprite sheet (strip) and separate frames
    runAnim = loadAnimation("assets/runAnimSheet.png",
        { frameSize: [32, 32], frames: 6 });

    // Load death animation sprite sheet and separate frames
    deathAnim = loadAnimation("assets/deathAnimSheet.png",
        { frameSize: [32, 32], frames: 10 });

    // Load empty animation sprite sheet and separate frames
    emptyAnim = loadAnimation("assets/emptyAnim.png",
        { frameSize: [32, 32], frames: 1 });

    // Load idle animation for golem enemy
    golemIdle = loadAnimation("assets/golemIdle.png",
        { framesize: [16, 16], frames: 4 });
    golemIdle.frameDelay = 17;

    // Load run animation for golem enemy
    golemRun = loadAnimation("assets/golemIdle.png",
        { framesize: [16, 16], frames: 4 });
    golemRun.frameDelay = 5;

    // Load fireball animation
    fireballAnim = loadAnimation(
        'assets/fireball/FB001.png',
        'assets/fireball/FB002.png',
        'assets/fireball/FB003.png',
        'assets/fireball/FB004.png'
    );
    fireballAnim.frameDelay = 15;

    // Load electric animation
    electricAnim = loadAnimation(
        "assets/electric/tile1.png",
        "assets/electric/tile2.png",
        "assets/electric/tile3.png",
        "assets/electric/tile4.png"
    );
    electricAnim.frameDelay = electricFrames;

    // Load angle shot animation
    angleShotAnim = loadAnimation(
        "assets/tile001.png",
        "assets/tile002.png",
        "assets/tile003.png",
        "assets/tile004.png"
    );
    angleShotAnim.frameDelay = 15;
}

// Tests movement functions
function testPlayerMovement(i) {
    if (i < 100) { wizard.moveRight(); }
    if (i > 100 && i < 200) { wizard.moveDown(); }
    if (i > 200 && i < 300) { wizard.moveLeft(); }
    if (i > 300) { wizard.moveUp(); }
}

// Setup start button
function setupButtons() {
    startButton = new Button({
        x: width/2, y: height - 50,
        width: 100, height: 50,
        align_x: 0, align_y: 0,
        content: 'Click to Start',
        on_press() {
            state++;
        }
    });
}

// Preload images for animation
function preload() {
    loadanimations();
    preloadLevel1();
}

// Setup canvas and game objects
function setup() {
    createCanvas(windowWidth, windowHeight);
    wizard = new player();
    setupButtons();
    createGolemGroup();
}

// Draw function
function draw() {
    clear();

    if (state == 0) {
        // Title screen logic
        background("#5cb8ff");
        fill(0);
        textSize(50);
        textAlign(CENTER);
        text("The Wizard's Quest", width / 2, height / 2);
        startButton.draw();
        wizard.sprite.changeAnimation(emptyAnim);
    } else if (state == 1) {
        if (!level0Drawn) {
            setupLevel1();
            level0Drawn = true; // Ensure setupLevel1() is only called once
        }

        // Apply translation for camera follow
        let camX = constrain(wizard.sprite.position.x - windowWidth / 2, 0, mapPixelWidth - windowWidth);
        let camY = constrain(wizard.sprite.position.y - windowHeight / 2, 0, mapPixelHeight - windowHeight);
        translate(-camX, -camY);

        // Draw map and player
        drawLevel1();
        wizard.sprite.draw();

        // Other game logic...
        playerMovement();
        if (kb.presses('b')) {
            let newGolem = new golem(Math.floor(Math.random() * 401), Math.floor(Math.random() * 401));
        }
        wizard.normalizeMovement();
        if (state != 0) { castSpell(); }
        golemBehavior();
    }
}