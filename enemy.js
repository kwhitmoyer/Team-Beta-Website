

export function enemy(p) {
    return {
        sprite: null,
        animations: {},
        health: 1,
        speed: 3,
        isDead: false,

        setup() {
            this.loadAnimations();
        },

        loadAnimations() {
            this.animations.idle = p.loadAnimation('assets/golemIdle.png',
                { frameSize: [16, 16], frames: 4 });
            this.animations.idle.frameDelay = 17;

            this.animations.run = p.loadAnimation('assets/golemIdle.png',
                { frameSize: [16, 16], frames: 4 });
            this.animations.run.frameDelay = 5;
        },

    };
}