

export function makePlayer(p) {
    return {
        sprite: new p.Sprite(25, 25, 20, 32),
        currentAnimation: null,
        animations: {},
        speed: 3,




        setup() {
            this.loadAnimations();
            this.sprite.addAni(this.animations.idle);
        },

        loadAnimations() {
            this.animations.idle = p.loadAnimation("assets/idleAnimSheet.png",
                { frameSize: [32, 32], frames: 2 });
            this.animations.idle.frameDelay = 18;     // slows down idle animation

            this.animations.run = p.loadAnimation("assets/runAnimSheet.png",
                { frameSize: [32, 32], frames: 6 });

            this.animations.death = p.loadAnimation("assets/deathAnimSheet.png",
                { frameSize: [32, 32], frames: 10 });


        },

        moveRight() {
            this.sprite.vel.x = this.speed;
            this.sprite.mirror.x = false;
        },

        moveLeft() {
            this.sprite.vel.x = -this.speed;
            //this.sprite.changeAni(runAnim);
            this.sprite.mirror.x = true;
        },

        moveUp() {
            this.sprite.vel.y = -this.speed;
        },

        moveDown() {
            this.sprite.vel.y = this.speed;
        },

        normalize() {
            this.sprite.vel.normalize().mult(this.speed);
        },


        isMoving() {
            if ((this.sprite.vel.y == 0) && (this.sprite.vel.x == 0)) { return true; } else { return false; };
        },


        stopMovementX() {
            this.sprite.vel.x = 0;
            if (!this.isMoving()) {
                this.sprite.changeAni(this.animations.idle);
            }
        },

        stopMovementY() {
            this.sprite.vel.y = 0;
            if (!this.isMoving()) {
                this.sprite.changeAni(this.animations.idle);
            }
        },

        movement() {
            if (p.kb.presses('up')) {
                this.sprite.changeAni(this.animations.run);
            };
            if (p.kb.pressing('up')) {
                this.moveUp();
                this.movingVert = true;
            };
            if (p.kb.released('up')) {
                this.stopMovementY();
                this.movingVert = false;
            };


            if (p.kb.presses('down')) {
                this.sprite.changeAni(this.animations.run);
            };
            if (p.kb.pressing('down')) {
                this.moveDown();
                this.movingVert = true;
            };
            if (p.kb.released('down')) {
                this.stopMovementY();
                this.movingVert = false;
            };


            if (p.kb.presses('right')) {
                this.sprite.changeAni(this.animations.run);
            };
            if (p.kb.pressing('right')) {
                this.moveRight();
                this.movingLat = true;
            };
            if (p.kb.released('right')) {
                this.stopMovementX();
                this.movingLat = false;
            };


            if (p.kb.presses('left')) {
                this.sprite.changeAni(this.animations.run);
            };
            if (p.kb.pressing('left')) {
                this.moveLeft();
                this.movingLat = true;
            };
            if (p.kb.released('left')) {
                this.stopMovementX();
                this.movingLat = false;
            };


            if (this.movingLat && this.movingVert) { this.normalize(); }
        },



    };
}




// // class for player character
// class player {
//     // class methods
//     constructor(p, animation) {
//         // creates new sprite at 25, 25 with a physical size of 20 x 32 pixels
//         this.sprite = new p.Sprite(25, 25, 20, 32);
//         this.sprite.addAni(animation);
//         // this.sprite.collider = "none";
//         //this.sprite.debug = true;
//     }

//     // moves player right by setting velocity
//     moveRight() {

//         this.sprite.vel.x = playerSpeed;
//         //this.sprite.changeAni(runAnim);
//         this.sprite.mirror.x = false;

//     }

//     // moves player left by setting velocity
//     moveLeft() {
//         this.sprite.vel.x = -playerSpeed;
//         //this.sprite.changeAni(runAnim);
//         this.sprite.mirror.x = true;
//     }

//     // moves player down by setting velocity
//     moveDown() {
//         this.sprite.vel.y = playerSpeed;
//     }

//     //this.sprite.changeAni(runAnim);


//     // moves player up by setting velocity
//     moveUp() {
//         this.sprite.vel.y = -playerSpeed;
//     }
//     //this.sprite.changeAni(runAnim);

//     // stops player movement by setting velocity to 0
//     stopMovementX() {
//         this.sprite.vel.x = 0;
//         if (!this.moving()) {

//             this.sprite.changeAni(idleAnim);
//         }
//     }

//     normalizeMovement() {
//         this.sprite.vel.normalize().mult(playerSpeed);
//     }

//     get posx() {
//         return this.sprite.position.x;
//     }
//     get posy() {
//         return this.sprite.position.y;
//     }


//     stopMovementY() {
//         this.sprite.vel.y = 0;
//         if (!this.moving()) {

//             this.sprite.changeAni(idleAnim);
//         }
//     }

//     moving(moving) {
//         if ((this.sprite.vel.y == 0) && (this.sprite.vel.x == 0)) {
//             moving = false;
//         } else {
//             moving = true;
//         }
//         return moving;
//     }

//     die() {
//         this.health = 0;
//         // Stop all player movement
//         this.sprite.vel.y = 0;
//         this.sprite.vel.x = 0;

//         // Set the animation to the first frame of the death animation
//         this.sprite.changeAni(deathAnim);
//         this.sprite.animation.frame = 0;

//         // Play the death animation once and once only
//         this.sprite.animation.play();
//         this.sprite.animation.looping = false;
//     }

//     respawn() {
//         this.health = 1;
//         this.sprite.position.set(25, 25);
//         this.sprite.changeAni(idleAnim);  // Change animation to idle when respawning
//     }

//     // class attributes
//     sprite;           // player sprite
//     health = 1;       // player health - currently operating on assumption that we want 1 hit death
// }



// function playerMovement() {

//     //keeps wizard from moving if they are dead
//     if (wizard.health > 0) {
//         if (kb.presses('right')) {
//             wizard.sprite.mirror.x = false;
//             wizard.sprite.changeAni(runAnim);
//         }
//         if (kb.pressing('right')) { wizard.moveRight(); }
//         if (kb.released('right')) { wizard.stopMovementX(); }


//         // controls movement left
//         if (kb.presses('left')) {
//             wizard.sprite.mirror.x = true;
//             wizard.sprite.changeAni(runAnim);
//         }
//         if (kb.pressing('left')) { wizard.moveLeft(); }
//         if (kb.released('left')) { wizard.stopMovementX(); }


//         // controls movement down
//         if (kb.presses('down')) { wizard.sprite.changeAni(runAnim); }
//         if (kb.pressing('down')) { wizard.moveDown(); }
//         if (kb.released('down')) { wizard.stopMovementY(); }

//         // controls movement up
//         if (kb.presses('up')) { wizard.sprite.changeAni(runAnim); }
//         if (kb.pressing('up')) { wizard.moveUp(); }
//         if (kb.released('up')) { wizard.stopMovementY(); }

//         if (kb.presses('y')) { wizard.die(); }
//         // Check if 'r' is pressed to respawn
//         if (kb.presses('r')) { respawnPlayer(); }
//     }
// }
