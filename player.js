import { makeSpell } from "./attacks.js";


export function makePlayer(p) {
    return {
        sprite: new p.Sprite(25, 25, 20, 32),
        currentAnimation: null,
        animations: {},
        speed: 3,
        isDead: false,
        health: 1,
        spells: [],
        attackMode: 0,
        ...makeSpell(p, 25, 25, 0),


        draw() {
            p.camera.on();
            p.camera.x = this.sprite.position.x;
            p.camera.y = this.sprite.position.y;
            if (!this.isDead) {
                this.movement();
            }
            if (p.kb.presses('y')) {
                this.die();
            }
            if (p.kb.presses('r')) {
                this.respawn();
            }
            if (p.mouse.presses()) {
                var newSpell = new makeSpell(p, this.sprite.position.x, this.sprite.position.y, this.attackMode);
                newSpell.setup();
                newSpell.cast();
                this.spells.push(newSpell);
            }
            if (p.kb.presses('1')) {
                this.attackMode++;
                if (this.attackMode > 1) {
                    this.attackMode = 0;
                }

            }
        },

        // attack() {
        //     if (this.attackMode == 0) {
        //         var fireball = new fireball(p, this.sprite.position.x, this.sprite.position.y);
        //     }
        // },




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
                { frameSize: [32, 32], frames: 10, loop: false });


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
            //if (!this.isMoving()) {
            this.sprite.changeAni(this.animations.idle);
            //}
        },

        stopMovementY() {
            this.sprite.vel.y = 0;
            //if (!this.isMoving()) {
            this.sprite.changeAni(this.animations.idle);
            //}
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


        die() {
            // stop player movement
            this.sprite.vel.x = 0;
            this.sprite.vel.y = 0;

            // changes animation
            this.sprite.changeAni(this.animations.death);
            this.sprite.animation.frame = 0;
            this.sprite.animation.play();
            this.sprite.animation.looping = false;



            this.isDead = true;
        },

        respawn() {
            this.isDead = false;
            this.health = 1;
            this.sprite.position.set(25, 25);
            this.sprite.changeAni(this.animations.idle);
        },
    };
}


