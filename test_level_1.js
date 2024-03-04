let mapData;
let solidLayerData;
let tilesetImage;
let tileWidth = 16; // Width of each tile in pixels
let tileHeight = 16;
let mapWidth, mapHeight; // Map dimensions in tiles
let tiles = []; // Stores information about each tile
let tilesetsInfo = []; // Stores information about tilesets
let player;

// Load map data and tileset images
function preload() {
    // Load the JSON formatted map data
    mapData = loadJSON('assets/Maps/level_1.json');
    // Load the tileset image and add its information to the tilesetsInfo array
    tilesetsInfo.push(loadImage('assets/Maps/Dungeon tileset.png'));
    loadAnimations();
    preloadSpells();
}

function loadAnimations() {
    idleAnim = loadAnimation("assets/idleAnimSheet.png", { frameSize: [32, 32], frames: 2 });
    idleAnim.frameDelay = 18;

    runAnim = loadAnimation("assets/runAnimSheet.png", { frameSize: [32, 32], frames: 6 });
    // Load other animations...
}

// Initial settings and map data initialization
function setup() {
    createCanvas(windowWidth, windowHeight);

    mapWidth = mapData.width;
    mapHeight = mapData.height;

    // Now compute the pixel dimensions of the map here
    mapPixelWidth = mapWidth * tileWidth;
    mapPixelHeight = mapHeight * tileHeight;

    parseLayers();
    player = new Player(tileWidth, tileHeight);
}

// Parse map layers and extract tile data for rendering
function parseLayers() {
    // Iterate over all layers in the map data
    console.log(solidLayerData); // After setting solidLayerData in the parseLayers function, add this line

    mapData.layers.forEach(layer => {

        if (layer.properties && layer.properties.some(prop => prop.name === "isSolid" && prop.value)) {
            // If it's a solid layer, store its data for collision detection
            solidLayerData = layer.data;
        }

        // Process layers of type 'tilelayer'
        if (layer.type === 'tilelayer') {
            // Iterate over chunks within the layer
            layer.chunks.forEach(chunk => {
                // Iterate over each tile within the chunk
                for (let y = 0; y < chunk.height; y++) {
                    for (let x = 0; x < chunk.width; x++) {
                        let tile = chunk.data[y * chunk.width + x];
                        // If the tile ID is not 0, it means there's a tile to render at this position
                        if (tile !== 0) {
                            // Calculate the source image coordinates and destination render coordinates, then add the tile information to the tiles array
                            tiles.push({
                                img: tilesetsInfo[0],
                                sx: ((tile - 1) % 24) * tileWidth, // Source image x-coordinate
                                sy: Math.floor((tile - 1) / 24) * tileHeight, // Source image y-coordinate
                                dx: (chunk.x + x) * tileWidth, // Destination render x-coordinate
                                dy: (chunk.y + y) * tileHeight // Destination render y-coordinate
                            });
                        }
                    }
                }
            });
        }
    });
}

function isWall(x, y) {
    let tileX = Math.floor(x / tileWidth);
    let tileY = Math.floor(y / tileHeight);
    let tileIndex = tileY * mapWidth + tileX;

    // Add a check to ensure tileIndex is within the range of solidLayerData
    if (solidLayerData && tileIndex >= 0 && tileIndex < solidLayerData.length) {
        console.log(`Checking wall at (${tileX}, ${tileY}): ${solidLayerData[tileIndex]}`);
        return solidLayerData[tileIndex] !== 0;
    }
    return false; // If index is out of range, consider it not a wall
}

function updatePlayerPosition() {
    let moveSpeed = 1.5;

    if (keyIsDown(LEFT_ARROW)) {
        player.move(-moveSpeed, 0);
    }
    if (keyIsDown(RIGHT_ARROW)) {
        player.move(moveSpeed, 0);
    }
    if (keyIsDown(UP_ARROW)) {
        player.move(0, -moveSpeed);
    }
    if (keyIsDown(DOWN_ARROW)) {
        player.move(0, moveSpeed);
    }
}

// Render the map on the canvas
function draw() {
    background("#666666");
    updatePlayerPosition();

    let scaleAmount = 4; // Scale for both map and camera
    let characterScaleFactor = 2; // Only for adjusting character size

    // Compute camera offsets, ensuring this part of the logic is unaffected by character scaling
    let idealOffsetX = width / 2 - (player.x * scaleAmount);
    let idealOffsetY = height / 2 - (player.y * scaleAmount);

    let offsetX = constrain(idealOffsetX, -(mapPixelWidth * scaleAmount - width), 0);
    let offsetY = constrain(idealOffsetY, -(mapPixelHeight * scaleAmount - height), 0);

    // Draw the map and the player
    tiles.forEach(tile => {
        let scaledX = tile.dx * scaleAmount + offsetX;
        let scaledY = tile.dy * scaleAmount + offsetY;
        image(tile.img, scaledX, scaledY, tileWidth * scaleAmount, tileHeight * scaleAmount, tile.sx, tile.sy, tileWidth, tileHeight);
    });

    // Note here we directly use scaleAmount instead of modifying it within the Player class
    player.draw(offsetX / scaleAmount, offsetY / scaleAmount, scaleAmount, characterScaleFactor);
}