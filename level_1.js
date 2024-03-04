// Define variables required for level1
let mapData;
let tilesetImage;
let tileWidth = 16; // Width of each tile in pixels
let tileHeight = 16; // Height of each tile in pixels
let mapWidth, mapHeight; // Map dimensions in tiles
let tiles = []; // Stores information about each tile
let tilesetsInfo = []; // Stores information about tilesets

// Function to preload map data and tileset images
function preloadLevel1() {
    // Load JSON formatted map data
    mapData = loadJSON('assets/Maps/level_1.json');
    // Load tileset image and add its information to tilesetsInfo array
    tilesetsInfo.push(loadImage('assets/Maps/Dungeon tileset.png'));
}

// Function to initialize map data
function setupLevel1() {
    // Set canvas size
    createCanvas(windowWidth, windowHeight);

    // Calculate map pixel dimensions
    mapPixelWidth = mapWidth * tileWidth;
    mapPixelHeight = mapHeight * tileHeight;

    // Get map width and height
    mapWidth = mapData.width;
    mapHeight = mapData.height;

    // Parse layers before rendering
    parseLayers();
}

// Function to parse map layers and extract tile data for rendering
function parseLayers() {
    // Iterate over all layers in the map data
    mapData.layers.forEach(layer => {
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

// Function to render the map on the canvas
function drawLevel1() {
    background("#666666"); // Set background color
    let scaleAmount = 1; // Scale amount for map and camera
    // Calculate canvas center
    let canvasCenterX = width / 2;
    let canvasCenterY = height / 2;

    // Calculate map pixel dimensions
    let mapPixelWidth = mapWidth * tileWidth;
    let mapPixelHeight = mapHeight * tileHeight;

    // Calculate offset to center the map on the canvas
    let offsetX = canvasCenterX - mapPixelWidth / 2;
    let offsetY = canvasCenterY - mapPixelHeight / 2;

    // Iterate over and render each tile
    tiles.forEach(tile => {
        image(tile.img,
            (tile.dx + offsetX) * scaleAmount, // Adjust position and apply scale
            (tile.dy + offsetY) * scaleAmount, // Adjust position and apply scale
            tileWidth * scaleAmount, // Adjust tile width by scale amount
            tileHeight * scaleAmount, // Adjust tile height by scale amount
            tile.sx,
            tile.sy,
            tileWidth,
            tileHeight);
    });

}