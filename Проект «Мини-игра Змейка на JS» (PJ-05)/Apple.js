class Apple {
    #appleX; //Apple
    #appleY; //Apple
    #grid;
    #snake;


    constructor(grid, snake) {

        this.#grid = grid;
        this.#snake = snake;
        this.addApple(); //Apple
    }
    get appleX() {
        return this.#appleX;
    }

    get appleY() {
        return this.#appleY;
    }
    // яблко
    addApple() {
        let x, y;
        do {
            x = Math.floor(Math.random() * this.#grid.cols) + 1;
            y = Math.floor(Math.random() * this.#grid.rows) + 1;
        } while (this.#snake.snakeBody.some(([sx, sy]) => sx === x && sy === y));
    
        this.#appleX = x;
        this.#appleY = y;
    
        const appleCell = this.#grid.getCell(x, y);
        if (appleCell) appleCell.classList.add("apple");
    }
}

export default Apple;
