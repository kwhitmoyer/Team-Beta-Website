// base class for enemies
class enemy {
    // enemy class methods
    constructor(x, y) {
        this.sprite = new this.sprite(x, y);
    }

    // abstract methods - for implementation in extended classes
    moveRight() {};
    moveLeft()  {};
    moveDown()  {};
    moveUp()    {};
    attack()    {};

    // class attributes
    sprite;
}