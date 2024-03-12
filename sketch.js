

import { map } from "./map0.js";
import { GameState } from "./gamestate.js";
import { makePlayer } from "./player.js";
import { overlay } from "./overlay.js";



new p5((p) => {
    const wizard = new makePlayer(p);
    const map0 = new map(p);
    const overlayText = new overlay(p);

    p.preload = () => {
        wizard.setup();
    }

    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        map0.setup();
        overlayText.setup();

    }

    p.draw = () => {
        p.clear();
        p.background('#fce1b6');
        wizard.draw();
        // overlayText.draw();
    }

    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    }
})

















// var i = 0; // for movement test func

// let electricAnim;
// const electricFrames = 20;

// let angleShotAnim;

// // Loads all animations for sprites in the project.
// function loadanimations(p) {
//     // loads idle animation sprite sheet (strip), and seperates frames
//     idleAnim = p.loadAnimation("assets/idleAnimSheet.png",
//         { frameSize: [32, 32], frames: 2 });
//     idleAnim.frameDelay = 18;     // slows down idle animation


//     // loads run animation sprite sheet (strip), and seperates frames
//     runAnim = p.loadAnimation("assets/runAnimSheet.png",
//         { frameSize: [32, 32], frames: 6 });

//     //loads death animation sprite sheet and seperates frames
//     deathAnim = p.loadAnimation("assets/deathAnimSheet.png",
//         { frameSize: [32, 32], frames: 10 });

//     emptyAnim = p.loadAnimation("assets/emptyAnim.png",
//         { frameSize: [32, 32], frames: 1 });

//     // loads idle animation for golem enemy
//     golemIdle = p.loadAnimation("assets/golemIdle.png",
//         { framesize: [16, 16], frames: 4 });
//     golemIdle.frameDelay = 17;

//     // loads run animation
//     golemRun = p.loadAnimation("assets/golemIdle.png",
//         { framesize: [16, 16], frames: 4 });
//     golemRun.frameDelay = 5;


//     fireballAnim = p.loadAnimation(
//         'assets/fireball/FB001.png',
//         'assets/fireball/FB002.png',
//         'assets/fireball/FB003.png',
//         'assets/fireball/FB004.png'
//     );
//     fireballAnim.frameDelay = 15;

//     electricAnim = p.loadAnimation(
//         "assets/electric/tile1.png",
//         "assets/electric/tile2.png",
//         "assets/electric/tile3.png",
//         "assets/electric/tile4.png"
//     );
//     electricAnim.frameDelay = electricFrames;

//     angleShotAnim = p.loadAnimation(
//         "assets/tile001.png",
//         "assets/tile002.png",
//         "assets/tile003.png",
//         "assets/tile004.png"
//     );

//     angleShotAnim.frameDelay = 15;
//     // angleShotAnim.scale = 0.2;

// }

// // tests movement functions - not sure if this is good enough or not (never done TDD tbh)
// function testPlayerMovement(i) {
//     if (i < 100) { wizard.moveRight(); };
//     if (i > 100 && i < 200) { wizard.moveDown(); };
//     if (i > 200 && i < 300) { wizard.moveLeft(); };
//     if (i > 300) { wizard.moveUp(); };
// }

// // Add a respawn function
// function respawnPlayer() {
//     wizard.health = 1;  // Reset player health
//     wizard.sprite.position.set(25, 25);  // Set the player position to the initial position
//     wizard.sprite.changeAni(idleAnim);  // Play idle animation
// }

// function setupButtons() {
//     startButton = new Button({
//         x: width / 2, y: height - 50,
//         width: 100, height: 50,
//         align_x: 0, align_y: 0,
//         content: 'Click to Start',
//         on_press() {
//             state++;
//         }
//     })
// }




// // preload images for animation - executed once
// function preload() {
//     loadanimations();
// }

// function setup() {
//     createCanvas(windowWidth, windowHeight);
//     wizard = new player();
//     setupButtons();
//     createGolemGroup();
// }



// var test;
// var respawnState = false; // New variable to track respawn state

// function draw() {
//     // state = 0 corresponds to start screen
//     if (state == 0) {
//         background("#5cb8ff");   // arbitrary color choice, can be changed
//         fill(0);
//         textSize(50);
//         textAlign(CENTER);
//         text("The Wizard's Quest", width / 2, height / 2);
//         startButton.draw();
//         wizard.sprite.changeAni(emptyAnim);
//     }
//     // state = 1 corresponds to level0
//     if (state == 1) {
//         background("#fce1b6");   // arbitrary color choice, can be changed
//         if (level0Drawn == 0) { drawLevel0(); }   // makes sure level sprites only get drawn once - breaks otherwise
//         textAlign(LEFT);
//         text('WASD to move\n' +
//             'Click to attack (mouse to aim)\n' +
//             'Space to shoot fireball sideways\n' +
//             'Press 1 to change attack\n' +
//             'Press b to spawn golem enemy\n' +
//             'Hold o to activate golem behavior (must be holding for attacks to effect them)\n' +
//             'Press y to die\n' +
//             'Press r to respawn', 50, 100);
//     }

//     // Center the canvas around the player
//     translate(windowWidth / 2 - wizard.sprite.position.x, windowHeight / 2 - wizard.sprite.position.y);

//     // Draw the player
//     wizard.sprite.draw();

//     playerMovement();

//     // press b to spawn golem in random pos
//     if (kb.presses('b')) {
//         let newGolem;
//         newGolem = new golem(Math.floor(Math.random() * 401), Math.floor(Math.random() * 401));
//     }

//     // Normalize movement, so player does not move faster in diagonal movements
//     // see pyth. theorem
//     wizard.normalizeMovement();
//     if (state != 0) { castSpell(); }          // prevents spells from being cast on title screen
//     golemBehavior();

//     // Respawn player when 'r' is pressed
//     if (kb.presses('r') && !respawnState) {
//         respawnPlayer();
//         respawnState = true;
//     }

//     // Reset respawn state when 'r' is released
//     if (kb.released('r')) {
//         respawnState = false;
//     }
// }
