


export function overlay(p) {
    return {

        setup() {
            console.log('WASD to move\n' +
                'Click to attack (mouse to aim)\n' +
                'Space to shoot fireball sideways\n' +
                'Press 1 to change attack\n' +
                'Press b to spawn golem enemy\n' +
                'Hold o to activate golem behavior (must be holding for attacks to effect them)\n' +
                'Press y to die\n' +
                'Press r to respawn\n' +
                'Press t to teleport\n' +
                'Press i for shield');
        },

        // draw() {
        //     p.textAlign(p.LEFT);
        //     p.text('WASD to move\n' +
        //         'Click to attack (mouse to aim)\n' +
        //         'Space to shoot fireball sideways\n' +
        //         'Press 1 to change attack\n' +
        //         'Press b to spawn golem enemy\n' +
        //         'Hold o to activate golem behavior (must be holding for attacks to effect them)\n' +
        //         'Press y to die\n' +
        //         'Press r to respawn', 50, 100);
        // }
    };
}