let floor1_level1, floor7_level1, torches_level1, tilesGroup_level1;
var Golem1_level1, Golem2_level1;

function setupLevel1() {
    // Clear existing entities from the previous level
    floor1_level1.clear();
    floor7_level1.clear();
    torches_level1.clear();
    golems_level1.clear();
    spells.length = 0; // Clear the spells array

    // Initialize entities for Level 1
    floor1_level1 = new Group();
    floor7_level1 = new Group();
    torches_level1 = new Group();

    floor1_level1.w = 10;
    floor1_level1.h = 10;
    floor7_level1.w = 10;
    floor7_level1.h = 10;
    torches_level1.w = 10;
    torches_level1.h = 10;

    floor1_level1.tile = '_';
    floor7_level1.tile = '=';
    torches_level1.tile = '!';

    floor1_level1.img = 'assets/levelTiles/tile001.png';
    floor7_level1.img = 'assets/levelTiles/tile007.png';
    torches_level1.img = 'assets/levelTiles/01.gif';

    floor1_level1.collider = 'kinematic';
    floor7_level1.collider = 'kinematic';
    torches_level1.collider = 'kinematic';

    tilesGroup_level1 = new Tiles(
        [
            '___==============___',
            '__=______________=__',
            '__=______________=__',
            '__=______________=__',
            '__=______________=__',
            '__=______________=__',
            '__=______________=__',
            '__=______________=__',
            '__=______________=__',
            '__=______________=__',
            '__=______________=__',
            '__=______________=__',
            '__=______________=__',
            '___==============___'
        ],
        50,
        50,
        floor7_level1.w + 6,
        floor7_level1.h + 6,
        torches_level1.w + 6,
        torches_level1.h + 6,
        floor1_level1.w + 6,
        floor1_level1.h + 6
    );

    torches_level1.layer = 0;
    floor7_level1.rotationLock = true;

    // Create new golem group for Level 1
    createGolemGroupLevel1();
}

function createGolemGroupLevel1() {
    golems_level1 = new Group();
    golems_level1.scale = 3;
    golems_level1.collider = 'kinematic';
    golems_level1.debug = true;
    golems_level1.overlaps(wizard.sprite);
}

function createGolemLevel1(x, y) {
    let newGolem_level1 = new golem(x, y);
    golems_level1.add(newGolem_level1.sprite);
}