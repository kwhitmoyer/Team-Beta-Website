

export function map(p) {
    return {
        floor1: null,
        floor7: null,
        torches: null,
        tilesGroup: null,

        setup() {
            this.floor1 = new p.Group();
            this.floor7 = new p.Group();
            this.torches = new p.Group();
            p.world.gravity.y = 0;

            this.torches.tile = '!';
            this.floor1.tile = '_';
            this.floor7.tile = '=';



            this.floor1.w = 10; this.floor1.h = 10;
            this.floor7.w = 10; this.floor7.h = 10;
            this.torches.w = 10; this.torches.h = 10;
            this.floor1.img = 'assets/levelTiles/Dungeon tileset/tile001.png';
            this.floor7.img = 'assets/levelTiles/Dungeon tileset/tile007.png';
            this.torches.img = 'assets/levelTiles/Dungeon tileset/01.gif';
            this.floor1.collider = 'kinematic';
            this.floor7.collider = 'kinematic';
            this.torches.collider = 'kinematic';

            tilesGroup = new p.Tiles(
                [
                    '__.!.____..____.!.__',
                    '___=====_..======___',
                    '___======..======___',
                    '___==__==..==_______',
                    '___==__==..==_______',
                    '___======..=====____',
                    '___=====_..======___',
                    '___==____..____==___',
                    '___==____..____==___',
                    '___==____..======___',
                    '___==____..=====____',
                    '_________.._________',
                    '___==============___'
                ],
                50,
                50,
                this.floor7.w + 6,
                this.floor7.h + 6,
                this.torches.w + 6,
                this.torches.h + 6,
                this.floor1.w + 6,
                this.floor1.h + 6,
            );
            this.floor7.rotationLock = true;
            this.torches.layer = 0;


        },


    };
}