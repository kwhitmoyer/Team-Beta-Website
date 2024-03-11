const playerSpeed = 3;
var isMoving = false;
const inventory = [];                  // array to hold items in player intventory
const itemArray = [];                  // necessary because p5play Group array doesnt take the properties of item class with it
var items, bombs, potions;             // variables for items group and subgroups
var bombImg, potionImg;
var invSprite1, invSprite2, invSprite3, invSprite4;


function createItemGroup() {
    items = new Group();
    items.collider = 'kinematic';
    items.debug = true;
    items.overlaps(wizard.sprite);

    bombs = new items.Group();
    bombs.img = bombImg;
    bombs.scale = 2;

    potions = new items.Group();
    potions.img = potionImg;
    potions.scale = 2;
}


class item {
    constructor(x, y) {
        // randomly choose between bomb or potion item - for inventory debug purposes, should be changed later (or not used at all)
        if (Math.round(Math.random()) == 0) {
            this.sprite = new bombs.Sprite(x, y);
            this.itemType = 0;          // 0 for bombs
            itemArray.push(this);
            console.log('type at spawn: ' + this.itemType);
        } else {
            this.sprite = new potions.Sprite(x, y);
            this.itemType = 1;          // 1 for potions
            itemArray.push(this);
            console.log('type at spawn: ' + this.itemType);
        }
    }

    get type() {
        return this.itemType;
    }

    itemType;
    sprite;
}

// adds picked up item to inventory
function addItem(item) {
    inventory.push(item);
}



// class for player character
class player {
    // class methods
    constructor() {
        // creates new sprite at 25, 25 with a physical size of 20 x 32 pixels
        this.sprite = new Sprite(25, 25, 20, 32);
        this.sprite.addAni(idleAnim);
        // this.sprite.collider = "none";
        //this.sprite.debug = true;
    }

    // moves player right by setting velocity
    moveRight() {

        this.sprite.vel.x = playerSpeed;
        //this.sprite.changeAni(runAnim);
        this.sprite.mirror.x = false;

    }

    // moves player left by setting velocity
    moveLeft() {
        this.sprite.vel.x = -playerSpeed;
        //this.sprite.changeAni(runAnim);
        this.sprite.mirror.x = true;
    }

    // moves player down by setting velocity
    moveDown() {
        this.sprite.vel.y = playerSpeed;
    }

    //this.sprite.changeAni(runAnim);


    // moves player up by setting velocity
    moveUp() {
        this.sprite.vel.y = -playerSpeed;
    }
    //this.sprite.changeAni(runAnim);

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
      if(this.canBeDamaged){
        this.health = 0;
        //Stop all player movement 
        this.sprite.vel.y = 0;
        this.sprite.vel.x = 0;
        //Play the death animation once and once only
        this.sprite.changeAni(deathAnim);
        this.sprite.animation.looping = false;
      }
    }    

    respawn() {
        this.health = 1;
        this.sprite.position.set(25, 25);
        this.sprite.changeAni(idleAnim);  // Change animation to idle when respawning
    }

    //Magic item effect: Make player immune to damage for a short time 
    //TBD: tie to actual magic item 
    //TBD: make it so player movement doesn't remove the shield
    shield() {
        this.sprite.changeAni(shield);
        this.sprite.animation.play();
        this.sprite.animation.looping = false; 

        this.canBeDamaged = false;
        setTimeout(() => {this.canBeDamaged = true; this.sprite.changeAni(idleAnim); this.sprite.animation.play();}, 2000);
    }

    //Magic item effect: teleport the player somewhere random 
    //TBD: tie to actual magic item 
    teleport(){
      //teleports player character to a random spot, using the same math as how enemies are spawned randomly 
        //starting portal animation
        this.sprite.changeAni(teleportJump); 
        this.sprite.animation.frame = 0; 
        this.sprite.animation.play(); 
        this.sprite.animation.looping = false; 

        //actual teleport
        setTimeout(() => {this.sprite.position.set(Math.floor(Math.random() * 401), Math.floor(Math.random() * 401), 1000); this.sprite.animation.play();}, 750); 
  
        //automatially change to idle anim if player does not move 
        setTimeout(() => this.sprite.changeAni(idleAnim), 1500); 
    }

    // class attributes
    sprite;           // player sprite
    health = 1;       // player health - currently operating on assumption that we want 1 hit death
    canBeDamaged = true;  //for shield purposes 
}

//class playerEffect extends Player{

//}

// checks if inventory is full - right now, inventory can hold 4 items
var inventoryCapacity = 4;
function isInventoryFull() {
    if (inventory.length < inventoryCapacity) {
        return false;
    } else {
        return true;
    }
}

// sprites for items in inventory
function inventoryItemSprites() {
    invSprite1 = new Sprite(width - 100 ,height - 30);
    invSprite1.collider = 'none';
    invSprite1.visible = false;

    invSprite2 = new Sprite(width - 75 ,height - 30);
    invSprite2.collider = 'none';
    invSprite2.visible = false;

    invSprite3 = new Sprite(width - 50 ,height - 30);
    invSprite3.collider = 'none';
    invSprite3.visible = false;

    invSprite4 = new Sprite(width - 25 ,height - 30);
    invSprite4.collider = 'none';
    invSprite4.visible = false;
}

function drawInventory() {
    for (let i = 0; i < inventory.length; i++) {
        console.log('inventory length:' + inventory.length);
        // determines sprite and draws it in the first slot of inventory
        if (i == 0) {
            if (inventory[i] == 0) {
                invSprite1.img = bombImg;
                invSprite1.draw();
            } else if (inventory[i] == 1) {
                invSprite1.img = potionImg;
                invSprite1.draw();
            }
        }

        // determines sprite and draws it in the second slot of inventory
        if (i == 1) {
            if (inventory[i] == 0) {
                invSprite2.img = bombImg;
                invSprite2.draw();
            } else if (inventory[i] == 1) {
                invSprite2.img = potionImg;
                invSprite2.draw();
            }
        }

        // determines sprite and draws it in the third slot of inventory
        if (i == 2) {
            if (inventory[i] == 0) {
                invSprite3.img = bombImg;
                invSprite3.draw();
            } else if (inventory[i] == 1) {
                invSprite3.img = potionImg;
                invSprite3.draw();
            }
        }

        // determines sprite and draws it in the foruth slot of inventory
        if (i == 3) {
            if (inventory[i] == 0) {
                invSprite4.img = bombImg;
                invSprite4.draw();
            } else if (inventory[i] == 1) {
                invSprite4.img = potionImg;
                invSprite4.draw();
            }
        }
    }
}

function playerMovement() {

    // controls item and wizard interactions - can be moved into function
    for (let i = 0; i < items.length; i++) {
        if (items[i].overlaps(wizard.sprite) && !isInventoryFull()) {
            console.log('i: ' + i)
            console.log('itemArray type: ' + itemArray[i].type);
            inventory.push(itemArray[i].itemType);
            console.log('inventory type: ' + inventory[i]);
            //items[i].life = 0;
            // if you delete the item the arrays break - working on a fix
            items[i].visible = false;
            items[i].position.set(-500, -500);
        }
    }

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

        //debug: force teleport 
        if (kb.presses('t')) { wizard.teleport();}

        //debug: force shield
        if (kb.presses('i')) { wizard.shield();}
    }
}