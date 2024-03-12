const playerSpeed = 3;
var isMoving = false;


// class for player character
class player {
    // class methods
    constructor() {
        // creates new sprite at 25, 25 with a physical size of 20 x 32 pixels
        this.sprite = new Sprite(250, 190, 20, 32);
        this.sprite.addAni(idleAnim);
        // this.sprite.collider = "none";
        //this.sprite.debug = true;
    }
    
    isCollidingWithWall(nextX, nextY) {
    
    const playerWidth = this.sprite.width;
    const playerHeight = this.sprite.height;

    
    for (const chunk of wallChunks) {
        for (let i = 0; i < chunk.data.length; i++) {
            const tile = chunk.data[i];
            if (tile !== 0) { 
                
                const tileX = (chunk.x + i % chunk.width) * tileWidth;
                const tileY = (chunk.y + Math.floor(i / chunk.width)) * tileHeight;

                
                if (nextX < tileX + tileWidth && nextX + playerWidth > tileX &&
                    nextY < tileY + tileHeight && nextY + playerHeight > tileY) {
                    return true; 
                }
            }
        }
    }

    return false;
}
moveRight() {
        const nextX = this.sprite.position.x + playerSpeed;
        const nextY = this.sprite.position.y;
        if (!this.isCollidingWithWall(nextX, nextY)) {
            this.sprite.vel.x = playerSpeed;
            this.sprite.mirror.x = false;
        } else {
            this.sprite.vel.x = 0;
        }
    }

    moveLeft() {
        const nextX = this.sprite.position.x - playerSpeed;
        const nextY = this.sprite.position.y;
        if (!this.isCollidingWithWall(nextX, nextY)) {
            this.sprite.vel.x = -playerSpeed;
            this.sprite.mirror.x = true;
        } else {
            this.sprite.vel.x = 0;
        }
    }

    moveDown() {
        const nextX = this.sprite.position.x;
        const nextY = this.sprite.position.y + playerSpeed;
        if (!this.isCollidingWithWall(nextX, nextY)) {
            this.sprite.vel.y = playerSpeed;
        } else {
            this.sprite.vel.y = 0;
        }
    }

    moveUp() {
        const nextX = this.sprite.position.x;
        const nextY = this.sprite.position.y - playerSpeed;
        if (!this.isCollidingWithWall(nextX, nextY)) {
            this.sprite.vel.y = -playerSpeed;
        } else {
            this.sprite.vel.y = 0;
        }
    }

    // stops player movement by setting velocity to 0
    stopMovementX() {
        this.sprite.vel.x = 0;
        if (!this.moving()) {

            this.sprite.changeAni(idleAnim);
        }
    }

    normalizeMovement() {
        this.sprite.vel.normalize().mult(playerSpeed);
    }

    get posx() {
        return this.sprite.position.x;
    }
    get posy() {
        return this.sprite.position.y;
    }


    stopMovementY() {
        this.sprite.vel.y = 0;
        if (!this.moving()) {

            this.sprite.changeAni(idleAnim);
        }
    }

    moving(moving) {
        if ((this.sprite.vel.y == 0) && (this.sprite.vel.x == 0)) {
            moving = false;
        } else {
            moving = true;
        }
        return moving;
    }

    die() {
        this.health = 0;
        // Stop all player movement 
        this.sprite.vel.y = 0;
        this.sprite.vel.x = 0;
    
        // Set the animation to the first frame of the death animation
        this.sprite.changeAni(deathAnim);
        this.sprite.animation.frame = 0;
    
        // Play the death animation once and once only
        this.sprite.animation.play();
        this.sprite.animation.looping = false;
    }    

    respawn() {
        this.health = 1;
        this.sprite.position.set(25, 25);
        this.sprite.changeAni(idleAnim);  // Change animation to idle when respawning
    }

    // class attributes
    sprite;           // player sprite
    health = 1;       // player health - currently operating on assumption that we want 1 hit death
}



function playerMovement() {

    //keeps wizard from moving if they are dead
    if (wizard.health > 0) {
        if (kb.presses('right')) {
            wizard.sprite.mirror.x = false;
            wizard.sprite.changeAni(runAnim);
        }
        if (kb.pressing('right')) { wizard.moveRight(); }
        if (kb.released('right')) { wizard.stopMovementX(); }


        // controls movement left
        if (kb.presses('left')) {
            wizard.sprite.mirror.x = true;
            wizard.sprite.changeAni(runAnim);
        }
        if (kb.pressing('left')) { wizard.moveLeft(); }
        if (kb.released('left')) { wizard.stopMovementX(); }


        // controls movement down
        if (kb.presses('down')) { wizard.sprite.changeAni(runAnim); }
        if (kb.pressing('down')) { wizard.moveDown(); }
        if (kb.released('down')) { wizard.stopMovementY(); }

        // controls movement up
        if (kb.presses('up')) { wizard.sprite.changeAni(runAnim); }
        if (kb.pressing('up')) { wizard.moveUp(); }
        if (kb.released('up')) { wizard.stopMovementY(); }

        if (kb.presses('y')) { wizard.die();}
        // Check if 'r' is pressed to respawn
        if (kb.presses('r')) { respawnPlayer();}
    }
}