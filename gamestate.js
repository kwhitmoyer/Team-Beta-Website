


export function GameState(p) {
    return {
        states: { 0: 'menu', 1: 'level1' },
        currentstate: null,
        currentState: 1, // to be changed to 0 first, but menu has not been implemented in refactored code.

        getState() {
            return this.states[this.currentState];
        },

        changeState(state) {
            this.currentState = states[state];
        },

    };
}

