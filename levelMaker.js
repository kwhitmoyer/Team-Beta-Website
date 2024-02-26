let floor1, floor7, torches, tilesGroup;


function setup() {
    //createCanvas(windowWidth, windowHeight);
    
    createCanvas(1920,1080);

    world.gravity.y = 0;

    floor1 = new Group();
    floor7 = new Group();
    torches = new Group();

    floor1.w = 10, floor1.h = 10;
    floor7.w = 10, floor7.h = 10;
    torches.w = 10, torches.h = 10;

    torches.tile = '!';
    floor1.tile = '_';
    floor7.tile = '=';

    floor1.img = 'assets/levelTiles/Dungeon tileset/tile001.png';
    floor7.img = 'assets/levelTiles/Dungeon tileset/tile007.png';
    torches.img = 'assets/levelTiles/Dungeon tileset/01.gif';

    floor7.collider = 'static';
    
    torches.layer = 0;
    floor7.rotationLock = true;
}

// let mapObject0 = {}; // Array of tiles on the map
let mapObject0 = [];
// mapObject0.coords = [];
tileSize = 16;
// mapObject0.floor7 = new Sprite();


function draw() {

    if (mouseIsPressed) {
        setTile();
    } 
    

    if (keyIsDown(UP_ARROW)) {} // Move Canvas up
    else if (keyIsDown(DOWN_ARROW)) {} // Move canvas down
    if (keyIsDown(RIGHT_ARROW)) {} // Move canvas right
    else if(keyIsDown(LEFT_ARROW)) {} // Move canvas left

    // if(keyPressed(ENTER)){
    //     // Save Canvas
    // }
}

function setTile(){
    // Setting coordinates to closest grid space to mouse location
    let X = Math.round(mouseX/tileSize)*tileSize;
    let Y = Math.round(mouseY/tileSize)*tileSize;

    // Creating an object for a new tile
    let tmpTile = {};

    // Setting tile attributes
    tmpTile.name = "Tile " + X + " " + Y;
    tmpTile.sprite = new Sprite();
    tmpTile.sprite.img = 'assets/levelTiles/Dungeon tileset/tile001.png';
    tmpTile.sprite.collider = 'static';
    tmpTile.sprite.x = X;
    tmpTile.sprite.y = Y;

    // Adding the tile into the level map
    mapObject0.push(tmpTile);
}