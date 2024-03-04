class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.animation = idleAnim; // Using idle animation as default animation
        this.facingLeft = true; // Default character facing left
    }

    draw(offsetX, offsetY, scaleAmount, characterScaleFactor) {
        let screenX = (this.x + offsetX) * scaleAmount;
        let screenY = (this.y + offsetY) * scaleAmount;

        push();
        //apply the character's scaling factor only during rendering
        translate(screenX, screenY);
        scale((this.facingLeft ? -1 : 1) * characterScaleFactor, characterScaleFactor); // Applying character scaling only
        animation(this.animation, 0, 0);
        pop();
    }
    

    move(deltaX, deltaY) {
        if (deltaX !== 0) {
            // Update facingLeft value based on the direction of movement
            this.facingLeft = deltaX < 0;
        }

        let nextX = this.x + deltaX;
        let nextY = this.y + deltaY;

        // Update animation state
        this.animation = (deltaX !== 0 || deltaY !== 0) ? runAnim : idleAnim;

        // Check for collision with walls
        if (!isWall(nextX, nextY)) {
            this.x = constrain(nextX, 0, mapPixelWidth - tileWidth);
            this.y = constrain(nextY, 0, mapPixelHeight - tileHeight);
        }
    }
}