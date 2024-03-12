



export function map(p) {
    return {
        mapData: null,
        tilesetImage: null,
        tileWidth: 16,
        tileHeight: 16,
        mapWidth: null,
        mapHeight: null,
        mapPixelWidth: null,
        mapPixelHeight: null,
        tiles: [],
        tilesetsInfo: [],
        wallChunks: [],

        preload(level) {
            if (level == 'level1') {
                this.preloadLevel1();
            }
        },

        setup(level) {
            this.mapWidth = this.mapData.width;
            this.mapWidth = this.mapData.height;
            this.mapPixelWidth = this.mapWidth * this.tileWidth;
            this.mapPixelHeight = this.mapHeight * this.tileHeight;
            if (level == 'level1') {
                this.parseLayers();
            }
        },


        draw() {
            p.background("#666666");
            let scaleAmount = 1;
            this.tiles.forEach(tile => {
                p.image(
                    tile.img,
                    tile.dx * scaleAmount,
                    tile.dy * scaleAmount,
                    this.tileWidth * scaleAmount,
                    this.tileHeight * scaleAmount,
                    tile.sx,
                    tile.sy,
                    this.tileWidth,
                    this.tileHeight
                );
            });
        },


        preloadLevel1() {
            this.mapData = p.loadJSON('assets/Maps/level_1.json');
            this.tilesetsInfo.push(p.loadImage('assets/Maps/Dungeon tileset.png'));
        },


        parseLayers() {

            this.mapData.layers.forEach(layer => {
                let isWallLayer = layer.name === 'wall';
                if (layer.type === 'tilelayer') {
                    layer.chunks.forEach(chunk => {
                        if (isWallLayer) {
                            this.wallChunks.push({
                                x: chunk.x,
                                y: chunk.y,
                                width: chunk.width,
                                height: chunk.height,
                                data: chunk.data,
                            });
                        }

                        for (let y = 0; y < chunk.height; ++y) {
                            for (let x = 0; x < chunk.width; ++x) {
                                let tile = chunk.data[y * chunk.width + x];
                                if (tile !== 0) {
                                    this.tiles.push({
                                        img: this.tilesetsInfo[0],
                                        sx: ((tile - 1) % 24) * this.tileHeight,
                                        sy: (Math.floor((tile - 1) / 24)) * this.tileHeight,
                                        dx: (chunk.x + x) * this.tileWidth,
                                        dy: (chunk.y + y) * this.tileHeight,
                                    });
                                }
                            }
                        }

                    });
                }
            }
            );
        },




    };
}