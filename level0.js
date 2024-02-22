let floor1, floor7, torches, tilesGroup;


function setup() {
    createCanvas(windowWidth, windowHeight);

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

    wizard = new player();

    tilesGroup = new Tiles(
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
        floor7.w + 6,
        floor7.h + 6,
        torches.w + 6,
        torches.h + 6,
        floor1.w + 6,
        floor1.h + 6
    );

    tilesGroup.layer = 1;
    torches.layer = 0;
    wizard.sprite.layer = 99;
    floor7.rotationLock = true;
    wizard.sprite.rotationLock = true;
    wizard.sprite.bounciness = 0;
    wizard.sprite.overlaps(torches);
    wizard.sprite.overlaps(floor1);
}