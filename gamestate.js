


export function GameState() {
    return {
        states: ["menu", "game", "death"],
        currentstate: null,


        load() {
            currentState = this.states[0];
        },

        setState(state) {
            if (this.states.includes(state, 0)) {
                currentState = state;
            } else {
                console.log("This state does not exist (gamestate.js line 9)");
            }
        },
    }
}

