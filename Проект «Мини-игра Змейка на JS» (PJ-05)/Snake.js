class Snake {
    #snakeBody; //Snake
    #direction = 'right'; //Snake
    #grid;

    constructor(grid) {
        this.#grid = grid;
        this.initSnake(); //Snake
        this.renderSnake();  //Snake
    }
    get snakeBody() {
        return this.#snakeBody;
    }

    get direction() {
        return this.#direction;
    }

    set direction(newDir) {
        this.#direction = newDir;
    }
    // массив змейки
    initSnake() {
        this.#snakeBody = [
            [6, 5],
            [5, 5],
        ];
    }
    renderSnake() {
        this.#snakeBody.forEach(([x, y]) => {
            const cell = this.#grid.getCell(x, y);
            if (cell) cell.classList.add("snake");
        });
    }
}

export default Snake;
